<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>新建项目</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">

        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">

          <el-form-item label="项目名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="招标编号" prop="name">
            <el-input v-model="form.bnumber"></el-input>
          </el-form-item>

          <el-form-item label="项目状态" prop="region">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option key="1" label="申报中" value="申报中"></el-option>
              <el-option key="2" label="建设中" value="建设中"></el-option>
              <el-option key="3" label="已完工" value="已完工"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="预计日期">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="开工日期" v-model="form.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-date-picker type="date" placeholder="结束日期" v-model="form.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="省/市/区" prop="addr">
            <elui-china-area-dht @change="onChange"></elui-china-area-dht>
          </el-form-item>

          <el-form-item label="预算">
              <el-col>
                <el-input-number v-model="form.budget" :precision="2" :step="0.1" :max="10" style="margin-right: 5px"/>
                <span>元</span>
              </el-col>
          </el-form-item>

          <el-form-item label="选择开关" prop="delivery">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="多选框" prop="type">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="申报中" name="type"></el-checkbox>
              <el-checkbox label="建设中" name="type"></el-checkbox>
              <el-checkbox label="已完工" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="单选框" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="步步高"></el-radio>
              <el-radio label="小天才"></el-radio>
              <el-radio label="imoo"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文本框" prop="desc">
            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button @click="onReset">重置表单</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
import {reactive, ref, onMounted} from "vue";
import {ElMessage} from "element-plus";
import {defineComponent} from 'vue'
// 参数取值
import {EluiChinaAreaDht} from 'elui-china-area-dht'

const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat

export default {
  name: "ProjectAdd",
  components: {
    EluiChinaAreaDht,
  },
  setup() {
    const options = [
      {
        value: "guangdong",
        label: "广东省",
        children: [
          {
            value: "guangzhou",
            label: "广州市",
            children: [
              {
                value: "tianhe",
                label: "天河区",
              },
              {
                value: "haizhu",
                label: "海珠区",
              },
            ],
          },
          {
            value: "dongguan",
            label: "东莞市",
            children: [
              {
                value: "changan",
                label: "长安镇",
              },
              {
                value: "humen",
                label: "虎门镇",
              },
            ],
          },
        ],
      },
      {
        value: "hunan",
        label: "湖南省",
        children: [
          {
            value: "changsha",
            label: "长沙市",
            children: [
              {
                value: "yuelu",
                label: "岳麓区",
              },
            ],
          },
        ],
      },
    ];
    const rules = {
      name: [
        {required: true, message: "请输入表单名称", trigger: "blur"},
      ],
    };
    const formRef = ref(null);
    const form = reactive({
      name: "",
      bnumber: "",
      region: "",
      date1: "",
      date2: "",
      budget:"",
      delivery: true,
      type: ["步步高"],
      resource: "小天才",
      desc: "",
      options: [],
    });
    // 提交
    const onSubmit = () => {
      // 表单校验
      formRef.value.validate((valid) => {
        if (valid) {
          console.log(form);
          ElMessage.success("提交成功！");
        } else {
          return false;
        }
      });
    };
    // 重置
    const onReset = () => {
      formRef.value.resetFields();
    };

    //省市区
    function onChange(e) {
      const one = chinaData[e[0]]
      const two = chinaData[e[1]]
      console.log(one, two)
    }


    return {
      options,
      rules,
      formRef,
      form,
      onSubmit,
      onReset,
      onChange,
    };
  },
}
</script>

<style scoped>


</style>