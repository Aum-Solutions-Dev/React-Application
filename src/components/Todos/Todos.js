import React from "react";
import TodoItem from "../TodoItem/TodoItem";

const Todos = ({ todos, onDelete, setTodos }) => {
  // let myStyle = {
  //   minHeight: "20vh",
  //   margin: "10px auto",
  // };

  const onToggle = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.todoId === todoId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };

  return (
    <div className="todos-container">
      <h3 className="my-3">Todos List</h3>
      {todos.length === 0
        ? "No todos to display."
        : todos.map((todo) => {
            return (
              <div key={todo.todoId} className="todo-box">
                <TodoItem todo={todo} onDelete={onDelete} onToggle={onToggle} />
                <hr />
              </div>
            );
          })}
    </div>
  );
};

export default Todos;
