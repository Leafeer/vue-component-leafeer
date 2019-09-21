<template>
	<div>
		<a-form :form="form" @submit="handleSubmit">
			<a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input
					v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入标题!' }]}
        ]"
				/>
			</a-form-item>

			<a-form-item label="正文" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-textarea :rows="4"
					v-decorator="[
          'note',
          {rules: [{ required: true, message: '请输入内容!' }]}
        ]"
				/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="截止日期">
				<a-date-picker
					v-decorator="['date-time-picker', config]"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
				/>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 12, offset: 5 }">
				<a-button type="primary" block html-type="submit">提交</a-button>
			</a-form-item>
		</a-form>
	
	</div>
</template>

<script>
import UndoneItemListVue from './UndoneItemList.vue';
let id = 0;

export default {
	data() {
		return {
			formLayout: "horizontal",
			form: this.$form.createForm(this),
			config: {
				rules: [
					{ type: "object", required: true, message: "Please select time!" }
				]
			},
			formItemLayout: {
				labelCol: {
					xs: { span: 5 },
					sm: { span: 5 }
				}
			},
		  
		};
	},

	computed: {
		getMenuItems() {
			return this.$store.state.menuItems;
		}
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, fieldsValue) => {
				if (err) {
					return;
				}
				// Should format date value before submit.
				const values = {
					id: id++,
					checkBoxBool: false,
					...fieldsValue,
					time: fieldsValue["date-time-picker"].format("YYYY-MM-DD HH:mm:ss"),
				 
				};
				//数组的值
				
				this.$store.commit("pushToMenuItems", values);
				this.$router.push({name:"UndoneItemList"})
			});
		//	this.form.resetFields();
		}
	}
};
</script>