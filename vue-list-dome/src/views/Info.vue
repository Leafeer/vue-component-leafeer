<template>
  <div>
    <input v-model="ipt" />
    {{ipt}}
    <button @click="pushData()">dianwo</button>
    <div>{{info.headers}}</div>
  </div>
</template>
<script>
var data = {
              uname:'this.uname',
              upwd:'this.upwd',
              pid:'this.pid'
            }
export default {
  name: "info",
  data() {
    return {
      info: "",
      ipt: ""   
    };
  },
  mounted() {
    this.getData();
    this.pushData();
  },
  methods: {
    getData() {
      this.axios
        .get("/static/current.json")
        .then(response => (this.info = response.data));
    },
    pushData() {
      this.axios({
        method: "post",
        url: "/static/current.json",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(
        'name:123'
        )
      });
    }
  }
};
</script>
