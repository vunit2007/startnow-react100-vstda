import React, { Component } from "react";
import Alert from "./alert";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      priority: "",
      todos: [],
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
      isEditing: false,
    }

    allTodos.push(newTodo);

    this.setState({
      todos: allTodos
    });
  }

  switchEdit(id, payload) {
    console.log({payload})

    //Creat a copy of todos
    var allTodos = this.state.todos;

    // figure out (index) how to find ID in todos 
    var index = allTodos.findIndex((todo) => {
      if (todo.id === id) return true;
    })


    //update allTodos[index].isEditing to true
    allTodos[index].isEditing = true;

    //Update todos in state with allTodos copy
    this.setState({
      todos: allTodos
    });
  }

  onSaved(id, newText, newPriority) {

    //Creat a copy of todos
    var allTodos = this.state.todos;

    // figure out (index) how to find ID in todos 
    var index = allTodos.findIndex((todo) => {
      if (todo.id === id) return true;
    })


    //update allTodos[index].isEditing to true
    allTodos[index].isEditing = false;
    allTodos[index].text = newText;
    allTodos[index].priority = newPriority;

    //Update todos in state with allTodos copy
    this.setState({
      todos: allTodos
    });

  }

  onDelete(id) {
    
        //Creat a copy of todos
        const index = this.state.todos.findIndex((todo) => todo.id === id);
        var allTodos = this.state.todos;
        allTodos.splice(index, 1);
    
    
        this.setState({
          todos: allTodos
        });
    
      }
    



  render() {
    return (
      <div className="container">
        <div className="banner">
          <h1 className="bannerTitle">Very Simple Todo App</h1>
          <p className="bannerText">Track all of the things</p>
          <br />
        </div>

        <div className="boxLeft">
          <div className="newToDo">Add New Todo</div>
          <div className="toDoBoxBottom">
            <h4 className="card-title">I want to..</h4>
            <textarea
              cols="40"
              rows="5"
              name="myname"
              onChange={this.handleText}
            />

            <h4 className="card-title">How much of a priority is this?</h4>

            <div className="form-check" id="priorities">
              <div className="high">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    className="form-check-input"
                    onClick={this.handlePriority}
                  />High
                </label>
              </div>
              <div className="medium">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="priority"
                    value="medium"
                    className="form-check-input"
                    onClick={this.handlePriority}
                  />Medium
                </label>
              </div>
              <div className="low">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    className="form-check-input"
                    onClick={this.handlePriority}
                  />
                  Low
                </label>
              </div>
            </div>
            <br />
            <div className="calculateClass">
              <button type="calculate" name="submit" onClick={this.handleTodo}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="boxRight">
          <div className="viewToDoRight">View Todos</div>
          <br />
            {this.state.todos.map((todo, index) => {
              return <Alert onEdit={this.switchEdit} todo={todo} key={index} todoId={todo.id} onSaved={this.onSaved} onDelete={this.onDelete} />;
            })}
          </div>
      </div> //container
    );
  }
}

export default App;
