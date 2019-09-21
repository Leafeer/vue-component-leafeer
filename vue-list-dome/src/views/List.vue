<template>
	<div>
		<ul>
			<li v-for="(item, index) in pageLists" :key="index">
				{{item.title}}-{{item.content}}
				<router-link :to="{name:'news',params: item}">lalalla</router-link>
			</li>
		</ul>

		<el-table :data="pageLists" style="width: 100%">
			<el-table-column prop="title" label="标题" width="200"></el-table-column>
			<el-table-column prop="content" label="内容" width="200"></el-table-column>
			<el-table-column prop="address" label="详情">
				<router-link :to="{name:'news',params: item}">lalalla</router-link>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import store from "@/store";
export default {
	name: "List",
	store,
	computed: {
		pageLists() {
			return store.state.lists;
		}
	},
	data() {
		return {};
	}
};
</script>
