import Search from "./models/Search";
import Movie from './models/Movie';
import Info from './models/Info';
import Watchlist from './models/Watchlist';

import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as infoView from './views/infoView';
import * as watchlistView from './views/watchlistView';

import {domElements, spinner, clearLoader} from './views/base';

/**GLOBAL STATE */

const state = {};

/**
 * SEARCH CONTROLLER
 */

const SearchController = async query => {
    
    if(query) {

            state.search = new Search(query);
        
            searchView.clearSearchList();
            
            searchView.clearButtons();
            
            spinner(domElements.resultsList);
            
            await state.search.getResults();
            
            console.log(state.search.results);

            clearLoader();
                  
            searchView.renderResults(state.search.results);

            document.getElementById("main-sidebar").scrollIntoView({behavior: "smooth"});
        }

};


domElements.mainSearchForm.addEventListener('submit', e => {
    
    e.preventDefault();

    const query = searchView.getSearchInput();
    
    SearchController(query);

});

domElements.sidebarContainer.addEventListener('click', e => {
    
    let query;

    const popularBtn = e.target.closest('#popular');
    const topRatedBtn = e.target.closest('#top_rated');
    const upcomingBtn = e.target.closest('#upcoming');
    const nowPlayingBtn = e.target.closest('#now_playing');

    if(popularBtn){

        query = 'popular';
        SearchController(query);
    
    } else if(topRatedBtn) {
        
        query = 'top_rated';
        SearchController(query);
    
    } else if(upcomingBtn) {

        query = 'upcoming';
        SearchController(query);
    
    }else if (nowPlayingBtn){
   
        query = 'now_playing';
        SearchController(query);
        
    }
});

domElements.pagination.addEventListener('click', e => {

    const btn = e.target.closest('.searched-movie__pagination-button')

    if(btn){

        const goToPage = parseInt(btn.dataset.goto, 10);

        searchView.clearButtons();

        searchView.clearSearchList();

        searchView.renderResults(state.search.results, goToPage);
        
        document.getElementById("main-sidebar").scrollIntoView({behavior: "smooth"});

    }

});

/**
 *  Movie CONTROLLER
 */


 const MovieController = async () => {

    const id = window.location.hash.replace('#', '');

    if(id){

        state.movie = new Movie(id);
        
        try {

            movieView.clearDetails();
            
            document.getElementById("main-container").scrollIntoView({behavior: "smooth"});

            spinner(domElements.movieDetailsContainer);

            await state.movie.getDetails();
            
            await state.movie.getSimilar();

            clearLoader();
            
            movieView.showDetails(state.movie.details, state.movie.crew, state.movie.cast, state.movie.similarMovies, state.watchlist.isLiked(state.movie.id));

        } catch(error) {

            alert(error);

        }
    }

};

['load', 'hashchange'].forEach(e => window.addEventListener(e, MovieController));

domElements.movieDetailsContainer.addEventListener('click', async e => {
    
    const playButton = e.target.closest('.selected-movie__play-trailer');
    const watchlistButton = e.target.closest('.selected-movie__add-to-watchlist');

    await state.movie.getTrailer();
    
    const trailerId = state.movie.trailer.key;
    
    if(playButton && trailerId) {
        
        domElements.backdrop.classList.add('open');
        domElements.trailerPopUp.classList.add('open');
        
        movieView.playMovieTrailer(trailerId);

        domElements.backdrop.addEventListener('click', e => {

            movieView.removeMovieTrailer();
            domElements.backdrop.classList.remove('open');
            domElements.trailerPopUp.classList.remove('open');

        });

    } else if(watchlistButton) {
        
        if(!state.watchlist) state.watchlist = new Watchlist();
        
        if(!state.watchlist.isLiked(state.movie.id)){
            
            const movie = state.watchlist.addMovie(state.movie.id, state.movie.details.poster_path, state.movie.details.original_title, state.movie.details.release_date);
        
            watchlistView.toggleWatchlistBtn(true);

            watchlistView.addToWatchlist(movie);

            console.log(state.watchlist);

        } else {

            state.watchlist.deleteMovie(state.movie.id);

            watchlistView.removeFromWatchlist(state.movie.id);
            
            watchlistView.toggleWatchlistBtn(false);

        }
        

    }

});

domElements.movieDetailsContainer.addEventListener('click',  e => {
    
    const allCastBtn = e.target.closest('.all-cast__text');
    const allCrewBtn = e.target.closest('.all-crew__text');

    if(allCastBtn && state.movie.cast){

        domElements.backdrop.classList.add('open');
        domElements.allCastPopup.classList.add('open');
        movieView.renderFullCast(state.movie.cast);

        domElements.backdrop.addEventListener('click', e => {
            movieView.removeFullCast();
            domElements.backdrop.classList.remove('open');
            domElements.allCastPopup.classList.remove('open');
        });

    } else if (allCrewBtn && state.movie.crew){

        domElements.backdrop.classList.add('open');
        domElements.allCrewPopup.classList.add('open');
        movieView.renderFullCrew(state.movie.crew);

        domElements.backdrop.addEventListener('click', e => {
            movieView.removeFullCrew();
            domElements.backdrop.classList.remove('open');
            domElements.allCrewPopup.classList.remove('open');
        });

    }

});

/**
 * INFO CONTROLLER
 */

const InfoController = async () => {

    state.info = new Info(); 

    await state.info.inTheatres();

    infoView.inTheatres(state.info.inTheatres);

    if(state.info.inTheatres){

        infoView.setBanner(state.info.firstInTeathresDetails);
    }

};

window.addEventListener('load', InfoController);

window.addEventListener('load', () => {

    state.watchlist = new Watchlist();
    
    state.watchlist.readFromStorage();

    state.watchlist.list.forEach(e => watchlistView.addToWatchlist(e));

});

domElements.banner.addEventListener('click', e => {

    const toWatchlistBtn = e.target.matches('.main-banner__movie-watchlist');
    const toWatchlistClass = e.target.closest('.main-banner__movie-watchlist');

    if(toWatchlistBtn && state.info.firstInTeathresDetails) {

        if(!state.watchlist.isLiked(state.info.firstInTeathresDetails.id)){
            
            const movie = state.watchlist.addMovie(state.info.firstInTeathresDetails.id, state.info.firstInTeathresDetails.poster_path, state.info.firstInTeathresDetails.original_title, state.info.firstInTeathresDetails.release_date);
        
            watchlistView.toggleWatchlistBtn(true);

            watchlistView.addToWatchlist(movie);

            toWatchlistClass.innerHTML = '- LISTA ZA GLEDANJE';

        } else {

            state.watchlist.deleteMovie(state.info.firstInTeathresDetails.id);

            watchlistView.removeFromWatchlist(state.info.firstInTeathresDetails.id);
            
            watchlistView.toggleWatchlistBtn(false);
                 
            toWatchlistClass.textContent = '+ LISTA ZA GLEDANJE';

        }

    }
});