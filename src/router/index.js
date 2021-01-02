import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Import from '../views/Import.vue'
import Caculator from '../views/Caculator.vue'
import Collection from '../views/Collection.vue'
import HeroData from '../views/HeroData.vue'
import SoulData from '../views/SoulData.vue'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/import'
  },
  {
    path: '/home',
    redirect:'/home/caculator',
    component: Home,
    children: [
      {
        path: 'caculator',
        component: Caculator
      },
      {
        path: 'heroData',
        component: HeroData
      },
      {
        path: 'soulData',
        component: SoulData
      },
      {
        path: 'collection',
        component: Collection
      }
    ]
  },
  {
    path: '/import',
    component: Import
  }
]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  console.log(sessionStorage.getItem("gameShot"))
  if(to.path=='/import') return next()
  if(!sessionStorage.getItem("gameShot")){
    return next('import')
  }
  next()
})



export default router