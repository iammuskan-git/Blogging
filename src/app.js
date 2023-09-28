const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3009;

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/blogs', blogRoutes);

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
})