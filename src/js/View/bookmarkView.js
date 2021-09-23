import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { loadRecipe, state } from '../model.js';

class bookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list");
    _errorMessage = "No bookmarks yet.Find a nice recipe and bookmark it";
    _message = "";
    _genarateMarkup() {
        // console.log(this._data);

        return this._data.map((el) => this._genarateMarkupPreview(el)).join('');
    }
    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }
    _genarateMarkupPreview(result) {
        // console.log(result);

        const id = window.location.hash.slice(1);
        // console.log(result);
        const markup = `<li class="preview">
                    <a class="preview__link ${result.id === id ? "preview__link--active" : ""} " href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" alt="${result.title}" crossOrigin= "anonymous"/ />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                        <div class="preview__user-generated ${result.key ? "" : "hidden"}">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                        </div>
                    </div>
                    </a>
            </li>`;

        // console.log(markup);
        return markup;
    }
}

export default new bookmarksView();