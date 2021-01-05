import {Component} from 'react';
import axios from 'axios';
import Movie from './Components/Movie';
import Header from './Components/Header';
import Footer from './Components/Footer';
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
        <div className="header"><Header/></div>
        <section className="inputsection">
        <input className="input1" value={this.state.title} name='title' placeholder='Title' onChange={e => this.handleInputs(e)}/><br></br>
        <input className="input1" value ={this.state.director} name='director' placeholder="Director" onChange={e => this.handleInputs(e)}/><br></br>
        <button className="button1"onClick={this.addMovie}>Add Movie</button>
        </section>
        <section className="list-section">
        {this.state.movies.map(movie => (
          <Movie key={movie.id} movie={movie} getMoviesFn={this.getMovies}/>
        ))}
        </section>
        <div className="footer"><Footer /></div>
      </div>
    );
  }

}

export default App;
