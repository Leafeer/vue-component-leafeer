<template>
  <a-modal
    :visible="visible"
    title="添加维表"
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
        <a-select v-decorator="['select']">
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
            'dimensionName',
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
export default {
  /* eslint-disable */
  name: 'addDimension',
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
