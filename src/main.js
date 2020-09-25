import Vue from 'vue'
import App from './App.vue'
import {routerList} from './router/router';
import VueRouter  from 'vue-router'
import {get,post} from './request/request'
import {UTILS} from './assets/js/utils/utils'
import { NavBar,Tab, Tabs,Search ,Swipe, SwipeItem , Grid, GridItem,Sticky,Tag ,List, Cell, CellGroup ,Field, Button ,Toast,Tabbar, TabbarItem,  Image as VanImage,Skeleton} from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Sticky);
Vue.use(Tag);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(VanImage);
Vue.use(Skeleton);
Vue.use(VueRouter);
Vue.prototype.get=get;
Vue.prototype.post=post;
Vue.prototype.$toast=Toast;
Vue.prototype.$Utils=UTILS;
Vue.config.productionTip = false

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

let router=new VueRouter({
  routes:routerList,
})

router.beforeEach((to, from, next) => {
  if(to.path == '/login' ){
    next();
  }else if(UTILS.getUserInfo() == ''){
    next('/login');
  }else{
    next();
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
