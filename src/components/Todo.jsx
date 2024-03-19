import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo, deleteTodo } from "../slice/todosSlice";
import {
  useToggleTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../slice/apiSlice";

const Todo = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [cancelBtn, setCancelBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [deleteBtn, setDeleteBtn] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [update] = useUpdateTodoMutation();
  const [toggle] = useToggleTodoMutation();
  const [del] = useDeleteTodoMutation();
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditBtn(false);
    setDeleteBtn(false);
    setUpdateBtn(true);
    setCancelBtn(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditBtn(true);
    setDeleteBtn(true);
    setUpdateBtn(false);
    setCancelBtn(false);
    setIsEditing(false);
  };

  const handleToggle = () => {
    setCompleted(!completed);
    toggle(todo);
    dispatch(toggleTodo(todo));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    update({ ...todo, title: updatedTitle });
    dispatch(updateTodo({ ...todo, title: updatedTitle }));
    setEditBtn(true);
    setDeleteBtn(true);
    setUpdateBtn(false);
    setCancelBtn(false);
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    del(todo._id);
    dispatch(deleteTodo(todo._id));
  };

  return (
    <form className="flex items-center gap-4 flex-wrap">
      <input
        type="checkbox"
        name="complete"
        id={`complete-${todo._id}`}
        checked={completed}
        onChange={handleToggle}
      />
      {isEditing ? (
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      ) : (
        <h3 className={completed ? "line-through" : null}>{todo.title}</h3>
      )}
      {editBtn && (
        <button
          className="bg-blue-700 py-2 px-4 text-white rounded-xl"
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
      {deleteBtn && (
        <button
          className="bg-red-700 py-2 px-4 text-white rounded-xl"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
      {updateBtn && (
        <button
          className="bg-green-700 py-2 px-4 text-white rounded-xl"
          onClick={handleUpdate}
        >
          Update
        </button>
      )}
      {cancelBtn && (
        <button
          className="bg-red-700 py-2 px-4 text-white rounded-xl"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Todo;
