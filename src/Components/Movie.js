import {Component} from 'react';
import axios from 'axios';

class Movie extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.movie.title,
            director: this.props.movie.director,
            editView: false
        }
    }

    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleView = () => {
        if(this.state.editView){
            this.setState({editView: false})
        } else {
            this.setState({editView: true})
        }
    }
    updateMovie = () => {
        axios.put(`/api/movie/${this.props.movie.id}`, {title: this.state.title, director: this.state.director})
            .then(() => {
                this.props.getMoviesFn();
                this.setState({
                    title: '',
                    director: '',
                    editView: false
                })
            })
            .catch(err => console.log(err));
    }
    deleteMovie = () => {
        axios.delete(`/api/movie/${this.props.movie.id}`)
        .then(() => this.props.getMoviesFn())
        .catch(err =>console.log(err));
    }

    render(){
        const {title, director, editView} = this.state;
        const {movie} = this.props;

        return (
            <section>
                {editView
                ? (
                    <section>
                        <input  value={title} name='title' onChange={e => this.handleInputs(e)}/>
                        <input  value={director} name='title' onChange={e => this.handleInputs(e)}/>
                        <button onClick={this.updateMovie}>Submit</button>
                    </section>
                )
                : (
                    <section>
                        <h1 className="Title">{movie.title}</h1>
                        <h4>Directed By</h4>
                        <h3 className="Director">{movie.director}</h3>
                        <button className="button2" onClick={this.toggleView}>Edit</button>
                        <button className="button2" onClick={this.deleteMovie}>Delete</button>
                    </section>
                )}
            </section>
        )
    }
}

export default Movie;