import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mission from '../components/mission/Mission.vue'
import Work from '../components/wok/work.vue'
import Connection from '../components/connection/connection.vue'
import Mine from '../components/mine/mine.vue'
import MissionDetail from '../components/mission/MissionDetail.vue'
import MissionBack from '../components/mission/MissionBack.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/Mission',
      name: 'Mission',
      component: Mission
    },{
      path: '/Work',
      name: 'Work',
      component: Work
    },{
      path: '/Connection',
      name: 'Connection',
      component: Connection
    },{
      path: '/Mine',
      name: 'Mine',
      component: Mine
    },{
      path: '/MissionDetail',
      name: 'MissionDetail',
      component: MissionDetail
    },{
      path: '/MissionBack',
      name: 'MissionBack',
      component: MissionBack
    }
  ]
})
