import {domElements} from './base';

export const getSearchInput = () => domElements.mainSearchInput.value;

export const renderResults = movies => {
    
    movies.forEach(renderMovie);
}

export const clearSearchList = () => {
    
    domElements.resultsList.innerHTML = "";

}

const renderMovie = movie => {
    
    const markup = `
    
    <div class="searched-movie__row">
        <a href="#${movie.id}">
            <div class="searched-movie__image-container">
                <img src="https://image.tmdb.org/t/p/original//${movie.poster_path}">
            </div>
                <span class="searched-movie__title">${movie.original_title} (${movie.release_date})</span>
        </a>
    </div>
    `;
    domElements.resultsList.insertAdjacentHTML('beforeend', markup);

}