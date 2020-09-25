<template>
  <div class="recommend">
    <searchView @closeall="closeAllView" @openall="openAllView"></searchView>
    <div class="recommend_mian" v-show="isShow">
      <van-skeleton  row-width="100%" :row="4" :loading="isBannerLoading">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in bannerList" :key="index"><img :src="item.pic" class="banner_img"/></van-swipe-item>
        </van-swipe>
      </van-skeleton>
      <div class="recommend_songs_div">
        <p>推荐歌单</p>
        <van-skeleton  row-width="100%" :row="4" :loading="isSongsLoding">
          <div class="recommend_songs">
            <div class="recommend_show_main">
            <div class="recommend_songs_slide">
              <ul class="recommend_ul">
                <li v-for="(playitem,index) in playList" :key="index"  class="recommend_songs_silde_item">
                  <img :src="playitem.coverImgUrl" class="recommend_songs_item_img"/>
                  <p class="recommend_songs_item_name">{{playitem.name}}</p>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </van-skeleton>
      </div>
      <div class="recommend_songs_div">
        <p>经典单曲</p>
        <van-skeleton  row-width="100%" :row="4" :loading="isBannerLoading">
          <van-swipe  :show-indicators="false" indicator-color="white">
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
              <img :src="item.pic" class="banner_img"/>
            </van-swipe-item>
          </van-swipe>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import searchView from "@/components/utils/searchView";
import {banner,playlist}  from '@/request/requestUrl'
export default {
  name: "recommend",
  data(){
    return {
      isShow:true,
      bannerList:[],//bannerlist
      playList:[],//歌单list
      isBannerLoading:true,
      isSongsLoding:true,
    }
  },
  methods:{
    closeAllView(){
      this.isShow=false;
    },
    openAllView(){
      this.isShow=true;
    },
    /**
     * 0: pc
     * 1: android
     * 2: iphone
     * 3: ipad
     */
    getBanner(typeCode){
      this.get(banner,{type:typeCode}).then((res)=>{
        console.log(res);
        if(res.code == 200){
          this.bannerList=res.banners;
          this.isBannerLoading=false;
        }
      }).catch(()=>{
      })
    },
    /**
     * 精品歌单
     */
    getPlaylist(limit,page){
      this.get(playlist,{limit:limit,offset:page}).then((res)=>{
        console.log(res);
        if(res.code == 200){
          this.playList=res.playlists;
          this.isSongsLoding=false;
        }
      })
    },
    async getInit(){
      await this.getBanner(2);
      await this.getPlaylist(10,0);
    }
  },
  created() {
    this.getInit();
  },
  components:{
    searchView,
  }
}
</script>

<style scoped lang="scss">
.recommend {
  .my-swipe {
    border-radius: 10px;
    width: 90%;
    margin: 0px auto;
    .van-swipe-item {
      color: #fff;
    }
  }
  .recommend_mian{
    .recommend_songs_div {
      width: 90%;
      margin: 0px auto;
      margin-top: rems(20px);
      .recommend_songs {
        overflow: hidden;
        overflow-x: auto;
        .recommend_show_main {
          width: rems(200)*10;
          .recommend_songs_slide {
            display: inline-block;
            overflow: hidden;
            .recommend_ul {
              margin-top: rems(20px);
              width: auto;
            }

            .recommend_ul li {
              display: inline-block;
              vertical-align: top;
              padding: rems(10px) 0px;
            }

            .recommend_ul li:not(:first-child) {
              margin-left: rems(20px);
            }

            .recommend_songs_silde_item {
              width: rems(180px);

              .recommend_songs_item_img {
                width: 100%;
                border-radius: 10px;
              }

              .recommend_songs_item_name {
                font-size: rems(4px);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
  .banner_img{
    width: 100%;
    //height: rems(300px);
  }
}
</style>