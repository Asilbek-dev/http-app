import React, { Component } from "react";
import axios from "axios";

export default class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const { data } = response;
        this.setState({ todos: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    const { todos } = this.state;
    return (
      <>
        <h2 className="text-center">Todos</h2>
        <table className="table table-bordered table-hover text-center">
          <thead className="btn-success">
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(({ completed, id, title }, i) => (
              <tr key={id}>
                <td>{i + 1}</td>
                <td>{title}</td>
                <td>{completed ? "👆" : "👇"}</td>
                <td>
                  <button className="btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))};
          </tbody>
        </table>
      </>
    );
  }
}
