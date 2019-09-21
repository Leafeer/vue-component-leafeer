<template>
	<div class="home">
		<a-form>
			<a-form-item>
        <ul>
          <li class="li" v-for="(item, index) in data" :key="index"><div>12323</div> </li>
        </ul>
				
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
const data = [
	{
		title: "Ant Design Title 1"
	},
	{
		title: "Ant Design Title 2"
	},
	{
		title: "Ant Design Title 3"
	},
	{
		title: "Ant Design Title 4"
	}
];
export default {
	name: "home",
	data() {
		return {
			data
		};
	},
	components: {
		
	}
};
</script>
<style lang="less" scoped>
ul{
  padding: 0px
}
.li{
  height: 123px;
  background: #DFE6EC;
  list-style-type:none;
  margin: 12px 0;
}
</style>
