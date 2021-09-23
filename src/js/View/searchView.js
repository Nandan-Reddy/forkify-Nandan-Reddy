class searchView {
    _parentElement = document.querySelector('.search');
    _searchFeild = document.querySelector('.search__field');
    getQuery() {
        // console.log(this.#searchFeild);
        // console.log(this.#parentElement);
        const query = this._searchFeild.value;
        this._clearInput();
        return query;
    }
    _clearInput() {
        this._searchFeild.value = '';
    }
    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new searchView();