import React, {Component} from 'react';

class TodoFooter extends Component {
    constructor(props) {
        super(props)

        this.clearAll = this.clearAll.bind(this);
        this.willTodo = this.willTodo.bind(this);
    }

    willTodo() {
        this.props.active();
    }

    clearAll() {
       this.props.deleteAllTodo();
    }

    render() {
        return (
            <div className="todoFooter">
                <span className="todo-count"><strong>{this.props.leftCount}</strong> item left</span>
                <ul className="filters">
                    <li>
                        <a href="#/">All</a>
                    </li>
                    <li>
                        <a href="#/active">Active</a>
                    </li>
                    <li>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                { this.props.completedCount > 0 &&
                <div type="button"
                     onClick={this.clearAll}
                     className="clear-completed">Clear completed</div>
                }
            </div>

        );
    }
}

export default TodoFooter;
