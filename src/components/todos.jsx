import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";

toast.configure();

const endPoint = "https://jsonplaceholder.typicode.com/todos";
export default class Todos extends Component {
  state = {
    todos: [],
    newArray: [],
    pageSize: 10,
    currentPage: 1,
    selectCategory: [],
  };

  handleGetData = async () => {
    try {
      const { data: todos } = await axios.get(endPoint);
      this.setState({ todos });
    } catch (err) {
      console.log("CATCH block");
      if (err.response.status === 404) return toast("Ma'lumotlar topilmadi");
  };
}

  handleAdd = async () => {
    const body = { title: "title-a", body: "my title body" };
    const { data: todo } = await axios.post(endPoint, body);
    this.setState(({ todos }) => ({ todos: [todo, ...todos] }));
  };

  handleUpdate = async (todo) => {
    const { todos } = this.state;
    todo.title = "new title";
    const data = todo;
    await axios.put(endPoint + `/${todo.id}`, data);

    const index = todos.indexOf(todo);
    todos[index] = { ...todo };
    this.setState({ todos });
  };

  handleDelete = async (todoId) => {
    const orginalTodos = this.state.todos;
    try {
      const todos = this.state.todos.filter((todo) => todo.id !== todoId);
      this.setState({ todos });
      axios.delete(endPoint + `/${todoId}`);
    } catch (err) {
      toast(err.message);
      this.setState({ todos: orginalTodos });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSelectCategory = (selectCategory) => {
    this.setState({
      selectCategory,
      currentPage: 1,
    });
  };

  componentDidMount(){
    this.handleGetData()
  };

  searchOnChange = (e) => {
    const { todos } = this.state;
    let newArray = todos.filter((d) => {
      let searchValue = d.title.toLowerCase();
      return searchValue.indexOf(e.target.value) !== -1;
    });
    this.setState({ todos: newArray });
  };

  render() {
    const { todos, currentPage, pageSize } = this.state;
    const count = todos.length;

    const paginated = paginate(todos, currentPage, pageSize);
    return (
      <>
        <h2 className="text-center">Todos</h2>
        <div className="col d-flex my-3 align-items">
          <div className="col-md-2">
            <button className="btn-sm btn-success" onClick={this.handleAdd}>
              Add Post
            </button>
          </div>
          <input
            className="form-control search-btn"
            placeholder="Search..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={this.state.value}
            onChange={this.searchOnChange.bind(this)}
          />
        </div>
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
            {paginated.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "👆" : "👇"}</td>
                <td>
                  <button
                    className="btn-sm btn-primary mx-2"
                    onClick={() => this.handleUpdate(todo)}
                  >
                    {" "}
                    Update
                  </button>
                  <button
                    className="btn-sm btn-danger"
                    onClick={() => this.handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          countItems={count}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  };
};