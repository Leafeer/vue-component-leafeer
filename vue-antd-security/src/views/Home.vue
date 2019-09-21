<template>
	<div>
		<button @click="click() ">123</button>
		<child ref="child1" />
	</div>
</template>
<script>
import child from "./Security";
export default {
	components: {
		child
	},
	methods: {
		click() {
			console.log(this.$refs.child1);
			this.$refs.child1.children("qwerqwer");
		}
	}
};
</script>