<template>
  <div class="container">
    <el-row>
      <el-col>
        <!--根据当前路由渲染chart！！！ 添加:key="$route.fullPath"-->
          <costpie1 :key="$route.fullPath" :pid="user.id"></costpie1>
          <linechart :key="$route.fullPath" :pid="user.id"></linechart>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {onBeforeRouteUpdate, useRoute} from "vue-router"
import Costpie1 from "../charts/costpie1.vue";
import Linechart from "../charts/linechart.vue";

const router = useRoute();
const user={
  id:router.query.name,
}
onBeforeRouteUpdate((to)=>{
  user.id=to.query.name;
})
</script>

<style scoped>
</style>