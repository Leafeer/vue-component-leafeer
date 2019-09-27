<template>
  <div>
    <!-- <div class="rectangle1"></div>
    <div class="rectangle2"></div> -->
    <div class="leftlogo">
      <a-input class="tree-input" placeholder="字段名称" @change="onChange">
        <a-icon slot="suffix" type="search" class="SearchWidth" />
      </a-input>
      <a-collapse @change="treechange" class="collapseWidth">
        <a-collapse-panel header="从数据源中选择" key="1">
          <a-tree :treeData="treeData1" @select="onSelect" multiple>
            <template slot="title" slot-scope="record">
              <span v-if="record.isLeaf">
                <a-checkbox :checked="record.checked"></a-checkbox>
                <a-tooltip>
                  <template slot="title">
                    <span class="ToolTitle">{{ record.title }}</span>
                  </template>
                  <span class="TitleWidth">{{ record.title }}</span>
                </a-tooltip>
              </span>
              <span v-else>
                <a-tooltip>
                  <template slot="title">
                    <span class="ToolTitle">{{ record.title }}</span>
                  </template>
                  <span class="TitleWidth">{{ record.title }}</span>
                </a-tooltip>
              </span>
            </template>
          </a-tree>
        </a-collapse-panel>
        <a-collapse-panel header="从字段池中选择" key="2">
          <a-tree :treeData="treeData2" @select="onSelect" multiple>
            <template slot="title" slot-scope="record">
              <span v-if="record.isLeaf">
                <a-checkbox :checked="record.checked"></a-checkbox>
                <a-tooltip>
                  <template slot="title">
                    <span class="ToolTitle">{{ record.title }}</span>
                  </template>
                  <span class="TitleWidth">{{ record.title }}</span>
                </a-tooltip>
              </span>
              <span v-else>
                <a-tooltip>
                  <template slot="title">
                    <span class="ToolTitle">{{ record.title }}</span>
                  </template>
                  <span class="TitleWidth">{{ record.title }}</span>
                </a-tooltip>
              </span>
            </template>
          </a-tree>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="rightlogo">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="{ pageSize: 8 }"
        :customRow="rowMouseLeave"
        class="tablelogo"
      >
        <template
          v-for="(col, index) in [
            'fieldDesc',
            'businessCaliber',
            'technicalCaliber'
          ]"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="index">
            <a-input
              v-if="record.editable"
              style="width:80%"
              :value="text"
              @change="e => inputHandleChange(e.target.value, record.key, col)"
            />
            <div v-else @click="() => edit(record.key)">
              {{ text }}
            </div>
          </div>
        </template>
        <template slot="detailNullable">
          <a-checkbox></a-checkbox>
        </template>
        <template slot="primaryKey">
          <a-checkbox></a-checkbox>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-icon
            type="arrow-up"
            class="tableUp"
            @click="tableUp(record.key)"
          />
          <a-icon
            type="arrow-down"
            class="tableDown"
            @click="tableDown(record.key)"
          />
          <a-popconfirm
            v-if="dataSource.length"
            title="确定要删除嘛?"
            @confirm="() => onDelete(record.key)"
          >
            <a-icon type="delete" class="tableDel" />
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const columns = [
  {
    title: '字段名称',
    dataIndex: 'fieldCode',
    align: 'center'
  },
  {
    title: '字段英文名称',
    dataIndex: 'fieldName',
    align: 'center'
  },
  {
    title: '字段说明',
    dataIndex: 'fieldDesc',
    scopedSlots: { customRender: 'fieldDesc' },
    align: 'center'
  },
  {
    title: '业务口径',
    dataIndex: 'businessCaliber',
    scopedSlots: { customRender: 'businessCaliber' },
    align: 'center'
  },
  {
    title: '技术口径',
    dataIndex: 'technicalCaliber',
    scopedSlots: { customRender: 'technicalCaliber' },
    align: 'center'
  },
  {
    title: '允许为空',
    dataIndex: 'detailNullable',
    scopedSlots: { customRender: 'detailNullable' },
    align: 'center'
  },
  {
    title: '主键',
    dataIndex: 'primaryKey',
    scopedSlots: { customRender: 'primaryKey' },
    align: 'center'
  },
  {
    title: '数据类型',
    dataIndex: 'fieldDataType',
    align: 'center'
  },
  {
    title: '字段长度',
    dataIndex: 'fieldLength',
    align: 'center'
  },
  {
    title: '数据精度',
    dataIndex: 'fieldPrecision',
    align: 'center'
  },
  {
    title: '缺省值',
    dataIndex: 'defaultValue',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    width: "100px"
  }
];

