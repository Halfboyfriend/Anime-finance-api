const express = require('express');
const router = require('./routes/index')

const app = express();
const host = '0.0.0.0';
const port = '5000';


app.use('/', router)


app.listen(port, host, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app;