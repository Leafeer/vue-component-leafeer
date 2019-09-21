<template>
  <!-- 
  @Author yely
  @Date 2019/8/15
	-->

  <div>
    <div>
      <!-- 抬头，搜索框和添加按钮 -->
      <div class="top_security">
        <a-row :gutter="15">
          <a-col :span="17">
            <a-menu
              class="top_menu"
              mode="horizontal"
              :defaultSelectedKeys="['1']"
            >
              <a-menu-item key="1" @click="GetTopAllRule()">
                <a-badge
                  class="badge_number"
                  :count="this.stateCount.total"
                  showZero
                >
                  <div class="top_badge">全部</div>
                </a-badge>
              </a-menu-item>
              <a-menu-item @click="GetTopEnableRule()">
                <a-badge
                  class="badge_number"
                  :count="this.stateCount.normal"
                  showZero
                >
                  <div class="top_badge">在用</div>
                </a-badge>
              </a-menu-item>
              <a-menu-item @click="GetTopDisableRule()">
                <a-badge
                  class="badge_number"
                  :count="this.stateCount.lostEffect"
                  showZero
                >
                  <div class="top_badge">停用</div>
                </a-badge>
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col :span="4">
            <div class="rg top_input_search">
              <a-input-search placeholder="规则名称" @search="SearchRule" />
            </div>
          </a-col>
          <a-col :span="3">
            <!-- 添加按钮 -->
            <div class="top_button_addnew">
              <a-button type="primary" @click="BoolAddNew()">
                <div class="rg button_text">新增规则</div>
              </a-button>
            </div>
          </a-col>
        </a-row>
      </div>

      <!-- 列表 -->
      <div>
        <a-list itemLayout="horizontal" :dataSource="this.listData">
          <div v-if="showLoadingMore" slot="loadMore" style="textAlign: center">
            <a-spin v-if="loadingMore" />
            <a-button @click="addPage()">加载更多</a-button>
          </div>
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="a_list_item_frame">
              <div :class="[item.isActive ? enAbleClass : disAbleClass]"></div>
              <!-- 列表第一行，规则名称，密匙类型 -->
              <div class="security_rule_name">
                <a-row>
                  <a-col :span="8">
                    <div class="text_rg_label">安全规则名称：</div>
                    {{ item.SecurityRuleName }}
                  </a-col>

                  <a-col :span="16">
                    <div class="text_rg_label">密匙类型：</div>
                    {{ item.SecurityType }}
                  </a-col>
                </a-row>
              </div>
              <!-- 列表第二行，参数一，参数二 -->
              <div class="parameter_frame" v-show="itemParam.param">
                <a-row>
                  <a-col :span="8" v-show="itemParam.param1">
                    <div class="text_rg_label">参数一：</div>
                    {{ item.Parameter1 }}
                  </a-col>
                  <a-col :span="16" v-show="itemParam.param2">
                    <div class="text_rg_label">参数二：</div>
                    {{ item.Parameter2 }}
                  </a-col>
                </a-row>
              </div>
              <!-- 列表第三行，加密效果，修改，删除，停启 -->
              <div class="parameter_frame">
                <a-row>
                  <a-col :span="8">
                    <span class="text_rg_label">加密效果示例：</span>
                    <span>
                      <a-icon type="unlock" />
                    </span>

                    <span class="password_title">加密前</span>
                    <span>{{ item.BeforeSecurityTel }}</span>
                  </a-col>

                  <a-col :span="12">
                    <span class="text_rg_label">
                      <span>
                        <a-icon type="lock" />
                      </span>
                      <span class="password_title">加密后</span>
                    </span>

                    <span>{{ item.AfterSecurityTel }}</span>
                  </a-col>
                  <a-col :span="4">
                    <a class="change" @click="ChangeLocalRule(item)">修改</a>
                    <a-popconfirm
                      title="是否确定要删除这个规则？"
                      @confirm="DeleteLocalRule(item)"
                      okText="确定"
                      cancelText="取消"
                    >
                      <a class="delete">删除</a>
                    </a-popconfirm>
                    <a class="is_active" @click="boolActive(item)">{{
                      item.isActive ? "停用" : "启用"
                    }}</a>
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>

    <!-- 新建弹出框 -->
    <security-modal
      ref="modal"
      :boolAddNewSwitch="isAddNewSwitch"
      :boolChangeLocalRule="isChangeLocalRule"
      :changeJsonData="changeRuleData"
      @isSwitch="modalMounted()"
    ></security-modal>

    <!-- 	<div>
			<h1>Get</h1>
			<a-button @click="GetSecurity()">搜索</a-button>
			<a-button @click="GetSearch()">单条查询</a-button>
			<a-button @click="GetAllRule()">遍历所有</a-button>
			<a-button @click="GetStateCount()">状态条数获取</a-button>
		</div>
		<div>
			<h1>Post</h1>
			<a-button @click="PostNewRule()">
				添加规
				则x415
			</a-button>
			<div>{{this.testData}}</div>
			<div>{{testData}}</div>
			<a-button @click="PutChangeRule()">修改规则x404</a-button>
			<a-button @click="PostIsValid()">启停</a-button>
		</div>
		<div>
			<h1>Del</h1>
			<a-button @click="DeleteRule()">删除规则</a-button>
		</div>-->
  </div>
