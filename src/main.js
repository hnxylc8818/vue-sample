// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import Global from './components/common/Global'
import qs from 'qs'
Vue.prototype.$qs = qs;
import 'lib-flexible'
//axios导入
import axios from 'axios'
//axios定义
axios.defaults.withCredentials=true;
axios.defaults.timeout = 20000;
axios.defaults.baseURL = Global.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.common['hmtoken'] = store.get("token");
axios.defaults.headers.common['hmtoken'] = "c0f8cd10-1626-11e9-bfe2-2df843332a23";
// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log("interceptors response");
    if (response.status == 200){
      Global.NetworkErrorCount = 0;
    }
    return response;
  },
  error => {
    console.log("interceptors error:" + error + "，NetworkErrorCount:" + Global.NetworkErrorCount);
    if (error.toString().search("Network Error")!= -1 && Global.NetworkErrorCount < 5){
      Global.NetworkErrorCount++;
      router.replace({
        path: '/parent/author',
        query: {page: router.currentRoute.fullPath}//授权成功后跳入浏览的当前页面
      });
      error.message = "unauthor401";
    }
    return Promise.reject(error);
  });
Vue.prototype.$http = axios;
Vue.prototype.fetch = function (options){
  return new Promise((resolve, reject) => {
    const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
      },
      timeout:20 * 1000 // 20秒超时
    });
    instance(options)
      .then(response => { //then 请求成功之后进行什么操作
        if (response.status == 200){
          Global.NetworkErrorCount = 0;
        }else {
          Global.NetworkErrorCount = 3;
        }
        resolve(response);//把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log("interceptors error:" + error + "，NetworkErrorCount:" + Global.NetworkErrorCount);
        if (error.toString().search("Network Error")!= -1 && Global.NetworkErrorCount < 3){
          Global.NetworkErrorCount++;
          router.replace({
            path: '/parent/author',
            query: {page: router.currentRoute.fullPath}//授权成功后跳入浏览的当前页面
          });
          console.log("可能是登录状态信息过期，重新登录...");
          return;
        }
        reject(error);
      });
  });
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
