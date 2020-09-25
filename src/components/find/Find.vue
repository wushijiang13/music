<template>
  <div>
       <van-tabs v-model="active">
        <van-tab title="推荐">
          <recommend></recommend>
        </van-tab>
        <van-tab title="排行">
          <ranking></ranking>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import recommend from "@/components/find/recommend";
import ranking from "@/components/find/ranking";
export default {
  name: "Find",
  data(){
    return {
      active:0
    }
  },
  components:{
    recommend,
    ranking,
  }
}
</script>

<style scoped>

</style>