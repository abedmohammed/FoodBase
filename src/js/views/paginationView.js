import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Add handler to clicking on pagination buttons
   * @param {CallableFunction} handler to change the corresponding search results to the page
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');

      if (!button) return;

      const goto = +button.dataset.goto;

      handler(goto);
    });
  }

  // Generate markup for pagination buttons
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const curPage = this._data.page;
    const prevButton = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
              </svg>
          <span>Page ${curPage - 1}</span>
      </button>
      `;
    const nextButton = `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
     `;

    switch (curPage) {
      case 1:
        if (numPages === 1) return ``;
        return nextButton;
      case numPages:
        return prevButton;
      default:
        return [prevButton, nextButton].join('');
    }
  }
}

export default new PaginationView();
