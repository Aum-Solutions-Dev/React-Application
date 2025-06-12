import React from "react";
import PropTypes from "prop-types";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const handleCheckboxChange = () => {
    onToggle(todo.todoId);
  };

  return (
    <div>
      <p className={todo.isCompleted ? "completed" : ""}>Title: {todo.title}</p>
      <p className={todo.isCompleted ? "completed" : ""}>
        Description: {todo.desc}
      </p>
      <div>
        <div>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={handleCheckboxChange}
          />
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(todo)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {};

TodoItem.defaultProps = {};

export default TodoItem;
