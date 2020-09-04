import Vue from 'vue'
import Router from 'vue-router'
import Start from '../components/start.vue'
import Login from '../components/Login.vue'
import Mission from '../components/mission/Mission.vue'
import MissionDetail from '../components/mission/MissionDetail.vue'
import MissionBack from '../components/mission/MissionBack.vue'

import Work from '../components/work/work.vue'
import Material from '../components/work/material.vue'
import Audit from '../components/work/audit.vue'
import MaterialDetail from '../components/work/materialDetail.vue'
import Upload from '../components/work/upload.vue'
import UploadDetail from '../components/work/uploadDetail.vue'
import Preview from '../components/work/preview.vue'

import Connection from '../components/connection/connection.vue'
import ConnectAll from '../components/connection/ConnectAll.vue'
import ConnectDetails from '../components/connection/ConnectDetails.vue'
import Calling from '../components/connection/Calling.vue'
import Called from '../components/connection/Called.vue'
import VideoCall from '../components/connection/VideoCall.vue'

import Mine from '../components/mine/mine.vue'
import Setting from '../components/mine/setting.vue'
import About from '../components/mine/about.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start,
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    },{
      path: '/Mission',
      name: 'Mission',
      component: Mission
    },{
      path: '/MissionDetail',
      name: 'MissionDetail',
      component: MissionDetail
    },{
      path: '/MissionBack',
      name: 'MissionBack',
      component: MissionBack
    },{
      path: '/Work',
      name: 'Work',
      component: Work
    },{
      path: '/Material',
      name: 'Material',
      component: Material
    },{
      path: '/Audit',
      name: 'Audit',
      component: Audit
    },{
      path: '/MaterialDetail',
      name: 'MaterialDetail',
      component: MaterialDetail
    },{
      path: '/Preview',
      name: 'Preview',
      component: Preview
    },{
      path: '/Upload',
      name: 'Upload',
      component: Upload
    },{
      path: '/UploadDetail',
      name: 'UploadDetail',
      component: UploadDetail
    },{
      path: '/Connection',
      name: 'Connection',
      component: Connection
    },{
      path: '/ConnectAll',
      name: 'ConnectAll',
      component: ConnectAll
    },{
      path: '/ConnectDetails',
      name: 'ConnectDetails',
      component: ConnectDetails
    },{
      path: '/Calling',
      name: 'Calling',
      component: Calling
    },{
      path: '/Called',
      name: 'Called',
      component: Called
    },{
      path: '/VideoCall',
      name: 'VideoCall',
      component: VideoCall
    },{
      path: '/Mine',
      name: 'Mine',
      component: Mine
    },{
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },{
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
