<template>
  <div >
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="DB2" key="1"
        ><div><DB2></DB2></div
      ></a-tab-pane>
      <a-tab-pane tab="MySQL" key="2" forceRender><MySQL></MySQL></a-tab-pane>
      <a-tab-pane tab="Oracle" key="3"><Oracle></Oracle></a-tab-pane>
      <a-tab-pane tab="Hive" key="4"><Hive></Hive></a-tab-pane>
      <a-tab-pane tab="Hbase" key="5"><Hbase></Hbase></a-tab-pane>
      <a-tab-pane tab="KafaTopic" key="6">
        <KafaTopic></KafaTopic>
      </a-tab-pane>
      <a-tab-pane tab="文件模型" key="7"><FileModel></FileModel></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import DB2 from "./ModelMap/DB2";
import MySQL from "./ModelMap/MySQL";
import Oracle from "./ModelMap/Oracle";
import Hive from "./ModelMap/Hive";
import Hbase from "./ModelMap/Hbase";
import KafaTopic from "./ModelMap/KafaTopic";
import FileModel from "./ModelMap/FileModel";
export default {
  name: "modelmap",
  components: {
    DB2,
    MySQL,
    Oracle,
    Hive,
    Hbase,
    KafaTopic,
    FileModel
  },
  data() {
    return {
      modelObject: {
        DB2: {},
        MySQL: {},
        Oracle: {},
        Hive: {},
        Hbase: {},
        KafaTopic: {},
        FileModel: {}
      },
      modelType: [
        "DB2",
        "MySQL",
        "Oracle",
        "Hive",
        "Hbase",
        "KafaTopic",
        "FileModel"
      ]
    };
  },
  created() {
    this.$bus.on("modelUpDate", value => {
      this.modelObject[value.type] = value.object;
      console.log(this.modelObject);
    });
  },
  methods: {
    callback(key) {
      /* console.log(key) */
    }
  }
};
</script>
<style lang="less" scoped>

</style>
