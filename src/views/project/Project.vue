<template>
  <div class="container">
    <el-row gutter=15>
      <el-col span=15>
        <el-card shadow="hover" class="m">
          <template #header>
            <div class="clearfix">
              <span>今日数据统计</span>
            </div>
          </template>
          <costpie ref="costpie"></costpie>
        </el-card>
        <el-card shadow="hover" class="m">
          <!--根据项目类型画出饼图-->
          <template #header>
            <div class="clearfix">
              <span>项目类型分类</span>
            </div>
          </template>
          <pie ref="pie"></pie>
        </el-card>
      </el-col>
      <el-col span=15>
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>项目分布地点</span>
            </div>
          </template>
          <chinamap ref="chinamap"></chinamap>
        </el-card>
      </el-col>
    </el-row>
    <el-row gutter=20>
      <el-col>
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>项目进度总览</span>
            </div>
          </template>
          <progresschart ref="progresschart"></progresschart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ref} from "vue";
import Pie from "../charts/typepie.vue";
import Costpie from "../charts/costpie.vue";
import Line from "../charts/line.vue";
import Chinamap from "../charts/chinamap.vue";
import Progresschart from "../charts/progresschart.vue";


export default {
  name: "Project",
  components: {Progresschart, Chinamap, Line, Costpie, Pie},
  setup() {
    const pie = ref(null)
    const costpie = ref(null)
    const line = ref(null)
    const chinamap = ref(null)
    const progresschart = ref(null)
    return {
      pie,
      costpie,
      line,
      chinamap,
      progresschart,
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
