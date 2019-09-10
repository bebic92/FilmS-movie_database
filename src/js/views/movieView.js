import {domElements} from './base';

const renderGenres = genres => {

    const newGenres = genres.map(e => {
        return e.name;
    });

    if(newGenres) {
        return newGenres.join(', ');
    }

    return genres;
}

const renderCrew = (crew, role) => {

    const filterCrew = [];

    crew.forEach(e => {

        if(e.job === role){

            filterCrew.push(e.name);

        }
    
    });

    if(filterCrew.length === 0){
        return `...`;
    }
    return `${filterCrew.join(', ')}`;

};

const limitNumOfResults = (data, limit) => {

    if(data.length >= limit){
        
        return data.slice(0, limit);
    
    }
    return data;
}

const renderCast = cast => {  

    let castImage;
    if(cast.profile_path){
        castImage = `<img src="https://image.tmdb.org/t/p/original//${cast.profile_path}">`;
    }else{
        castImage = `<img src="images/icons/default-user-image.png">`;
    }

    return `
    <div class="top-cast__card">
        ${castImage}
        <span class="top-cast__actor-name">${cast.name}</span>
    </div>
    `;

};

const renderSimilarMovies = movie => {  

    let movieImage;

    if(movie.poster_path){
        movieImage = `<img src="https://image.tmdb.org/t/p/original//${movie.poster_path}">`;
    }else{
        movieImage = `<img src="images/icons/default-user-image.png">`;
    }

    return `
    <div class="similar-movies__card">
        ${movieImage}
        <span class="similar-movies__movie-name">${movie.original_title}</span>
    </div>
    `;

};

export const renderFullCast = cast => {
    
    let castImage;
    
    const markup = cast.map(e => {

        if(e.profile_path){
            castImage = `<img src="https://image.tmdb.org/t/p/original//${e.profile_path}">`;
        }else{
            castImage = `<img src="images/icons/default-user-image.png">`;
        }
        
        return `
        <div class="all-cast-popup__person">
            <div class="all-cast-popup__person-image">
                ${castImage}
            </div>
            <span class="all-cast-popup__person-name">${e.name}</span>
        </div>
        `;
    }).join('');
    domElements.allCastPopup.insertAdjacentHTML('beforeend', markup);

};

export const removeFullCast = () => {

    domElements.allCastPopup.innerHTML = "";

};

export const renderFullCrew = crew => {
    
    let crewImage;
    
    const markup = crew.map(e => {

        if(e.profile_path){
            crewImage = `<img src="https://image.tmdb.org/t/p/original//${e.profile_path}">`;
        }else{
            crewImage = `<img src="images/icons/default-user-image.png">`;
        }
        
        return `
        <div class="all-crew-popup__person">
            <div class="all-crew-popup__person-image">
                ${crewImage}
            </div>
            <div class="all-crew-popup__person-info">
                <span class="all-crew-popup__person-name">${e.name}</span>
                <span class="all-crew-popup__person-role">${e.job}</span>
            </div>
        </div>
        `;
    }).join('');
    domElements.allCrewPopup.insertAdjacentHTML('beforeend', markup);

};

export const removeFullCrew = () => {

    domElements.allCrewPopup.innerHTML = "";

};
export const clearDetails = () => {

    domElements.movieDetailsContainer.innerHTML = "";

};

export const showDetails = (movie, crew, cast, similarMovies) => {
    
    const markup = `
    <div class="selected-movie-details__header">
        <h2>Odabrani film</h2>
    </div>
    <div class="selected-movie-details__main">
        <div class="selected-movie__poster-container">
            <img src="https://image.tmdb.org/t/p/original//${movie.poster_path}">
        </div>
        <div class="selected-movie__details-container">
            <div class="selected-movie__title-rating-container">
                <h1 class="selected-movie__title">${movie.original_title}</h1>
                <div class="selected-movie__rating-conatiner">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <path style="fill:#C03A2B;" d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
                        c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
                        c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>
                    <path style="fill:#ED7161;" d="M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1
                        c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z"/>
                    </svg>
                    <span class="selected-movie__rating-number">${movie.vote_average} / 10</span>
                    <span class="selected-movie__votes">${movie.vote_count.toLocaleString()}</span>
                </div>
            </div>
            <div class="selected-movie__genre-duration-container">
                <div class="selected-movie__genre">${renderGenres(movie.genres)}</div>
                <div class="selected-movie__duration">${movie.runtime ? `${movie.runtime} min` : 'nepoznato trajanje filma'} </div>
            </div>
            <div class="selected-movie__overview">
                <span class="overview__title">Sažetak</span>
                <span class="selected-movie__details">
                    ${movie.overview}
                </span>
            </div>
            <div class="selected-movie__director">
                <h2 class="director__title">Režija: </h2>
                <span class="director__name">${renderCrew(crew, 'Director')}</span>
            </div>
            <div class="selected-movie__writer">
                <h2 class="writer__title">Scenarij: </h2>
                <span class="writer__name">${renderCrew(crew, 'Screenplay') === '...' ? renderCrew(crew, 'Writer'): renderCrew(crew, 'Screenplay')}</span>
            </div>
            <span class="all-crew__text">Cijela filmska ekipa >></span>
            <div class="selected-movie__options">
                <div class="selected-movie__add-to-watchlist">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="23,34 30,41 
                            43,28 "/>
                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="23,8 10,8 10,63 54,63 54,8 41,8 "/>
                        <polygon fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="36,5 36,1 28,1 28,5 24,5 22,13 42,13 40,5 
                            "/>
                    </svg>
                </div>
                <div class="selected-movie__play-trailer">
                        <svg version="1.1" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g  fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Icons-AV" transform="translate(-88.000000, -88.000000)"><g id="play-arrow" transform="translate(88.500000, 88.000000)"><path d="M0,0 L0,14 L11,7 L0,0 Z" id="Shape"/></g></svg>
                </div>
            </div>
        </div>
    </div>
    <div class="top-cast__container">    
        <span class="top-cast-section__title">Izdvojeni glumci</span>
        <div class="top-cast__card-container">
            ${limitNumOfResults(cast, 5).map(el => renderCast(el)).join('')}
        </div>
        <span class="all-cast__text">Cijela glumačka postava >></span>
    </div>
    <div class="similar-movies__container">    
        <span class="similar-movies-section__title">Slični filmovi</span>
        <div class="similar-movies__card-container">
            ${limitNumOfResults(similarMovies, 5).map(el => renderSimilarMovies(el)).join('')}
        </div>
    </div>
    `;


    domElements.movieDetailsContainer.insertAdjacentHTML('afterbegin', markup);


}

export const playMovieTrailer = id => {

    const markup = `
        <iframe src="https://www.youtube.com/embed/${id}">
        </iframe>
    `;

    domElements.trailerPopUp.insertAdjacentHTML('afterbegin', markup);
};

export const removeMovieTrailer = () => {
    
    domElements.trailerPopUp.innerHTML = "";

};
