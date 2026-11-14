import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const TodoList = () => {
  const [tasks, setTasks]=useState([]);
  const navigate = useNavigate();
 
  const toggleTask=async(id)=>{
    const task=tasks.find(t=>t.id===id);
    console.log("toggleid",id)
    try{
      const response=await fetch(`http://localhost:3000/task/${id}`,{
        method:"PATCH",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({completed:!task.completed})
      });
      if(response.ok){
        alert("Task Status Changed");
        fetchTasks();
      }
    }catch(err){
      console.log(err);
    }
  }
  const deleteTask=async(id)=>{
    console.log(id, "id for delete")
    try{
      const response=await fetch(`http://localhost:3000/task/${id}`,{
        method:"DELETE",
      });
      toast.success("Data deleted successfully");
      fetchTasks();

    }catch(err){
      console.log(err)
    }
  }

const fetchTasks=async ()=>{
      try{
        const response=await fetch("http://localhost:3000/task");
        const data=await response.json();
        setTasks(data);

      }catch(err){
        console.log(err)
      }
    }


  useEffect(()=>{
    fetchTasks();
  },[]);

  return (
    <div className='todolist-container'>
      <h2>Task List</h2>
      {tasks.length===0?(
        <p className="no-task">No task yet. Create task to get started</p>
      ):(
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task)=>(
              <tr key={task.id}>
                <td className={`status ${task.completed?"line":"not-line"}`}>{task.title}</td>
                <td>{task.date}</td>
                <td>
                  <span className={`status ${task.completed?"done":"pending"}`}>{task.completed?'Completed':'Pending'}</span>
                </td>
                <td>
                  <button className='toggle-btn' onClick={()=>toggleTask(task.id)}>{task.completed?"Undo":"complete"}</button>
                  <button className='delete-btn' onClick={()=>deleteTask(task.id)}>Delete</button>
                  <button className='edit-btn' onClick={()=>navigate(`/edit-task/${task.id}`)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TodoList
