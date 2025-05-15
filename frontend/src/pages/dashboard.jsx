import "../styles/dashboard.css";
import TodoCard from "../components/todo-card";
import Modal from "../components/modal";
import Editform from "../components/edit-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackDispatch } from "../contexts/snackcontext";

function Dashboard() {
  const snackdispatch = useSnackDispatch();
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get(
          "https://taskit-tasks.onrender.com/api/tasks",
          // "http://localhost:8002/api/tasks",
          {
            withCredentials: true,
          }
        );

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
        "https://taskit-tasks.onrender.com/api/tasks",
        // "http://localhost:8002/api/tasks",
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

  async function handleEditModal(taskid) {
    try {
      const res = await axios.get(
        `https://taskit-tasks.onrender.com/api/tasks/${taskid}`,
        // `http://localhost:8002/api/tasks/${taskid}`,
        {
          withCredentials: true,
        }
      );

      setSelectedTask(res.data.task);
      setIsModalOpen(true);
      console.log(res.data);
    } catch (error) {
      snackdispatch({
        type: "show",
        message: "มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง",
      });
      console.log(error);
    }
  }

  async function handleEditTask(title) {
    if (!selectedTask) return;

    try {
      const res = await axios.put(
        `https://taskit-tasks.onrender.com/api/tasks${selectedTask.id}`,
        // `http://localhost:8002/api/tasks/${selectedTask.id}`,
        { title: title, isDone: selectedTask.isDone },
        { withCredentials: true }
      );

      setTasks(
        tasks.map((task) => {
          return task.id === selectedTask.id
            ? { ...task, title: title, isDone: selectedTask.isDone }
            : task;
        })
      );

      setSelectedTask(null);
      setIsModalOpen(false);
      snackdispatch({
        type: "show",
        message: "อัพเดท task เรียบร้อยแล้ว",
      });
      console.log(res.data);
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
        `https://taskit-tasks.onrender.com/api/tasks${taskid}`,
        // `http://localhost:8002/api/tasks/${taskid}`,
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
              placeholder="เพิ่ม task ใหม่ที่นี่"
              required
              style={{ paddingLeft: "10px" }}
            />
            <button className="add" type="submit">
              เพิ่ม Task
            </button>
          </form>
        </div>
        <div className="card-container">
          {tasks.map((task) => (
            <TodoCard
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleEditModal={handleEditModal}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Editform selectedTask={selectedTask} handleEditTask={handleEditTask} />
      </Modal>
    </>
  );
}

export default Dashboard;
