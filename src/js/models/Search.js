import axios from 'axios';
import {key} from '../config.js';

export default class Search {
    
    constructor(query){
        
        this.query = query;
    
    }

    async getResults() {
        
        let res;
        
        try {

            if(this.query === 'popular' || this.query === 'top_rated' || this.query === 'upcoming' || this.query === 'now_playing') {
               
                res = await axios(`https://api.themoviedb.org/3/movie/${this.query}?api_key=${key}&language=en-US`);
            
            } else{

                res = await axios(
                    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${this.query}&page=1&include_adult=false`);
                                
            }
                console.log(res);
                this.results = res.data.results;

        } catch (error) {
        
            alert(error);
        
        }
    
    }
}

