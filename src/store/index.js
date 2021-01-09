import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {
  limitAttrList,
  includeList,
  yuhunSite,
} from "../assets/view_json/caculator";

export default new Vuex.Store({
  state: {
    gameShot: '',
    user: '',
    hid: '',
    target: '',
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
    setTarget(state, target) {
      state.target = target
    }
  },
})