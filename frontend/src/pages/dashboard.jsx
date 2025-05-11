import "../styles/dashboard.css";
import TodoCard from "../components/todo-card";
import Modal from "../components/modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackDispatch } from "../contexts/snackcontext";

function Dashboard() {
  const snackdispatch = useSnackDispatch();
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get("http://localhost:8002/api/tasks", {
          withCredentials: true,
        });

        setTasks(res.data.tasks);
        console.log(res.data.tasks);
      } catch (error) {
        snackdispatch({
          type: "show",
          message: "มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง",
        });
        console.log(error);
      }
    }
    fetchTasks();
  }, [snackdispatch]);

  async function handleAddTask(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8002/api/tasks",
        { title: newTask, isDone: false },
        { withCredentials: true }
      );

      setTasks([...tasks, res.data.task]);
      setNewTask("");
      snackdispatch({
        type: "show",
        message: "เพิ่ม task ใหม่แล้ว",
      });
      console.log(res.data.task);
    } catch (error) {
      snackdispatch({
        type: "show",
        message: "มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง",
      });
      console.log(error);
    }
  }

  async function handleDeleteTask(taskid) {
    try {
      const res = await axios.delete(
        `http://localhost:8002/api/tasks/${taskid}`,
        {
          withCredentials: true,
        }
      );

      setTasks(tasks.filter((task) => task.id !== taskid));
      snackdispatch({ type: "show", message: "ลบ Task แล้ว" });
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="content dashboard-container">
        <div className="row">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              placeholder="Add new task here"
              required
              style={{ paddingLeft: "10px" }}
            />
            <button className="add" type="submit">
              Add task
            </button>
          </form>
        </div>
        <div className="card-container">
          {tasks.map((task) => (
            <TodoCard
              key={task.id}
              task={task}
              setSelectedTask={setSelectedTaskId}
              setOpenModal={setIsModalOpen}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}></Modal>
    </>
  );
}

export default Dashboard;
