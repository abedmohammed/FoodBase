import View from './View';
import icons from 'url:../../img/icons.svg';

export default class PreviewView extends View {
  /**
   * Combines individual markup recipe previews to display
   * @returns markup for all recipe previews in view
   */
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  // Generate individual recipe preview markup for one recipe
  _generateMarkupPreview(data) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        data.id === id ? 'preview__link--active' : ''
      }" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.image}" alt="${data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${data.title}</h4>
          <p class="preview__publisher">${data.publisher}</p>
          <div class="preview__user-generated ${data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  `;
  }
}
