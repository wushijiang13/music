<template>
  <div class="seachView">
    <van-search v-model="searchValue" shape="round"  background="#ffff"  @search="getSeachList" placeholder="请输入搜索关键词" @focus="showSeachView" @cancel="clearSeachView" :show-action="isSeach"/>
      <div v-show="isSeach && dataList.length == 0" class="seachTips">
        <div class="searchShowView">
          <div v-show="historySearchList.length != 0">
            <p class="search_title">
              <span>搜索历史</span>
              <van-tag round class="tag_clearAll"  size="medium" @click="clearHistorySear">清空</van-tag>
            </p>
            <div class="searchTipList">
              <van-tag round class="tag_search"  v-for="(item,index) in historySearchList"   @click="hotSearch(item)" :key="index" size="medium">{{item}}</van-tag>
            </div>
          </div>
          <p class="search_title">热门搜索</p>
          <div  class="searchTipList">
            <van-tag round  class="tag_search" v-for="(item,index) in HosList" @click="hotSearch(item.searchWord)" :key="index" size="medium">{{item.searchWord}}</van-tag>
          </div>
        </div>
      </div>
      <div v-show="dataList.length != 0" class="seachList">
        <van-list
            v-model="loading"
            finished-text="没有更多了"
            @load="onLoad">
          <van-cell-group>
            <van-cell v-for="(item,index) in dataList" class="music_user_name" :key="index" @click="openMusic(item)">
                <p class="music_title">{{item.name}} <span class="music_alias">{{ item.alia.length  ? `(${item.alia.toString()})`  : ''}}</span></p>
                <p class="music_author">{{getMusicName(item)}}</p>
            </van-cell>
          </van-cell-group>
        </van-list>
      </div>
  </div>
</template>

<script>
import {search,searchHot,getMusicUrl} from '../../request/requestUrl';
export default {
name: "searchView",
  data(){
    return{
      searchValue:'',
      isSeach:false,
      overShow:false,
      loading:false,
      dataList:[],
      HosList:[],//热词list
      historySearchList:[],//历史搜索
      page:0,
    }
  },
  methods:{
    /**
     *  拼接歌手名字
     */
    getMusicName(item){
      let artistsName="";
      item.ar.forEach((items,index)=>{
        if(index >= item.ar.length-1){
          artistsName+=items.name;
        }else{
          artistsName+=items.name+"/"
        }
      })
      return artistsName;
    },
    /**
     * 显示搜索的view内容
     * 真不搓
     */
    showSeachView(){
      this.isSeach=true;
      this.$emit("closeall",{isSearch:this.isSeach})
    },
    clearSeachView(){
      this.clearAll();
      this.$emit("openall",{isSearch:this.isSeach})
    },
    /**
     * 关闭所有
     */
    clearAll(){
      this.page=0;
      this.searchValue="";
      this.isSeach=false;
      this.dataList=[];
    },
    /**
     * 清空历史查询
     */
    clearHistorySear(){
      localStorage.removeItem('historySearchList');
      this.historySearchList=localStorage.getItem("historySearchList") ? JSON.parse(localStorage.getItem("historySearchList")) : [] ;
    },
    /**
     * 热词搜索
     */
    hotSearch(value){
      this.searchValue=value;
      this.getSeachList();
    },
    /**
     * 开始搜索
     */
    getSeachList(){
      this.$toast.loading('正在搜索');
      this.requestSearchList(this.page).then((res)=>{
        this.$toast.clear();
        if(res.code == 200 ){
          if(res.result.songCount == 0 ){
            this.$toast('已经到底了~');
            return;
          }
          if(this.historySearchList.length >= 10){
            this.historySearchList.pop();
          }
          let isAdd =  this.historySearchList.findIndex(item=>{
            return item == this.searchValue
          })
          if(isAdd == -1){
            this.historySearchList.unshift(this.searchValue);
          }
          localStorage.setItem("historySearchList",JSON.stringify(this.historySearchList));
          this.dataList=res.result.songs;
        }
      })
    },
    requestSearchList(page){
      return   new Promise((resolve, reject)=>{
        this.get(search,{keywords:this.searchValue,offset:page*30}).then((res)=>{
          resolve(res);
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    requestSearchHosList(){
      return new Promise((resolve)=>{
        this.get(searchHot,{}).then((res)=>{
          resolve(res)
        })
      })
    },
    requestMusicUrl(id){
      return new Promise((resolve)=>{
        this.get(getMusicUrl,{id}).then(res=>{
          resolve(res);
        })
      })
    },
    /**
     * 点击歌曲
     */
    openMusic(item){
      console.log(item);
      this.requestMusicUrl(item.id).then(res=>{
        console.log(res);
      })
    },
    onLoad() {
      this.page++;
      this.loading=true;
      console.log(this.page);
      this.requestSearchList(this.page).then((res)=>{
        if(res.code == 200 ){
          this.dataList.push(...res.result.songs);
          this.loading=false;
        }
      })
    },
    async onInit(){
      this.historySearchList=localStorage.getItem("historySearchList") ? JSON.parse(localStorage.getItem("historySearchList")) : [] ;
      await this.requestSearchHosList().then((res)=>{
        console.log(res);
        if(res.code == 200){
          this.HosList=res.data;
          // this.HosList=res
        }

      })
    }
  },
  created() {
    this.onInit();
  }
}
</script>

<style scoped lang="scss">
    .seachView{
      background-color: #f7f8fa;
      .seachTips{
        position: relative;
        background-color: #fff;
        z-index: 999;
        width: 100%;
        .searchShowView{
          width: 90%;
          margin: 0px auto;
          font-size: rems(24px);
          .search_title{
            margin-left: rems(10px);
            font-weight: 600;
            .tag_clearAll{
              background-color: #f7f7f7;
              color: #000;
              float: right;
              font-weight: 500;
            }
          }
          .searchTipList span{
            margin-right:  rems(4px);
            margin-top: rems(10px);
            //font-weight: 400;'
          }
          .tag_search{
            background-color: #f7f7f7;
            color: #000;
          }
        }

      }
      .seachList{
        width: 96%;
        margin: 0px auto;
        margin-top: rems(20px);
        padding: rems(5px);
        border-radius: 5px;
      }
      .music_user_name  {
        font-size: rems(10px);
        line-height: rems(30px);
        border-bottom: 1px solid #eaebec;
        color: #bcbdbe;
        .music_title{
          color: #577cae;
          font-size: rems(26px);
          line-height: rems(30px);
          .music_alias{
            color: #bcbdbe;
          }
        }
        .music_author{
          color: #bcbdbe;
          margin-top: rems(10px);
        }
      }
    }


</style>