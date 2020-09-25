<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.isKeep"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeep"></router-view>
    <van-tabbar :placeholder="true"  route v-model="active" active-color="#f00025">
      <van-tabbar-item push to="/find" icon="home-o">发现</van-tabbar-item>
      <van-tabbar-item  icon="search">视频</van-tabbar-item>
      <van-tabbar-item icon="music-o">我的</van-tabbar-item>
      <van-tabbar-item push to="/my" icon="setting-o">账号</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return{
      active: 0,
    }
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
</style>