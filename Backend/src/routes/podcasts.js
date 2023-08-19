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

// GET episodes of a specific podcast
router.get('/:id/episodes', async (req, res) => {
  const podcastId = req.params.id;
  
  try {
    const episodes = await db('episodes')
      .where('podcast_id', podcastId)
      .select('*');
    res.json(episodes);
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

// POST a new episode for a specific podcast
router.post('/:id/episodes', async (req, res) => {
  const podcastId = req.params.id;
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const [newEpisode] = await db('episodes')
      .insert({ podcast_id: podcastId, title, description })
      .returning('*');
    res.json(newEpisode);
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
  
// PUT (update) an episode of a podcast
router.put('/:podcastId/episodes/:episodeId', async (req, res) => {
    const podcastId = req.params.podcastId;
    const episodeId = req.params.episodeId;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
  
    try {
      const [updatedEpisode] = await db('episodes')
        .where('podcast_id', podcastId)
        .andWhere('id', episodeId)
        .update({ title, description })
        .returning('*');
  
      if (!updatedEpisode) {
        return res.status(404).json({ error: 'Episode not found' });
      }
  
      res.json(updatedEpisode);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// DELETE an episode of a podcast
router.delete('/:podcastId/episodes/:episodeId', async (req, res) => {
    const podcastId = req.params.podcastId;
    const episodeId = req.params.episodeId;
  
    try {
      const deletedEpisode = await db('episodes')
        .where('podcast_id', podcastId)
        .andWhere('id', episodeId)
        .del();
  
      if (!deletedEpisode) {
        return res.status(404).json({ error: 'Episode not found' });
      }
  
      res.json({ message: 'Episode deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
