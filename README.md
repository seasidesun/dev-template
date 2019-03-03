## 前端项目-半自动CLI

### 介绍

半自动、快速搭建前端项目，支持vue和静态html

### V3.0

- 自动识别页面路径，多页面、定制化前端页面开发，开袋即食
- 支持vue（v2.x）、html、handlebars
- 内置基础css样式
- 基于webpack：
    - 开发阶段支持dev-server、sourcemap、热更新、控制台日志优化
    - 支持sass，css，postcss（autoprefixer）
    - 代码压缩，拆分js和css文件，生产环境支持hash
    - 静态文件压缩，小文件进行base64

### TODO

- [X] 支持hbs模版引擎
- [ ] 文件云助手（七牛）：从开发到生产
- [ ] 多chunks打包，内置cdn文件支持

### ~~V2.0~~

- remove log system, perhaps [PM2](https://github.com/Unitech/pm2) can help you.
- add `error_handler` to handle errors
- use `hbs` as the views engin

### ~~V1.0~~

- 支持前端，后端开发
- 合并前端服务和api服务

