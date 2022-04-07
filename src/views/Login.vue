<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">工程成本分析系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {ref, reactive, getCurrentInstance} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
    setup(props,ctx) {
        const router = useRouter();
        const store = useStore();
        const param = reactive({
            username: "admin",
            password: "123",
            photo: ""
        });


        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref(null);

      const currentInstance = getCurrentInstance()
      const { $http, $message, $route } = currentInstance.appContext.config.globalProperties

      function submitForm(){
          $http.post("/login",{
            username: param.username,
            password: param.password
          }).then(res=>{
            console.log(res)
            console.log(res.data)
            if(res.data.code===200){
              ElMessage.success("登录成功");
              localStorage.setItem("username", param.username);
              router.push("/dashboard");

              //登录成功后把用户信息查出来放进store中
              $http.post("/getusr", {
                username: param.username,
                password: param.password
              }).then(res=>{
                console.log(res.data)
                store.commit('login',res.data)
              })
            }else{
              ElMessage.error("登录失败");
              return false;
            }
          })
      }

       /* submitForm(()=>{
          proxy.$http.post("/login",{
                username:this.param.username,
                password: this.param.password
              }).then(res =>{
            console.log(res)
            if(res.data.code===200){
              ElMessage.success("登录成功");
              localStorage.setItem("ms_username", param.username);
              router.push("/dashboard");
            }else {
              ElMessage.error("登录失败");
              return false;
            }
              }
          )
      })*/
     /*   const submitForm = () => {
            /!*login.value.validate((valid) => {
                if (valid) {
                    ElMessage.success("登录成功");
                    localStorage.setItem("ms_username", param.username);
                    router.push("/");
                } else {
                    ElMessage.error("登录成功");
                    return false;
                }
            });*!/
          console.log(this)
          this.$h.post('/login', {
            username:this.param.username,
            password: this.param.password
          })
          .then(success => {
            if(success.data.code===200){
              ElMessage.success("登录成功");
              localStorage.setItem("ms_username", param.username);
              router.push("/dashboard");
            }else {
              ElMessage.error("登录失败");
              return false;
            }
          }).catch(failure => {
            ElMessage.error("登录失败");
            return false;
          })
        };
*/
        store.commit("clearTags");

        return {
            param,
            rules,
            login,
            submitForm,
        };
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>