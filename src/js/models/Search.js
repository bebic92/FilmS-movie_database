import axios from 'axios';

export default class Search {
    
    constructor(query){
        
        this.query = query;
    
    }

    async getResults() {
        
        const key = 'a3285a4e1338aee282f26f05c3bdcfee';
        
        try {
        
            const res = await axios(
                `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${this.query}&page=1&include_adult=false`);
            this.results = res.data.results;
            // console.log(this.results);
        
        } catch (error) {
        
            alert(error);
        
        }
    
    }
}

