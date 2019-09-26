<template>
  <modular>
    <myTitle title="模型"></myTitle>
    <h1>字段分割:<a-input v-model="modelObject.value1"></a-input></h1>
    <h1>主题名称</h1>
    <h1>字段分割:<a-input v-model="modelObject.value2"></a-input></h1>
    <h1>主题名称</h1>
  </modular>
</template>
<script>
import modelMapMixin from './modelMapMixins'
export default {
  name: "kafaTopic",
  props: {},
  mixins: [ modelMapMixin ],
  data () {
    return {
      type: 'KafaTopic'
    }
  }
}

</script>
