# demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## Conifg
```
跨域配置
# src/utils/request.js
export const domain = 'http://testsgcc.xinhuaapp.com:19002'//无需配置跨域，使用该域名
export const domain = '';//需配置跨域，使用该域名

# config/index.js
//需配置跨域，启用该配置
'/api': {
        //target: 'https://business-h5-test.motree.cn',//motree测试环境
        // target: 'http://h5-test.test.lemobar.cn',//内网测试
        target: 'http://testsgcc.xinhuaapp.com:19002', //本地测试环境
        pathRewrite: {},
        changeOrigin: true,
        cookieDomainRewrite: ''
}


```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
