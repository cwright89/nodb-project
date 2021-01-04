const express = require('express');
const ctrl = require('./controller');
const app = express();

app.use(express.json());

app.get('/api/movies', ctrl.getMovies);
app.post('/api/movie', ctrl.addMovie);
app.put('/api/movie/:id', ctrl.updateMovie);
app.delete('/api/movie/:id', ctrl.deleteMovie);

const port = 3112;
app.listen(port, () => console.log(`Server is running on ${port}`))