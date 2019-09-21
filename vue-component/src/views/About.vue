<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in lists"
        @click="choose(index)"
        :class="{active:index == current && current!== ' ' && current!== ''}"
        :key="index"
      >{{item}}</li>
    </ul>
    <button type="button" @click="add(index)">tianjia</button>
    <div>
      <ul>
        <li v-for="(item, index) in target" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "demo1",
  data() {
    return {
      current: "",
      lists: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      target: []
    };
  },
  methods: {
    choose(index) {
      this.current = index;
      console.log(index + 1);
    },
    add() {
      if(this.current === ' '){return}
      this.target.push(this.lists[this.current]);
      this.current = ' ';
    }
  }
};
</script>
<style>
li.active {
  background: green;
}
</style>
