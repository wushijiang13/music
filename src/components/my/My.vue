<template>
  <div>
      <div class="my_bg">
        <img v-show="userDetile.profile.backgroundUrl"  class="bg_img" :src="userDetile.profile.backgroundUrl"/>
      </div>
      <div class="my_mian">
        <van-cell-group>
          <van-cell  class="userinfo">
            <van-image
                round
                class="portrait_img"
                :src="userDetile.profile.avatarUrl"
            />
            <span class="nickname">{{userDetile.profile.nickname}}</span>
          </van-cell>
        </van-cell-group>

        <van-cell-group class="cell_interval">
          <van-cell icon="setting" title="设置" is-link />
        </van-cell-group>
        <van-cell-group class="cell_interval">
          <van-cell icon="share" title="分享" is-link />
          <van-cell icon="info" title="关于" is-link />
        </van-cell-group>
        <van-cell-group class="cell_interval">
          <van-cell class="cell_center " @click="loginout">退出登陆</van-cell>
        </van-cell-group>
      </div>
  </div>
</template>

<script>
import {loginOut} from '../../request/requestUrl';
export default {
  name: "my",
  data(){
    return {
      userDetile:{},
    }
  },
  methods:{
    async loginout(){
        let userinfo = localStorage.getItem("userinfo")
        if( userinfo  && this.userDetile) {
          await this.get(loginOut,{token:userinfo.token}).then((res)=>{
            console.log(res);
            localStorage.removeItem('userinfo');
            localStorage.removeItem('userDeilte');
          })
        }else {
          console.warn("当前缓存中暂无token以及userinfo以及userDeilte对象，请仔细查看调用顺序");
        }
        this.$toast('退出登陆成功!')
        await this.$router.push('/login');
    },
  },
  created() {
     this.userDetile=this.$Utils.getUserDeilte();
  }
}
</script>

<style scoped lang="scss">
.my_bg{
  height: rems(400px);
  width: 100%;
  overflow: hidden;
  background-color: #7c7474;
  .bg_img{
    width: 100%;
  }
}
.my_mian{
  width: 100%;
  border-top-left-radius: rems(30px);
  border-top-right-radius: rems(30px);
  margin-top: rems(-50px);
  background-color: #f7f7f7;
  overflow: hidden;
  .userinfo > div{
    display: flex;
    align-items: center;
    //vertical-align: middle;
    .portrait_img{
      width: rems(60px);
      vertical-align: middle;
    }
    .nickname{
      font-weight: 600;
      vertical-align: middle;
      display: inline-block;
      height: rems(30px);
      margin-left: rems(20px);
    }
  }
}
.cell_center > div{
  text-align: center;
  color:$Theme_color;
}

</style>