const dataSource = [
  {
    key: '0',
    fieldCode: 'data111',
    fieldName: 'data211',
    fieldDesc: 'data5',
    businessCaliber: 'data111',
    technicalCaliber: 'data112',
    detailNullable: 'data311',
    primaryKey: 'data111',
    fieldDataType: 'data211',
    fieldLength: 'data311',
    fieldPrecision: 'data111',
    defaultValue: 'data211',
    operation: 'data311'
  },
  {
    key: '1',
    fieldCode: 'data1',
    fieldName: 'data2',
    fieldDesc: 'data6',
    businessCaliber: 'data1',
    technicalCaliber: 'data2',
    detailNullable: 'data3',
    primaryKey: 'data1',
    fieldDataType: 'data2',
    fieldLength: 'data3',
    fieldPrecision: 'data1',
    defaultValue: 'data2',
    operation: 'data3'
  },
  {
    key: '2',
    fieldCode: 'data111',
    fieldName: 'data211',
    fieldDesc: 'data7',
    businessCaliber: 'data111',
    technicalCaliber: 'data112',
    detailNullable: 'data311',
    primaryKey: 'data111',
    fieldDataType: 'data211',
    fieldLength: 'data311',
    fieldPrecision: 'data111',
    defaultValue: 'data211',
    operation: 'data311'
  },
  {
    key: '3',
    fieldCode: 'data111',
    fieldName: 'data211',
    fieldDesc: 'data8',
    businessCaliber: 'data111',
    technicalCaliber: 'data112',
    detailNullable: 'data311',
    primaryKey: 'data111',
    fieldDataType: 'data211',
    fieldLength: 'data311',
    fieldPrecision: 'data111',
    defaultValue: 'data211',
    operation: 'data311'
  },
  {
    key: '4',
    fieldCode: 'data111',
    fieldName: 'data211',
    fieldDesc: 'data9',
    businessCaliber: 'data111',
    technicalCaliber: 'data112',
    detailNullable: 'data311',
    primaryKey: 'data111',
    fieldDataType: 'data211',
    fieldLength: 'data311',
    fieldPrecision: 'data111',
    defaultValue: 'data211',
    operation: 'data311'
  }
];

