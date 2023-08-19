const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

const podcastsRouter = require('./routes/podcasts');

app.use(cors());
app.use(express.json());

app.use('/api/podcasts', podcastsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
