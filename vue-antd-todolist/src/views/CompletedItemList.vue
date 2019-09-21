<template>
	<div>
		<div class="menu-tabs">
			<a-row :gutter="16">
				<a-col :span="20">
					<h3>内容</h3>
				</a-col>

				<a-col :span="4">
					<h3>完成时间</h3>
				</a-col>
			</a-row>
		</div>

		<a-list itemLayout="horizontal" :dataSource="data">
			<a-list-item slot="renderItem" slot-scope="item">
				<div class="all-list btn btn-light">
					<a-row>
						<a-col :span="22" @click="onChange(item)">
							<h3 class="title-note title-text">{{item.title}}</h3>
						</a-col>
						<a-col :span="2">
							<a-popconfirm title="是否确定要删除这个任务？" @confirm="confirm" okText="确定" cancelText="取消">
								<a-button type="danger" @click="itemDelete(item)">删除</a-button>
							</a-popconfirm>
						</a-col>
					</a-row>
					<br />
					<div @click="onChange(item)" class="title-note">
						<a-row :gutter="16">
							<a-col :span="2">
								<a-checkbox :checked="item.checkBoxBool" @change="onChange"></a-checkbox>
							</a-col>
							<a-col :span="18">
								<div>{{item.note}}</div>
							</a-col>

							<a-col :span="4">
								<a-timeline-item mode="right">{{item.time}}</a-timeline-item>
							</a-col>
						</a-row>
					</div>
				</div>
			</a-list-item>
		</a-list>
		<div>
			<a-row>
				<a-col :span="4">
					<a-button type="primary" block @click="toggleChecked(data)">{{!checkBoxInThis ? '全选' : '全不选'}}</a-button>
				</a-col>
				<a-col :span="8" :offset="12">
					<a-button type="danger" block @click="itemFinish()">批量删除</a-button>
				</a-col>
			</a-row>
		</div>
	</div>
</template>
<script>
import timeCountdown from "@/components/timeCountdown.vue";
const data = [];

export default {
	components: {
		// EditableCell,
		timeCountdown
	},
	data() {
		return {
			data,
			checkBoxInThis: false
		};
	},
	created() {
		this.data = this.getFinishItems;
	},
	computed: {
		getFinishItems() {
			return this.$store.state.finishItems;
		}
	},
	methods: {
		toggleChecked() {
			if (this.checkBoxInThis == false) {
				for (let index = this.data.length - 1; index >= 0; index--) {
					//如果有框选了，输出为ture的id,把当前对象压入数组finishItems
					if (this.data[index].checkBoxBool == false) {
						this.data[index].checkBoxBool = true;
						this.checkBoxInThis = true;
					}
				}
			} else if (this.checkBoxInThis == true) {
				for (let index in this.data) {
					this.data[index].checkBoxBool = false;
				}
				this.checkBoxInThis = false;
			}

			// if (this.checkBoxInThis == true) {
			// 	// 点击全不选
			// 	this.checkBoxInThis = false;
			// } else if (this.checkBoxInThis == false) {
			// 	// 点击全选
			// 	this.checkBoxInThis = true;
			// }

			// //遍历data 如果多选框为假就变真  全选功能
			// for (let index in this.data) {
			// 	//如果有框未选，则把所有框设为真，同时把判断设为全不选
			// 	if (this.data[index].checkBoxBool == false) {
			// 		this.data[index].checkBoxBool = true;
			// 		this.checkBoxInThis = true;
			// 	} else if (this.checkBoxInThis == true) {
			// 		this.data[index].checkBoxBool = false;
			// 		this.checkBoxInThis = false;
			// 	}
			// 	//false：全不选   true ：全选 如果判断为全不选，把所有框设为false 同时把判断设为全选
			// }
			// // for (let index in this.data) {
			// // }
		},
		onChange(e) {
			e.checkBoxBool = !e.checkBoxBool;
		},
		confirm(e) {
			this.data.splice(this.data.findIndex(data => data.id === e.id), 1);
			this.$message.success("删除成功");
		},
		itemDelete(e) {
			// console.log(e.id);
			// this.data.splice(this.data.findIndex(data => data.id === e.id), 1);
		},
		itemFinish() {
			for (let index = this.data.length - 1; index >= 0; index--) {
				//如果有框选了，输出为ture的id,把当前对象压入数组finishItems
				if (this.data[index].checkBoxBool == true) {
					//console.log(this.data[index]);
					this.data.splice(index, 1);
				}
				// this.data.splice(this.data.indexOf())
			}
		}
	}
};
</script>
<style >
.all-list {
	width: 100%;
}
.title-note {
	text-align: left;
	width: 100%;
	white-space: normal;
}
.title-text {
	margin-left: 20px;
}
.menu-tabs {
	background: #42b98350;
	padding: 12px;
	font-family: 幼圆;
}
.title-border {
	border: 1px rgba(0, 0, 0, 0.4);
	border-style: none solid;
}
</style>
