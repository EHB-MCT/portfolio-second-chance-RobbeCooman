import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Task = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/tasks/${taskId}`)
      .then((response) => response.json())
      .then((data) => setTask(data))
      .catch((error) => console.error('Error fetching task details:', error));
  }, [taskId]);

  const handleDeleteTask = () => {
    fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        window.location.href = '/'; 
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="task-details">
      {task ? (
        <div className="task-container">
          <h1>{task.title}</h1>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Deadline:</strong> {task.deadline}</p>
          <div className="button-container">
            <Link to={`/edit/${taskId}`}>
              <button className="edit-btn">Edit Task</button>
            </Link>
            <button className="delete-btn" onClick={handleDeleteTask}>
              Delete Task
            </button>
            <Link to="/">
              <button className="back-btn">Back to Tasks</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default Task;
