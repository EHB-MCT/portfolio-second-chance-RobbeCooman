const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

const tasksRouter = require('./routes/tasks');


app.use(cors());
app.use(express.json());


app.use('/api/tasks', tasksRouter);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
