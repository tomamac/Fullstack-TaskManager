import "../styles/todocard.css";
import Modal from "../components/modal";
import { useState, useEffect } from "react";

function TodoCard({ task, setSelectedTask, setOpenModal, handleDeleteTask }) {
  function handleEdit() {
    setSelectedTask(task.id);
    setOpenModal(true);
  }

  return (
    <div className="row card">
      <p className="col title">{task.title}</p>
      <div className="col-auto">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="delete"
          onClick={() => {
            handleDeleteTask(task.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
