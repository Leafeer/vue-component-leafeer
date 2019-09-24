<template>
  <div class="leftlogo">
    <div class="title">
      <div class="rectangle"></div>
      <span class="namelogo">{{ tablename }}</span>
      <a-icon class="Dimension_add" type="plus-circle" @click="addFirstTree" />
    </div>
    <div class="treelogo">
      <a-input class="tree-input" placeholder="搜索" @blur="onChange">
        <a-icon slot="suffix" type="search" class="SearchWidth" />
      </a-input>
      <a-tree
        draggable
        @dragenter="onDragEnter"
        @drop="onDrop"
        :treeData="gData"
        @select="onSelect"
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        :loadData="onLoadData"
        @mouseenter="mouseovered($event)"
        @mouseleave="mouseleaved($event)"
        class="tree-position"
        showIcon
      >
        <tree-icon slot="smile" />
        <template slot="title" slot-scope="record">
          <span
            v-if="
              (record.ismouseover && record.isLeaf) ||
                (record.key === selectedKeys[0] && record.isLeaf)
            "
          >
            <a-tooltip>
              <template slot="title">
                <span class="ToolTitle">{{ record.title }}</span>
              </template>
              <span class="TitleWidth">{{ record.title }}</span>
            </a-tooltip>
            <a-icon
              v-if="isLeafOperation"
              class="icon1-edit"
              type="edit"
              @click="edit(record)"
            />
            <a-icon
              v-if="isLeafOperation"
              class="icon1-delete"
              type="delete"
              @click="del(record)"
            />
          </span>
          <span
            v-else-if="
              (record.ismouseover && !record.isLeaf) ||
                (record.key === selectedKeys[0] && !record.isLeaf)
            "
          >
            <a-tooltip>
              <template slot="title">
                <span class="ToolTitle">{{ record.title }}</span>
              </template>
              <span class="TitleWidth">{{ record.title }}</span>
            </a-tooltip>
            <a-icon
              v-if="isAddLeafSort"
              class="icon1-add"
              type="plus-circle"
              @click="addLeafSort(record)"
              slot="suffix"
            />
            <a-dropdown
              :trigger="['click']"
              :placement="placement"
              class="DropdownPosition"
            >
              •••
              <a-menu slot="overlay">
                <a-menu-item @click="addSort(record)">
                  <span class="TitleSize">新增分类</span>
                </a-menu-item>
                <a-menu-item @click="edit(record)">
                  <span class="TitleSize">编辑分类</span>
                </a-menu-item>
                <a-menu-item @click="del(record)">
                  <span class="TitleSize">删除分类</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TreeIcon from './Dimension/TreeIcon.vue';

const pushSlots = tree => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    tree[i] = Object.assign({}, tree[i], {
      scopedSlots: { title: 'title' },
      ismouseover: false
    });
    if (node.children) {
      pushSlots(node.children);
    }
  }
};

const pushIcon = tree => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.isLeaf) {
      tree[i] = Object.assign({}, tree[i], {
        slots: {
          icon: 'smile'
        }
      });
    }
    if (node.children) {
      pushIcon(node.children);
    }
  }
};

const pushValue = tree => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    const key = tree[i].key;
    tree[i] = Object.assign({}, tree[i], {
      value: key
    });
    if (node.children) {
      pushValue(node.children);
    }
  }
};

const isMouseoverTrue = (key, tree) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (tree[i].key === key) {
      tree[i].ismouseover = true;
    } else if (node.children) {
      for (let j = 0; j < node.children.length; j++) {
        if (node.children[j].key === key) {
          node.children[j].ismouseover = true;
        } else if (isMouseoverTrue(key, node.children)) {
          isMouseoverTrue(key, node.children);
        }
      }
    }
  }
};

const isMouseoverFalse = (key, tree) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (tree[i].key === key) {
      tree[i].ismouseover = false;
    } else if (node.children) {
      for (let j = 0; j < node.children.length; j++) {
        if (node.children[j].key === key) {
          node.children[j].ismouseover = false;
        } else if (isMouseoverFalse(key, node.children)) {
          isMouseoverFalse(key, node.children);
        }
      }
    }
  }
};

