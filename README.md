# qingwa
### NodeJs+VueJs 🐸🎞青蛙视频
##全栈项目

服务端技术栈
API服务：Nest.js

客户端技术栈
用户WEB端：Vue.js + Nuxt.js + Vuetify
后台管理WEB端：Vue.js + Element

启动项目

后端API：
```
cd server
touch .env # 参照 .env.example 设置参数
nest start -w admin  # 后台管理API服务
nest start -w server  # 用户WEB端API服务
```

后台管理系统：
```
cd admain
touch .env.local # 参照.env 设置参数
yarn serve  
```

用户WEB端
```
cd web
touch .env # 参照 .env.example 设置参数
yarn dev
```
