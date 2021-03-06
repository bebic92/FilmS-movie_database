export const domElements = {

    mainSearchForm: document.querySelector('.main-search__form'),
    mainSearchInput: document.querySelector('.main-search__label'),
    sidebarContainer: document.querySelector('.main-sidebar-container'),
    resultsList: document.querySelector('.searched-movie__container'),
    pagination: document.querySelector('.searched-movie__pagination'),
    movieDetailsContainer: document.querySelector('.selected-movie-details__container'),
    teathreMoviesContainer: document.querySelector('.teathre-movies__container'),
    selectedMovieOptions: document.querySelector('.selected-movie__options'),
    trailerPopUp: document.querySelector('.trailer-popup'),
    backdrop : document.querySelector('.backdrop'),
    allCastPopup : document.querySelector('.all-cast-popup'),
    allCrewPopup : document.querySelector('.all-crew-popup'),
    banner: document.querySelector('.main-banner'),
    watchlistContainer: document.querySelector('.watchlist__container')
    
}

const elementStrings = {

    spinner: 'spinner-container'

}

export const clearLoader = () => {

    const spinner = document.querySelector(`.${elementStrings.spinner}`);

    spinner.parentElement.removeChild(spinner);

}


export const spinner = parent => {
    
    const markup = `
    <div class="${elementStrings.spinner}">
        <svg class ="spinner" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100.25 100.25" style="enable-background:new 0 0 100.25 100.25;" xml:space="preserve">
            <polyline style="fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="
                70,57.75 82.5,45.75 95,57.75 "/>
            <g>
                <path d="M83.854,45.613c-0.076-0.825-0.807-1.438-1.632-1.356c-0.824,0.076-1.432,0.806-1.356,1.631
                    c0.09,0.97,0.135,1.956,0.135,2.929c0,17.333-14.043,31.434-31.304,31.434c-8.36,0-16.222-3.269-22.134-9.205
                    c-0.585-0.587-1.534-0.589-2.121-0.004s-0.589,1.535-0.004,2.122c6.479,6.505,15.095,10.087,24.259,10.087
                    c18.915,0,34.304-15.447,34.304-34.434C84,47.752,83.95,46.674,83.854,45.613z"/>
                <path d="M31.082,44.712c-0.575-0.599-1.524-0.618-2.121-0.043L18.513,54.7c-0.336-1.852-0.512-3.737-0.512-5.632
                    c0-17.268,14.051-31.317,31.322-31.317c8.351,0,16.206,3.247,22.118,9.143c0.588,0.585,1.538,0.583,2.122-0.003
                    c0.585-0.586,0.583-1.536-0.003-2.121c-6.479-6.46-15.087-10.019-24.237-10.019c-18.926,0-34.322,15.395-34.322,34.317
                    c0,1.505,0.102,3.004,0.296,4.488L6.04,44.669c-0.597-0.573-1.545-0.555-2.121,0.043c-0.574,0.597-0.555,1.547,0.043,2.121l12.5,12
                    c0.29,0.279,0.665,0.418,1.039,0.418s0.749-0.139,1.039-0.418l12.5-12C31.637,46.259,31.656,45.309,31.082,44.712z"/>
            </g>
        </svg>
    </div>  
    `;

    parent.insertAdjacentHTML('afterbegin', markup);

}

export const onlyMovieYear = releaseDate => releaseDate.split('-')[0];