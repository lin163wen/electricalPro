import axios from 'axios';
import QS from 'qs';

//const domain = 'http://testsgcc.xinhuaapp.com:19002/api';
axios.interceptors.request.use(function (config) {
  //config.url = domain+config.url;
  //console.log(config.url);
  config.headers['Access-Control-Allow-Origin']='*';
  if(config.url.indexOf('login')<0){
  	config.headers['token'] = localStorage.getItem('token');
  }
  if (config.data && config.method == 'post') {
    config.data = QS.stringify(config.data);
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (response) {
  return Promise.reject(response);
});

export const get = (url, params) => {
    return axios.get(url,params).then((response)=>{
        return response;
    })
}
export const post = (url, params, config) => {
    return axios.post(url,params, config).then((response)=>{
        return response;
    })
}

export const put = (url, params, config) => {
  return axios.put(url,params, config).then((response)=>{
      return response;
  })
}
export const deletes = (url, params, config) => {
  return axios.delete(url,params, config).then((response)=>{
      return response;
  })
}
