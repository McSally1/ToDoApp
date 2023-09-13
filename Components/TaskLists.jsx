export default function TaskLists({ todo, updateStatus, deleteTodo, onEdit }) {
  const styling = todo.completed ? "completed" : "";

  return (
    <>
      <li>
        <span className={`${styling} ellipsis`}>{todo.text}</span>
        <div className="btn-control">
          <button className="btn" onClick={() => updateStatus(todo.id)}>
            {todo.completed ? <>Undo</> : <>&#10004;</>}
          </button>
          <button className="btn" onClick={() => deleteTodo(todo.id)}>
            &#10006;
          </button>
          <button className="btn" onClick={() => onEdit(todo.id)}>
            &#9998;
          </button>
        </div>
      </li>
    </>
  );
}