</template>
<script>
const listDataJson = [
  /* 	{
		id: 1,
		SecurityRuleName: "星号脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: true
	},
	{
		id: 2,
		SecurityRuleName: "数字脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: true
	},
	{
		id: 3,
		SecurityRuleName: "不可逆脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: true
	},
	{
		id: 4,
		SecurityRuleName: "不可逆脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: false
	},
	{
		id: 5,
		SecurityRuleName: "不可逆脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: false
	},
	{
		id: 6,
		SecurityRuleName: "不可逆脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: false
	},
	{
		id: 7,
		SecurityRuleName: "不可逆脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: false
	},
	{
		id: 8,
		SecurityRuleName: "不可逆脱敏",
		SecurityType: "安全MD5（后台配置表预设）",
		Parameter1: "1",
		Parameter2: "2",
		BeforeSecurityTel: "13812344321",
		AfterSecurityTel: "123****4321",
		isActive: false
	} */
];
import SecurityModal from "./SecurityModal";
export default {
  name: "security",
  components: {
    SecurityModal
  },
  data() {
    return {
      listDataJson, // 通过接口获取到的数据，目前是本地数据
      listData: [], // 页面所显示的数据
      /*  分页参数，一页最多显示五条 */
      /* 	pagination: {
				pageSize: 5
			}, */
      loadingMore: false,
      showLoadingMore: true,

      /*  遍历功能传递数据 */
      securityAllData: {
        page: 1,
        rows: 5
      },
      stateCount: [],
      /*  搜索功能传递数据 */
      securityData: {
        securityName: "脱敏",
        page: 1,
        rows: 5
      },
      /* 停启改变列表样式 */
      enAbleClass: "enAbleClass",
      disAbleClass: "disAbleClass",

      isAddNewSwitch: false, // 添加新规则开关
      /* 修改功能数据 */
      isChangeLocalRule: false, // 修改规则开关
      changeRuleData: {}, // 修改传递数据
      /*  测试用数据 */

      testData: {
        securityName: "星号脱敏",
        securityKeyType: "md5",
        securityKeyParam: '{"param1":"秘钥","param2":"xxx"}',
        securityDemo: '{"before":"18888888888","after":"188****8888"}'
      },
      elem: {
        securityId: 10014,
        isValid: true
      },
      itemParam: {
        param: false,
        param1: false,
        param2: false
      }
    };
  },

  mounted() {
    /* this.listData = this.listDataJson; */
    this.GetStateCount();
    /* this.$get("/security/listSecurityRules?page=1&rows=5").then(res => {
			console.log("遍历所有接口", res);
			this.listDataJson = [];
			// json数据传参
			for (let index = 0; index < res.data.records.length; index++) {
				const element = [];
				const resData = res.data.records[index];
				element.id = resData.securityId;
				element.SecurityRuleName = resData.securityName;
				element.SecurityType = resData.securityKeyType;
				if (resData.securityKeyParam != null) {
					let param = JSON.parse(resData.securityKeyParam);
					element.Parameter1 = param.param1;
					element.Parameter2 = param.param2;
				}
				if (resData.securityDemo != null) {
					let tel = JSON.parse(resData.securityDemo);
					element.BeforeSecurityTel = tel.before;
					element.AfterSecurityTel = tel.after;
				}
				element.isActive = resData.vaild;
				this.listDataJson.push(element);
				this.listData = this.listDataJson;
			}
		}); */
    this.GetAllRule();
  },
  computed: {
    // 获取在用数据
  },
  methods: {
    /* 左上导航菜单，分别显示：全部，启用，停用，并且重新渲染列表 */
    addPage() {
      this.securityAllData.page++;
      this.GetAllRule(1); //点击加载更多
    },
    // 点击全部
    GetTopAllRule() {
      this.securityAllData.page = 1;
      this.GetAllRule();
    },
    // 点击在用
    GetTopEnableRule() {
      this.GetSecurity();
      for (let index = 0; index < listDataJson.length; index++) {
        if (this.listDataJson[index].isActive == true) {
          this.listData.push(this.listDataJson[index]);
        }
      }
    },
    // 点击停用
    GetTopDisableRule() {
      for (let index = 0; index < listDataJson.length; index++) {
        if (this.listDataJson[index].isActive == false) {
          this.listData.push(this.listDataJson[index]);
        }
      }
    },

    // 搜索输入框，可通过名字模糊搜索 params:value
    SearchRule(value) {
      console.log(value);
      this.securityData.securityName = value;
      this.GetSecurity();
    },

    // 删除规则
    DeleteLocalRule(e) {
      this.DeleteRule(e);
    },
    // 停启规则
    boolActive(e) {
      e.isActive = !e.isActive;
      this.PostIsValid(e);
    },

    //-----------弹窗------------
    // 修改规则
    ChangeLocalRule(e) {
      this.changeRuleData = e;
      this.isAddNewSwitch = true;
      this.isChangeLocalRule = true;
      console.log("e", e);

      this.$refs.modal.getChangeData(e);
      this.$refs.modal.GetRuleDeploy();
      /* console.log("before", this.changeRuleData); */
    },
    // 添加规则并且弹窗
    BoolAddNew() {
      console.log(this.$refs.modal);
      this.$refs.modal.GetRuleDeploy("qwerqwer");
      this.isAddNewSwitch = true;
      this.changeRuleData = {};
    },
    modalMounted() {
      this.isAddNewSwitch = false;
      this.isChangeLocalRule = false;
      this.GetAllRule();
    },
    /* 	请求接口方法 */
    // Get方法
    // 搜索框功能调用接口
    GetSecurity() {
      this.$get("/security/listSecurityRulesByName", this.securityData).then(
        res => {
          console.log("安全规则列表信息查询接口", res);
          this.listDataJson = [];
          for (let index = 0; index < res.data.records.length; index++) {
            const element = [];
            const resData = res.data.records[index];
            element.id = resData.securityId;
            element.SecurityRuleName = resData.securityName;
            element.SecurityType = resData.securityKeyType;
           /*  if (resData.securityKeyParam == null) {
              this.itemParam.param = false;
            } else {
              let param = JSON.parse(resData.securityKeyParam);
              if (element.Parameter1 == null) {
                itemParam.param1 = false;
              } else {
                itemParam.param1 = true;
                element.Parameter1 = param.param1;
              }
              if (element.Parameter2 == null) {
                itemParam.param2 = false;
              } else {
                itemParam.param2 = true;
                element.Parameter2 = param.param2;
              }
            } */
            if (resData.securityDemo != null) {
              let tel = JSON.parse(resData.securityDemo);
              element.BeforeSecurityTel = tel.before;
              element.AfterSecurityTel = tel.after;
            }
            element.isActive = resData.vaild;
            this.listDataJson.push(element);
          }

          //this.listData = this.listDataJson;
        }
      );
    },
    // 加密效果预览
    GetAddPassword() {
      this.$get(
        "/security/preview?securityType=&param=19906937757;xxxxxxxx&paramSize=1"
      ).then(res => {
        console.log("加密效果预览接口", res);
      });
    },
    // 遍历所有数据
    GetAllRule(type) {
      this.$get("/security/listSecurityRules", this.securityAllData).then(
        res => {
          console.log("遍历所有接口", res);
          // res 判空
          this.listDataJson = [];
          // json数据传参
          //foreach
          for (let index = 0; index < res.data.records.length; index++) {
            let element = {};
            let resData = res.data.records[index];
            element.id = resData.securityId;
            element.SecurityRuleName = resData.securityName;
            element.SecurityType = resData.securityKeyType;
            console.log("resdata", resData.securityKeyParam);
            let param = JSON.parse(resData.securityKeyParam);
           /*  if (resData.securityKeyParam == null) {
              this.itemParam.param = false;
            } else {
              if (element.Parameter1 == null) {
                itemParam.param1 = false;
              } else {
                itemParam.param1 = true;
                element.Parameter1 = param.param1;
              }
              if (element.Parameter2 == null) {
                itemParam.param2 = false;
              } else {
                itemParam.param2 = true;
                element.Parameter2 = param.param2;
              }
            } */
            if (resData.securityDemo != null) {
              let tel = JSON.parse(resData.securityDemo);
              element.BeforeSecurityTel = tel.before;
              element.AfterSecurityTel = tel.after;
            }
            element.isActive = resData.vaild;
            this.listDataJson.push(element);
          }

          if (type === 1) {
            this.listData = this.listData.concat(this.listDataJson);
          } else {
            this.listData = this.listDataJson;
            console.log("id", this.listDataJson);
          }
        }
      );
      this.GetStateCount();
    },

    // 状态条数量接口
    GetStateCount() {
      this.$get("/security/stateCount").then(res => {
        console.log("状态条数获取", res);
        this.stateCount = res.data;
      });
    },

    // Post方法
    // 新建规则保存接口
    PostNewRule() {
      this.$post("/security/saveSecurityRule", this.testData).then(res => {
        console.log("安全规则保存接口", res);
      });
    },

    // 启停接口
    PostIsValid(el) {
      console.log("el", el);
      this.$post(
        "/security/validation?securityId=" + el.id + "&isValid=" + el.isActive
      ).then(res => {
        console.log("启停接口", res);
        if (res.success == true) {
          this.$message.success(res.msg);
          this.GetAllRule();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // Del 方法
    DeleteRule(el) {
      this.$delete(
        "/security/deleteSecurityRule?securityId=" + el.id + " "
      ).then(res => {
        console.log("安全规则删除接口", res);
        if (res.success == true) {
          this.$message.success(res.msg);
          this.GetAllRule();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
* {
  font-size: 14px;
  font-family: Microsoft YaHei;
}
/* 公共使用部分 */
.rg {
  float: right;
}
.text_rg_label {
  width: 100px;
  text-align: right;
  float: left;
}
/* 抬头，搜索框和添加按钮 */
.top_security {
  width: 100%;
  height: 50px;

  .top_menu {
    background: rgba(241, 242, 247, 1);

    .badge_number {
      margin-right: 10px;
    }
    .top_badge {
      width: 50px;
      text-align: center;
    }
  }
  .top_input_search {
    margin-top: 10px;
    width: 190px;
  }
  .top_button_addnew {
    margin-top: 10px;

    .button_text {
      width: 69px;
    }
  }
}
/* 列表内样式 */
.ant-list-item {
  padding: 5px 0 5px 0 !important;
  float: center !important;
}
.a_list_item_frame {
  width: 100%;
  min-width: 870px;
  padding-bottom: 20px;
  position: relative;
  background: #fff;
  overflow: hidden;
  .enAbleClass::after {
    content: "生效";
    list-style: none;
    float: right;
    padding: 0;
    position: relative;
    text-align: center;
    color: #fff;
    display: block;
    height: 20px;
    width: 100px;
    line-height: 20px;
    position: absolute;
    background-color: #82d77a;
    transform: rotate(45deg);
    top: 10px;
    right: -30px;
  }
  .disAbleClass::after {
    content: "失效";
    float: right;
    color: #fff;
    background: #c3c4c2;
    text-align: center;
    height: 20px;
    width: 100px;
    transform: rotate(45deg);
    position: absolute;
    top: 10px;
    right: -30px;
  }
  .security_rule_name {
    margin: 32px 0 0 40px;
  }
  .parameter_frame {
    margin: 20px 0 0 40px;
    .password_title {
      margin: 0 11px 0 5px;
      color: #fb6e6e;
    }
    .change {
      margin-right: 10px;
    }
    .delete {
      padding: 0 10px 0 10px;
      width: 50px;
      text-align: center;
      height: 14px;
      border: 1px solid #e4e3e3;
      border-top: none;
      border-bottom: none;
    }
    .is_active {
      margin-left: 10px;
    }
  }
}
</style>
