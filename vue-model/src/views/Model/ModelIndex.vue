<template>
  <div >>
    <div class="top-add-btn"><a @click="addNewIndexes()">添加索引</a></div>
    <a-form>
      <a-form-item>
        <ul>
          <li class="li" v-for="(item, index) in data" :key="index">
            <div class="center">
              <div>
                <span>索引名称：</span
                ><span><a-input class="index-name"></a-input></span>
                <span class="index-rule">初始默认值写规则：index_表名_1</span>

                <a-icon
                  class="index-icon"
                  @click="deleteIndex(item)"
                  type="delete"
                />
              </div>
              <div class="field">
                <span class="field-title">字段：</span
                ><span><a-input class="field-input"></a-input></span>
              </div>
            </div>
          </li>
        </ul>
        <div class='footer'>
          <a-button @click="ceshi()">上一步</a-button>
          <a-button @click="ceshi()">下一步</a-button>
          <a-button @click="ceshi()">跳过</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const data = [
  {
    id: 1,
    title: "Ant Design Title 1"
  },
  {
    id: 2,
    title: "Ant Design Title 2"
  }
];
let id = 3
export default {
  name: "home",
  components: {},
  data() {
    return {
      data
    };
  },

  methods: {
    addNewIndexes() {
      
      let e = { title: "new title",
                id : id++ };
      this.data = this.data.concat(e);
      console.log("data", this.data, "e", e);
    },
    deleteIndex(e) {
      this.data.splice(this.data.indexOf(e.id), 1);
    },
    ceshi() {
      console.log(this.data);
    }
  }
};
</script>
<style lang="less" scoped>
.top-add-btn {
  text-align: right;
}
ul {
  padding: 0px;
}
.li {
  .center {
    padding: 20px 20px;
    .index-name {
      width: 125pt;
    }
    .index-rule {
      margin-left: 10px;
      color: #b5b8be;
    }
    .index-icon {
      float: right;
      color: #1890ff;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .field {
      margin-top: 8px;
      .field-title {
        padding-left: 28px;
      }
      .field-input {
        width: 350pt;
      }
    }
  }
  text-align: left;
  height: 123px;
  background: #dfe6ec;
  list-style-type: none;
  margin: 12px 0;
}
.footer{
  text-align: center
}

</style>
