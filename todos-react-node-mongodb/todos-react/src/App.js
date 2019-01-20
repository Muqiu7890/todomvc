import React, { Component,Fragment} from 'react';
//此刻应使用相对路径
import './App.css';
import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem';
import axios from 'axios';

//App类继承Component类
class App extends Component {
    constructor(props) {
        super(props);
        //react中定义数据定义在状态中
        this.state = {
            todos: [],
            nowShowing: 'all'
        };

        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.deleteAllTodo = this.deleteAllTodo.bind(this);
    }

    //获取当前页面路由
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            let onState = window.location.hash.slice(2) || 'all';
            //console.log('被调用了');
            this.setState({nowShowing: onState})
        });
        this.getAllItem();
    }

    //获取所有任务
    getAllItem() {
        axios.get('http://localhost:5000/todos/all')
            .then((response) => {
                response.data.map((item) => {
                    return {
                        todoItem: item.todoItem,
                        isCheck: item.isCheck,
                        key: item.key,
                    }
                    });
                this.setState({todos: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //添加任务
    addTodo(todo) {
        //发起请求
        // 注意使用箭头函数 否则this指向为undefined
        // 使用箭头函数 将this指向 App
        axios.post('http://localhost:5000/todos/add', todo)
            .then((response) => {
                this.getAllItem();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //删除一个任务
    deleteTodo(key) {
        let keyCondition = {key : key}
        axios.post('http://localhost:5000/todos/delete', keyCondition)
            .then((response) => {
                this.getAllItem();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //删除所有任务
    deleteAllTodo() {
        axios.get('http://localhost:5000/todos/deleteAll')
            .then((response) => {
                this.getAllItem();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //改变按钮状态
    changeTodoState(item, state) {
        axios.post('http://localhost:5000/todos/edit',{todoItem: item,isCheck: state})
            .then((response) => {
                this.getAllItem();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let shownTodos = this.state.todos.filter(function (todo) {
            switch (this.state.nowShowing) {
                case 'active':
                    return !todo.isCheck;
                case 'completed':
                    return todo.isCheck;
                default:
                    return true;
            }
        }, this);
        let info = {
            leftCount: this.state.todos.filter((item) => !item.isCheck).length,
            completedCount: shownTodos.filter((item) => item.isCheck).length
        };

        //展示的内容 只能返回一个父元素
        return (
            <div>
                <div className="title">todos</div>
                <TodoItem shownTodos={shownTodos}
                          addTodo={this.addTodo}
                          deleteTodo={this.deleteTodo}
                          changeTodoState={this.changeTodoState.bind(this)}
                />
                <TodoFooter
                    todos={this.state.todos}
                    {...info}
                    deleteAllTodo={this.deleteAllTodo}
                />
            </div>
        );
    }
}

export default App;
