import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';

  _body = document.body;
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAdd;

  _numIngs = 1;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  openWindow() {
    this._renderForm();
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
    this._body.classList.add('no-scroll');

    this._numIngs = 1;
    this._addHandlerAddIngredient();
  }

  closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
    this._body.classList.remove('no-scroll');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.openWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }

  _addHandlerAddIngredient() {
    this._btnAdd = document.querySelector('.upload__add--ingredient');
    this._btnAdd.addEventListener(
      'click',
      this._generateMarkupIngInput.bind(this)
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _renderForm() {
    const markup = `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <div class="upload__column__data">
          <label>Title</label>
          <input value="" required name="title" type="text" />
          <label>URL</label>
          <input value="" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="" required name="image" type="text" />
          <label>Publisher</label>
          <input value="" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="" required name="servings" type="number" />
        </div>
      </div>

      <div class="upload__ingredients">
        <h3 class="upload__heading">Ingredients</h3>
        <div class="upload__ingredients__list">
          <label>Ingredient 1</label>
          <input
          value=""
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
          />
        <button type="button" class="btn--round upload__add--ingredient">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
        </div>
      </div>
      
      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupIngInput() {
    this._numIngs += 1;
    const markup = `
      <label>Ingredient ${this._numIngs}</label>
      <input
      value=""
      type="text"
      required
      name="ingredient-${this._numIngs}"
      placeholder="Format: 'Quantity,Unit,Description'"
      />
      `;

    this._btnAdd.insertAdjacentHTML('beforebegin', markup);
  }
}

export default new AddRecipeView();
