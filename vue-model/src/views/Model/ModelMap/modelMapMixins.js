import myTitle from '../../../../../components/Title'
import modular from '../../../../../components/Modular'
export default {
  components: { myTitle, modular },
  data () {
    return {
      modelObject: {}
    };
  },
  watch: {
    modelObject: {
      handler (newVal, oldVal) {
        alert(newVal.value1)
        alert(newVal.value2)
        this.$bus.$emit('modelUpDate', {type: this.type, object: newVal})
      },
      deep: true
    }
  }
}
