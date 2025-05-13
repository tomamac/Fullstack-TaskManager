import "../styles/todocard.css";

function TodoCard({ task, handleDeleteTask, handleEditModal }) {
  return (
    <div className="row card">
      <p className="col title">{task.title}</p>
      <div className="col-auto">
        <button className="edit" onClick={() => handleEditModal(task.id)}>
          แก้ไข
        </button>
        <button
          className="delete"
          onClick={() => {
            handleDeleteTask(task.id);
          }}
        >
          ลบ
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
