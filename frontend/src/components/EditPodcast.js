import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPodcast = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate(); 
  const setPodcast = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    // Fetch podcast details
    fetch(`http://localhost:8000/api/podcasts/${podcastId}`)
      .then((response) => response.json())
      .then((data) => {
        // Update with fetched podcast details
        setPodcast(data);
        setEditedTitle(data.title);
        setEditedDescription(data.description);
      })
      .catch((error) =>
        console.error('Error fetching podcast details:', error)
      );
  });

  const handleEditPodcast = () => {
    if (!editedTitle || !editedDescription) {
      alert('Please provide both title and description.');
      return;
    }

    // Send edited podcast data to backend
    fetch(`http://localhost:8000/api/podcasts/${podcastId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editedTitle,
        description: editedDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the podcasts list
        navigate('/');
      })
      .catch((error) => console.error('Error editing podcast:', error));
  };

  return (
    <div className="edit-podcast">
        <div className="edit-container">
          <h1>Edit Podcast</h1>
          <input
            type="text"
            placeholder="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleEditPodcast}>Save Changes</button>
        </div>

    </div>
  );
};

export default EditPodcast;
