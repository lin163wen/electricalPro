import * as axios from './client'

//export const domain = 'http://testsgcc.xinhuaapp.com:19002'
export const domain = '';
//登陆
export const Prelogin = params =>   { return axios.post(domain+'/api/rmt/pre-login',params, {showLoading: true}) }
export const Trylogin = params =>   { return axios.post(domain+'/api/rmt/try-login',params, {showLoading: true}) }
export const Comfirmlogin = params =>   { return axios.post(domain+'/api/rmt/confirm-login',params, {showLoading: true}) }

//mine
export const getUserInfo = params =>   { return axios.post(domain+'/api/m/member/info',params, {showLoading: true}) }

//任务
export const Missions = params =>   { return axios.post(domain+'/api/cms/task/list',params, {showLoading: true}) }
export const MissionDetail = params =>   { return axios.post(domain+'/api/cms/story/audit/detail',params, {showLoading: true}) }
export const MissionPass = params => { return axios.post(domain+'/api/cms/story/approval',params,{showLoading: true})}
export const MissionPublish = params => { return axios.post(domain+'/api/cms/story/pro-approval',params,{showLoading: true})}
export const MissionReject = params => { return axios.post(domain+'/api/cms/story/rejection',params,{showLoading: true})}

//联系人（用户中心）
export const Organizations = params => { return axios.post(domain+'/api/m/organization/tree',params,{showLoading: true})}
export const OrganizationMember = params => { return axios.post(domain+'/api/m/organization/member',params,{showLoading: true})}

//素材
//image
export const OfficialImages = params => { return axios.post(domain+'/api/asset/official/image/page',params,{showLoading: true})}
export const PrivateImages = params => { return axios.post(domain+'/api/asset/private/image/page',params,{showLoading: true})}
export const PublicImages = params => { return axios.post(domain+'/api/asset/public/image/page',params,{showLoading: true})}
export const ImageDetail = params => { return axios.post(domain+'/api/asset/image',params,{showLoading: true})}
export const ImageUpload = params => { return axios.post(domain+'/api/asset/private/image',params,{showLoading: true})}

//video
export const OfficialVideos = params => { return axios.post(domain+'/api/asset/official/video/page',params,{showLoading: true})}
export const PrivateVideos = params => { return axios.post(domain+'/api/asset/private/video/page',params,{showLoading: true})}
export const PublicVideos = params => { return axios.post(domain+'/api/asset/public/video/page',params,{showLoading: true})}
export const VideoDetail = params => { return axios.post(domain+'/api/asset/video',params,{showLoading: true})}
export const VideoUpload = params => { return axios.post(domain+'/api/asset/private/video',params,{showLoading: true})}

//audio
export const OfficialAudios = params => { return axios.post(domain+'/api/asset/official/audio/page',params,{showLoading: true})}
export const PrivateAudios = params => { return axios.post(domain+'/api/asset/private/audio/page',params,{showLoading: true})}
export const PublicAudios = params => { return axios.post(domain+'/api/asset/public/audio/page',params,{showLoading: true})}
export const AudiosDetail = params => { return axios.post(domain+'/api/asset/audio',params,{showLoading: true})}
export const AudioUpload = params => { return axios.post(domain+'/api/asset/private/audio',params,{showLoading: true})}

//审稿
export const AuditList = params => { return axios.post(domain+'/api/cms/story/auditing/page',params,{showLoading: true})}

//分类，搜索
export const getParting = params => { return axios.post(domain+'/api/asset/category/dict',params,{showLoading: true})}

//test
export const Test = params => { return axios.ajaxGet('https://health.motree.cn/api/user/servertime',params,{showLoading: true})}
export const Test2 = params => { return axios.ajaxPost('https://health.motree.cn/api/v1/users/forget',params,{showLoading: true})}
