'use strict';

/******************************************
  Treehouse Techdegree:
  FSJS project 5 - Public API Request
  Reinhard Liess, 2019
******************************************/
/** manages the modal window */
class ModalWindow {
  /**
   * Create modal window
   * @param {object} App object, needed to access employee info
   */
  constructor(parent) {
    this.parent = parent;
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
   * Returns info container for modal window
   * @return {HTMLElement} modal info container
   */
  get modalInfoContainer() {
    return document.querySelector('.modal-info-container');
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
   * Registers event listeners
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

    // TODO: add keyboard escape handler to close
    document.querySelector('#modal-close-btn').addEventListener('click', () => {
      if (!this.hidden) {
        this.hidden = true;
      }
    });

    // previous/next buttons
    document.querySelector('#modal-prev').addEventListener('click', () => {
      if (!this.hidden) {
        this.previous();
      }
    });
    document.querySelector('#modal-next').addEventListener('click', () => {
      if (!this.hidden) {
        this.next();
      }
    });

  }

  /**
   * Show modal window
   * @param {integer} index of record to display
   */
  // TODO: format address => proper case
  // TODO: format birthday
  show(index) {
    this.clearInfo();

    const employee = this.parent.employees[index];
    this.position = index;

    const html =
    `<img class="modal-img" src="${employee.picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text cap">${employee.location.city}</p>
    <hr>
    <p class="modal-text">${employee.cell}</p>
    <p class="modal-text cap">${employee.location.street}, ${employee.location.city},
     ${employee.location.state} ${employee.location.postcode}</p>
    <p class="modal-text">Birthday: ${employee.dob.date}</p>
    `;
    this.modalInfoContainer.insertAdjacentHTML('afterbegin', html);
  }

  /**
   * Clears info section of modal window
   */
  clearInfo() {
    const info = this.modalInfoContainer;
    while (info.hasChildNodes()) {
      info.removeChild(info.firstChild);
    }
  }

  /**
   * Moves to next record in modal window
   */
  next() {
    if(this.position === this.parent.employees.length - 1) {
      this.show(0)
    } else {
      this.show(this.position + 1);
    }
  }

  /**
   * Moves to previous record in modal window
   */
  previous() {
    if(this.position === 0) {
      this.show(this.parent.employees.length - 1);
    } else {
      this.show(this.position - 1);
    }
  }
}