const loop = (data, key, callback) => {
  data.forEach((item, index, arr) => {
    if (item.key === key) {
      return callback(item, index, arr);
    }
    if (item.children) {
      return loop(item.children, key, callback);
    }
  });
};

const getUnSort = tree => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (tree[i].title === '未分类') {
      return tree[i].key;
    } else if (node.children) {
      for (let j = 0; j < node.children.length; j++) {
        if (node.children[j].title === '未分类') {
          return node.children[j].key;
        } else if (getUnSort(node.children)) {
          getUnSort(node.children);
        }
      }
    }
  }
};

export default {
  name: 'tree',
  components: {
    TreeIcon
  },
  data () {
    return {
      expandedKeys: [],
      autoExpandParent: false,
      gData: [],
      selectedKeys: [],
      placement: 'bottomLeft',
      info: '',
      nodeData: [],
      node1: [],
      editsortnewname: '',
      editsortkey: '',
      editsortpkey: '',
      newgData: []
    };
  },
  props: [
    'tablename',
    'firstTreeData',
    'dropToGapData',
    'dropToUpAndDownData',
    'addFirstTreeData',
    'addLeafSortData',
    'addSortData',
    'editSortNewName',
    'editSortKey',
    'editSortPKey',
    'DeleteSort',
    'searchSortData',
    'isAddLeafSort',
    'isLeafOperation',
    'onLoadDataAPI'
  ],
  watch: {
    firstTreeData () {
      this.getListFunction();
    },
    dropToGapData () {
      this.dropToGapDataFunction();
    },
    dropToUpAndDownData () {
      this.dropToUpAndDownFunction();
    },
    addFirstTreeData () {
      this.addFirstTreeOperation();
    },
    addLeafSortData () {
      this.addLeafSortOperation();
    },
    addSortData () {
      this.addSortOperation();
    },
    editSortPKey () {
      this.editOperation();
    },
    DeleteSort () {
      this.delOperation();
    },
    searchSortData () {
      this.searchSortFunction();
    }
  },
  methods: {
    onDragEnter () {
      // expandedKeys 需要受控时设置
    },
    onDrop (info) {
      this.info = info;
      const dropIsLeaf = info.node.dataRef.isLeaf;
      const dropPos = info.node.pos.split('-');
      const dragPos = info.dragNode.pos.split('-');
      const dropPkey = info.node.dataRef.pKey;
      const dragPkey = info.dragNode.dataRef.pKey;
      const dropKey = this.info.node.eventKey;
      const dragKey = this.info.dragNode.eventKey;
      console.log(dropPkey);
      console.log(dragPkey);
      if (!info.dropToGap) {
        console.log(info.node.dataRef);
        console.log(info.dragNode.dataRef);
        if (dragPkey === dropKey) {
          this.$message.warning('父节点不变，不请求接口', 1);
        } else {
          if (dropIsLeaf || dragPos.length === 2) {
            this.$message.warning('不能进行此操作', 1);
            return false;
          } else {
            this.$emit('dropToGap', info.dragNode.dataRef, info.node.dataRef);
          }
        }
      } else {
        if (dragPkey === dropPkey) {
          this.$message.warning('父节点不变，不请求接口', 1);
        } else {
          if (dropPos.length === 2 || dragPos.length === 2) {
            this.$message.warning('不能进行此操作', 1);
            return false;
          } else {
            this.$emit(
              'dropToUpAndDown',
              info.dragNode.dataRef,
              info.node.dataRef
            );
          }
        }
      }
    },
    dropToGapDataFunction () {
      const dropKey = this.info.node.eventKey;
      const dragKey = this.info.dragNode.eventKey;
      const data = [...this.gData];
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
        dragObj.pKey = dropKey;
        console.log(dragObj);
      });
      loop(data, dropKey, item => {
        item.children = item.children || [];
        console.log(item.children);
        var arraySort = [];
        for (let i = 0; i < item.children.length; i++) {
          arraySort.push(item.children[i].title);
        }
        arraySort.push(dragObj.title);
        arraySort.sort(function compareFunction (param1, param2) {
          return param1.localeCompare(param2, 'zh');
        });
        console.log(arraySort);
        for (let index = 0; index < arraySort.length; index++) {
          if (arraySort[index] === dragObj.title) {
            item.children.splice(index, 0, dragObj);
          }
        }
      });
      this.gData = data;
      pushSlots(this.gData);
      pushIcon(this.gData);
      pushValue(this.gData);
    },
    dropToUpAndDownFunction () {
      const dropKey = this.info.node.eventKey;
      const dropPkey = this.info.node.dataRef.pKey;
      const dragKey = this.info.dragNode.eventKey;
      const data = [...this.gData];
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
        dragObj.pKey = dropPkey;
      });
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      var arraySort = [];
      for (let i = 0; i < ar.length; i++) {
        arraySort.push(ar[i].title);
      }
      arraySort.push(dragObj.title);
      arraySort.sort(function compareFunction (param1, param2) {
        return param1.localeCompare(param2, 'zh');
      });
      console.log(arraySort);
      console.log(i);
      for (let index = 0; index < arraySort.length; index++) {
        if (arraySort[index] === dragObj.title) {
          ar.splice(index, 0, dragObj);
        }
      }
      this.gData = data;
      pushSlots(this.gData);
      pushIcon(this.gData);
      pushValue(this.gData);
    },
    onSelect (selectedKeys, node) {
      if (selectedKeys.length !== 0) {
        this.selectedKeys = selectedKeys;
        this.$emit('selectFunction', node.node.dataRef);
      }
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    onChange (e) {
      if (e.target.value === '') {
        this.gData = this.newgData;
        pushSlots(this.gData);
        pushIcon(this.gData);
        pushValue(this.gData);
      } else {
        this.$emit('searchSort', e.target.value);
      }
    },
    searchSortFunction () {
      this.gData = this.searchSortData;
      pushSlots(this.gData);
      pushIcon(this.gData);
      pushValue(this.gData);
    },
    addFirstTree () {
      this.$emit('addFirstTreeFunction');
    },
    addFirstTreeOperation () {
      this.nodeData = this.addFirstTreeData;
      console.log(this.nodeData.title);
      var arraySort = [];
      for (let i = 0; i < this.gData.length - 1; i++) {
        arraySort.push(this.gData[i].title);
      }
      arraySort.push(this.nodeData.title);
      arraySort.sort(function compareFunction (param1, param2) {
        return param1.localeCompare(param2, 'zh');
      });
      console.log(arraySort);
      for (let index = 0; index < arraySort.length; index++) {
        if (arraySort[index] === this.nodeData.title) {
          this.gData.splice(index, 0, this.nodeData);
        }
      }
      pushSlots(this.gData);
      pushIcon(this.gData);
      pushValue(this.gData);
      console.log(this.gData);
    },
    addLeafSort (treedata) {
      this.node1 = treedata;
      this.$emit('addLeafSortFunction', treedata);
    },
    addLeafSortOperation () {
      this.nodeData = this.addLeafSortData;
      const data = [...this.gData];
      console.log(this.node1);
      console.log(this.nodeData);
      if (this.node1.isLoadNode) {
      loop(data, this.node1.key, item => {
        item.children = item.children || [];
        console.log(item.children);
        var arraySort = [];
        for (let i = 0; i < item.children.length; i++) {
          arraySort.push(item.children[i].title);
        }
        arraySort.push(this.nodeData.title);
        arraySort.sort(function compareFunction (param1, param2) {
          return param1.localeCompare(param2, 'zh');
        });
        console.log(arraySort);
        for (let index = 0; index < arraySort.length; index++) {
          if (arraySort[index] === this.nodeData.title) {
            item.children.splice(index, 0, this.nodeData);
          }
        }
      });
      }
      this.gData = data;
    },
    addSort (treedata) {
      this.node1 = treedata;
      this.$emit('addSortFunction', treedata);
    },
    addSortOperation () {
      this.nodeData = this.addSortData;
      const data = [...this.gData];
      console.log(this.node1)
      if (this.node1.isLoadNode) {
      loop(data, this.node1.key, item => {
        item.children = item.children || [];
        console.log(item.children);
        var arraySort = [];
        for (let i = 0; i < item.children.length; i++) {
          arraySort.push(item.children[i].title);
        }
        arraySort.push(this.nodeData.title);
        arraySort.sort(function compareFunction (param1, param2) {
          return param1.localeCompare(param2, 'zh');
        });
        console.log(arraySort);
        for (let index = 0; index < arraySort.length; index++) {
          if (arraySort[index] === this.nodeData.title) {
            item.children.splice(index, 0, this.nodeData);
          }
        }
      });
      }
      this.gData = data;
    },
    edit (treedata) {
      this.$emit('editSortFunction', treedata);
    },
    editOperation () {
      this.editsortnewname = this.editSortNewName;
      this.editsortkey = this.editSortKey;
      this.editsortpkey = this.editSortPKey;
      const data = [...this.gData];
      let dragObj;
      loop(data, this.editsortkey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
        console.log(dragObj);
        dragObj.title = this.editsortnewname;
        dragObj.pKey = this.editsortpkey;
      });
      if (this.node1.isLoadNode) {
        loop(data, this.editsortpkey, item => {
          item.children = item.children || [];
          console.log(item.children);
          var arraySort = [];
          for (let i = 0; i < item.children.length; i++) {
            arraySort.push(item.children[i].title);
          }
          arraySort.push(dragObj.title);
          arraySort.sort(function compareFunction (param1, param2) {
            return param1.localeCompare(param2, 'zh');
          });
          console.log(arraySort);
          for (let index = 0; index < arraySort.length; index++) {
            if (arraySort[index] === dragObj.title) {
              item.children.splice(index, 0, dragObj);
            }
          }
        });
      }
      this.gData = data;
    },
    del (treedata) {
      const current = this;
      this.node = treedata;
      this.$confirm({
        title: '确定要删除这一项嘛?',
        onOk () {
          current.$emit('deleteSortFunction', treedata);
        },
        onCancel () {},
        okText: '确定',
        cancelText: '取消'
      });
    },
    delOperation () {
      const data = [...this.gData];
      loop(data, this.node.key, (item, index, arr) => {
        arr.splice(index, 1);
        this.gData = data;
      });
      this.$get(this.onLoadDataAPI + '?classId=' + getUnSort(this.gData))
        .then(res => {
          if (res.success) {
            for (let index = 0; index < this.gData.length; index++) {
              if (this.gData[index].title === '未分类') {
                this.gData[index].children = res.data;
                this.gData = [...this.gData];
                pushSlots(this.gData);
                pushIcon(this.gData);
                pushValue(this.gData);
              }
            }
          }
        })
        .catch(() => {
          alert('请求失败');
        });
    },
    mouseovered (event) {
      const data = [...this.gData];
      isMouseoverTrue(event.node.dataRef.key, data);
      this.gData = data;
    },
    mouseleaved (event) {
      const data = [...this.gData];
      isMouseoverFalse(event.node.dataRef.key, data);
      this.gData = data;
    },
    onLoadData (treeNode) {
      console.log(this.onLoadDataAPI);
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        this.$get(this.onLoadDataAPI + '?classId=' + treeNode.dataRef.key)
          .then(res => {
            if (res.success) {
              treeNode.dataRef.children = res.data;
              console.log(treeNode.dataRef)
              treeNode.dataRef.isLoadNode = true;
              this.gData = [...this.gData];
              pushSlots(this.gData);
              pushIcon(this.gData);
              pushValue(this.gData);
              this.newgData = this.gData.map(item => ({ ...item }));
              resolve();
            }
          })
          .catch(() => {
            alert('请求失败');
          });
      });
    },
    getList () {
      this.$emit('firstTree');
    },
    getListFunction () {
      this.gData = this.firstTreeData;
      pushSlots(this.gData);
      pushIcon(this.gData);
      pushValue(this.gData);
      this.newgData = this.gData.map(item => ({ ...item }));
    }
  },
  mounted () {
    this.getList();
  }
};
</script>

