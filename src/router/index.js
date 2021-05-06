import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Test from '@/views/Interface/Test'
import User from '@/views/Interface/User'
import Item from '@/views/Service/Item'
import DaoChu from '@/views/Service/DaoChu'
import DaoRu from '@/views/Service/DaoRu'
import Data from '@/views/Service/Data'
import Player from '@/views/Service/Player'
import Config from '@/views/Interface/Config'
import Intro from '@/views/Intro/Intro'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        { 
          path: '', 
          name: '系统介绍', 
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        },
        { 
          path: '/interface/test', 
          name: 'test', 
          component: Test,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 1
          }
        },
        { 
          path: '/interface/config', 
          name: 'config', 
          component: Config,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 2
          }
        },{ 
          path: '/interface/user', 
          name: 'user', 
          component: User,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 3
          }
        },{ 
          path: '/service/item', 
          name: 'item', 
          component: Item,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 4
          }
        },{ 
          path: '/service/player', 
          name: 'player', 
          component: Player,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 5
          }
        },{ 
          path: '/content/daochu', 
          name: 'daochu', 
          component: DaoChu,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 6
          }
        },{ 
          path: '/content/daoru', 
          name: 'daoru', 
          component: DaoRu,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 7
          }
        },{ 
          path: '/service/data', 
          name: 'data', 
          component: Data,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 8
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
export default router