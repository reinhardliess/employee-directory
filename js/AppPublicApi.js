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
    this.addSearch();
    this.modal = new ModalWindow(this);
    this.fetchError = false;
    const api = new RandomUserApi(this, {results: 12, nat: 'US', inc: 'name,location,email,dob,cell,picture'},
                                  this.onFetchOk, this.onFetchError);
    api.fetch();
  }

  /**
   * Callback in case of a a succesful fetch operation
   * @param {object} data from Api
   */
  onFetchOk(data) {
    //  Called in a Promise chain, so this = RandomUserApi
    const self = this.parent;
    if (data.error) {
      self.onFetchError(new Error(data.error));
      return
    }
    self.employees = data.results;
    /* for(let i = 0; i < self.employees.length; i++) {
      self.employees[i].idArray = i;
    } */
    self.addEmployeesToPage();
    // add click event handler for cards
    document.querySelector('.gallery').addEventListener('click', (event) => {
      const target = event.target;
      if (self.modal.hidden) {
        const card = target.closest('.card');
        const email = card.querySelector('div.card-info-container > p:nth-child(2)').textContent;
        const position = self.employees.findIndex(element => element.email === email);
        self.modal.hidden = false;
        self.modal.show(position);
      }
    });
  }

  /**
   * Callback in case of a fetch error
   * @param {error} error object
   */
  onFetchError(error) {
    this.fetchError = true;
    console.error(error.message);
  }

  /**
   * Adds employees to page
   */
  addEmployeesToPage() {
    if (this.fetchError) {
      return
    }
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
  }
}

