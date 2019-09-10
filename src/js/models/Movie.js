import axios from 'axios';
import {key} from '../config.js';

export default class Movie {
    
    constructor(id) {
        
        this.id = id;
    
    }

    async getDetails() {

        const movieDetails = await axios(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${key}&language=en-US`);
        const movieCrew = await axios(`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=${key}`);
        console.log(movieCrew);
        this.details = movieDetails.data;
        this.cast = movieCrew.data.cast;
        this.crew = movieCrew.data.crew;
    }

    async inTheatres() {

        const movies = await axios(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1&region=HR`);
        console.log(movies);
        this.inTheatres = movies.data.results;

    }

    async getTrailer() {

        const videos = await axios(`https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${key}&language=en-US`);
        const trailer = videos.data.results.find(e => {
            return e.type = 'Trailer';
        });
        console.log(trailer);
        this.trailer = trailer;

    }

    async getSimilar() {

        const movies = await axios(`https://api.themoviedb.org/3/movie/${this.id}/recommendations?api_key=${key}&language=en-US&page=1`);

        this.similarMovies = movies.data.results;
    }
}
