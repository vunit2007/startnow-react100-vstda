import React, { Component } from 'react';
import Alert from './alert';

class App extends Component {
  constructor(props) {
    super(props);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
    let addNote = null;
    if (this.state.todos == "") {
      addNote = "blank-list";
    } else {
      addNote = "";
    }
    return (
      <div className='container-fluid'>
        <header>
          <h1>Seize The Day</h1>
          <p>Get stuff done with this <span className="gray-italic">simple</span> and <span className="gray-italic">easy</span> to use <span className="green-bold">to-do app!</span></p>
        </header>
        <div className='note-wrapper'>
          <section>
            <div className='add-note'>
              <div className='new'>
                <div className="box-wrapper">
                  <h6>I need to:</h6>
                  <textarea
                    placeholder='walk the dog'
                    cols='40'
                    rows='5'
                    name='myname'
                    onChange={this.handleText}
                  />
                </div>
                <div className="box-wrapper">
                  <h6>Priority:</h6>
                  <div className='form-check'>
                    <div className='high'>
                      <label className='form-check-label'>
                        <input
                          type='radio'
                          name='priority'
                          value='high'
                          className='form-check-input'
                          onClick={this.handlePriority}
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
                          onClick={this.handlePriority}
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
                          onClick={this.handlePriority}
                        />
                        Low
                      </label>
                    </div>
                  </div>
                </div>
                <div className='add-button'>
                  <button type='submit' className='add' name='submit' onClick={this.handleTodo}>
                    <i className="fas fa-plus" /><span>Add</span>
                  </button>
                </div>
              </div>
              <div className='top'>
                <a href='#'>
                  <i className="fas fa-chevron-circle-up" />back to the top
                </a>
              </div>
            </div>
          </section>
          <article>
            <div className='date'><span className="day">{this.state.day},</span> {this.state.month} {(new Date().getDate())}, {(new Date().getFullYear())}
            </div>
            <div className='list'>
              <div className={`${addNote}`}></div>
              {this.state.todos.map((todo, index) => (
                <Alert
                  onEdit={this.switchEdit}
                  todo={todo}
                  key={index}
                  todoId={todo.id}
                  onSaved={this.onSaved}
                  onDelete={this.onDelete}
                />
              ))}
              <div className='bottom'>
                <a href='#'>
                  <i className="fas fa-arrow-up"></i>back to the top
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default App;
