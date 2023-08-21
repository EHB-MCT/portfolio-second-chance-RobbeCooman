const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

const podcastsRouter = require('./routes/podcasts');

app.use(cors());
app.use(express.json());

/**
 * Mounts the podcasts router under the '/api/podcasts' route.
 * @param {string} path - The URL path to mount the router on
 * @param {express.Router} middleware - The router middleware
 * @returns {void}
 */
app.use('/api/podcasts', podcastsRouter);

app.use(express.static('docs'));

const PORT = process.env.PORT || 8000;

/**
 * Starts the server and listens on the specified port.
 * @param {number} port - The port number to listen on
 * @param {Function} callback - The function to execute once the server is started
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
