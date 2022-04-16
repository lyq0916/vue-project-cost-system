<template>
  <div>
    <el-row gutter="20">
      <el-col span="15">
        <el-card shadow="hover" class="m">
          <template #header>
            <div class="clearfix">
              <span>今日数据统计</span>
            </div>
          </template>
          <costpie></costpie>
        </el-card>
        <el-card shadow="hover">
          <!--根据项目类型画出饼图-->
          <template #header>
            <div class="clearfix">
              <span>项目类型分类</span>
            </div>
          </template>
          <pie ref="pie"></pie>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ref} from "vue";
import * as echarts from 'echarts'

import chinaMap from "../../assets/json/china.json";
import Pie from "./charts/typepie.vue";
import Costpie from "./charts/costpie.vue";

echarts.registerMap('china', chinaMap)
console.log(echarts.getMap("china"))

export default {
  name: "Project",
  components: {Costpie, Pie},
  setup() {
    const pie = ref(null)
    const costpie = ref(null)
    return {
      pie,
      costpie,
    }
  },
  mounted() {
  },
}
</script>

<style>
.m {
  margin-bottom: 20px;
}

</style>
