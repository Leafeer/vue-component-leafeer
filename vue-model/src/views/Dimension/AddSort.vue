<template>
  <a-modal
    :visible="visible"
    title="添加分类"
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
        label="所属上级"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-select
          v-decorator="[
            'select',
            { rules: [{ required: true, message: 'Please select!' }] }
          ]"
        >
          <a-select-option :value="selectvalue">
            {{ selectvalue }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="维表名称"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'sortDimensionName',
            { rules: [{ required: true, message: 'Please input sortname!' }] }
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
  name: 'addSort',
  data () {
    return {
      formLayout: 'horizontal'
    }
  },
  props: ['visible', 'selectvalue'],
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
