import axios from 'axios';
import {key} from '../config.js';

export default class Info {
    
    constructor(){};

    async inTheatres() {

        const movies = await axios(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`);
        
        this.inTheatres = movies.data.results;
        
        const trending = await axios(`https://api.themoviedb.org/3/movie/${this.inTheatres[0].id}?api_key=${key}&language=en-US`);
        
        this.firstInTeathresDetails = trending.data;
    }

}
