import {domElements} from './base';

export const getSearchInput = () => domElements.mainSearchInput.value;


const createButton = (page, type) => {
    
    if(type === 'left'){
        
        return `
        <div class="searched-movie__pagination-button" data-goto=${page - 1}>
            <svg class="pagination-button__left" enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline fill="none" points="8.5,3 17.5,12 8.5,21 " stroke="#000000" stroke-miterlimit="10" stroke-width="2"/></svg>
                <span class="searched-movie__pagination__text">Predhodna</span>
        </div>
        `;

    } else if (type === 'right') {
       
        return ` 
        <div class="searched-movie__pagination-button" data-goto=${page + 1}>
            <span class="searched-movie__pagination__text">Slijedeca</span>
                <svg enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline fill="none" points="8.5,3 17.5,12 8.5,21 " stroke="#000000" stroke-miterlimit="10" stroke-width="2"/></svg>
        </div>
        `;
    
    }

}

export const clearButtons = () => {

    domElements.pagination.innerHTML = "";

}


const renderButtons = (page, numResults, resPerPage) => {

    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if(page === 1 && pages > 1){

        button = createButton(page,'right');
    
    }else if (page < pages) {

        button = `
            ${createButton(page,'left')}
            ${createButton(page,'right')}
        `;
        

    }else if(page === pages && pages > 1) {

        button = createButton(page,'left');

    }

    domElements.pagination.insertAdjacentHTML('beforeend', button);
}



export const renderResults = (movies, page = 1, resPerPage = 8) => {

    const start = (page - 1) * resPerPage;
    const end = resPerPage * page;

    movies.slice(start, end).forEach(renderMovie);

    renderButtons(page, movies.length, resPerPage);

}


export const clearSearchList = () => {
    
    domElements.resultsList.innerHTML = "";

}

const reduceTitle = (title, limit = 25) => {
    
    const newTitle = [];
    
    if(title.length > 22){

        title.split(' ').reduce((sum, el) => {
            
            if(sum + el.length < limit){
            
                newTitle.push(el);
            
            }
            
            return sum + el.length;
        
        }, 0)

        return `${newTitle.join(' ')}...`;

    }

    return title;

}

const onlyMovieYear = releaseDate => releaseDate.split('-')[0];


const renderMovie = movie => {
    
    const markup = `
    
    <div class="searched-movie__row">
        <a href="#${movie.id}">
            <div class="searched-movie__image-container">
                <img src="https://image.tmdb.org/t/p/original//${movie.poster_path}">
            </div>
                <span class="searched-movie__title">${reduceTitle(movie.original_title)} (${onlyMovieYear(movie.release_date)})</span>
        </a>
    </div>
    `;

    domElements.resultsList.insertAdjacentHTML('beforeend', markup);

}