import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';



import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.filter('toCN', (val) => {
  switch (val.toLowerCase()) {
    case "speed":
      return "速度";
    case "hp":
      return "生命";
    case "hprate":
      return "生命加成";
    case "attack":
      return "攻击";
    case "attackrate":
      return "攻击加成";
    case "defense":
      return "防御";
    case "defenserate":
      return "防御加成";
    case "critrate":
      return "暴击率";
    case "critpower":
      return "暴击加成";
    case "effecthitrate":
      return "效果命中"
    case "effectresistrate":
      return "效果抵抗"
  }
})
Vue.filter('round', (val, index) => {
  if (!val) return ""
  let str = index.toLowerCase()
  if (str.includes("crit") || str.includes("rate")) {
    return "+" + Math.round(val * 100) + "%";
  } else {
    return "+" + Math.round(val);
  }
})

Vue.component(CollapseTransition.name, CollapseTransition)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')