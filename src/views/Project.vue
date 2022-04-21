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
        <el-row :gutter="20" class="m">
          <el-col span=8>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="icon-mya-Group18 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ num.num1 }}</div>
                  <div>申报中</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col span=8>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="icon-mya-Group14 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ num.num2 }}</div>
                  <div>建设中</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col span=8>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="icon-mya-Group31 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ num.num3 }}</div>
                  <div>已完工</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-card shadow="hover">
            <template #header>
              <div class="clearfix">
                <span>项目分布地点</span>
              </div>
            </template>
            <chinamap ref="chinamap"></chinamap>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row gutter=20>
      <el-col span=15>
        <el-card shadow="hover" class="m">
          <template #header>
            <div class="clearfix">
              <span>项目进度总览</span>
            </div>
          </template>
          <progresschart ref="progresschart"></progresschart>
        </el-card>
      </el-col>
    </el-row>
    <el-row gutter=20>
      <el-col span=15>
        <el-card shadow="hover" class="m">
          <template #header>
            <div class="clearfix">
              <span>项目间成本比较柱状图</span>
            </div>
          </template>
          <costbar ref="costbar"></costbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getCurrentInstance, ref, shallowReactive} from "vue";
import Pie from "./charts/typepie.vue";
import Costpie from "./charts/costpie.vue";
import Line from "./charts/line.vue";
import Chinamap from "./charts/chinamap.vue";
import Progresschart from "./charts/progresschart.vue";
import Costbar from "./charts/costbar.vue";

export default {
  name: "Project",
  components: {Costbar, Progresschart, Chinamap, Line, Costpie, Pie},
  setup() {
    const pie = ref(null)
    const costpie = ref(null)
    const line = ref(null)
    const chinamap = ref(null)
    const progresschart = ref(null)
    const costbar = ref(null)

    let num1;
    let num2;
    let num3;
    const num = shallowReactive({
          num1,
          num2,
          num3,
        }
    )

    const currentInstance = getCurrentInstance();
    const {$http} = currentInstance.appContext.config.globalProperties;

    $http.get('/groupbystate').then((response) => {
      //console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i][0] == '申报中') {
          num.num1= response.data[i][1];
        } else if (response.data[i][0] == '建设中') {
          num.num2 = response.data[i][1];
        } else {
          num.num3 = response.data[i][1];
        }
      }
    })
    return {
      pie,
      costpie,
      line,
      chinamap,
      progresschart,
      costbar,
      num,
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

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
  width: 105px;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

</style>
