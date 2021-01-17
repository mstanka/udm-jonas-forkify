import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // packages for polyfiling
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    console.error(err);
  }
};


['hashchange', 'load'].map(ev => window.addEventListener(ev, controlRecipes));
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
