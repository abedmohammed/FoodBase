import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }

//  Handle recipe info loading and display
const controlRecipes = async function () {
  try {
    // retrieves url recipe id
    const id = window.location.hash.slice(1);
    if (!id) return;

    // render loading spinner
    recipeView.renderSpinner();

    // update results sidebar view and bookmarks view with recipe previews
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // loading recipe info
    await model.loadRecipe(id);

    // rendering recipe info on recipe view
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

// Handle sidebar search results info and display
const controlSearchResults = async function () {
  try {
    // store and check for search query
    const query = searchView.getQuery();
    if (!query) return;

    // render loading spinner
    resultsView.renderSpinner();

    // load all corresponding query search recipes
    await model.loadSearchResults(query);

    // render all corresponding page searched recipes
    resultsView.render(model.getSearchResultsPage());

    // render pagination for corresponding page searched recipes
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// Handle pagination info retrieval and display
const controlPagination = function (goto) {
  resultsView.render(model.getSearchResultsPage(goto));

  paginationView.render(model.state.search);
};

// Handle servings update
const controlServings = function (newServings) {
  // Update serving size
  model.updateServings(newServings);

  // Update recipe display information based on new servings and recipe information
  recipeView.update(model.state.recipe);
};

// Handle adding bookmarks info and display
const controlAddBookmark = function () {
  // Check if recipe is in bookmarks already or not upon pressing the button to add or delete correspondingly
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);

  // Update recipe view for corresponding bookmarked icon
  recipeView.update(model.state.recipe);

  // Update bookmarks view for corresponding bookmarked icon
  bookmarksView.render(model.state.bookmarks);
};

// Handle opening bookmarks info and display
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// Handle adding recipe information and displaying it
const controlAddRecipe = async function (newRecipe) {
  try {
    // render loading spinner
    addRecipeView.renderSpinner();

    // upload new recipe to database
    await model.uploadRecipe(newRecipe);

    // render new recipe in recipe view
    recipeView.render(model.state.recipe);

    // render success message in upload recipe modal window
    addRecipeView.renderMessage();

    // update bookmarks to include added recipe
    bookmarksView.render(model.state.bookmarks);

    // udpate url to the corresponding uploaded recipe
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // wait MODAL_CLOSE_SEC amount of seconds before closing modal window
    setTimeout(function () {
      addRecipeView.closeWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

// Initializes all handlers and their corresponding control functions
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
