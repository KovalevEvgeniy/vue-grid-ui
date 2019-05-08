<template>
	<div class="grid-pager">
		<div
			class="btn grid-pager__btn grid-pager__btn_left"
			:class="{
				'is-disabled': page === 0
			}"
			@click="onChangePage(page - 1)"></div>
		<div class="grid-pager__info">
			<span class="grid-pager__count">{{ pagerInfo }}</span>
			of
			<span class="grid-pager__count">{{ maxElements }}</span>
		</div>
		<div
			class="btn grid-pager__btn grid-pager__btn_right"
			:class="{
				'is-disabled': (page + 1) * count > maxElements
			}"
			@click="onChangePage(page + 1)"></div>
	</div>
</template>

<script>

export default {
	name: 'grid-pager',
	props: {
		page: Number,
		count: Number,
		list: {
			type: Array,
			default: () => []
		},
		changePage: Function
	},
	computed: {
		pagerInfo () {
			const startShow = (this.page * this.count) + 1
			let endShow = (this.page + 1) * this.count

			if (endShow > this.maxElements) {
				endShow = this.maxElements
			}

			return startShow + '-' + endShow
		},
		maxElements () {
			return this.list.length
		}
	},
	methods: {
		onChangePage (page) {
			const firstElement = page * this.count + 1
			if ((page >= 0 ) && firstElement <= this.maxElements) {
				this.changePage(page)
			}
		}
	}
}
</script>

<style lang="stylus">
.grid-pager
	display flex
	align-items center
	user-select none
	&__info
		padding 0 5px
		white-space nowrap
		min-width 105px
		text-align center
	&__count
		font-weight 600
	&__btn
		width 32px
		&:after
			content ''
			width 5px
			height 5px
			display block
			position absolute
			border-top 1px solid #5b5b5b
			border-right 1px solid #5b5b5b
			top 50%
			left 50%
			margin-top -3px
		&.is-disabled
			&:after
				border-top 1px solid #ccc
				border-right 1px solid #ccc
	&__btn_left
		&:after
			transform rotateZ(225deg)
			margin-left -2px
	&__btn_right
		&:after
			transform rotateZ(45deg)
			margin-left -4px
</style>
