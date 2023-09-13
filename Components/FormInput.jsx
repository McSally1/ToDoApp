import React, { useState } from "react";
import TaskLists from "./TaskLists";

export default function FormInput() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState("");

  //this saves every single change in the input field
  function handleChange(event) {
    const valueInputed = event.target.value;
    setTodoText(valueInputed);
  }

  //handling the submit button
  function handleSubmit(e) {
    e.preventDefault();
    const eachTodo = {
      text: todoText,
      id: Date.now(),
      completed: false,
    };
      if (eachTodo.text.length < 1)
    return;
    setTodos((prev) => [...prev, eachTodo]);
    setTodoText("")
  
  }

  //updating the status of the todolist
  function updateStatus(todoId) {
    const todoIndex = todos.findIndex((todo) => todoId === todo.id);
    if (todoIndex < 0) return;
    const updatedTodo = [...todos];
    updatedTodo[todoIndex].completed = !updatedTodo[todoIndex].completed;
    setTodos(updatedTodo);
  }
  //handling delete function
  function deleteTodo(todoId) {
    const updatedTodo = [...todos].filter((todo) => todo.id !== todoId);
    setTodos(updatedTodo);
  }
  //handling edit function
  function handleEdit(e) {
    e.preventDefault();
    const editedIndex = todos.findIndex((todo) => todo.id === editTodoId);
    if (editedIndex === -1) return;
    const newTodos = [...todos];
    newTodos[editedIndex].text = todoText;
    setTodos(newTodos);
    setEditTodoId("");
  }

  function handleEditBtnClick(todoId) {
    setEditTodoId(todoId); //why did we have to set this this way?
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setTodoText(todoToEdit.text);
  }

  return (
    <>
      <h1>TinyTot Todo</h1>
      <form>
        <input
          type="text"
          placeholder="Enter Todo"
          onChange={handleChange}
          value={todoText}
        />
        <button onClick={editTodoId ? handleEdit : handleSubmit}>
          {editTodoId ? "Save Todo" : "Add Todo"}
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TaskLists
            todo={todo}
            updateStatus={updateStatus}
            deleteTodo={deleteTodo}
            onEdit={handleEditBtnClick}
            key={todo.id}
          />
        ))}
      </ul>
    </>
  );
}
