const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const weatherRouter = require('./routes/weather');
const locationRouter = require('./routes/location');

app.use('/weather', weatherRouter);
app.use('/location', locationRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
