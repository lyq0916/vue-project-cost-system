import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import axios from 'axios'

//设置反向代理，前端请求默认发送到8443
axios.defaults.baseURL="http://localhost:8443/api"

const app = createApp(App)
app.config.globalProperties.$http=axios

installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')