<template>
  <div class="logo">
    <a-row :gutter="24">
      <a-col :span="12">
        <span class="businessClassification">业务分类：</span>
        <span class="businessClassification1">A域>接口层>计费</span>
      </a-col>
    </a-row>
    <a-form layout="inline" :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item class="modelNamePosition">
            <span slot="label" class="labelStyle">模型名称</span>
            <a-input
              v-decorator="[
                'modelName',
                { rules: [{ required: true, message: 'Please input name!' }] }
              ]"
              class="modelNameWidth"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item class="modelEnglishNamePosition">
            <span slot="label" class="labelStyle">模型英文名称</span>
            <a-input
              v-decorator="[
                'modelEnglishName',
                { rules: [{ required: true, message: 'Please input name!' }] }
              ]"
              class="modelEnglishNameWidth"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item class="selectLevelPosition">
            <span slot="label" class="labelStyle">模型级别</span>
            <a-select
              v-decorator="[
                'selectLevel',
                { rules: [{ required: true, message: 'Please input name!' }] }
              ]"
              placeholder="请选择"
              class="selectLevelWidth"
            >
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item class="selectTypePositon">
            <span slot="label" class="labelStyle">模型类型</span>
            <a-select
              v-decorator="[
                'selectType',
                { rules: [{ required: true, message: 'Please input name!' }] }
              ]"
              placeholder="请选择"
              class="selectTypeWidth"
            >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-form-item class="datePosition">
          <a-form-item>
            <span slot="label" class="labelStyle">数据保留周期</span>
            <a-input
              v-decorator="[
                'date',
                { rules: [{ required: true, message: 'Please input name!' }] }
              ]"
              class="dateWidth"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="dataDatePosition">
            <a-select
              v-decorator="[
                'dataDate',
                { rules: [{ required: true, message: 'Please input name!' }] }
              ]"
              class="dataDateWidth"
            >
            </a-select>
          </a-form-item>
        </a-form-item>
      </a-row>
      <a-form-item class="modelUseposition">
        <span slot="label" class="labelStyle">模型用途</span>
        <a-textarea
          v-decorator="[
            'modelUse',
            { rules: [{ required: true, message: 'Please input name!' }] }
          ]"
          class="modelUseWidth"
        >
        </a-textarea>
      </a-form-item>
    </a-form>
    <a-button type="primary" class="button" @click="Search">
      <span class="buttonTitle">下一步</span>
    </a-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      index: ''
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    checked (index) {
      if (this.index === index) {
        this.index = '';
      } else {
        this.index = index;
      }
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    Search () {

    },
    getModelLevel () {
      this.$get('/model/listModelLevel')
        .then(res => {
          if (res.success) {
            let { data } =res
            if (data !== undefined && data !== null) {
              console.log(data)
            }
          }
        })
        .catch(() => {
          this.$message.error('请求失败');
        });
    },
    getModelType () {
      this.$get('/model/listModelType')
        .then(res => {
          if (res.success) {
            let { data } =res
            if (data !== undefined && data !== null) {
              console.log(data)
            }
          }
        })
        .catch(() => {
          this.$message.error('请求失败');
        });
    },
    getModelCycleType () {
      this.$get('/model/listModelCycleType')
        .then(res => {
          if (res.success) {
            let { data } =res
            if (data !== undefined && data !== null) {
              console.log(data)
            }
          }
        })
        .catch(() => {
          this.$message.error('请求失败');
        });
    }
  },
  mounted () {
    this.getModelLevel();

  }
};
</script>

<style scoped>
.logo {
  position: absolute;
  top: 40%;
  left: 8.71%;
  width: 77.2%;
}
.businessClassification {
  position: relative;
  left: 71px;
  bottom: 16px;
  font-size:14px;
  font-family:Microsoft YaHei;
  color:rgba(128,133,144,1);
}
.businessClassification1 {
  position: relative;
  left: 71px;
  bottom: 16px;
  font-size:14px;
  font-family:Microsoft YaHei;
  color:rgba(82,90,108,1);
}
.modelNamePosition {
  position: relative;
  left: 60px;
}
.modelNameWidth {
  width: 250px;
  height: 32px;
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 4px;
  margin-bottom: 16px;
}

.modelEnglishNameWidth {
  width: 250px;
  height: 32px;
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 4px;
}
.modelEnglishNamePosition {
  position: relative;
  right: 3px;
}
.selectLevelPosition {
  position: relative;
  left: 60px;
}
.selectLevelWidth {
  width: 250px;
  height: 32px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.selectTypePositon {
  position: relative;
  left: 25px;
}
.selectTypeWidth {
  width: 250px;
  height: 32px;
  border-radius: 4px;
}
.datePosition {
  position: relative;
  left: 32px;
}
.dateWidth {
  width: 80px;
  height: 32px;
  border-radius: 4px;
  margin-bottom: 18px;
}
.dataDatePosition {
  position: relative;
  right: 5px;
}
.dataDateWidth {
  width: 80px;
  height: 32px;
  border-radius: 4px;
}
.modelUseposition {
  position: relative;
  left: 60px;
}
.modelUseWidth {
  width: 820px;
  height: 150px;
  border-radius: 4px;
}
.button {
  position: relative;
  width: 70px;
  height: 32px;
  background: rgba(24, 144, 255, 1);
  border-radius: 4px;
  left: 40%;
  top: 30px;
}
.buttonTitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.checked {
  background: blue;
}
.labelStyle {
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(128,133,144,1);
}
</style>