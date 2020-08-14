import * as axios from './client'

//登陆
export const Prelogin = params =>   { return axios.post('/api/rmt/pre-login',params, {showLoading: true}) }
export const Trylogin = params =>   { return axios.post('/api/rmt/try-login',params, {showLoading: true}) }
export const Comfirmlogin = params =>   { return axios.post('/api/rmt/confirm-login',params, {showLoading: true}) }

//任务
export const Missions = params =>   { return axios.post('/api/cms/task/list',params, {showLoading: true}) }
export const MissionDetail = params =>   { return axios.post('/api/cms/story/audit/detail',params, {showLoading: true}) }
export const MissionPass = params => { return axios.post('/api/cms/story/approval'),params,{showLoading: true}}
export const MissionPublish = params => { return axios.post('/api/cms/story/pro-approval'),params,{showLoading: true}}
export const MissionReject = params => { return axios.post('/api/cms/story/rejection'),params,{showLoading: true}}

