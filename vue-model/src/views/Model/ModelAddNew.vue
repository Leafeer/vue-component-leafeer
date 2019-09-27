<template>
  <div class="all">
    <div class="top-steps">
      <a-steps :current="current">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <span slot="title">
            <router-link class="text" :to="{ name: 'modelBasic' }"
              ><span @click="current = 0">基本信息</span>
            </router-link>
          </span>
        </a-step>

        <a-step>
          <span slot="title">
            <router-link class="text" :to="{ name: 'modelField' }">
              <span @click="current = 1">字段信息</span>
            </router-link>
          </span>
        </a-step>
        <a-step>
          <span slot="title">
            <router-link class="text" :to="{ name: 'modelIndex' }">
              <span @click="current = 2">索引设置</span>
            </router-link>
          </span>
        </a-step>
        <a-step>
          <span slot="title">
            <router-link class="text" :to="{ name: 'modelMap' }">
              <span @click="current = 3">模型映射</span>
            </router-link>
          </span>
        </a-step>
      </a-steps>
    </div>

    <div class="add-show">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ModelBasic from "./ModelBasic";
import ModelField from "./ModelField";
import ModelIndex from "./ModelIndex";
import ModelMap from "./ModelMap";
export default {
  name: "modeladdnew",
  components: {
    ModelBasic,
    ModelField,
    ModelIndex,
    ModelMap
  },
  data() {
    return {
      current: 0
    };
  }
};
</script>
<style lang="less" scoped>
.all {
  margin: 20px;
  background: #fff;
  .top-steps {
    padding: 52px;
    .text {
      font-size: 18px;
      color: #666666;
      text-decoration: none;
    }
  }
  .add-show {
    padding: 51pt;
  }
}
</style>
