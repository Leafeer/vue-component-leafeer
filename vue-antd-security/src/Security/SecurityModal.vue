···<template>
  <a-modal
    :title="boolChangeLocalRule ? '修改安全规则' : '新增安全规则'"
    :visible="boolAddNewSwitch"
    @ok="AddNewSwitchOk"
    @cancel="AddNewSwitchCancel"
    width="900px"
    okText="保存"
    cancelText="取消"
    :maskClosable="this.maskClosable"
  >
    <div class="modalTitle">
      <a-form :form="form">
        <a-row :gutter="40">
          <!-- 表单左侧 -->
          <a-col :span="12">
            <a-form-item>
              <a-row class="modalLeftRule">
                <a-col :span="8">
                  <div class="text_rg_label">安全规则名称：</div>
                </a-col>
                <a-col :span="16">
                  <a-input
                    v-decorator="[
                      'SecurityRuleName',
                      {
                        rules: [{ required: true, message: ' ' }]
                      }
                    ]"
                  />
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-row class="modalLeftRule">
                <a-col :span="8">
                  <div class="text_rg_label">密钥类型：</div>
                </a-col>
                <a-col :span="16">
                  <a-select
                    style="width: 260px"
                    v-decorator="[
                      'SecurityType',
                      {
                        initialValue: ' ',
                        rules: [{ required: true, message: ' ' }]
                      }
                    ]"
                  >
                    <a-select-option
                      v-for="(item, index) in items"
                      :key="index"
                      :value="item.cfg_value + item.param_num"
                      @click="switchParam(item)"
                      >{{ item.cfg_velue_show }}</a-select-option
                    >
                  </a-select>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-show="itemParam.param1">
              <a-row class="modalLeftRule">
                <a-col :span="8">
                  <div class="text_rg_label">参数一：</div>
                </a-col>
                <a-col :span="16">
                  <a-input
                    placeholder="请填写页面输入内容提示"
                    v-decorator="['Parameter1']"
                  />
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-show="itemParam.param2">
              <a-row class="modalLeftRule">
                <a-col :span="8">
                  <div class="text_rg_label">参数二：</div>
                </a-col>
                <a-col :span="16">
                  <a-input
                    placeholder="请填写页面输入内容提示"
                    v-decorator="['Parameter2']"
                  />
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>

          <!-- 表单右侧 -->
          <a-col :span="12">
            <div class="modalRightPasswordTitle">
              加密效果预览
              <span>
                <a @click="addPassword()">刷新</a>
              </span>
            </div>
            <div class="modalRightPasswordTel">
              <div class="modalRightPasswordTelMargin">
                <a-form-item>
                  <a-row class="modalLeftRule">
                    <a-col :span="8">
                      <div class="text_rg_label">加密前字符：</div>
                    </a-col>
                    <a-col :span="16">
                      <a-input
                        placeholder="参数按顺序填写，中间以竖线隔开"
                        v-decorator="[
                          'BeforeSecurityTel',
                          {
                            rules: [{ required: true, message: ' ' }]
                          }
                        ]"
                      />
                    </a-col>
                  </a-row>
                </a-form-item>
              </div>
              <div class="modalRightPasswordTelMargin">
                <a-form-item>
                  <a-row class="modalLeftRule">
                    <a-col :span="8">
                      <div class="text_rg_label">加密后效果：</div>
                    </a-col>
                    <a-col :span="16">
                      <span>{{ afterPasswordData }}</span>
                    </a-col>
                  </a-row>
                </a-form-item>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <!-- 测试用按钮 -->
      <!-- <a-button @click="GetRuleDeploy()">修改数据</a-button> -->
    </div>
  </a-modal>
