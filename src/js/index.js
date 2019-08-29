import Search from "./models/Search";
import * as SearchView from './views/searchView';
import {domElements} from './views/base';

/**GLOBAL STATE */

const state = {};


const SearchController = async () => {
    
    const query = SearchView.getSearchInput();

    if(query) {

            state.search = new Search(query);
        
            SearchView.clearSearchList();

            await state.search.getResults();
            
            SearchView.renderResults(state.search.results);

        }

};


domElements.mainSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    SearchController();
})