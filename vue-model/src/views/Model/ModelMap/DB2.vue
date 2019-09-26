<template>
  <modular class="all">
    <div>
      <div class="title"><span class="border"></span> 表基本信息</div>
      <div class="baise">
        <div class="text"><span>标准表名：</span> <span>Model</span></div>
        <div class="text">
          <span>物理表名：</span> <span>Model_{伪码}_{字段名称}</span>
          <span class="part-field" @click="addPartField()">
            <a-icon type="plus" /> 分区字段
          </span>
        </div>
        <div class="text">
          <span>物理表名：</span> <span><a-input class="ipt"></a-input></span
          ><span
            ><a-select style="width: 80px"
              ><a-select-option value="day">天</a-select-option
              ><a-select-option value="mouth">月</a-select-option
              ><a-select-option value="year">年</a-select-option></a-select
            ></span
          >
        </div>
      </div>
    </div>
    <div>
      <div class="title"><span class="border"></span>表结构信息</div>
      <a-table
        :columns="fieldColumns"
        :dataSource="fieldData"
        :pagination="pagination"
        bordered
      >
      </a-table>
    </div>
    <div class="sql">
      <div class="title ">
        <span class="border"></span>数据库信息<span
          class="add-sql-text"
          @click="addSql()"
          ><a-icon type="plus" /> 添加数据库</span
        >
      </div>
      <div>
        <ul>
          <li v-for="(item, index) in sqlData" :key="index">
            <div class="table">
              <div class="sql-title">
                <span>数据库：</span>
                <span
                  ><a-select style="width: 80px"
                    ><a-select-option value="day">天</a-select-option
                    ><a-select-option value="mouth">月</a-select-option
                    ><a-select-option value="year">年</a-select-option>
                  </a-select>
                </span>
                <a-icon
                  class="index-icon"
                  @click="deleteSql(item)"
                  type="delete"
                />
              </div>
              <div class="body">
                <div class="body-title">
                  <span>数据库：</span>
                  <span
                    ><a-select style="width: 80px"
                      ><a-select-option value="day">天</a-select-option
                      ><a-select-option value="mouth">月</a-select-option
                      ><a-select-option value="year"
                        >年</a-select-option
                      ></a-select
                    ></span
                  >
                  <span class="right">
                    <span>数据库：</span>
                    <span
                      ><a-select style="width: 80px"
                        ><a-select-option value="day">天</a-select-option
                        ><a-select-option value="mouth">月</a-select-option
                        ><a-select-option value="year"
                          >年</a-select-option
                        ></a-select
                      ></span
                    ></span
                  >
                </div>
                <div><h3>索引信息</h3></div>
                <a-table
                  :columns="sqlColums"
                  :dataSource="sqlTableData"
                  bordered
                >
                  <template slot="space" slot-scope="text, record">
                    <a-select style="width: 80%"
                      ><a-select-option value="day">天</a-select-option
                      ><a-select-option value="mouth">月</a-select-option
                      ><a-select-option value="year"
                        >年</a-select-option
                      ></a-select
                    >
                    <a-icon
                      class="index-icon"
                      @click="() => deleteIndex(record.key)"
                      type="delete"
                    />
                  </template>
                </a-table>
                <div>
                  <span class="add-index" @click="addIndex()">
                    <a-icon type="plus" /> 添加索引
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </modular>
</template>
<script>
const fieldColumns = [
  {
    title: "序号",
    dataIndex: "id",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "字段名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "字段中文名称",
    dataIndex: "chName",
    width: "10%",
    scopedSlots: { customRender: "chName" }
  },
  {
    title: "数据类型",
    dataIndex: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "字段长度",
    dataIndex: "length",
    scopedSlots: { customRender: "length" }
  },
  {
    title: "数据精度",
    dataIndex: "accuracy",
    scopedSlots: { customRender: "accuracy" }
  },
  {
    title: "缺省值",
    dataIndex: "default",
    scopedSlots: { customRender: "default" }
  },
  {
    title: "字段说明",
    dataIndex: "explain",
    width: "30%",
    scopedSlots: { customRender: "explain" }
  },
  {
    title: "允许为空",
    dataIndex: "isNull",
    scopedSlots: { customRender: "isNull" }
  },
  {
    title: "主键",
    dataIndex: "isPrimaryKey",
    scopedSlots: { customRender: "isPrimaryKey" }
  }
];

