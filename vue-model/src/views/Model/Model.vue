<template>
  <div>
    <div>
      <Tree
        class="tree"
        :tablename="tableName"
        :isAddLeafSort="isAddLeafSort"
        :isLeafOperation="isLeafOperation"
        :firstTreeData="firstTreeData"
        :gData="gData"
        
      />
    </div>

    <div class="content-table">
      <div class="top">
        <a-row>
          <a-col :span="22" class="search">
            <a-form @submit="handleSubmit" layout="inline" :form="form">
              <span>
                <a-form-item>
                  <span>模型名称：</span>
                  <a-input style="width:95px" />
                </a-form-item>
                <a-form-item>
                  <span>状态：</span>

                  <a-select
                    style="width:95px"
                    v-decorator="[
                      'type',
                      { rules: [{ required: true, message: ' ' }] }
                    ]"
                    placeholder="请选择"
                  >
                    <a-select-option value="china">China</a-select-option>
                    <a-select-option value="usa">U.S.A</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item>
                  <span>模型管理：</span>

                  <a-select
                    style="width:95px"
                    v-decorator="[
                      'manage',
                      { rules: [{ required: true, message: ' ' }] }
                    ]"
                    placeholder="请选择"
                  >
                    <a-select-option value="china">China</a-select-option>
                    <a-select-option value="usa">U.S.A</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item>
                  <span>创建时间：</span>

                  <a-date-picker
                    class="input"
                    @change="onChangeDate"
                    placeholder=" "
                  />
                </a-form-item>

                <a-button class="btn" type="primary" html-type="submit"
                  >查询</a-button
                >
              </span>
            </a-form>
          </a-col>
          <a-col :span="2" class="add">
            <a-button type="primary">
              <router-link :to="{ name: 'modelAddNew' }"
                >新增</router-link
              ></a-button
            >
          </a-col>
        </a-row>
      </div>

      <div class="table">
        <div v-if="selectedKeys !== ''">
          <a-locale-provider :locale="zhCN">
            <a-table
              :dataSource="data"
              :columns="columns"
              :rowSelection="rowSelection"
              :pagination="pagination"
              bordered
            >
              <template
                v-for="(value, index) in this.columns"
                :slot="value.title"
                slot-scope="text, record"
              >
                <div :key="index">
                  <a-input
                    v-if="record.editable"
                    style="width:80%"
                    :value="text"
                    @change="
                      e =>
                        inputHandleChange(
                          e.target.value,
                          record.key,
                          value.title
                        )
                    "
                  />
                  <div v-else @click="() => edit(record.key)">
                    <a-tooltip>
                      <template slot="title">
                        <span class="ToolTitle">{{ text }}</span>
                      </template>
                      <span class="TitleWidth">{{ text }}</span>
                    </a-tooltip>
                  </div>
                </div>
              </template>
              <template slot="operation">
                <a-dropdown
                  :trigger="['click']"
                  :placement="placement"
                  class="menu"
                >
                  •••
                  <a-menu slot="overlay">
                    <a-menu-item @click="addSort(record)">
                      <span class="TitleSize">复制</span>
                    </a-menu-item>
                    <a-menu-item @click="edit(record)">
                      <span class="TitleSize">失效</span>
                    </a-menu-item>
                    <a-menu-item @click="del(record)">
                      <span class="TitleSize">删除</span>
                    </a-menu-item>
                    <a-menu-item @click="del(record)">
                      <span class="TitleSize">发布</span>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
            </a-table>
          </a-locale-provider>
          <a-checkbox
            @change="changeChecked"
            :checked="checkAll"
            class="table_checkbox"
            ><span class="SelectAllSize">全选</span></a-checkbox
          >
          <a-button class="button_allexport"
            ><span class="allexportSize">全部导出</span></a-button
          >
          <a-button class="button_export"
            ><span class="exportSize">导出</span></a-button
          >
          <a-button class="button_import"
            ><span class="importSize">导入</span></a-button
          >
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleChange"
          >
            <a-button class="upload"
              ><span class="uploadSize">
                下载导入模板
              </span></a-button
            >
          </a-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import Tree from "../Tree.vue";

