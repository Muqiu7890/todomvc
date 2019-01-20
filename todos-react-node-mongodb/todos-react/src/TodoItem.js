import React,{Component,Fragment} from 'react';
import TodoList from './TodoList';
import axios from 'axios';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.handlerKeyUp = this.handlerKeyUp.bind(this)
    }

    handlerKeyUp(e) {
        if(e.keyCode == 13) {
            let todoText = e.target.value.trim()
            // console.log(window.location.hash.slice(2));
            if(!todoText.length) {
                //为空
                return
            }

            let todo = {
                todoItem: todoText,
                isCheck: false,
                key: Date.now()
            }

            this.props.addTodo(todo)

            e.target.value = '';

        }
    }

    render() {
        //列表的key值应该定义在数组的上下文中
        // 最好不要使用下标作为 key 值 对性能会产生一定的影响
        //当你在map()方法的内部调用元素时，需要为每一项设置一个独一无二的key值
        //key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，将其作为属性传递
        //子组件是无法读出 props.key
        const listItems = this.props.shownTodos.map((item, index) =>
            <TodoList key={index} className='view'
                item={item} index={index}
                deleteTodo={this.props.deleteTodo}
                changeTodoState={this.props.changeTodoState}
            />
        );

        return (
            <div>
                <input className="new-todo" onKeyUp={this.handlerKeyUp} type="text"
                       placeholder="What needs to be done?"/>
                <ul className="todo-list">
                    {listItems}
                </ul>
            </div>
        );
    }

}

export default TodoItem;
