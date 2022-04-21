<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#f0f0f0" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  setup() {
    const items = [
          {
            icon: "el-icon-lx-home",
            index: "/dashboard",
            title: "系统首页",
          },
          {
            icon: "el-icon-lx-cascades",
            index: "/project",
            title: "数据看板"
          },
          {
            icon: "el-icon-lx-file",
            index: "1",
            title: "投标项目管理",
            subs: [
              {
                index: "3",
                title: "项目报备",
                subs:[
                  {
                    index: "/projectadd",
                    title: "添加项目",
                  },
                  {
                    index: "/projectdetails",
                    title: "项目详情"
                  }
                ]
              },
              {
                index: "/bidproject",
                title: "投标管理"
              },
            ]
          },
          {
            icon: "el-icon-lx-calendar",
            index: "7",
            title: "施工项目管理",
            subs: [
              {
                index: "/constproject",
                title: "汇总查看",
              },
              {
                index: "",
                title: "成本管理",
                subs: [
                  {
                    index: "/costmaintain",
                    title: "支出记录汇总",
                  }
                ]
              },
              {
                index: "/datashow",
                title: "数据看板",
              }
            ]
          },
          {
            icon: "el-icon-lx-copy",
            index: "/tabs",
            title: "tab选项卡",
          },
          {
            icon: "el-icon-lx-emoji",
            index: "/icon",
            title: "自定义图标",
          },
          {
            icon: "el-icon-lx-warn",
            index: "11",
            title: "错误处理",
            subs: [
              {
                index: "/permission",
                title: "权限测试",
              },
              {
                index: "/404",
                title: "404页面",
              },
            ],
          },
          {
            icon: "el-icon-lx-redpacket_fill",
            index: "/donate",
            title: "支持作者",
          },
        ]
    ;

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
