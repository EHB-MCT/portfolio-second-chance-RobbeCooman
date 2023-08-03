import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
    completed: false,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/tasks/${taskId}`)
      .then((response) => response.json())
      .then((data) => setTask(data))
      .catch((error) => console.error('Error fetching task details:', error));
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleEditTask = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then(() => {
        return <Link to={`/${taskId}`} />;
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleEditTask}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleInputChange}
            required
          />
        </div>
        <Link to={`/${taskId}`}>
        <button type="submit">Save Changes</button>
        </Link>
        <Link to={`/${taskId}`}>
          <button className="delete-btn">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditTask;
