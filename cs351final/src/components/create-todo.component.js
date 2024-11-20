import React, { Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";


export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchData=this.fetchData.bind(this);
        this.addMovie=this.addMovie.bind(this);


        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            title:'',
            movies:[]
        }
    }


    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeSearchTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })


    }
    // eslint-disable-next-line no-unused-expressions
    async fetchData(e) {
        e.preventDefault();

        const title = this.state.title;

        const response = await axios.get(
            "https://api.themoviedb.org/3/search/movie?api_key=30e5cc4bad6f7de3f9215805730d8a4f&language=en-US&query="+title+"&page=1&include_adult=false"
        );
        console.log(response.data.results);
       this.setState({movies:response.data.results})


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
            <div style={{marginTop: 10}}>
                <h3>Add Movie</h3>
                <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeSearchTitle}
                        />
                       <button className="fetch-button" onClick={this.fetchData}>
                        Search
                    </button>
                    </div>
                </form>
                <div className="results">
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
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
            </div>
        )
    }
}