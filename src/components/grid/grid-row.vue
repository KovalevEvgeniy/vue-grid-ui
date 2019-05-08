<template>
	<div class="grid-row">
		<label class="grid-row__cell grid-row__cell_checkbox">
			<input type="checkbox" :checked="isChecked" @change="onChange($event)">
			<span class="checkbox"></span>
		</label>
		<div
			v-for="(cell, i) in itemCells"
			:key="i"
			:style="{
				'width': (60 / (itemCells.length - 1)) + '%'
			}"
			class="grid-row__cell" :class="{
				['grid-row__cell_' + list[i]]: true,
				'is-active': i === 0
			}">
			{{ cell }}
		</div>
		<div class="grid-row__cell grid-row__cell_delete">
			<span @click="onDeleteItem">Delete</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'grid-row',
	props: {
		item: {
			type: Object,
			default: () => {}
		},
		list: {
			type: Array,
			default: () => []
		},
		checkedList: {
			type: Array,
			default: () => []
		},
		changeCheckedList: Function,
		onDelete: Function
	},
	computed: {
		itemCells () {
			return this.list.map(key => this.item[key])
		},
		isChecked () {
			return (this.checkedList.indexOf(this.item.id) >= 0)
		}
	},
	data () {
		return {}
	},
	methods: {
		onChange (event) {
			const id = this.item.id
			const value = event.target.checked
			let newCheckedList = this.checkedList.slice()

			if (this.checkedList.indexOf(id) >= 0) {
				newCheckedList = newCheckedList.filter(item => item !== id)
			} else {
				newCheckedList.push(id)
			}

			this.changeCheckedList(newCheckedList)
		},
		onDeleteItem () {
			const id = this.item.id
			let newCheckedList = this.checkedList.slice()

			if (this.checkedList.indexOf(id) >= 0) {
				newCheckedList = newCheckedList.filter(item => item !== id)
				this.changeCheckedList(newCheckedList)
			}

			this.onDelete([this.item.id])
		}
	}
}
</script>

<style lang="stylus">
.grid-row
	display table-row

	&:nth-child(2n-1)
		background #f4f5f8
	&:nth-child(2n)
		background #fff
	&.grid-row_head
		background #fff

	&__cell
		display table-cell
		vertical-align middle
		box-sizing border-box
		padding 18px 20px
		&.is-active
			font-weight 600

	&__cell_checkbox
		width 30px
		padding 10px 10px 10px 40px
		input
			display none
	&__cell_header
		font-weight 600
		border-bottom 1px solid #ccc
		&.is-active
			color #4B74FF

	&__cell_product
		width 30% !important

	&__cell_delete
		color #E55B5B
		text-align right
		padding-right 40px
		span
			cursor pointer
</style>
