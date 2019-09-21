<template>
  <div>
    <button type="button" @click="add()">添加</button>
    <div></div>
  </div>
</template>
<script>

export default {
  name: "User",
  data() {
    return {
    };
  },
  methods: {
    add() {
      this.$router.push("../add");
    }
  }
};
</script>
