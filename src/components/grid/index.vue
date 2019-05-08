<template>
	<section class="grid">
		<div class="grid__title">{{ title }} <div v-if="status === 'waiting'" class="waiting"></div></div>
		<div class="grid__header">
			<div class="grid__header-col grid__header-col_wide">
				<GridSort :list="labels" :resultList="resultList" :orderList="orderList" :changeOrder="changeOrder"/>
			</div>
			<div class="grid__header-col">
				<div
					:class="{
						'btn btn_reject': true,
						'is-disabled': checkedList.length <= 0
					}"
					@click="onDelete(checkedList)"
				>Delete {{ checkedList.length > 0 ? '(' + checkedList.length + ')' : '' }}</div>
			</div>
			<div class="grid__header-col">
				<SelectQuantity :list="[10, 20, 50, 100]" :count="productPerPage" :changeQuantity="changeQuantity"/>
			</div>
			<div class="grid__header-col">
				<GridPager :list="products" :page="page" :count="productPerPage" :changePage="changePage"/>
			</div>
			<div class="grid__header-col">
				<SelectCheckbox :list="labels" :changeList="changeList"/>
			</div>

		</div>

		<div class="grid__table">
			<div class="grid-row grid-row_head">
				<label class="grid-row__cell grid-row__cell_header grid-row__cell_checkbox">
					<input type="checkbox" :checked="isAllChecked" @change="onAllChecked">
					<div class="checkbox"></div>
				</label>
				<div
					v-for="(label, i) in resultList"
					:key="i"
					:style="{
						'width': (60 / (resultList.length - 1)) + '%'
					}"
					class="grid-row__cell grid-row__cell_header"
					:class="{'is-active': i === 0}">
					{{ labels[label].title }}
				</div>
				<div class="grid-row__cell grid-row__cell_header"></div>
			</div>

			<GridRow
				v-for="product in productList"
				:key="product.id"
				:item="product"
				:list="resultList"
				:checkedList="checkedList"
				:changeCheckedList="changeCheckedList"
				:onDelete="onDelete"
			></GridRow>
		</div>

	</section>
</template>

<script>
import {emulateGetRequest, emulateDeleteRequest} from "@/server/request.js"
import { GridRow, GridSort, GridPager, SelectQuantity, SelectCheckbox} from "./import.js"

