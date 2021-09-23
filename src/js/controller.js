
// import icons from '../img/icons.svg'
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './View/recipeView.js';

import searchView from './View/searchView.js'
import resultsView from './View/resultsView.js';
// import hello from './View/paginataion.js';

import paginationView from './View/paginataionView.js';
import bookmarksView from './View/bookmarkView.js'
import AddRecipeView from './View/addRecipeView.js';
import addRecipeView from './View/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipe = async function () {
  // console.log("Hello world -3");
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (id === '') {
      return;
    }
    recipeView.renderSipnner();

    //1) Loading Recipe
    await model.loadRecipe(id);

    //2)Rendering recipe
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);

    //Test 
    controlServings(4);
  }
  catch (err) {
    // alert(err);
    recipeView.renderError();
  }
  // console.log("Hello world -4");
}
// console.log("Hello world -1");
// showRecipe();
// console.log("Hello world -2");

const controlSearchResults = async function () {
  try {
    resultsView.renderSipnner();
    // console.log(resultsView);
    //1)Get search Query
    const query = searchView.getQuery();
    if (query === '') {
      return;
    }
    // console.log(query);

    //2)Load Search Results
    await model.loadSearchResults(query);

    //3)Render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    // console.log(model.getSearchResultsPage(1));
    resultsView.render(model.getSearchResultsPage(1));


    //4)Render initial pagination buttons
    paginationView.render(model.state.search);
    paginationView._genarateMarkup();
    // paginationView._hello();
    // paginationView._generateMarkup();
  }
  catch (err) {
    // console.error(`${err}`);
  }
}

// hello();

// paginationView.hello();
// console.log("Hello World");

const controlPagination = function (goToPage) {
  //1)Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2)Render new pagination  buttons
  paginationView.render(model.state.search);

}

const controlServings = function (newServings) {
  //update the recipe servings
  model.updateServings(newServings);

  //update the recipe view
  recipeView.render(model.state.recipe);

}

const controlAddBookMark = function () {
  // console.log(model.state.recipe);
  // console.log(model.state.recipe.bookmarked);

  // 1)Add or remove bookmarks
  if (model.state.recipe.bookmarked === false) {
    // console.log(model.state.recipe);
    model.addBookmark(model.state.recipe);
  }
  else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // 2)update recipe view
  // console.log(model.state.recipe);
  recipeView.render(model.state.recipe);

  // 3)render bookmarks
  // console.log(model.state.bookmarks);
  bookmarksView.render(model.state.bookmarks);
}
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);

}

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loading render
    addRecipeView.renderSipnner();

    // console.log(newRecipe);

    //upload the new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Success Message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }
  catch (err) {
    // console.error('vfsjdfbhjsdbfgkh', err);
    addRecipeView.renderError(err.message);

  }
}
const newFeature = function () {
  console.log("Welcome to the application");
}
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServins(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandleClick(controlPagination);
  AddRecipeView._addHandlerUpload(controlAddRecipe);
  newFeature();
}
init();