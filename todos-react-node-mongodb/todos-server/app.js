/*
 * app.js 入口模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

const app = new express()

app.use('/node_modules/',express.static('./node_modules/'))

//配置模版引擎和 body-parser 一定要在 app.use(router) 之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//allow cros
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//router 挂载到app服务上
app.use(router)

app.listen(5000,function () {
    console.log('running at port 5000')
})

module.exports = app