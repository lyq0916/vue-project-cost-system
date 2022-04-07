<template>
    <router-view />
</template>

<script>
import * as echarts from 'echarts'
import { provide } from 'vue'
export default {
  name:'App',
  setup() {
      provide('ec',echarts)
    },
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
