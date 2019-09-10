import {domElements} from './base';

const renderMovie = movie => {

    return `
    <div class="theatre-movies__card">
        <img src="https://image.tmdb.org/t/p/original//${movie.poster_path}">
        <span class="theatre-movies__title">${movie.original_title}</span>
    </div>    
    `;
}

export const inTheatres = (movies) => {

    const markup = `
    <div class="theatre-movies__header">
        <h2>Trenutno u kinima</h2>
    </div>
    <div class="theatre-movies__main">
        ${movies.map(el => renderMovie(el)).join('')}
    </div>
    `;

    domElements.teathreMoviesContainer.insertAdjacentHTML('beforeend', markup);

};

export const setBanner = movie => {
    
    domElements.banner.style.backgroundImage = `url("https://image.tmdb.org/t/p/original//${movie.backdrop_path}")`;

    const markup = `
    <div class="main-banner__overlay">
        <div class="main-banner__movie-info">
            <div class="main-banner__movie-title">${movie.original_title}</div>
            <div class="main-banner__movie-options">
                <a href="#${movie.id}" class="main-banner__movie-details">
                    <div class="main-banner__movie-details-text">DETALJI</div>
                </a>   
                <div class="main-banner__movie-watchlist">+ LISTA ZA GLEDANJE</div>
            </div>
        </div>
    </div>
    `
    domElements.banner.insertAdjacentHTML('afterbegin', markup);
};