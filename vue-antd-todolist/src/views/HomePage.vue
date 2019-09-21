<template>
	<div class="home">
		<div class="home-page-title">
			<h1>欢迎使用全新的Antd.Todolist</h1>
			<h3>——— 每个目标从第一件小事做起</h3>
		</div>
		<a-divider />
		<div class="btn-homepage-begin-div">
			<div>1、新建笔记，在笔记中输入文字内容，插入图片、表格、附件，随时随地记录身边点滴</div>
			<div>2、上传办公文档，直接在有道云笔记内管理、查看和编辑各类Office、PDF文档</div>
			<div>3、自动实时备份，有道云笔记将您的宝贵数据实时同步到云端，永久留存</div>
			<div>4、多平台信息同步，通过电脑、手机、网页随时随地查看和编辑您的文档资料</div>
		</div>
		<a-divider />
		<div class="btn-homepage-begin-div">
			<router-link to="/NewItemList">
				<button type="button" class="btn btn-outline-info btn-homepage-begin">点击开始</button>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	
	methods: {}
};
</script>
<style>
.home-page-title {
	text-align: center;
	background: #42b98350;
	color: #fff;
	padding: 20px;
}
.btn-homepage-begin {
	width: 200px;
	border-radius: 15px;
}
.btn-homepage-begin-div {
	text-align: center;
	margin: 50px;
}
</style>
