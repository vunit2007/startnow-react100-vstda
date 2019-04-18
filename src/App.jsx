import React, { Component } from 'react';
import Alert from './alert';

class App extends Component {
  constructor(props) {
    super(props);
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.state = {
      text: '',
      priority: '',
      todos: [],
      month: months[new Date().getMonth()],
      day: dayOfWeek[new Date().getDay()],
    };

    this.count = 0;
    this.handleText = this.handleText.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.handleTodo = this.handleTodo.bind(this);
    this.switchEdit = this.switchEdit.bind(this);
    this.onSaved = this.onSaved.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleText(e) {
    this.setState({
      text: e.target.value
    });
  }

  handlePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  handleTodo(e) {
    const userText = this.state.text;
    const userPriority = this.state.priority;
    const allTodos = this.state.todos;

    const newTodo = {
      id: this.count++,
      text: userText,
      priority: userPriority,
      isEditing: false
    };

    allTodos.push(newTodo);

    this.setState({
      todos: allTodos
    });
  }

  switchEdit(id, payload) {
    console.log({ payload });

    // Creat a copy of todos
    const allTodos = this.state.todos;

    // figure out (index) how to find ID in todos
    const index = allTodos.findIndex((todo) => {
      if (todo.id === id) return true;
    });

    // update allTodos[index].isEditing to true
    allTodos[index].isEditing = true;

    // Update todos in state with allTodos copy
    this.setState({
      todos: allTodos
    });
  }

  onSaved(id, newText, newPriority) {
    // Creat a copy of todos
    const allTodos = this.state.todos;

    // figure out (index) how to find ID in todos
    const index = allTodos.findIndex((todo) => {
      if (todo.id === id) return true;
    });

    // update allTodos[index].isEditing to true
    allTodos[index].isEditing = false;
    allTodos[index].text = newText;
    allTodos[index].priority = newPriority;

    // Update todos in state with allTodos copy
    this.setState({
      todos: allTodos
    });
  }

  onDelete(id) {
    // Creat a copy of todos
    const index = this.state.todos.findIndex(todo => todo.id === id);
    const allTodos = this.state.todos;
    allTodos.splice(index, 1);

    this.setState({
      todos: allTodos
    });
  }


  render() {
    return (
      <div className='container'>
        <div className='banner'>
          <h1>Seize The Day</h1>
          <p>Track all your tasks on this simple and easy to-do app!</p>
        </div>
        <div className='to-do'>
        <div className="left">
          <div id='sticky-note'>
            <div className='add-new'>
              <h4 className='card-title'>I need to:</h4>
              <textarea
                placeholder='get groceries'
                cols='40'
                rows='5'
                name='myname'
                onChange={ this.handleText }
              />
              <h4 className='card-title'>Priority:</h4>
              <div className='form-check' id='priorities'>
                <div className='high'>
                  <label className='form-check-label'>
                    <input
                      type='radio'
                      name='priority'
                      value='high'
                      className='form-check-input'
                      onClick={ this.handlePriority }
                    />
                    High
                  </label>
                </div>
                <div className='medium'>
                  <label className='form-check-label'>
                    <input
                      type='radio'
                      name='priority'
                      value='medium'
                      className='form-check-input'
                      onClick={ this.handlePriority }
                    />
                    Medium
                  </label>
                </div>
                <div className='low'>
                  <label className='form-check-label'>
                    <input
                      type='radio'
                      name='priority'
                      value='low'
                      className='form-check-input'
                      onClick={ this.handlePriority }
                    />
                    Low
                  </label>
                </div>
              </div>
              <div className='add-button'>
                <button type='calculate' className='add' name='submit' onClick={ this.handleTodo }>
                  <i className='fa fa-plus' /><span>Add</span>
                </button>
              </div>
            </div>
            <div className='top'>
          <a href='#'>
            <i className='fa fa-arrow-circle-o-up' aria-hidden='true' />back to the top
          </a>
        </div>
          </div>
          </div>
          <div className="right">
          <div className='date-title'>{this.state.day}, {this.state.month} {(new Date().getDate())}, {(new Date().getFullYear())}
            </div>
          <div className='list'>
            {this.state.todos.map((todo, index) => (
              <Alert
                onEdit={ this.switchEdit }
                todo={ todo }
                key={ index }
                todoId={ todo.id }
                onSaved={ this.onSaved }
                onDelete={ this.onDelete }
              />
              ))}
              <div className='bottom'>
            <a href='#'>
              <i className='fa fa-arrow-circle-o-up' aria-hidden='true' />back to the top
            </a>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
