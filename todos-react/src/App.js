import React, { Component,Fragment} from 'react';
//此刻应使用相对路径
import './App.css';
import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem';

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

    //添加任务
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
        //异步函数
        this.setState({todos: this.state.todos});
    }

    //删除一个任务
    deleteTodo(index) {
        const list = [...this.state.todos];
        list.splice(index, 1);
        this.setState({todos: list});
    }

    //删除所有任务
    deleteAllTodo() {
        const list = [...this.state.todos];
        let todos = list.filter(item => !item.isCheck);
        this.setState({todos: todos});
    }

    //改变按钮状态
    changeTodoState(item, state) {
        //console.log(index,state);
        const list = [...this.state.todos];
        list.forEach(i => {
            if(i.todoItem === item)
                i.isCheck = !state;
        });
        this.setState({todos: list});
    }

    //获取当前页面路由
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            let onState = window.location.hash.slice(2) || 'all';
            //console.log('被调用了');
            this.setState({nowShowing: onState})
        })
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
