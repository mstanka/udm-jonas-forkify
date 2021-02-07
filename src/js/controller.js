import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable'; // packages for polyfiling
import 'regenerator-runtime/runtime';

// from parcel
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1); //get the hash without #

    if (!id) return;
    recipeView.renderSpinner();

    //// 1) loading recipe
    await model.loadRecipe(id);

    //// 2) rendering recipe
    recipeView.render(model.state.recipe); // accept the data and store it in class RecipeView
    //const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  // publisher-subscriber pattern
  // we pass function as argument to be executed as soon as the event happen
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
