import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = props => (
    <tr>
        <td><img src={"https://image.tmdb.org/t/p/w300"+props.movie.poster_path}/></td>
        <td>{props.movie.title}</td>
        <td>{props.movie.overview}</td>
        <td>
            <Link to={"/view/"+props.movie._id}>View</Link>

        </td>
    </tr>
)



export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: [],
            movies:[]};
        this.hitMovieList();
    }


    componentDidMount() {
        axios.get('http://'+window.location.hostname+':4000/todos/')
            .then(response => {
                console.log(response.data)
                console.log(window.location);
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {

        return this.state.todos.map(function(currentTodo, i){
            return <Movie movie={currentTodo} key={i} />;
        })

    }
    async hitMovieList() {
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/popular?api_key=30e5cc4bad6f7de3f9215805730d8a4f&language=en-US&page=1"
        );
        console.log(response.data);
        this.setState({movies: response.data.results})



    }
    async addMovie(e){
        e.preventDefault();
        const id = e.target.value;
        console.log(id);
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/"+id+"?api_key=30e5cc4bad6f7de3f9215805730d8a4f&language=en-US"
        );
        const movie = response.data;
        var ID = movie.id;
        movie._id = ID;
        delete movie.id;

        console.log(movie);
        axios.post('http://localhost:4000/todos/add', movie)
            .then(res => console.log(res.data));


    }

    render() {

        return (
            <div>
                <div>
                    <h3>Top Movie List</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                        <tr>

                        </tr>
                        </thead>
                        <tbody>
                        {this.state.movies &&
                        this.state.movies.map((movie, index) => {
                            return (
                                <tr>
                                    <td><img src={"https://image.tmdb.org/t/p/w300"+movie.poster_path}/></td>
                                    <td>{movie.title}</td>
                                    <td>{movie.overview}</td>
                                    <td>
                                        <button className="fetch-button" value={movie.id} onClick={this.addMovie}>
                                            Add
                                        </button>

                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div>
                <h3>Movie List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>

                    </tr>
                    </thead>
                    <tbody>
                    { this.todoList() }
                    </tbody>
                </table>
            </div>
            </div>

        )
    }
}