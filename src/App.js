import {Component} from 'react';
import axios from 'axios';
import Movie from './Components/Movie';
import Header from './Components/Header';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      title: '',
      director: ''
    }
  }
  componentDidMount(){
    this.getMovies();
  }

  handleInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getMovies = () => {
    axios.get('/api/movies')
    .then(res => {
      this.setState({movies: res.data})
    })
    .catch(err => console.log(err));
  }

  addMovie = () => {
    axios.post('/api/movie', {title: this.state.title, director: this.state.director})
    .then(res => {
      this.setState({
        movies: res.data,
        title: '',
        director: ''
      })
    })
    .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Header className="Header"/>
        <input value={this.state.title} name='title' placeholder='Title' onChange={e => this.handleInputs(e)}/><br></br>
        <input value ={this.state.director} name='director' placeholder="Director" onChange={e => this.handleInputs(e)}/><br></br>
        <button onClick={this.addMovie}>Add Movie</button>
        <section className="list-section">
        {this.state.movies.map(movie => (
          <Movie key={movie.id} movie={movie} getMoviesFn={this.getMovies}/>
        ))}
        </section>
      </div>
    );
  }

}

export default App;
