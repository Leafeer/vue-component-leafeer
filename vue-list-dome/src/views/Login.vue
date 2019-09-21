<template>
	<div>
		<img src="../assets/logo.png" />
		<form action v-if="!isReg">
			<el-row :gutter="20">
				<el-col :span="16" :offset="4">
					<el-input class="sty" v-model="name" placeholder="用户名："></el-input>
				</el-col>
				<el-col :span="16" :offset="4">
					<el-input class="sty" v-model="password" placeholder="密码：" show-password></el-input>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" :offset="6">
					<div>
						<el-button class="btn" type="primary" @click="login()">登陆</el-button>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<el-button class="btn" type="primary" @click="reg()">注册</el-button>
					</div>
				</el-col>
			</el-row>
		</form>

		<form v-else>
			<el-row :gutter="20">
				<el-col :span="16" :offset="4">
					<el-input class="sty" v-model="name" placeholder="用户名："></el-input>
				</el-col>
				<el-col :span="16" :offset="4">
					<el-input class="sty" v-model="password" placeholder="密码：" show-password></el-input>
				</el-col>
        <el-col :span="16" :offset="4">
					<el-input class="sty" v-model="repeat" placeholder="再次输入密码：" show-password></el-input>
				</el-col>
			</el-row>
			<el-button class="btn-anther" type="primary" @click="addUser()">确定</el-button>
			<el-button class="btn-anther" type="primary" @click="cancel()">取消</el-button>
		</form>
	</div>
</template>
<script>
export default {
	name: "Login",
	data() {
		return {
			isReg: false,
			name: "",
			password: "",
			repeat: ""
		};
	},
	methods: {
		login() {
			if (
				localStorage.getItem("name") === this.name &&
				localStorage.getItem("password") === this.password
			) {
				this.$router.push("home/list");
				this.name = "";
				this.password = "";
			} else {
				alert("输入的账号密码错误");
			}
		},
		reg() {
			this.isReg = true;
		},
		cancel() {
			this.isReg = false;
		},
		addUser() {
			if (this.password === this.repeat) {
				localStorage.setItem("name", this.name);
				localStorage.setItem("password", this.password);
				this.name = "";
				this.password = "";
				this.isReg = false;
			} else alert("两次密码不一致");
		}
	}
};
</script>
<style scoped>
.btn {
	margin: 90px auto;
	width: 140px;
}
.btn-anther{
  margin: 20px 18px;
	width: 140px;
}
.sty {
	margin: 15px auto;
}
</style>
