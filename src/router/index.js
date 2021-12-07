import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Test from '@/views/Interface/Test'
import User2 from '@/views/Interface/User2'
import Item from '@/views/Service/Item'
import DaoChu from '@/views/Service/DaoChu'
import DaoRu from '@/views/Service/DaoRu'
import Data from '@/views/Service/Data'
import PvpLog from '@/views/Service/PvpLog'
import TeamInfo from '@/views/Service/TeamInfo'
import ServerManage from '@/views/Service/ServerManage'
import RefreshConfig from '@/views/Service/RefreshConfig'
import DbCompare from '@/views/Service/DbCompare'
import Player from '@/views/Service/Player'
import Config from '@/views/Interface/Config'
import Panel from '@/views/ef/panel.vue'
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
          path: '/interface/user2', 
          name: 'user2', 
          component: User2,
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
        },{ 
          path: '/service/test', 
          name: 'panel', 
          component: Panel,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 9
          }
        },{ 
          path: '/service/team', 
          name: 'teamInfo', 
          component: TeamInfo,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 10
          }
        },{ 
          path: '/service/log', 
          name: 'panel', 
          component: PvpLog,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 11
          }
        },{ 
          path: '/service/server', 
          name: 'serverManage', 
          component: ServerManage,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 12
          }
        },{ 
          path: '/service/refresh', 
          name: 'refreshConfig', 
          component: RefreshConfig,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 13
          }
        },{ 
          path: '/service/compare', 
          name: 'dbCompare', 
          component: DbCompare,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 14
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