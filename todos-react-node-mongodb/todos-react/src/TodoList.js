import React,{Component} from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);

        //创建refs
        this.delButton = React.createRef();
    }

    handlerDeleteIt(key) {
        this.props.deleteTodo(key);
    }

    //改变任务状态
    handlerChange(item) {
        let isCheck = this.props.item.isCheck;
        this.props.changeTodoState(item,isCheck);
    }

    handlerMouseOver() {
        this.delButton.current.style.display = 'inline-block';
    }

    handlerMouseOut() {
        this.delButton.current.style.display = 'none';
    }

    render() {
        return (
                <li key={this.props.index} id={this.props.index} onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
                    <input className="toggle" type="checkbox" checked={this.props.item.isCheck} onChange={this.handlerChange.bind(this,this.props.item.todoItem)}/>
                    <label className={this.props.item.isCheck ? 'task-done' : ''}>{this.props.item.todoItem}</label>
                    <button className="destroy"
                            ref={this.delButton}
                            onClick={this.handlerDeleteIt.bind(this, this.props.item.key)}
                    >x</button>
                </li>
        );
    }
}

export default TodoList;
