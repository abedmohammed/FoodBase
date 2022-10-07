import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView';

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  /**
   * Attach event handler to show bookmakrs window
   * @param {CallableFunction} handler to show bookmarks info
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
