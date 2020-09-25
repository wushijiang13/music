<template>
    <div class="Login">
      <div>
        <p>
          <img src="../assets/img/login/login.jpeg" class="login_img"/>
        </p>
        <div class="mar_top">
          <van-cell-group>
            <van-field
                v-model="phone"
                label="手机号"
                left-icon="smile-o"
                type="phone"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="pass"
                label="密码"
                type="password"
                left-icon="closed-eye"
                placeholder="请输入密码"
            />
            <van-button round  class="mar_top" type="info" @click="submitLogin">
              逼话少说,上号!
            </van-button>
          </van-cell-group>
        </div>
        </div>
    </div>
</template>

<script>
import {loginPhone,userInfoDetail} from '../request/requestUrl'
export default {
name: "Login",
  data(){
    return{
      phone:"",
      pass:"",
    }
  },
  methods:{
    async submitLogin(){
      if (this.phone == '' && this.phone == undefined && this.phone == null) {
        this.$toast('手机号不能为空');
        return;
      }else if(this.pass == '' && this.pass == undefined && this.pass == null){
        this.$toast('密码不能为空');
        return;
      }
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
      });
      await this.get(loginPhone,{phone:this.phone,password:encodeURIComponent(this.pass),timestamp:new Date().getTime()}).then((res)=>{
        console.log(res);
        if(res.code == 200){
          localStorage.setItem("userinfo",JSON.stringify(res));
        }else{
          this.$toast(res.msg);
        }
      }).catch((error)=>{
        console.log(error);
        this.$toast.fail(error.data.message);
        return '';
      })
      let info  = this.$Utils.getUserInfo();
      await this.get(userInfoDetail,{uid:info.account.id}).then((res)=>{
        console.log(res);
        this.$toast('登陆成功，恭喜这个b');
        localStorage.setItem("userDeilte",JSON.stringify(res));
        this.$router.push("/find");
      }).catch((error)=>{
        console.log(error);
      })
    }
  },created() {
  }
}
</script>

<style scoped lang="scss">
  .Login{
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    .login_img{
      width: rems(250px);
    }
    .mar_top{
      margin-top: rems(20px);
    }
  }
</style>