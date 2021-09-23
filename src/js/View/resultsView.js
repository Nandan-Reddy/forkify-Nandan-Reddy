import View from './View.js';
import icons from 'url:../../img/icons.svg';
class resultsView extends View {
    _parentElement = document.querySelector(".results");
    _errorMessage = "No recipes found for your query ! Plese try again";
    _message = "";
    _genarateMarkup() {
        // console.log(this._data);
        // return this._data.map(this._genarateMarkupPreview).join('');
        return this._data.map((el) => this._genarateMarkupPreview(el)).join('');
    }
    _genarateMarkupPreview(result) {
        // console.log(result.image);
        return `<li class="preview">
                    <a class="preview__link preview__link--active" href="#${result.id}">
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
    }
}

export default new resultsView();