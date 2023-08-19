const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all podcasts
router.get('/', async (req, res) => {
  try {
    const podcasts = await db('podcasts').select('*');
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a podcast by ID
router.get('/:id', async (req, res) => {
  const podcastId = req.params.id;

  try {
    const podcast = await db('podcasts').where('id', podcastId).first();
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    res.json(podcast);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new podcast
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const [newPodcast] = await db('podcasts')
      .insert({ title, description })
      .returning('*');
    res.json(newPodcast);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// PUT (update) a podcast
router.put('/:id', async (req, res) => {
    const podcastId = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
  
    try {
      const [updatedPodcast] = await db('podcasts')
        .where('id', podcastId)
        .update({ title, description })
        .returning('*');
  
      if (!updatedPodcast) {
        return res.status(404).json({ error: 'Podcast not found' });
      }
  
      res.json(updatedPodcast);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// DELETE a podcast
router.delete('/:id', async (req, res) => {
    const podcastId = req.params.id;
  
    try {
      const deletedPodcast = await db('podcasts').where('id', podcastId).del();
  
      if (!deletedPodcast) {
        return res.status(404).json({ error: 'Podcast not found' });
      }
  
      res.json({ message: 'Podcast deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
module.exports = router;