const gData = [
  {
    title: "系统维表",
    key: "1",
    isLeaf: false,
    ismouseover: false,
    scopedSlots: { title: "title" },

    children: [
      {
        title: "safasfd",
        key: "2",
        isLeaf: true,
        ismouseover: false,
        scopedSlots: { title: "title" },
        slots: {
          icon: "smile"
        }
      },
      {
        title: "adasd",
        key: "3",
        isLeaf: true,
        ismouseover: false,
        scopedSlots: { title: "title" },
        slots: {
          icon: "smile"
        }
      },
      {
        title: "afgghbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        key: "4",
        isLeaf: true,
        ismouseover: false,
        scopedSlots: { title: "title" },
        slots: {
          icon: "smile"
        }
      }
    ]
  },
  {
    title: "地区维表",
    key: "5",
    isLeaf: false,
    ismouseover: false,
    scopedSlots: { title: "title" },
    children: [
      {
        title: "福富维表",
        key: "6",
        isLeaf: false,
        scopedSlots: { title: "title" },
        ismouseover: false
      },
      {
        title: "rrrrttt",
        key: "7",
        isLeaf: true,
        scopedSlots: { title: "title" },
        ismouseover: false
      },
      {
        title: "qqqq",
        key: "8",
        isLeaf: true,
        scopedSlots: { title: "title" },
        ismouseover: false
      }
    ]
  },
  {
    title: "渠道",
    key: "9",
    isLeaf: false,
    ismouseover: false,
    scopedSlots: { title: "title" }
  }
];
const columns = [
  {
    title: "模型名称",
    dataIndex: "name",
    width: "10%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "模型类型",
    dataIndex: "type",
    width: "10%",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "模型英文名称",
    dataIndex: "enName",
    width: "15%",
    scopedSlots: { customRender: "enName" }
  },
  {
    title: "创建时间",
    dataIndex: "time",
    scopedSlots: { customRender: "time" }
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "创建人",
    dataIndex: "admin",
    scopedSlots: { customRender: "admin" }
  },
  {
    title: "归属团队",
    dataIndex: "team",
    scopedSlots: { customRender: "team" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    type: 32,
    enName: `London Park no. ${i}`,
    time: "2019.9.25",
    status: `begin ${i}`,
    admin: "admin",
    team: `team ${i}`
    
  });
}
export default {
  components: {
    Tree
  },
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      form: this.$form.createForm(this), // 渲染表单
      /* ----- 公共树组件所需参数 ----- */
      tableName: "模型管理", // 树表头参数
      isAddLeafSort: false, // 添加叶节点开关
      isLeafOperation: false, // 操作叶节点开关
      /* 公共树数据参数 */
      firstTreeData: [], // 第一个树数据
      data,
      columns,
      zhCN,
      dataSource: [],
      selectedKeys: "1",
      pagination: {},
      checkAll: false,
      placement: "bottomLeft",
      gData,
      /* 下载导入模板字体 */
      headers: {
        authorization: "authorization-text"
      }
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    onChangeDate() {},
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    changeChecked(e) {
      Object.assign(this, {
        selectedRowKeys: e.target.checked ? this.getkeys() : [],
        checkAll: e.target.checked,
        dataKeys: []
      });
      console.log(this.dataSource);
    },
    // 编辑
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    // 保存
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  },
  mounted(){
    this.firstTreeData = gData
  }
};
</script>
<style lang="less" scoped>
.tree {
  top: 63px;
}
.ant-layout-sider {
  background: #f1f2f7;
}
.content-table {
  position: relative;
  margin-top: 19px;
  left: 22.5%;
  width: 77.5%;
  .top {
    .search {
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      padding: 6px 20px;
      margin-right: 10px;
      width: 820px;
      .input {
        width: 115px;
      }
      .btn {
        margin-top: 3px;
      }
    }
    .add {
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      padding: 10px 20px;
      width: 100px;
      float: left;
    }
  }
  .table {
    margin-top: 10px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    .menu {
      width: 13px;
      height: 3px;

      color: #1890ff;
    }

    /*  页脚按钮 全选 全部导出 导入 下载导入模板 */
    // 全选
    .table_checkbox {
      position: relative;
      left: 24px;
      bottom: 40px;
      .SelectAllSize {
        width: 28px;
        height: 12px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(82, 90, 108, 1);
        line-height: 30px;
      }
    }
    // 全部导出
    .button_allexport {
      position: relative;
      left: 44px;
      bottom: 40px;
      height: 25px;
      background: rgba(232, 244, 255, 1);
      border: 1px solid rgba(141, 198, 251, 1);
      border-radius: 4px;
      .allexportSize {
        font-size: 13px;
        font-family: Microsoft YaHei;
        color: rgba(82, 90, 108, 1);
      }
    }
    // 导出
    .button_export {
      position: relative;
      left: 54px;
      bottom: 40px;
      height: 25px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(141, 198, 251, 1);
      border-radius: 4px;
      .exportSize {
        font-size: 13px;
        font-family: Microsoft YaHei;
        color: rgba(82, 90, 108, 1);
      }
    }
    // 导入
    .button_import {
      position: relative;
      left: 64px;
      bottom: 40px;
      height: 25px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(141, 198, 251, 1);
      border-radius: 4px;
      .importSize {
        font-size: 13px;
        font-family: Microsoft YaHei;
        color: rgba(82, 90, 108, 1);
      }
    }

    // 下载导入模板
    .upload {
      position: relative;
      left: 74px;
      bottom: 40px;
      height: 25px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(141, 198, 251, 1);
      border-radius: 4px;
      .uploadSize {
        font-size: 13px;
        font-family: Microsoft YaHei;
        color: rgba(82, 90, 108, 1);
      }
    }
  }
}
</style>
