import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your search! Please try again';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(data) {
    return `
    <li class="preview">
      <a class="preview__link" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.image}" alt="${data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${data.title}</h4>
          <p class="preview__publisher">${data.publisher}</p>
        </div>
      </a>
    </li>
  `;
  }
}

export default new ResultsView();
