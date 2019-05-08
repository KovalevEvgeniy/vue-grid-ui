<template>
	<div class="modal">
		<div class="modal__inner">
			<div class="modal__text">{{ textContent }}</div>
			<div class="modal__btns">
				<div class="btn btn_success" @click="callbackSuccess">{{ textSuccess }}</div>
				<div class="btn btn_reject" @click="clearModal">{{ textReject }}</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'modal',
	props: {
		error: {
			type: Object
		},
		setError: Function
	},
	computed: {
		textContent () {
			if (this.error && this.error.textContent) {
				return this.error.textContent
			} else {
				return 'You are sure?'
			}
		},
		textSuccess () {
			if (this.error && this.error.textSuccess) {
				return this.error.textSuccess
			} else {
				return 'Ok'
			}
		},
		textReject () {
			if (this.error && this.error.textReject) {
				return this.error.textReject
			} else {
				return 'Cancel'
			}
		},
		callbackSuccess () {
			if (this.error && this.error.callbackSuccess) {
				return this.error.callbackSuccess
			} else {
				return function () {}
			}
		}
	},
	methods: {
		clearModal () {
			this.setError(null)
		}
	}
}
</script>

<style lang="stylus">
.modal
	position fixed
	top 0
	left 0
	right 0
	bottom 0
	background rgba(0,0,0,.2)
	z-index 100
	&__inner
		position absolute
		min-width 300px
		background #fff
		padding 20px
		border-radius 2px
		box-shadow 0 0 5px 0 rgba(0,0,0,.2)
		top 50%
		left 50%
		transform translate(-50%, -50%)
	&__text
		text-align center
		font-size 18px
	&__btns
		display flex
		justify-content center
		margin-top 20px
		.btn
			margin 0 5px
			min-width 80px
</style>
