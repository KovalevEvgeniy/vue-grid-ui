<template>
	<div class="grid-sort">
		<div class="grid-sort__label">Group By:</div>
		<div
			v-for="(label, key, i) in list"
			:key="i"
			@click="setFirst(key)"
			class="grid-sort__item"
			:class="{
				'is-active': key === resultList[0],
				'is-disabled': !label.show
			}">
			{{ label.title }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'grid-sort',
	props: {
		list: {
			type: Object,
			default: () => {}
		},
		resultList: {
			type: Array,
			default: () => []
		},
		orderList: {
			type: Array,
			default: () => []
		},
		changeOrder: Function
	},
	methods: {
		setFirst (key) {
			let tmpList = this.orderList.filter(item => item !== key)

			tmpList.unshift(key)
			this.changeOrder(tmpList)
		},
	}
}
</script>

<style lang="stylus">
.grid-sort
	display flex
	align-items center
	user-select none
	font-size 14px
	&__label
		font-weight 600
		padding 3px 0
		margin-right 9px
	&__item
		padding 3px 9px
		margin 0 1px
		border-radius 3px
		cursor pointer
		&:not(.is-disabled)
			&:hover
			&.is-active
				background #4b74ff
				color #fff
		&.is-disabled
			cursor default
			color #ccc
</style>