</template>
<script>
import { request } from "https";
export default {
  name: "securitymodal",
  props: {
    boolAddNewSwitch: {
      type: Boolean,
      request: true
    },
    boolChangeLocalRule: {
      type: Boolean,
      request: true
    },
    changeJsonData: {
      type: Object,
      request: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this), // 表单内数据
      maskClosable: false, //防止点击蒙层关闭数据
      listData: [], // 页面所显示的数据
      // 添加新规则开关

      // 修改规则开关

      // 修改时单条规则查询
      searchRuleData: {
        securityId: this.changeJsonData.id
      },
      // 加密预览功能传递数据
      addPasswordData: {
        securityType: "cn.ffcs.common.basic.security.Md5",
        param: "19906937757",
        paramSize: 0
      },
      //加密后数据
      afterPasswordData: "123123",

      //新增功能传递数据
      addNewData: {
        securityName: "星号脱敏",
        securityKeyType: "md5",
        securityKeyParam: '{"param1":"秘钥","param2":"xxx"}',
        securityDemo: '{"before":"18888888888","after":"188****8888"}'
      },
      // 修改功能传递参数
      addChangeData: {
        securityId: "10010",
        securityName: "xxx加密",
        securityKeyType: "cn.ffcs.common.basic.security.Md5",
        securityKeyParam: '{"param1":"秘钥","param2":"xxx"}',
        securityDemo: '{"before":"18888888888","after":"188****8888"}',
        isVaild: "true"
      },
      /* 测试用数据 */
      items: [],
      // 动态展示参数div数据
      itemParam: {
        value: "",
        param1: false,
        param2: false
      }
    };
  },
  mounted() {
    // 修改功能传参
    /* this.GetSearch(); */
    this.getChangeData(e);
    this.GetRuleDeploy();
  },
  methods: {
    // 加密效果按钮
    addPassword() {
      this.GetAddPassword();
    },
    //-----------弹窗------------
    // 新建规则确定
    AddNewSwitchOk() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        // 确认
        if (this.boolChangeLocalRule === false) {
          this.addNewData = {};
          this.addNewData.securityName = SecurityRuleName.value;
          this.addNewData.securityKeyType = this.itemParam.value;
          let pa = {
            parme1: Parameter1.value,
            parme2: Parameter2.value
          };
          let par = JSON.stringify(pa);
          console.log("par", par);
          this.addNewData.securityKeyParam = par;
          let te = {
            before: BeforeSecurityTel.value,
            after: this.afterPasswordData
          };
          let tel = JSON.stringify(te);
          this.addNewData.securityDemo = tel;
          this.PostNewRule();
          // 修改
        } else if (this.boolChangeLocalRule === true) {
          let el = this.changeJsonData;
          this.addChangeData = {};
          this.addChangeData.securityId = el.id;
          this.addChangeData.securityName = this.itemParam.value;
          this.addChangeData.securityKeyType = SecurityType.value;
          let pa = {
            parme1: Parameter1.value,
            parme2: Parameter2.value
          };
          let par = JSON.stringify(pa);
          console.log("par", par);
          this.addChangeData.securityKeyParam = par;
          let te = {
            before: BeforeSecurityTel.value,
            after: this.afterPasswordData
          };
          let tel = JSON.stringify(te);
          this.addChangeData.securityDemo = tel;
          this.addChangeData.isVaild = true;
          this.PutChangeRule();
        } else {
          return error;
        }
        this.items = [];
        this.$emit("isSwitch");
      });
    },
    // 新建规则取消
    AddNewSwitchCancel() {
      this.items = [];
      this.$emit("isSwitch");
    },
    //---------------以上弹窗----------------

    /* 获取单条数据 */
    getChangeData(e) {
      /* 		const el = this.changeJsonData;
			console.log("el", el);
			SecurityRuleName.value = el.SecurityRuleName;
			SecurityType.value = el.SecurityType;
			Parameter1.value = el.Parameter1;
			Parameter2.value = el.Parameter2;
			BeforeSecurityTel.value = el.BeforeSecurityTel;
			this.afterPasswordData = el.AfterSecurityTel; */

      this.form.setFieldsValue({
        SecurityRuleName: this.changeJsonData.SecurityRuleName,
        SecurityType: this.changeJsonData.SecurityType,
        Parameter1: this.changeJsonData.Parameter1,
        Parameter2: this.changeJsonData.Parameter2,
        BeforeSecurityTel: this.changeJsonData.BeforeSecurityTel,
        AfterSecurityTel: this.changeJsonData.AfterSecurityTel
      });
    },
    // 修改时单条安全规则查询接口
    GetSearch() {
      this.$get("/security/getSecurityRule", this.searchRuleData).then(res => {
        /* 	const e = res.data;
				SecurityRuleName.value = e.securityName
				SecurityType.value = e.securityKeyType;
				let param = JSON.parse(e.securityKeyParam);
				Parameter1.value = param.param1;
				Parameter2.value = param.param2;
				let tel = JSON.parse(e.securityDemo);
				BeforeSecurityTel.value = tel.before;
				this.afterPasswordData = tel.after; */
        /* console.log("单条安全规则查询接口", res.data); */
      });
    },
    // 安全规则配置获取
    GetRuleDeploy(e) {
      this.$get("/security/getSecurityType").then(res => {
        res.data.forEach(el => {
          this.items.push(el);
        });
        console.log("items", this.items);
      });
    },
    // 动态显示参数
    switchParam(e) {
      console.log("param", e);
      this.itemParam.value = e.cfg_velue_show;
      switch (e.param_num) {
        case "0": {
          this.itemParam.param1 = false;
          this.itemParam.param2 = false;
          break;
        }
        case "1": {
          this.itemParam.param1 = true;
          this.itemParam.param2 = false;
          break;
        }
        case "2": {
          this.itemParam.param1 = true;
          this.itemParam.param2 = true;

          break;
        }
        default:
          console.log("param", e.param_num);
          break;
      }
    },
    // 加密效果预览 get 接口 param：addPasswordData
    GetAddPassword() {
      this.$get("/security/preview", this.addPasswordData).then(res => {
        console.log("加密效果预览接口", res);
        if (res.success == true) {
          this.afterPasswordData = res.data;
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 新建规则保存接口
    PostNewRule() {
      this.$post("/security/saveSecurityRule", this.addNewData).then(res => {
        console.log("安全规则保存接口", res);
        if (res.success == true) {
          this.form.resetFields();
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 修改规则保存接口
    PutChangeRule() {
      this.$put("/security/updateSecurityRule", this.addChangeData).then(
        res => {
          console.log("修改规则", res);
          if (res.success == true) {
            this.form.resetFields();
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
/* -------弹窗-------- */

.ant-modal-content {
  border-radius: 10px !important;
}
.ant-modal-header {
  background: #1975ca !important;
}
.ant-form-item {
  margin: 0;
}
.modalLeftRule {
  margin: 10px;
}
.modalRightPasswordTitle {
  margin: 10px;
}
.modalRightPasswordTel {
  background: #eff6fd;
}
.modalRightPasswordTelMargin {
  padding: 20px 10px 10px 10px;
}
</style>
