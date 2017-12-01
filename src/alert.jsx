import React, { Component } from "react";

const EditScreen = props => {
  console.log(props.allTodoProperties);
  return (
    <div>
      <div className="editBox">
        <h4 className="card-title">Description</h4>
        <textarea cols="40" rows="5" name="myname" defaultValue={props.allTodoProperties.text} onChange={props.changedText}/> 
       

        <h4 className="card-title">How much of a priority is this?</h4>

        <div className="form-check" id="priorities">
          <div className="high">
            <label className="form-check-label">
              <input
                type="radio"
                name="priority"
                value="high"
                className="form-check-input"
                defaultChecked={
                  //If todo priority is high, make sure this one is checked
                  (props.allTodoProperties.priority === 'high' ? 'checked' : '')
                }
                onChange={props.changedPriority}
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
                defaultChecked={
                  //If todo priority is medium, make sure this one is checked
                  (props.allTodoProperties.priority === 'medium' ? 'checked' : '')
                }
                onChange={props.changedPriority}
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
                defaultChecked={
                  //If todo priority is low, make sure this one is checked
                  (props.allTodoProperties.priority === 'low' ? 'checked' : '')
                }
                onChange={props.changedPriority}
              />
              Low
            </label>
          </div>
        </div>
        <br />
        <div className="calculateClass">
          <button type="calculate" name="submit" onClick={props.handleSaved}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      newText: "",
      newPriority: "",
    };
    
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSaved = this.handleSaved.bind(this);
    this.changedText = this.changedText.bind(this);
    this.changedPriority = this.changedPriority.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(e) {
    this.props.onEdit(this.props.todoId);
  }

  handleSaved(e) {
    //this.props.onEdit(this.props.todoId, this.state);
    this.props.onSaved(this.props.todoId, this.state.newText, this.state.newPriority)
  
  }

  handleDelete(e) {
   this.props.onDelete(this.props.todoId)
  }

  changedText(e) {
    this.setState({
      newText: e.target.value
    });
  }

  changedPriority(e) {
    console.log('changedPriority', e.target.value);
    this.setState({
      newPriority: e.target.value
    });
  }

  render() {
    let priority = null;
    if (this.props.todo.priority === "medium") {
      priority = "alert-warning";
    } else if (this.props.todo.priority === "high") {
      priority = "alert-danger";
    } else {
      priority = "alert-success";
    }

    if (this.props.todo.isEditing === true) {
      return <EditScreen allTodoProperties={this.props.todo} handleSaved={this.handleSaved} changedText={this.changedText} changedPriority={this.changedPriority} />;
    } else {
      return (
        <div>
          <div className={`alert ${priority}`} role="alert" id="success">
            <p>
              {" "}
              <input type="checkbox" />
              {this.props.todo.text}
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleEdit}
              >
                Edit
              </button>
              <button className="btn btn-primary" type="button" onClick={this.handleDelete} >
                Delete
              </button>
            </p>
          </div>
        </div>
      );
    }
  }
}

export default Alert;
