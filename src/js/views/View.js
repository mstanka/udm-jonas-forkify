import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[] } data The data to be rendered (e.g. recipe)
   * @param {bollean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is rendered if render=false
   * @this {Object} View instance
   * @author author
   * @todo Finish implementation
   */
  render(data, render = true) {
    // if no data or if not array or if empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;
    // attach to parent element as a first child
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    // generate new markup, not render it, but compare with the current html and udpate only changed parts
    const newMarkup = this._generateMarkup();
    // create virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // NodeList convert to array
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
     
      // updates changed TEXT
      // if elements different and also element's firstchild has nodeValue - it means if it is text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // change text content
        curEl.textContent = newEl.textContent;
      }

      // updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