export default {
  data () {
    return {
      checked: false,
      selectedKeys: [],
      treeData1:  [
        {
          title: '系统维表',
          key: '1',
          isLeaf: false,
          ismouseover: false,
          scopedSlots: { title: 'title' },
          children: [
            {
              title: 'safasfd',
              key: '2',
              isLeaf: true,
              checked: false,
              ismouseover: false,
              scopedSlots: { title: 'title' },
              slots: {
                icon: 'smile'
              }
            },
            {
              title: 'adasd',
              key: '3',
              isLeaf: true,
              checked: false,
              ismouseover: false,
              scopedSlots: { title: 'title' },
              slots: {
                icon: 'smile'
              }
            },
            {
              title: 'afgghbbbbbbbbbbbbbbbbbbbbbbbbbbb',
              key: '4',
              isLeaf: true,
              checked: false,
              ismouseover: false,
              scopedSlots: { title: 'title' },
              slots: {
                icon: 'smile'
              }
            }
          ]
        },
        {
          title: '地区维表',
          key: '5',
          isLeaf: false,
          ismouseover: false,
          scopedSlots: { title: 'title' },
          children: [
            {
              title: '福富维表',
              key: '6',
              isLeaf: false,
              scopedSlots: { title: 'title' },
              ismouseover: false
            },
            {
              title: 'rrrrttt',
              key: '7',
              isLeaf: true,
              checked: false,
              scopedSlots: { title: 'title' },
              ismouseover: false
            },
            {
              title: 'qqqq',
              key: '8',
              isLeaf: true,
              checked: false,
              scopedSlots: { title: 'title' },
              ismouseover: false
            }
          ]
        },
        {
          title: '渠道',
          key: '9',
          isLeaf: false,
          ismouseover: false,
          scopedSlots: { title: 'title' }
        }
      ],
      treeData2:  [
        {
          title: '系统维表',
          key: '1',
          isLeaf: false,
          ismouseover: false,
          scopedSlots: { title: 'title' },
          children: [
            {
              title: 'safasfd',
              key: '2',
              isLeaf: true,
              checked: false,
              ismouseover: false,
              scopedSlots: { title: 'title' },
              slots: {
                icon: 'smile'
              }
            },
            {
              title: 'adasd',
              key: '3',
              isLeaf: true,
              checked: false,
              ismouseover: false,
              scopedSlots: { title: 'title' },
              slots: {
                icon: 'smile'
              }
            },
            {
              title: 'afgghbbbbbbbbbbbbbbbbbbbbbbbbbbb',
              key: '4',
              isLeaf: true,
              checked: false,
              ismouseover: false,
              scopedSlots: { title: 'title' },
              slots: {
                icon: 'smile'
              }
            }
          ]
        },
        {
          title: '地区维表',
          key: '5',
          isLeaf: false,
          ismouseover: false,
          scopedSlots: { title: 'title' },
          children: [
            {
              title: '福富维表',
              key: '6',
              isLeaf: false,
              scopedSlots: { title: 'title' },
              ismouseover: false
            },
            {
              title: 'rrrrttt',
              key: '7',
              isLeaf: true,
              checked: false,
              scopedSlots: { title: 'title' },
              ismouseover: false
            },
            {
              title: 'qqqq',
              key: '8',
              isLeaf: true,
              checked: false,
              scopedSlots: { title: 'title' },
              ismouseover: false
            }
          ]
        },
        {
          title: '渠道',
          key: '9',
          isLeaf: false,
          ismouseover: false,
          scopedSlots: { title: 'title' }
        }
      ],
      columns,
      dataSource,
      cacheData: [],
      rowMouseLeave: record => ({
        on: {
          mouseleave: () => {
            const oldData = this.cacheData.filter(
              item => record.key === item.key
            )[0];
            const newData = [...this.dataSource];
            const target = newData.filter(item => record.key === item.key)[0];
            if (record.editable) {
              // 接口
              const OldAddList = Object.assign({}, oldData);
              delete OldAddList.key;
              delete OldAddList.editable;
              const NewAddList = Object.assign({}, target);
              delete NewAddList.key;
              delete NewAddList.editable;
              console.log(NewAddList);
              console.log(OldAddList);
              // 修改成功
              this.$message.success('修改成功');
              this.dataSource = newData;
              delete target.editable;
              // 修改失败
              /* this.dataSource = newData;
              this.$message.error("修改失败"); */
            }
          }
        }
      })
    };
  },
  methods: {
    onChange () {},
    treechange (key) {
      console.log(key);
    },
    inputHandleChange (value, key, column) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    edit (key) {
      this.cacheData = this.dataSource.map(item => ({ ...item }));
      const newData = [...this.dataSource];
      const target = newData.find(item => item.key === key);
      if (target) {
        target.editable = true;
        this.dataSource = newData;
      }
    },
    onDelete (key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    onSelect (selectedKeys,  node) {
      this.selectedKeys = selectedKeys;
      node.node.dataRef.checked = !node.node.dataRef.checked
      console.log(selectedKeys)
      console.log(node.node.dataRef.title)
      console.log(node.node.dataRef.checked)
    },
    tableUp (key) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      console.log(target);
      for (var index = 0; index < dataSource.length; index++) {
        if (dataSource[index].key === key) {
          dataSource.splice(index, 1);
          dataSource.splice(index - 1, 0, target);
          this.dataSource = dataSource;
          this.cacheData = this.dataSource.map(item => ({ ...item }));
          break;
        }
      }
    },
    tableDown (key) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      for (var index = 0; index < dataSource.length; index++) {
        if (dataSource[index].key === key) {
          dataSource.splice(index, 1);
          dataSource.splice(index + 1, 0, target);
          this.dataSource = dataSource;
          this.cacheData = this.dataSource.map(item => ({ ...item }));
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
/* .rectangle1 {
  position: absolute;
  left: 1.6%;
  top: 20.25%;
  width: 96.8%;
  height: 0.5px;
  border: 0.5px solid #e7e7e7;
}
.rectangle2 {
  position: absolute;
  left: 22.73%;
  top: 20.25%;
  width: 0.5px;
  height: 79.75%;
  border: 0.5px solid #e7e7e7;
} */
.leftlogo {
  position: absolute;
  width: calc(22.73% - 25px);
  left: 25px;
  top: 32.14%;
  height: 70%;
  border: 0.5px solid rgba(231,231,231,1);
  border-radius: 0px;
}
.tree-input {
  position: relative;
  top: 10px;
  width: 85%;
  height: 3.66%;
  left: 10%;
}
.SearchWidth {
  font-size: 18px;
  color: rgba(182, 182, 182, 1);
}
.collapseWidth {
  position: relative;
  left: 10%;
  top: 18px;
  width: 85%;
}
.rightlogo {
  position: absolute;
  width: calc(77.27% - 20px);
  left: 22.73%;
  top: 32.14%;
  height: 70%;
  border: 0.5px solid rgba(231,231,231,1);
}
.tablelogo {
  position: relative;
  left: 21px;
  top: 52px;
  width: 95.63%;
}
.ant-table-align-center {
  width: 804px;
  height: 13px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: aqua;
  line-height: 44px;
}
.tableUp {
  position: relative;
  color: #1890ff;
  width: 13px;
  height: 13px;
  right: 0.66%;
  cursor: pointer;
}
.tableDown {
  position: relative;
  color: #1890ff;
  width: 13px;
  height: 13px;
  cursor: pointer;
}
.tableDel {
  position: relative;
  color: #1890ff;
  left: 0.66%;
  width: 13px;
  height: 13px;
  cursor: pointer;
}
</style>

