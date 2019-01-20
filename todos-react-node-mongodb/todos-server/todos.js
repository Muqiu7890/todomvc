const mongoose = require('mongoose')
var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost/test',(err)=> {
    if (err) {
        console.log("连接失败");
    } else {
        console.log("连接成功");
    }
})

let todoSchema = new mongoose.Schema({
    todoItem: {
        type: String,
        required: true
    },
    isCheck: {
        type: Boolean,
    },
    key: {
        type: Number,
    },
});

module.exports = mongoose.model('Todo',todoSchema)