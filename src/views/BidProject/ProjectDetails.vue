<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>项目详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <div class="table-header">
          <el-form :model="form">
            <el-form-item>
              <el-row>
                <el-input v-model="form.pname" placeholder="输入项目名称" suffix-icon="icon-mya-Group46"
                          style="width: 150px;height:30px;margin: 10px"></el-input>
                <el-button type="primary" @click="search" style="height: 30px ;margin: 10px">搜索</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column prop="id" label="项目编号"/>
          <el-table-column prop="name" label="项目名称"/>
          <el-table-column prop="bnumber" label="招标编号"/>
          <el-table-column prop="state" label="状态"/>
          <el-table-column prop="address" label="地址"/>
          <el-table-column prop="type" label="类型"/>
          <el-table-column prop="budget" label="预算(万元)"/>
          <el-table-column prop="date" label="报备日期"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, shallowReactive} from 'vue'

const currentInstance = getCurrentInstance();
const {$http} = currentInstance.appContext.config.globalProperties;

const form = reactive({
  pname: ''
})

const tableData = shallowReactive([])
$http.get('/projectshow').then(response => {
  console.log(response.data)
  for (let i = 0; i < response.data.length; i++) {
    tableData.push({
      id: response.data[i].pid,
      name: response.data[i].pname,
      bnumber: response.data[i].bnumber,
      state: response.data[i].state,
      address: response.data[i].address,
      type: response.data[i].type,
      budget: response.data[i].budget,
      date: response.data[i].date,
    })
  }
})

function search() {
  $http.get('/searchproject?pname=' + form.pname, {}).then(response => {
    tableData.splice(0, tableData.length);
    for (let i = 0; i < response.data.length; i++) {
      tableData.push({
        id: response.data[i].pid,
        name: response.data[i].pname,
        bnumber: response.data[i].bnumber,
        state: response.data[i].state,
        address: response.data[i].address,
        type: response.data[i].type,
        budget: response.data[i].budget,
        date: response.data[i].date,
      })
    }
  })
}


interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData1: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style>
.table-header .header-right {
  position: absolute;
  right: 5px;

}

</style>