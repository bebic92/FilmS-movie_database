import {domElements, onlyMovieYear} from './base';

const renderMovie = movie => {

    return `
    <div class="theatre-movies__card">
        <div class="theatre-movies__image-container">
            <img src="https://image.tmdb.org/t/p/original//${movie.poster_path}">
            <div class="thumbnail-overlay">
                <a href="#${movie.id}" class="thumbnail-detals__btn">
                    Detalji
                </a>
            </div>
        </div>
        <span class="theatre-movies__title">${movie.original_title} (${onlyMovieYear(movie.release_date)})</span>
    </div>    
    `;
}

const renderGenres = genres => {

    const newGenres = genres.map(e => {
        return e.name;
    });

    if(newGenres) {
        return newGenres.join(', ');
    }

    return genres;
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
            <div class="main-banner-movie__genre-duration-container">
                <div class="main-banner-movie__genre">${renderGenres(movie.genres)}</div>
                <div class="main-banner-movie__duration">${movie.runtime ? `${movie.runtime} min` : 'nepoznato trajanje filma'} </div>
            </div>
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