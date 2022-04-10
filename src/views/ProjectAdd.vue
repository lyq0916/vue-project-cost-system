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

          <el-form-item label="预计日期" prop="date">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                      type="date"
                      placeholder="开工日期"
                      v-model="form.date1"
                      value-format="YYYY-MM-DD"
                      format="YYYY-MM-DD"
                      style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-date-picker
                      type="date"
                      placeholder="结束日期"
                      v-model="form.date2"
                      value-format="YYYY-MM-DD"
                      format="YYYY-MM-DD"
                      style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="省/市/区" prop="addr">
            <elui-china-area-dht @change="onChange" v-model="form.addr"></elui-china-area-dht>
          </el-form-item>

          <el-form-item label="项目类型" prop="type">
            <el-select  v-model="form.type" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="预算">
            <el-col>
              <el-input-number v-model="num" :precision="2" :step="0.1" style="margin-right: 5px"/>
              <span>万元</span>
            </el-col>
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

<script lang="ts">
import {ref, reactive,getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";
// 参数取值
import {EluiChinaAreaDht} from 'elui-china-area-dht'
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat

export default {
  name: "ProjectAdd",
  components: {
    EluiChinaAreaDht,
  },
  setup() {
    const num = ref(1);
    const options = [
      {
        value: '交通运输',
        label: '交通运输',
      },
      {
        value: '住宅建筑',
        label: '住宅建筑',
      },
      {
        value: '商业办公',
        label: '商业办公',
      },
      {
        value: '医疗卫生',
        label: '医疗卫生',
      },
      {
        value: '环保节能',
        label: '环保节能',
      },
      {
        value: '文化体育',
        label: '文化体育',
      },
      {
        value: '服务领域',
        label: '服务领域',
      },
      {
        value: '农业水利',
        label: '农业水利',
      },
      {
        value: '其他领域',
        label: '其他领域',
      },
    ];
    const rules = {
      name: [
        {required: true, message: "请输入表单名称", trigger: "blur"},
      ],
      addr:[
        {required: true, message: "请输入项目地址",trigger: "blur"},
      ],
    };
    const formRef = ref(null);
    const form = reactive({
      name: "",
      bnumber: "",
      region: "",
      date1: "",
      date2: "",
      addr:"",
      type:"",
      budget: "1",
      desc: "",
      options: [],
    });

    //省市区
    let address="";
    function onChange(e) {
      const one = chinaData[e[0]]
      const two = chinaData[e[1]]
      const three=chinaData[e[2]]
      address =one.label+two.label+three.label;
      //console.log(address)
    }

    // 提交表单，保存到数据库
    const currentInstance = getCurrentInstance();
    const {$http} = currentInstance.appContext.config.globalProperties;

    const onSubmit = () => {
      // 表单校验
      formRef.value.validate((valid) => {
        if (valid) {
          //console.log(form);
          var date1=new Date(Date.parse(form.date1));
          var date2=new Date(Date.parse(form.date2));
          $http.post('/projectadd',{
            pname:form.name,
            bnumber:form.bnumber,
            start_date:date1,
            end_date:date2,
            address:address,
            type:form.type,
            budget:num.value,
          }).then((res=>{
            if(res.data.code == 200){
              ElMessage.error("提交成功");
            }else{
              ElMessage.error("提交失败");
            }
          }))
        } else {
          return false;
        }
      });
    };
    // 重置
    const onReset = () => {
      formRef.value.resetFields();
    };


    return {
      num,
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