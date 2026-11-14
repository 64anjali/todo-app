import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
  const { id } = useParams();
  const [ taskName, setTaskName ] = useState("");
  const [ date, setDate ]= useState("");
  const [ status, setStatus ]= useState("not-completed");

  const navigate = useNavigate();
  useEffect(() => {
  if (id) {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/task/${id}`);

        if (!response.ok) {
          throw new Error("Task not found");
        }

        const data = await response.json();

        setTaskName(data.title);
        setDate(data.date);
        setStatus(data.completed ? "completed" : "not-completed");

      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch task");
      }
    };

    fetchTask();
  }
}, [id]);

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!taskName.trim() || !date) {
    toast.error("Please fill all required fields");
    return;
  }

  const newTask = {
    title: taskName,
    date: date,
    completed: status === "completed"
  };

  try {
    const response = await fetch(
      id
        ? `http://localhost:3000/task/${id}`
        : "http://localhost:3000/task",
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      }
    );

    if (response.ok) {
      toast.success(
        id ? "Task updated successfully!" : "Task added successfully!"
      );
      navigate("/");
    } else {
      toast.error("Failed to save task");
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="add-task-container">
      <div className="add-task-card">
        <h2>{id ? "Edit Task" : "Add New Task"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input
              id="taskName"
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              placeholder="Enter task name"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="not-completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="btns">
            <button className="submit-btn" type="submit">{id ? "Update Task" : "Submit"}
            </button>
            <button className="cancel-btn" type="button"onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