export default {
	name: 'grid',
	components: {
		GridRow,
		GridSort,
		GridPager,

		SelectQuantity,
		SelectCheckbox,
	},
	props: {
		title: {
			type: String,
			default: 'Table UI'
		},
		setError: Function
	},
	computed: {
		resultList () {
			return this.orderList.filter(item => this.labels[item].show)
		},
		labelsList () {
			return this.resultList.map(item => this.labels[item])
		},
		productList () {
			const beginProducts = (this.page * this.productPerPage)
			const endProducts = (beginProducts + this.productPerPage)

			return this.products.slice(beginProducts, endProducts)
		},
		isAllChecked () {
			let allChecked = true

			this.productList.forEach(item => {
				if (this.checkedList.indexOf(item.id) < 0) {
					allChecked = false
				}
			})

			return allChecked
		},
	},
	data () {
		return {
			labels: {
				product: {
					title: 'Dessetr (100g saving)',
					show: true
				},
				calories: {
					title: 'Calories',
					show: true
				},
				fat: {
					title: 'Fat',
					show: true
				},
				carbs: {
					title: 'Carbs',
					show: true
				},
				protein: {
					title: 'Protein',
					show: true
				},
				iron: {
					title: 'Iron',
					show: true
				}
			},
			orderList: ['product', 'calories', 'fat', 'carbs', 'protein', 'iron'],
			checkedList: [],
			products: [],
			status: '',
			page: 0,
			productPerPage: 10
		}
	},
	mounted () {
		this.getProducts()
	},
	methods: {
		getProducts () {
			const inst = this

			emulateGetRequest()
				.then(function (request) {
					inst.$set(inst, 'products', request)
					inst.$set(inst, 'status', 'ready')
				})
				.catch(function (error) {
					inst.setError({
						textContent: 'Failed to load!',
						textSuccess: 'Try again',
						callbackSuccess: function () {
							inst.setError(null)
							inst.getProducts()
						}
					})
					inst.$set(inst, 'status', 'ready')
				})

			inst.$set(inst, 'status', 'waiting')
		},

		changeOrder (newList) {
			this.$set(this, 'orderList', newList)
		},

		changeList (key) {
			this.labels[key].show = !this.labels[key].show
		},

		changeQuantity (count) {
			this.$set(this, 'productPerPage', count)

			if (count * this.page > this.products.length) {
				this.$set(this, 'page', Math.floor(this.products.length / count))
			}
		},

		changePage (page) {
			this.$set(this, 'page', page)
		},

		onAllChecked (event) {
			const value = event.target.checked
			const idList = this.productList.map(item => item.id)
			let tmpList = []

			if (value) {
				tmpList = this.checkedList.slice()
				idList
					.filter(item => tmpList.indexOf(item) < 0)
					.forEach(item => tmpList.push(item))
			} else {
				tmpList = this.checkedList.filter(item => idList.indexOf(item) < 0)
			}

			this.changeCheckedList(tmpList)
		},

		changeCheckedList (checkedList) {
			this.$set(this, 'checkedList', checkedList)
		},

		onDelete (deleteList) {
			const inst = this

			if (deleteList.length > 0) {
				this.setError({
					textContent: 'Are you sure you want to delete (' + deleteList.length + ') element[s]?',
					textSuccess: 'Yes',
					textCancel: 'No',
					callbackSuccess: function () {
						inst.deleteRequest(deleteList)
						inst.setError(null)
					}
				})
			}
		},

		deleteRequest (deleteList) {
			const inst = this

			emulateDeleteRequest(inst.deleteList)
				.then(function (request) {
					inst.deleteProducts(deleteList)

					if (JSON.stringify(deleteList) === JSON.stringify(inst.checkedList)) {
						inst.$set(inst, 'checkedList', [])
					}
				})
				.catch(function (error) {
					inst.setError({
						textContent: 'Failed to delete request!',
						textSuccess: 'Try again',
						callbackSuccess: function () {
							inst.setError(null)
							inst.deleteRequest(deleteList)
						}
					})
				})
		},

		deleteProducts (deleteList) {
			const newProducts = this.products.filter(item => deleteList.indexOf(item.id) < 0)

			this.$set(this, 'products', newProducts)
		},
	}
}
</script>

<style lang="stylus">
global-reset()
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body
	background #fbfbfb
	font-family 'Source Sans Pro', sans-serif

.grid
	position relative
	max-width 1140px
	margin 40px auto
	font-size 14px
	&__header
		display flex
		align-items center
		justify-content space-between
		padding 16px 0
	&__header-col
		margin-left 16px
	&__header-col_wide
		flex-grow 1
		margin-left 0
	&__title
		font-size 32px
		font-weight 600
		border-bottom 1px solid #ccc
		padding 20px 0
	&__table
		display table
		width 100%

.btn
	display block
	height 32px
	font-size 14px
	line-height 32px
	padding 0 15px
	border 1px solid #c6cbd4
	border-radius 2px
	box-sizing border-box
	cursor pointer
	position relative
	text-align center
	user-select none
	white-space nowrap
	&:not(.is-disabled)
		&:hover
			background #eee
		&.btn_success
			color #fff
			background #4B74FF
			border-color #4B74FF
		&.btn_reject
			color #fff
			background #E55B5B
			border-color #E55B5B
	&.is-disabled
		border 1px solid #eee
		color #ccc
		cursor default

.checkbox
	display inline-block
	width 14px
	height 14px
	background #fff
	border 1px solid #c6cbd4
	box-shadow inset 0 0 0 1px #fff
	margin-right 5px
	border-radius 2px
	:checked + &
	&.is-checked
		background #4b74ff

.waiting
	display inline-block
	vertical-align middle
	width 16px
	height 16px
	margin-top -4px
	margin-bottom -2px
	margin-left 10px
	border 2px dotted #4b74ff
	border-radius 50%
	animation animation-rotate 2s linear infinite
@keyframes animation-rotate
	0%
		transform rotateZ(0deg)
	100%
		transform rotateZ(360deg)
</style>
