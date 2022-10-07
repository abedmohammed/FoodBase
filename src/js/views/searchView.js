class SearchView {
  _parentEl = document.querySelector('.search');

  /**
   * Retrieve search query
   * @returns {string} Search query
   */
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  // Clears search input text box
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  /**
   * Add handler to clicking on pagination buttons
   * @param {CallableFunction} handler to change the corresponding search results to the page
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
