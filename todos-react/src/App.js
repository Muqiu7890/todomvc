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
            actTodos:[]
        };

        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.deleteAllTodo = this.deleteAllTodo.bind(this);
    }

    //添加任务
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
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
    changeTodoState(index, state) {
        const list = [...this.state.todos];
        list[index].isCheck = state;
        this.setState({todos: list});
    }

    //路由切换
    // stateToggel(filterstate) {
    //     const todos = this.state.todos;
    //     todos.filter(item => {
    //         switch (filterstate) {
    //             case 'active':
    //                 return !item.isCheck;
    //             case 'completed':
    //                 return item.isCheck;
    //             default:
    //                 return true;
    //         }
    //     });
    // }

    //按钮切换


        render() {
        let info = {
            leftCount: this.state.todos.filter((item) => !item.isCheck).length,
            completedCount: this.state.todos.filter((item) => item.isCheck).length
        };
            //展示的内容 只能返回一个父元素
            return (
                <div>
                    <div className="title">todos</div>
                    <TodoItem todos={this.state.todos}
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
