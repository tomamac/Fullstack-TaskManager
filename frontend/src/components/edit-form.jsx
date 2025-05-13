import { useState } from "react";

function Editform({ selectedTask, handleEditTask }) {
  const [title, setTitle] = useState(selectedTask.title);

  function submitForm(e) {
    e.preventDefault();

    handleEditTask(title);
  }

  if (!selectedTask) return;
  return (
    <div className="form-container">
      <h2>Edit Task</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="title"
          className="row"
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <button className="submit" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default Editform;
