<template>
	<div
		@click.stop="toggleSelect"
		:class="{
			'select': true,
			'select_show': show
		}">

		<div class="select__input" >
			{{ countSelected }} Columns Selected
		</div>

		<div class="select__list" v-if="show">
			<div
				class="select__item"
				v-for="(label, key) in list"
				:key="key"
				@click.stop="changeList(key)"
			>
				<div :class="{
					'checkbox': true,
					'select__checkbox': true,
					'is-checked': label.show
				}"></div>
				{{ label.title }}
			</div>
		</div>

	</div>
</template>

<script>
import selectBar from "./select-bar.vue"

export default {
	name: 'select-checkbox',
	mixins: [selectBar],
	props: {
		list: {
			type: Object,
			default: () => []
		},
		changeList: Function
	},
	computed: {
		countSelected () {
			let countSelected = 0
			for (let key in this.list) {
				if (this.list[key].show) {
					countSelected++
				}
			}

			return countSelected
		}
	}
}
</script>

<style lang="stylus">
.select__checkbox
	margin-top -2px
</style>
