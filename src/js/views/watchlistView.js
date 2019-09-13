import { domElements, onlyMovieYear } from "./base";

export const toggleWatchlistBtn = isLiked => {

    if(isLiked) {

        document.querySelector('.selected-movie__add-to-watchlist').classList.add('watchlist--highlighted');

    }else {

        document.querySelector('.selected-movie__add-to-watchlist').classList.remove('watchlist--highlighted');

    }

}

export const addToWatchlist = movie  => {

    const markup = `
    <div class="watchlist-movie__row">
        <a href="#${movie.id}">
            <div class="watchlist-movie__image-container">
                <img src="https://image.tmdb.org/t/p/original//${movie.poster}">
            </div>
                <span class="watchlist-movie__title">${movie.title} (${onlyMovieYear(movie.year)})</span>
        </a>
    </div>
    `;

    domElements.watchlistContainer.insertAdjacentHTML('afterbegin', markup);

}

export const removeFromWatchlist = id => {

    const el = document.querySelector(`.watchlist-movie__row a[href*="#${id}"]`).parentElement;

    if(el) {

        el.parentElement.removeChild(el);  
        
    }
}