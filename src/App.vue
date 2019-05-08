<template>
	<div id="app">
		<Grid :setError="setError"/>
		<Modal v-if="error" :error="error" :setError="setError"/>
	</div>
</template>

<script>
import Grid from "@/components/grid";
import Modal from "@/components/modal";

export default {
	name: "app",
	components: {
		Grid,
		Modal
	},
	data () {
		return {
			error: null
		}
	},
	methods: {
		setError (error) {
			this.$set(this, 'error', error)
		}
	}
};
</script>