<style>
.leftlogo {
  position: absolute;
  width: 20.4%;
  left: 1.62%;
  top: 19px;
  border-radius: 4px;
  height: 85%;
}
.title {
  position: relative;
  height: 50px;
  margin-bottom: 1px;
  background: #ffffff;
  border-radius: 4px;
}
.rectangle {
  position: relative;
  top: 15px;
  width: 3px;
  height: 20px;
  background: rgba(24, 144, 255, 1);
}
.namelogo {
  position: absolute;
  left: 23px;
  bottom: 27px;
  width: 60px;
  height: 12px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(49, 70, 89, 1);
  line-height: 30px;
}
.Dimension_add {
  position: absolute;
  font-size: 18px;
  left: 83%;
  bottom: 16px;
  cursor: pointer;
  color: rgba(146, 146, 146, 1);
}
.treelogo {
  position: relative;
  background: #ffffff;
  min-height: 100%;
  border-radius: 4px;
}
.tree-input {
  position: relative;
  left: 6px;
  top: 10px;
  width: 92%;
  height: 4.58%;
  margin-bottom: 20px;
}
.SearchWidth {
  font-size: 18px;
  color: rgba(182, 182, 182, 1);
}
.tree-position {
  position: relative;
  left: 10px;
}
.icon1-add {
  position: absolute;
  line-height: 1.7;
  width: 11px;
  height: 11px;
  left: 70%;
  cursor: pointer;
  color: rgba(146, 146, 146, 1);
}
.icon1-delete {
  position: absolute;
  width: 11px;
  height: 11px;
  line-height: 1.7;
  left: 80%;
  cursor: pointer;
  color: rgba(146, 146, 146, 1);
}
.icon1-edit {
  position: absolute;
  width: 11px;
  height: 11px;
  line-height: 1.7;
  left: 70%;
  cursor: pointer;
  color: rgba(146, 146, 146, 1);
}
.TitleSize {
  width: 48px;
  height: 41px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  line-height: 30px;
}
.DropdownPosition {
  position: absolute;
  width: 13px;
  height: 3px;
  left: 79%;
  color: #1890ff;
}
.ant-tree-node-content-wrapper {
  width: 100%;
  height: 24px;
}
.TitleWidth {
  display: inline-block;
  max-width: 120px;
  color: #525a6c;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ToolTitle {
  font-size: 13px;
  color: black;
}
.ant-tree-treenode-switcher-open {
  width: 80%;
}
.ant-tree-treenode-switcher-close {
  width: 80%;
}
.ant-tree-child-tree .ant-tree-treenode-switcher-close {
  width: 100%;
}
.ant-tree-child-tree .ant-tree-treenode-switcher-open {
  width: 100%;
}
.ant-tree li span.ant-tree-iconEle {
  width: auto;
}
.ant-tree
  li
  span.ant-tree-switcher.ant-tree-switcher_close
  .ant-tree-switcher-icon
  svg {
  color: #1890ff;
}
.ant-tree
  li
  span.ant-tree-switcher.ant-tree-switcher_open
  .ant-tree-switcher-icon
  svg {
  color: #1890ff;
}
.ant-tree li .ant-tree-node-content-wrapper {
  padding: 0px 0px;
}
.ant-tooltip-inner {
  background: #f1f2f7;
}
.ant-tooltip-placement-top .ant-tooltip-arrow,
.ant-tooltip-placement-topLeft .ant-tooltip-arrow,
.ant-tooltip-placement-topRight .ant-tooltip-arrow {
  border-top-color: #f1f2f7;
}
</style>
