function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}





















import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getPriorities } from "../services/priorityService";
import { getStatus } from "../services/statusService";
import { getTask, saveTask } from "./../services/tasksDatabase";

class BugForm extends Form {
  state = {
    data: { title: "", owner: "", priorityId: "", statusId: "", createdAt: "" },
    status: [],
    priorities: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .max(50)
      .label("Title"),
    owner: Joi.string()
      .required()
      .max(50)
      .label("Owner"),
    statusId: Joi.string()
      .required()
      .label("Status"),
    priorityId: Joi.string()
      .required()
      .label("Priority")
  };

  async populatePrioritiesAndStatus() {
    const { data: priorities } = await getPriorities();
    const { data: status } = await getStatus();
    this.setState({ priorities, status });
  }

  async populateTasks() {
    const taskId = this.props.match.params.id;

    if (taskId === "new") return;
    try {
      const { data: task } = await getTask(taskId);

      this.setState({ data: this.mapToViewModel(task) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/notFound");
    }
  }

  async componentDidMount() {
    await this.populatePrioritiesAndStatus();
    await this.populateTasks();
  }

  mapToViewModel(task) {
    return {
      _id: task._id,
      title: task.title,
      owner: task.owner,
      priorityId: task.priority._id,
      statusId: task.status._id
    };
  }

  doSubmit = async () => {
    await saveTask(this.state.data);
    this.props.history.push("/bugs");
  };
  render() {
    return (
      <div>
        <h1>Bug Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("statusId", "Status", this.state.status)}
          {this.renderSelect("priorityId", "Priority", this.state.priorities)}
          {this.renderInput("owner", "Owner")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BugForm;
