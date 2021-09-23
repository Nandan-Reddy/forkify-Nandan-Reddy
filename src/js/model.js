import { async } from 'regenerator-runtime';
// import { API_URl } from 'config.js'
import { API_URL, RES_PER_PAGE, KEY } from './config.js'
import { getJSON, sendJSON } from './helper.js';


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1,
    },
    bookmarks: []
};

const createRecipeObjcet = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: Number(recipe.servings),
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        state.recipe = createRecipeObjcet(data);
        let toggle = 1;
        for (let i = 0; i < state.bookmarks.length; i++) {
            // console.log(state.bookmarks[i], id);
            if (state.bookmarks[i].id === id) {
                // console.log("Hello");
                toggle = 0;
                state.recipe.bookmarked = true;
                break;
            }
        }
        if (toggle) {
            state.recipe.bookmarked = false;
        }
        // console.log(state.bookmarks);
        // let toggle = 1;
        // state.bookmarks.forEach((bookmark) => {
        //     if (bookmark === id) {
        //         state.recipe.bookmark = true;
        //         toggle = 0;
        //     }
        //     console.log(bookmark, id);
        // })
        // if (toggle) {
        //     state.recipe.bookmark = false;
        // }
        // if (state.bookmarks.some((bookmark) => bookmark === id)) {
        //     state.recipe.bookmark = true;
        //     // console.log(state.bookmarks);
        // }
        // else {
        //     state.recipe.bookmark = false;
        // }
        // console.log(state.recipe);
    }
    catch (err) {
        console.error(`${err}`);
        throw err;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        // console.log(data);

        state.search.results = data.data.recipes.map((rec) => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && { key: rec.key }),
            }
        });
        // console.log(state.search.results);
    }
    catch (err) {
        console.error(`${err}`);
        throw err;
    }
};
// loadSearchResults('pizza');

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    // console.log(page, state.search.page);
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    // console.log(start, end, state.search.resultsPerPage, page);
    return state.search.results.slice(start, end)
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach((ing) => {
        //newQt = oldQt *(newQuantity/oldQuantity)
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    });
    state.recipe.servings = newServings;
}

const persistBookmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    //Add bookmark
    state.bookmarks.push(recipe);

    //Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }
    persistBookmarks();
}

export const deleteBookmark = function (id) {
    //Delte the bookmark
    const index = state.bookmarks.findIndex((el) => el.id === id);
    state.bookmarks.splice(index, 1);
    //Mark current recipe as NOT bookmark
    // console.log(id, state.recipe.id);
    if (id === state.recipe.id) {
        // console.log("Un bookMarked");
        state.recipe.bookmarked = false;
    }
    persistBookmarks();
}

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) {
        state.bookmarks = JSON.parse(storage);
    }
}
init();
// console.log(state.bookmarks);

const clearbookmarks = function () {
    localStorage.clear("bookmarks");
}
// clearbookmarks();

export const uploadRecipe = async function (newRecipe) {
    try {
        // console.log(Object.entries(newRecipe));
        const ingredients = Object.entries(newRecipe).filter((entry) => {
            return entry[0].startsWith('ingredient') && entry[1] !== '';
        }).map((ing) => {
            const ingArr = ing[1].replaceAll(' ', '').split(',');
            if (ingArr.length !== 3) {
                throw new Error('wrong ingrident fomrt ! Please use the correct one');
            }
            const [quantity, unit, description] = ing[1].replaceAll(' ', '').split(',');

            return { quantity: quantity ? Number(quantity) : null, unit, description };
        })
        console.log(ingredients);
        console.log(newRecipe);
        // newRecipe.ingredients = ingridents1;
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            ingredients,
            publisher: newRecipe.publisher,
            cooking_time: Number(newRecipe.cookingTime),
            servings: Number(newRecipe.servings),
        };
        // console.log(recipe);
        // console.log(recipe);
        const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
        console.log(data);
        state.recipe = createRecipeObjcet(data);
        addBookmark(state.recipe);
        // state.bookmarks.push(state.recipe);
    }
    catch (err) {
        throw err;
    }

}