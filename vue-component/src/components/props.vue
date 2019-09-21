<template>
  <div class="hello">
    {{name}}
    <div class="div-input" v-for="(todo, index) in todos" :key="index">
      <p class="title">
        {{todo.title}}
        <input
          class="input"
          :type="todo.type"
          :name="todo.name"
          :placeholder="todo.placeholder"
        />
      </p>
    </div>
    <div>
      <button @click="on_click()">xianshi</button>
    </div>
    <div>
     <h3>{{msg1}}</h3>
   </div>
  </div>
</template>

<script>
export default {
  model:{
    prop:'msg1',
    event:'parent-event'
  },
  name: "props",
  props: {
    msg1:String,
    name: String,
    todos: {
      type: Array,
      required: true
    }
  },
  methods: {
    on_click() {
      this.$emit("show-balance",{a:1,b:2});
      
    }
  },
  mounted(){
    setTimeout(_=>{
      let some='3sajdifo';
      this.$emit('parent-event',some);
    },3000);
  }
};
</script>

<style>
</style>
