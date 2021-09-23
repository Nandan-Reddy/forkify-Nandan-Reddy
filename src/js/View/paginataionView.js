export const val = 3.1427;

import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { getJSON } from '../helper.js';
class paginationView extends View {
    _parentElement = document.querySelector(".pagination");
    addHandleClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            // console.log(e);
            const btn = e.target.closest(".btn--inline");
            if (!btn) {
                return;
            }
            const goToPage = Number(btn.dataset.goto);
            console.log(goToPage);
            // console.log(btn);
            handler(goToPage);
        })
    }
    _genarateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(numPages);
        //Page 1 and there are other pages
        if (this._data.page === 1 && numPages > 1) {
            // console.log("Page 1 and others");
            return this._genarateMarkupPreview("next");
        }
        //Last page
        if (numPages === this._data.page && numPages > 1) {
            // console.log("Last page");
            return this._genarateMarkupPreview("prev");
        }
        //other Page
        if (this._data.page < numPages) {
            // console.log("Other pages");
            return this._genarateMarkupPreview("both");
        }
        //Page 1 and there are No pages
        // console.log("only one page");
        return '';
    }

    _genarateMarkupPreview(visibleBtns) {
        const nextBtn = `<button data-goto = "${this._data.page + 1}"class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
        const prevBtn = `<button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>`;
        if (visibleBtns === "next") {
            return nextBtn;
        }
        if (visibleBtns === "prev") {
            return prevBtn;
        }
        if (visibleBtns === "both") {
            return nextBtn + prevBtn;
        }

    }
    // _hello() {
    //     console.log("Nandan Reddy");
    //     for (let i = 0; i < 5; i++) {
    //         console.log(i);
    //     }
    // }
    // _ok() {
    //     console.log(this._data);
    //     console.log("hey it working");
    // }

}

export default new paginationView();

// export function hello() {
//     for (let i = 0; i < 10; i++) {
//         console.log(i);
//     }
// }


// import View from './View.js';
// import icons from 'url:../../img/icons.svg'; // Parcel 2

// class PaginationView extends View {
//     _parentElement = document.querySelector('.pagination');

//     addHandlerClick(handler) {
//         this._parentElement.addEventListener('click', function (e) {
//             const btn = e.target.closest('.btn--inline');
//             if (!btn) return;

//             const goToPage = +btn.dataset.goto;
//             handler(goToPage);
//         });
//     }

//     _generateMarkup() {
//         const curPage = this._data.page;
//         const numPages = Math.ceil(
//             this._data.results.length / this._data.resultsPerPage
//         );

//         // Page 1, and there are other pages
//         if (curPage === 1 && numPages > 1) {
//             return `
//         <button data-goto="${curPage + 1
//                 }" class="btn--inline pagination__btn--next">
//           <span>Page ${curPage + 1}</span>
//           <svg class="search__icon">
//             <use href="${icons}#icon-arrow-right"></use>
//           </svg>
//         </button>
//       `;
//         }

//         // Last page
//         if (curPage === numPages && numPages > 1) {
//             return `
//         <button data-goto="${curPage - 1
//                 }" class="btn--inline pagination__btn--prev">
//           <svg class="search__icon">
//             <use href="${icons}#icon-arrow-left"></use>
//           </svg>
//           <span>Page ${curPage - 1}</span>
//         </button>
//       `;
//         }

//         // Other page
//         if (curPage < numPages) {
//             return `
//         <button data-goto="${curPage - 1
//                 }" class="btn--inline pagination__btn--prev">
//           <svg class="search__icon">
//             <use href="${icons}#icon-arrow-left"></use>
//           </svg>
//           <span>Page ${curPage - 1}</span>
//         </button>
//         <button data-goto="${curPage + 1
//                 }" class="btn--inline pagination__btn--next">
//           <span>Page ${curPage + 1}</span>
//           <svg class="search__icon">
//             <use href="${icons}#icon-arrow-right"></use>
//           </svg>
//         </button>
//       `;
//         }

//         // Page 1, and there are NO other pages
//         return '';
//     }
// }

// export default new PaginationView();
