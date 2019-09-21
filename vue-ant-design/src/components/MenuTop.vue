<template>
	<div>
		<a-row :gutter="16">
			<a-col class="gutter-row" :span="6">
				<div class="logo">
					<a class="logo">
						<img class="menu-img" src="http://static.pizzahut.com.cn/PC/Content/images/logo.png" />
					</a>
				</div>
			</a-col>
			<a-col class="gutter-row" :span="12">
				<div>
					<a-menu
						theme="light"
						mode="horizontal"
						:defaultSelectedKeys="['1']"
						:style="{ lineHeight: '64px' }"
					>
						<a-menu-item key="1">
							<router-link :to="{name:'homeLink'}" class="nav-link">主页</router-link>
						</a-menu-item>
						<a-menu-item key="2">菜单</a-menu-item>
						<a-menu-item key="3">管理</a-menu-item>
						<a-menu-item key="4">关于</a-menu-item>
					</a-menu>
				</div>
			</a-col>
			<a-col class="gutter-row" :span="6">
				<a-menu class="user-menu" theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
					<a-menu-item key="1">登陆</a-menu-item>
					<a-menu-item key="2">注册</a-menu-item>
				</a-menu>
			</a-col>
		</a-row>

		<a-layout-content style="padding: 0 50px"></a-layout-content>
	</div>
</template>
<style scope>
img {
	margin: 10px 0 0 25px;
}
.user-menu {
	float: right;
}
</style>