<template>
	<div id="app">
		<menu-top></menu-top>
		<div class="container">
			<router-view></router-view>
		</div>
		<a-layout-footer style="text-align: center">@抹茶薄荷糖有限公司所有</a-layout-footer>
	</div>
</template>
<script>
import MenuTop from "./components/MenuTop";
export default {
	components: {
		MenuTop
	}
};
</script>
<style lang="scss">
// color: #42b983;
</style>
