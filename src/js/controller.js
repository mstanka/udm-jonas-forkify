import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // packages for polyfiling
import 'regenerator-runtime/runtime';

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

const init = () => {
  // publisher-subscriber pattern
  // we pass function as argument to be executed as soon as the event happen
  recipeView.addHandlerRender(controlRecipes);
};

init();
