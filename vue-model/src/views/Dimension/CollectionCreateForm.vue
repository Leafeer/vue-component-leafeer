<template>
  <a-modal
    :visible="visible"
    title="添加一级维表"
    okText="保存"
    cancelText="取消"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
    @ok="
      () => {
        $emit('create');
      }
    "
  >
    <a-form :form="form">
      <a-form-item
        label="分类名称"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'firstDimension',
            { rules: [{ required: true, message: 'Please addSort!' }] }
          ]"
          placeholder="请输入你的分类名称~"
        >
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
/* eslint-disable */
export default {
  name: 'collectionCreateForm',
  data () {
    return {
      formLayout: 'horizontal'
    }
  },
  props: ['visible'],
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style scope>
.ant-modal-header {
  background: #fafafa;
}
</style>
