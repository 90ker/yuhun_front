import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameShot: '',
    user: '',
    heroId:''
  },
  mutations: {
    setGameShot(state, gameShot) {
      state.gameShot = gameShot
    },
    setUser(state, user) {
      state.user = user
    },
    setHeroId(state,heroId){
      state.heroId = heroId
    }
  },
  actions: {},
  modules: {}
})