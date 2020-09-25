<template>
  <div class="ranking">
    <div class="main" v-show="isShow">
      <van-skeleton  v-for="n in 5" :key="n" :loading="loading" :row="5"/>
      <div class="item" v-for="(item,index) in dataList" :key="index">
        <div class="item_left">
          <p class="item_title">{{ item.name }}</p>
          <ul>
            <li class="item_top_info" v-for="(info,indexInfo) in item.tracks" :key="indexInfo">{{indexInfo+1}}.{{info.first}}-{{info.second}}</li>
          </ul>
        </div>
        <div class="item_right">
          <img :src="item.coverImgUrl" class="item_right_img"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {toplist} from '../../request/requestUrl'
export default {
name: "Ranking",
  data(){
    return {
      isShow:true,
      dataList:[],
      loading:true,
    }
  },
  methods:{
    closeAllView(){
      this.isShow=false;
    },
    openAllView(){
      this.isShow=true;
    },
    /***
     * 获取所有榜单
     */
    getTopAll(){
      this.get(toplist,{}).then((res)=>{
        if (res.code == 200) {
          this.dataList=res.list;
          this.loading=false;
        }
        console.log(res);
      })
    },
  },
  created() {
    this.getTopAll();
  }
}
</script>

<style scoped lang="scss">
.ranking{
  background-color:#f7f7f7;
  padding-bottom: rems(40px);
}
  .main{
    width: 90%;
    margin: 0px auto;
    .item{
      width: 100%;
      height: rems(150px);
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin: rems(20px) 0px;
      .item_left{
        flex: 3;
        font-size: rems(12px);
        padding-left: rems(30px);
        .item_title{
          font-size: rems(28px);
        }
        .item_top_info{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .item_right{
        height: 100%;
        background-color: #c6e266;
        .item_right_img{
          height: 100%;
        }
      }
    }
  }
</style>