'use strict';

/******************************************
  Treehouse Techdegree:
  FSJS project 5 - Public API Request
  Reinhard Liess, 2019
******************************************/

/** class managing the app */
class AppPublicApi {
  constructor() {
    this.employees = [];
    this.filteredEmployees = [];
    this.modal = new ModalWindow(this);
    const api = new RandomUserApi({results: 12, nat: 'US', inc: 'name,location,email,dob,cell,picture'},
                                  this.onFetchOk, this.onFetchError);
    api.fetch();
  }

  /**
   * Returns input search field
   * @return {HTMLElement} input search field
   */
  get inputSearch() {
    return document.querySelector('#search-input');
  }

   /**
   * Return error message div
   * @return  {HTMLElement} error message div
   */
  get errorMessage() {
    return document.querySelector('#error-message');
  }

  /**
   * Callback in case of a a succesful fetch operation
   * @param {object} data from Api
   */
  onFetchOk = (data) => {

    /* Api error format
    {
      error: "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."
    }
    */

    if (data.error) {
      this.onFetchError(new Error(data.error));
      return
    }

    this.addSearch();
    this.employees = data.results;
    this.employeesReset();
    this.addEmployeesToPage();

    // add click event handler for cards
    document.querySelector('.gallery').addEventListener('click', (event) => {
      const target = event.target;
      const card = target.closest('.card');
      if (this.modal.hidden && card) {
        const email = card.querySelector('div.card-info-container > p:nth-child(2)').textContent;
        const position = this.filteredEmployees.findIndex(element => element.email === email);
        this.modal.hidden = false;
        this.modal.show(position);
      }
    });
  }

  /**
   * Callback in case of an error in the Promise chain of the Api fetch operation
   * @param {error} error object
   */
  onFetchError = (error) => {
    const errorMsg =
    `Unable to retrieve data from the <a href="https://randomuser.me/">Random User API.</a><br>
    Specifically: ${error.message}`;
    this.displayErrorMsg(errorMsg);
  }

  /**
   * Adds employees to page
   */
  addEmployeesToPage() {

    const gallery = document.querySelector('#gallery');
    this.employees.forEach(employee => {
      const html =
      ` <div class="card">
          <div class="card-img-container">
            <img class="card-img" src=${employee.picture.medium} alt="profile picture">
          </div>
          <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
          </div>
        </div>`;
        gallery.insertAdjacentHTML('beforeend', html);
    });

  }

  /**
   * Add a search input field to the website
   */
  addSearch() {
    const divSearch = document.querySelector('.search-container');
    const html =
      `<form action="#" method="get">
          <input type="search" id="search-input" class="search-input" placeholder="Search...">
          <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
       </form>`;
    divSearch.insertAdjacentHTML('afterbegin', html);

    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const searchText = this.inputSearch.value.trim().toLowerCase();
      if (searchText) {
        this.search(searchText);
      } else {
        this.employeesReset();
        this.updatePage();
      }
    });
  }

  /**
   * Executes search and filters employees
   * @param {string} search-text
   */
  search(searchText) {
    this.employees.forEach(employee => {
      const name = `${employee.name.first} ${employee.name.last}`.toLowerCase();
      employee.visible = name.includes(searchText);
    });
    this.updatePage();
    this.filterEmployees();

    if (!this.filteredEmployees.length) {
      this.displayErrorMsg('There are no employees matching the search criteria');
      return
    }
    // at least one employee was found
    const css = new AnimateCss();
    setTimeout(() => {
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].visible) {
          const card = document.querySelector(`#gallery > div:nth-child(${i + 1})`);
          css.animateNode(card, 'pulse');
        }
      }
    }, 200);
  }




  /**
   * Update page, show/hide employees based on visible flag
   */
  updatePage() {
    // REFACTOR: dry
    for(let i = 0; i < this.employees.length; i++) {
      const card = document.querySelector(`#gallery > div:nth-child(${i + 1})`);
      card.style.display = this.employees[i].visible ? '' : 'none';
    }
    this.hideErrorMsg();
  }

  /**
   * Displays error message
   * @param {string} error message
   */
  displayErrorMsg(message) {
    const div = this.errorMessage;
    div.firstElementChild.innerHTML = message;
    div.style.display = '';
  }

  /**
   * Hides error message
   */
  hideErrorMsg() {
    this.errorMessage.style.display = 'none';
  }

  /**
   * Create filtered employee array for modal window (forward/backwards)
   */
  filterEmployees() {
    this.filteredEmployees = this.employees.filter(employee => employee.visible)
  }

  /**
   * Initializes, sets all employees as visible
   */
  employeesReset() {
    this.employees.forEach(employee => employee.visible = true);
    this.filterEmployees();
  }
}

