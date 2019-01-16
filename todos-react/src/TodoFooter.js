import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class TodoFooter extends Component {
    constructor(props) {
        super(props);

        this.clearAll = this.clearAll.bind(this);
        this.willTodo = this.willTodo.bind(this);
        this.showAll = this.showAll.bind(this);
        this.showActive = this.showActive.bind(this);
        this.showCompleted = this.showCompleted.bind(this);
    }

    willTodo() {
        this.props.active();
    }

    clearAll() {
       this.props.deleteAllTodo();
    }

    showAll() {
        const todos = this.props.todos;
        todos.map((item,index) => document.getElementById(index).style.display = 'block');
    }

    showActive() {
        const todos = this.props.todos;
        todos.map((item,index) =>
            item.isCheck ? document.getElementById(index).style.display = 'none' : document.getElementById(index).style.display = 'block');
    }

    showCompleted() {
        const todos = this.props.todos;
        todos.map((item,index) =>
            !item.isCheck ? document.getElementById(index).style.display = 'none' : document.getElementById(index).style.display ='block');
    }

    render() {
        return (
            <Router>
            <div className="todoFooter">
                <span className="todo-count"><strong>{this.props.leftCount}</strong> item left</span>
                <ul className="filters">
                    <li>
                        <Link to="#/" onClick={this.showAll}>All</Link>
                    </li>
                    <li>
                        <Link to="#/active" onClick={this.showActive}>Active</Link>
                    </li>
                    <li>
                        <Link to="#/completed" onClick={this.showCompleted}>Completed</Link>
                    </li>
                </ul>
                { this.props.completedCount > 0 &&
                <div type="button"
                     onClick={this.clearAll}
                     className="clear-completed">Clear completed</div>
                }
            </div>
            </Router>

        );
    }
}

export default TodoFooter;
