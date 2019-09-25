<template>
  <a-modal
    :visible="visible"
    title="编辑维表"
    okText="保存"
    cancelText="取消"
    @cancel="
      () => {
        $emit('cancel');
        this.treeSelectFunction()
      }
    "
    @ok="
      () => {
        $emit('create');
        this.treeSelectFunction()
      }
    "
  >
    <a-form :form="form">
      <a-form-item
        label="所属上级"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <!-- <a-select v-decorator="['select']">
          <a-select-option v-for="d in selectvalue" :key="d.title">
            {{ d.title }}
          </a-select-option>
        </a-select> -->
        <a-tree-select
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="gData"
          :loadData="onLoadData"
          placeholder="请选择"
          v-decorator="[
            'select',
            { rules: [{ required: true, message: 'Please select' }] }
          ]"
        >
        </a-tree-select>
      </a-form-item>

      <a-form-item
        label="维表名称"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: 'Please input name!' }] }
          ]"
          placeholder="请输入你的维表名称~"
        >
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
/* eslint-disable */

const pushValue = tree => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    const key = tree[i].key
    tree[i] = Object.assign({}, tree[i], {
      value: key
    })
    if (node.children) {
      pushValue(node.children)
    }
  }
}

export default {
  name: 'updateDimension',
  data () {
    return {
      formLayout: 'horizontal',
      gData: [],
      treeNode: []
    }
  },
  props: ['visible'],
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  /* watch: {
    visible (val) {
      if (val) {
        this.onLoadData(this.treeNode)
      }
    }
  }, */
  methods: {
    treeSelectFunction () {
      this.$get('/dimension/sort/listSortFolder')
        .then(res => {
          if (res.success) {
            this.gData = res.data
            pushValue(this.gData)
          }
        })
        .catch(() => {
          alert('请求失败')
        })
    },
    onLoadData (treeNode) {
      this.treeNode = treeNode
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.$get('/dimension/sort/listSortFolder?classId=' + treeNode.dataRef.key)
          .then(res => {
            if (res.success) {
              treeNode.dataRef.children = res.data
              this.gData = [...this.gData]
              pushValue(this.gData)
              resolve()
            }
          })
          .catch(() => {
            alert('请求失败')
          })
      })
    }
  },
  mounted () {
    this.treeSelectFunction()
  }
}
</script>
