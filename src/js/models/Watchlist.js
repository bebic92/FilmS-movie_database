
export default class Watchlist {
    
    constructor() {

        this.list = [];

    }

    addMovie(id, poster, title, year) {

        const movie = {
            id: id,
            poster: poster,
            title: title,
            year: year
        };

        this.list.push(movie);

        this.addToStorage();

        return movie;
    }

    deleteMovie(id) {
        
        const index = this.list.findIndex(e => e.id === id);
        
        if(index !== -1){

            this.list.splice(index, 1);
            
            this.addToStorage();
        }

    }

    isLiked(id) {

        return this.list.findIndex(e => e.id === id) !== -1;

    }

    getLength() {

        return this.list.length();
    
    }

    addToStorage() {
        
        localStorage.setItem('watchlist', JSON.stringify(this.list));

    }

    readFromStorage() {

        const storage = JSON.parse(localStorage.getItem('watchlist'));

        this.list = storage;
        
    }
} 