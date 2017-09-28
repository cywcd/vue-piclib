# vue-pic

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

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Screenshot

![开屏页](https://github.com/cywcd/vue-piclib/blob/master/static/img/pic01.png) 
![影像图集](https://github.com/cywcd/vue-piclib/blob/master/static/img/pic02.png) 
![精彩光影推荐](https://github.com/cywcd/vue-piclib/blob/master/static/img/pic04.png)
![关于我们](https://github.com/cywcd/vue-piclib/blob/master/static/img/pic07.png)

## 总结 

> 1.npm在国内的网络环境下可能会比较慢，解决方案： 

使用淘宝镜像:

1>.官方网址：http://npm.taobao.org； 

2>.安装，使用config命令：

``` bash
npm config set registry https://registry.npm.taobao.org 
npm info underscore （如果上面配置正确这个命令会有字符串response）
```

> 2.vue项目官方脚手架vue-cli 全局安装 
命令行执行 :
 
``` bash
npm install -g vue-cli    // 加-g是安装到全局 
```

安装完成以后 可以输入命令 ：vue 回车，可以看到针对vue的命令行
![vue的命令行](https://github.com/cywcd/vue-piclib/blob/master/static/img/pic08.png)


换了国内镜像，安装速度就很快了  

> 3.初始化项目，使用webpack打包   

执行命令： vue init webpack vuePic  
执行之后将会 自动初始化一个文件夹 ：vuePic  
![初始化项目命令](https://github.com/cywcd/vue-piclib/blob/master/static/img/pic09.png) 

打开vuePic文件夹 可以看到 已经初始化好了 一个基础的项目： 
![基础项目目录](https://github.com/cywcd/vue-piclib/blob/master/static/img/pic10.png) 

package.json 已经默认配置好相关应用   


> 4.解决跨域（用nodejs代理转发请求） 

请求写的 url 是 '/api' ，这不是真实的接口地址，   
假设你的域名为 http://localhost:8080，那么它请求的地址即为 http://localhost:8080/api  
这个 /api 默认是不存在的，现在我们配置一下 nodejs ，让它为我们转发请求   


假设，我需要请求的接口的入口为 http://www.xxx.com/api  
修改 /config/index.js 配置文件，修改 dev 选项下 proxyTable 的值为如下   

``` bash
proxyTable: {
    '/api': {
        target: 'http://www.xxx.com/',
        changeOrigin: true
    }
},
```

PS：这里使用的是一个叫 http-proxy-middleware 的 nodejs 中间件，系统已默认为我们集成，直接配置就好了   
上面的配置的意思是：遇到从域名和端口以后，以 '/api'开头的 http请求，自动转发到 target （目标）url 地址去，实际请求地址就是 target + '/api' 

需要注意的是，假设，你需要请求的接口的入口为 http://www.xxx.com/imapi，而代码里请求的 url 写的是 '/api'，则你需要使用 pathRewrite 来进行路径重写，而不是直接改 traget，proxyTable 的值为如下   

``` bash
proxyTable: {
    '/api': {
        target: 'http://www.xxx.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/imapi'
        }
    }
},
```

> 5.项目引用zeptojs库，手动安装webpack-zepto   

安装命令：  

``` bash
npm i webpack-zepto -g  //全局安装  
npm i webpack-zepto --save  //本地安装  
```

--save 和 --save-dev 的区别：    
--save 会把依赖包名称添加到 package.json 文件 dependencies 键下  
--save-dev 则添加到 package.json 文件 devDependencies 键下   

不过这只是它们的表面区别。它们真正的区别是，devDependencies 下列出的模块，是我们开发时用的，它们不会被部署到生产环境。  
dependencies 下的模块，则是我们生产环境中需要的依赖。     
 
也可以手动配置:   
package.json dependencies键下和devDependencies键下 添加 "webpack-zepto": "0.0.1"   

项目中引用： 

``` bash
import $ from 'webpack-zepto'
```
> 6.其他

待整理......

