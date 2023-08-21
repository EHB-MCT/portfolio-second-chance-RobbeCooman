import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Podcasts = () => {
  // State for storing the list of podcasts and new podcast input values
  const [podcasts, setPodcasts] = useState([]);
  const [newPodcastTitle, setNewPodcastTitle] = useState('');
  const [newPodcastDescription, setNewPodcastDescription] = useState('');

  useEffect(() => {
    // Fetch the list of podcasts
    fetchPodcasts();
  }, []);

  /**
   * Fetches the list of podcasts from the server.
   * @returns {void}
   */
  const fetchPodcasts = () => {
    fetch('http://localhost:8000/api/podcasts')
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error('Error fetching podcasts:', error));
  };

  /**
   * Handles adding a new podcast.
   * @returns {void}
   */
  const handleAddPodcast = () => {
    if (!newPodcastTitle || !newPodcastDescription) {
      alert('Please provide both title and description.');
      return;
    }

    // Send new podcast data to backend
    fetch('http://localhost:8000/api/podcasts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newPodcastTitle,
        description: newPodcastDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Fetch the updated list of podcasts and reset input values
        fetchPodcasts();
        setNewPodcastTitle('');
        setNewPodcastDescription('');
      })
      .catch((error) => console.error('Error adding podcast:', error));
  };

  /**
   * Handles deleting a podcast.
   * @param {number} id - The ID of the podcast to delete.
   * @returns {void}
   */
  const handleDeletePodcast = (id) => {
    fetch(`http://localhost:8000/api/podcasts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Fetch the updated list of podcasts after deletion
        fetchPodcasts();
      })
      .catch((error) => console.error('Error deleting podcast:', error));
  };

  return (
    <div className="podcasts-list">
      <h1>Podcasts</h1>
      <div className="add-podcast-form">
        <h2>Add New Podcast</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPodcastTitle}
          onChange={(e) => setNewPodcastTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={newPodcastDescription}
          onChange={(e) => setNewPodcastDescription(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddPodcast}>
          Add Podcast
        </button>
      </div>

      <ul className="podcast-items">
        {podcasts.map((podcast) => (
          <li key={podcast.id} className="podcast-item">
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
            <button
              className="delete-btn"
              onClick={() => handleDeletePodcast(podcast.id)}
            >
              Delete Podcast
            </button>
            <Link to={`/edit-podcast/${podcast.id}`}>
              <button className="edit-btn">Edit Podcast</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Podcasts;
