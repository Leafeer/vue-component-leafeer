<template>
   <div class="hello">
     {{msg}}
    <Props v-model="parentMsg" :todos="a" :name="x"
    @show-balance="show_balance($event)">
    
    </Props>
   <div v-if="show">
     ningdeyue
   </div>
   <input v-model="parentMsg">
  </div>
 
</template>

<script>
import Props from './props.vue'

export default {
  name: "HelloWorld",
  
  methods: {
    show_balance:function(data){
      this.show = true;
      console.log('data:',data)
    }
  },
  props: {
    msg: String
  },
  components:{
    Props
  },
  watch: {
    parentMsg(newV,oldV){
      console.log(newV,oldV);
    }
  },
   data() {
    return {
      parentMsg:'test',
      show:false,
      x: "yely",
      a: [
        {
          id: "0001",
          name: "username",
          type: "text",
          title: "账号",
          placeholder: "abc"
        },
        {
          id: "0002",
          name: "password",
          type: "text",
          title: "密码",
          placeholder: "123"
        }
      ]
    };
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