const fieldData = [];
for (let i = 0; i < 100; i++) {
  fieldData.push({
    key: i.toString(),
    id: `${i}`,
    name: `Edrward ${i}`,
    chName: 32,
    type: `London Park no. ${i}`,
    length: "2019.9.25",
    accuracy: `begin ${i}`,
    default: "admin",
    explain: `team ${i}`,
    isNull: "是",
    isPrimaryKey: "否"
  });
}
const sqlData = [
  {
    id: 1,
    title: "Ant Design Title 1"
  }
];
const sqlColums = [
  {
    title: "索引信息",
    dataIndex: "index",
    scopedSlots: { customRender: "index" }
  },
  {
    title: "字段",
    dataIndex: "field",
    scopedSlots: { customRender: "field" }
  },
  {
    title: "表空间",
    dataIndex: "space",
    scopedSlots: { customRender: "space" }
  }
];
const sqlTableData = [];
for (let i = 0; i < 4; i++) {
  sqlTableData.push({
    key: i.toString(),
    index: `${i}`,
    field: `Edrward ${i}`
  });
}
let sqlid = 2;
import modelMapMixin from "./modelMapMixins";
export default {
  name: "db2",
  props: {},
  mixins: [modelMapMixin],
  data() {
    return {
      fieldColumns,
      fieldData,
      sqlData,
      sqlColums,
      sqlTableData,
      pagination: {
        pageSize: 5
      },
      sqlIndexCount:4
    };
  },
  methods: {
    addSql() {
      let e = { title: "new title", id: sqlid++ };
      this.sqlData = this.sqlData.concat(e);
      console.log("data", this.sqlData, "e", e);
    },
    deleteSql(e) {
      this.sqlData.splice(this.sqlData.indexOf(e.id), 1);
    },
    deleteIndex(key) {
      console.log("123", key);
      const dataSource = [...this.sqlTableData];
      this.sqlTableData = dataSource.filter(item => item.key !== key);
    },
    addIndex() {
      const { sqlIndexCount, sqlTableData } = this;
      const newData = {
        key: sqlIndexCount,
        index: `Edward King ${sqlIndexCount}`,
        field: `London, Park Lane no. ${sqlIndexCount}`
      };
      this.sqlTableData = [...sqlTableData, newData];
      console.log(this.sqlTableData);
      
      this.sqlIndexCount = sqlIndexCount + 1;
    }
  }
};
</script>
<style lang="less" scoped>
.all {
  padding-left: 20px;
}
.title {
  /* border:0;
  border-left: 3px solid #1890FF; */

  margin: 20px 0 30px 0;
  .border {
    width: 3px;
    height: 14px;
    border-left: 3px solid #1890ff;
    margin-right: 10px;
  }
}
.baise {
  .text {
    margin-bottom: 30px;
    .ipt {
      width: 80px;
      margin: 0 10px;
    }
    .part-field {
      margin-left: 10px;
      color: #1890ff;
    }
  }
}
.index-icon {
  float: right;
  color: #1890ff;
  svg {
    width: 20px;
    height: 20px;
  }
}
.sql {
  .add-sql-text {
    margin-left: 10px;
    color: #1890ff;
  }
  ul {
    padding: 0px;
    li {
      list-style-type: none;
      margin-bottom: 15px;
      .table {
        .sql-title {
          border: 1px solid #dfe6ec;
          border-top: 4px solid #1890ff;
          padding: 15px;
        }
        .body {
          border: 1px solid #dfe6ec;
          padding: 15px;
          .body-title {
            padding: 0 15px 15px 15px;
            .right {
              margin-left: 73px;
            }
          }
          .add-index {
            margin-left: 10px;
            color: #1890ff;
          }
        }
      }
    }
  }
}
</style>
