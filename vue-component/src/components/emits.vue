<template>
  
</template>

<script>
export default {
   name: "emits",
   props: {
    name: String,
    todos:{
      type:Array,
      required:true,
    }
  },
   methods: {
    onClick() {
      this.$emit('show-balance',{a:todos})
    }
    
  },
}
</script>

<style>

</style>
