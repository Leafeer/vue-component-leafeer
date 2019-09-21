<template>
	<div id="app">
		<div id="components-back-top-demo-custom">
			<a-back-top>
				<div class="ant-back-top-inner"><a-icon type="to-top" /></div>
			</a-back-top>
		</div>
		<a-layout id="components-layout-demo-side" style="min-height: 100vh">
			<a-layout-sider class="a-menu-class" collapsible v-model="collapsed">
				<div class="logo" />
				<a-menu theme="dark" :defaultSelectedKeys="defaultSelected" mode="inline">
					<a-menu-item key="1">
						<a-icon type="home" />
						<span>主页</span>
						<router-link to="/"></router-link>
					</a-menu-item>

					<a-menu-item key="2">
						<a-icon type="plus" />
						<span>新任务</span>
						<router-link to="/NewItemList"></router-link>
					</a-menu-item>
					<a-menu-item key="3">
						<a-icon type="loading" />
						<span>未完成</span>
						<router-link to="/UndoneItemList"></router-link>
					</a-menu-item>
					<a-menu-item key="4">
						<a-icon type="check" />
						<span>已完成</span>
						<router-link to="/CompletedItemList"></router-link>
					</a-menu-item>

					<a-menu-item key="5">
						<a-icon type="user" />
						<span>个人中心</span>
						<router-link to="/UserCentertext"></router-link>
					</a-menu-item>
				</a-menu>
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background: #fff; padding: 12px 0px 0px 40px">
					<a-row>
						<a-col :span="18">
							<h2>这是一个记事本</h2>
						</a-col>
						<a-col :span="2" :offset="2" v-show="!isLogin">
							<div>
								<a-button type="primary">
									<router-link :to="{name:'loginLink'}">登陆</router-link>
								</a-button>
							</div>
						</a-col>
						<a-col :span="4" v-show="isLogin">
							<div class="current-user-text">{{'用户：'+currentUser}}</div>
						</a-col>
						<a-col :span="2">
							<a-button v-show="!isLogin">
								<router-link :to="{name:'registerLink'}">注册</router-link>
							</a-button>
							<a-button v-show="isLogin">
								<router-link :to="{name:'loginLink'}">退出</router-link>
							</a-button>
						</a-col>
						<!-- <li>
							<router-link :to="{name:'loginLink'}" v-show="!isLogin" class="nav-link">登陆</router-link>
						</li>

						<li class="nav-link">{{currentUser}}</li>
						<li>
							<router-link :to="{name:'loginLink'}" v-show="isLogin" class="nav-link">[退出]</router-link>
						</li>
						<li>
							<router-link :to="{name:'registerLink'}" v-show="!isLogin" class="nav-link">注册</router-link>
						</li>-->
					</a-row>
				</a-layout-header>
				<a-layout-content style="margin: 0 16px">
					<a-breadcrumb style="margin: 16px 0"></a-breadcrumb>

					<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
						<router-view />
					</div>
				</a-layout-content>
				<a-layout-footer style="text-align: center">Ant Design ©2019 Created by Leafeer</a-layout-footer>
			</a-layout>
		</a-layout>
	</div>
</template>

<script>
export default {
	data() {
		return {
			collapsed: false,
			defaultSelected: ["1"]
		};
	},
	computed: {
		currentUser() {
			return this.$store.state.currentUser;
		},
		isLogin() {
			return this.$store.state.isLogin;
		}
	},
	methods: {
		lalala() {
			console.log(this.isLogin);
		}
	}
};
</script>
<style lang="scss">
:global {
	.a-menu-class {
		background: #42b983;
	}
}

#components-layout-demo-side .logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px;
	text-align: center;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#components-back-top-demo-custom .ant-back-top {
	bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
	height: 40px;
	width: 40px;
	line-height: 40px;
	border-radius: 50px;
	background-color: #1088e9;
	color: #fff;
	text-align: center;
	font-size: 20px;
  margin: 75px 0px 0px 25px
}
</style>