// import necessary modules
const express = require('express');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

// create express app
const app = express();

// set default port
const PORT = process.env.PORT || 8080;

// enable body parser to accept json data
app.use(express.json());

app.use('/openai', require('./router'));

// start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
