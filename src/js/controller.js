import * as model from './model.js';
import recipeView from './views/recipeViews.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // LOADING INFO
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // RENDERING RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
