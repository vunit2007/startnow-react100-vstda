import React, { Component } from "react";

const EditScreen = props => {
  console.log(props.allTodoProperties);
  return (
    <div>
      <div className="edit-box">
        <div className="box-wrapper">
          <h6>Description</h6>
          <textarea cols="40" rows="5" name="myname" defaultValue={props.allTodoProperties.text} onChange={props.changedText} />
        </div>
        <div className="box-wrapper">
          <h6>How much of a priority is this?</h6>
          <div className="form-check">
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
        </div>
        <div className="save-button">
          <button type="submit" className="save" name="submit" onClick={props.handleSaved}>
            <i className="fas fa-arrow-circle-down" /><span>Save</span>
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
      priority = "medium-list";
    } else if (this.props.todo.priority === "high") {
      priority = "high-list";
    } else {
      priority = "low-list";
    }

    if (this.props.todo.isEditing === true) {
      return <EditScreen allTodoProperties={this.props.todo} handleSaved={this.handleSaved} changedText={this.changedText} changedPriority={this.changedPriority} />;
    } else {
      return (
        <div>
          <div className={`alert ${priority}`} role="alert" id="success">
            {" "}
            <input type="checkbox" /><span>
              {this.props.todo.text}</span>
            <div className="edit-delete">
              <button
                type="button"
                onClick={this.handleEdit}
              >
                <i className="fas fa-pencil-alt" />
              </button>
              <button
                type="button"
                onClick={this.handleDelete} >
                <i className="far fa-trash-alt" />
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Alert;
