const movies = [{id: 0, title:'The Personal History of David Copperfield', director: 'Armando Iannucci'}];
let id = 1;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },
    addMovie: (req, res) => {
        const {title, director} = req.body;

        let movie = {
            id: id,
            title: title,
            director: director
        }
        movies.push(movie);
        id++;
        res.status(200).send(movies);
    },
    updateMovie: (req, res) => {
        const {id} = req.params;

        let editMovieIndex = movies.findIndex(element => element.id === +id);
        movies[editMovieIndex] = {
            id: movies[editMovieIndex].id,
            title: req.body.title || movies[editMovieIndex].title,
            director: req.body.director || movies[editMovieIndex].director
        }

        console.log(movies)

        res.sendStatus(200);
    },
    deleteMovie:(req, res) => {
        const {id} = req.params;
        let movieId = movies.findIndex(element => element.id === +id);
        movies.splice(movieId, 1);

        res.sendStatus(200);
    }
}