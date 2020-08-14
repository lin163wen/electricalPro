import * as axios from './client'

export const Prelogin = params =>   { return axios.post('/api/rmt/pre-login',params, {showLoading: true}) }
export const Trylogin = params =>   { return axios.post('/api/rmt/try-login',params, {showLoading: true}) }
export const Comfirmlogin = params =>   { return axios.post('/api/rmt/confirm-login',params, {showLoading: true}) }
