import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {
  limitAttrList,
  includeList,
  yuhunSite,
} from "../assets/view_json/caculator";
const yuhunRange = {
  state: () => ({}),
  mutations: {},
  actions: {},
  getters: {}
}

export default new Vuex.Store({
  modules: {
    yuhunRange
  },
  state: {
    gameShot: '',
    user: '',
    hid: '',
    limitAttrList,
    yuhunSite,
    includeList,
  },
  mutations: {
    setGameShot(state, gameShot) {
      state.gameShot = gameShot
    },
    setUser(state, user) {
      state.user = user
    },
    setHid(state, hid) {
      state.hid = hid
    },
    setLimitAttrList(state, limitAttrList) {
      state.limitAttrList = limitAttrList
    },
    setYuhunSite(state, yuhunSite) {
      state.yuhunSite = yuhunSite
    },
    setIncludeList(state, includeList) {
      state.includeList = includeList
    },
    // setExcludeList(state,excludeList){
    //   state.excludeList = excludeList
    // }
  },
})