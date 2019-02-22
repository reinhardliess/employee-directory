'use strict';

/******************************************
  Treehouse Techdegree:
  FSJS project 5 - Public API Request
  Reinhard Liess, 2019
******************************************/

class ModalWindow {
  constructor(owner) {
    // points to app object, needed to access employee info
    this.owner = owner;
    // position in record set of employees
    this.position = null;
    this.create();
  }

  /**
   * Returns container for modal window
   * @return {HTMLElement} modal container
   */
  get modalContainer() {
    return document.querySelector('.modal-container');
  }

  /**
   * Returns hidden status of modal window
   * @return {boolean} visible or hidden
   */
  get hidden() {
    return this.modalContainer.style.display === 'none';
  }

  /**
   * Sets hidden status of modal window
   * @param {boolean} visible or hidden
   */
  set hidden(isHidden) {
    if (isHidden) {
      this.modalContainer.style.display = 'none';
    } else {
      this.modalContainer.style.display = '';
    }
  }

  /**
   * Creates modal window in the DOM
   */
  create() {
    const html = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        </div>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>
    `;
    document.querySelector('body > script').insertAdjacentHTML('beforebegin', html);
    this.hidden = true;
  }

  /**
   * Clears info section of modal window
   */
  clearInfo() {
    const info = document.querySelector('.modal-info-container');
    while (info.hasChildNodes()) {
      info.removeChild(info.firstChild);
    }
  }

  get isFirst() {

  }

  get isLast() {

  }
}

