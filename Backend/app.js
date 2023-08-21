const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/db');
const router = express.Router();


app.use(cors());
app.use(express.json());

app.use('/api/podcasts', router);

app.use(express.static('docs'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/**
 * @returns {Array} List of podcast objects
 */
router.get('/', async (req, res) => {
  try {
    const podcasts = await db('podcasts').select('*');
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @param {string} id - The ID of the podcast
 * @returns {Object} The podcast object
 */
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

/**
 * @param {string} title - Title of the podcast
 * @param {string} description - Description of the podcast
 * @returns {Object} The newly created podcast object
 */
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

/**
 * @param {string} id - The ID of the podcast
 * @param {string} title - New title of the podcast
 * @param {string} description - New description of the podcast
 * @returns {Object} The updated podcast object
 */
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

/**
 * @param {string} id - The ID of the podcast
 * @returns {Object} A success message
 */
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
