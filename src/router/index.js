import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/User/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: '注册'
        },
        component: () => import ( /* webpackChunkName: "register" */ "../views/User/Register.vue")
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import("../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/error/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/error/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }, {
                path: '/project',
                name: 'project',
                meta: {
                    title: '数据看板(总体项目)'
                },
                component: () => import ('../views/Project.vue')
            }, {
                path: '/projectadd',
                name: 'projectadd',
                meta: {
                    title: '项目报备'
                },
                component: () => import ('../views/BidProject/ProjectAdd.vue')
            }, {
                path: '/costmaintain',
                name: 'costmaintain',
                meta: {
                    title: '支出记录汇总'
                },
                component: () => import('../views/ConstProject/CostMaintain.vue')
            }, {
                path: '/projectdetails',
                name: 'projectdetails',
                meta: {
                    title: '项目详情'
                },
                component: () => import('../views/BidProject/ProjectDetails.vue')
            }, {
                path: '/bidproject',
                name: 'bidproject',
                meta: {
                    title: '投标项目'
                },
                component: () => import('../views/BidProject/BidProject.vue')
            }, {
                path: '/constproject',
                name: 'constproject',
                meta: {
                    title: '建设中项目'
                },
                component: () => import('../views/ConstProject/ConstProject.vue')
            },
            {
                path: '/datashow',
                name: 'datashow',
                meta: {
                    title: '数据看板(单个项目)'
                },
                component: () => import('../views/ConstProject/DataShow.vue')
            },
            {
                path: '/constlog',
                name: 'constlog',
                meta: {
                    title: '施工日志'
                },
                component: () =>import('../views/ConstProject/ConstLog.vue')
            },
            {
                path: '/usermanager',
                name: 'UserManager',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../views/User/UserManager.vue')
            },
            {
                path: '/myproject',
                name: 'MyProject',
                meta: {
                    title: '负责项目详情'
                },
                component: () => import('../views/MyProject/MyProject.vue')
            },
            {
                path: '/myprojectshow',
                name: 'MyProjectShow',
                meta: {
                    title: '查看项目',
                    keepAlive: true
                },
                component: () => import('../views/MyProject/DataShow.vue')
            }
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

/*router.beforeEach((to, from, next) => {
    /!*document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        next();
    }*!/
});*/

export default router;