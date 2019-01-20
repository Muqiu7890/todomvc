const express = require('express');
const fs = require('fs');
//数据库 任务列表
const Todo = require('./todos');

//Express提供了一种更好的方式 专门由来包装路由
//1.创建一个路由容器
const router = express.Router();

//2.把路由都挂载到 router 路由容器中

/*
 * 获取全部的任务项
 */
router.get('/todos/all',function (req,res) {
    Todo.find({},'todoItem isCheck key', function (err,data) {
        if (err) return handleError(err);
        //console.log(data);
        res.send(data);
    })

})

/*
 * 添加任务项
 */
router.post('/todos/add',function (req,res) {
    //获取数据
    const todo = req.body
    Todo.create(todo, function (err, small) {
        if (err) return handleError(err);
    });
        res.status(200).send(todo)
})

/*
 * 删除一个任务项
 */
router.post('/todos/delete',function (req,res) {
        Todo.deleteOne({key: req.body.key},function (err) {
        if(err) {
            return res.status(500).send('server error')
        }
        res.status(200).send('delete success.')
    })
})

//状态切换
router.post('/todos/edit',function (req,res) {
    //console.log(req.body);
    Todo.findOneAndUpdate({todoItem: req.body.todoItem},{isCheck: !req.body.isCheck},function (err,raw) {
        if(err) {
            return res.status(500).send('server error')
        }
        res.status(200).send('edit success.')
    })

})

//删除所有任务项
router.get('/todos/deleteAll',function (req,res) {
    Todo.deleteMany({isCheck: true},function (err) {
        if(err) {
            return res.status(500).send('server error')
        }
        res.status(200).send('delete success.')
    })
})



module.exports = router