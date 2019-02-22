'use strict';

/******************************************
  Treehouse Techdegree:
  FSJS project 5 - Public API Request
  Reinhard Liess, 2019
******************************************/

class AppPublicApi {
  constructor() {
    this.addSearch();
    this.modal = new ModalWindow(this);
    this.fetchError = false;
    const api = new RandomUserApi({results: 12, nat: 'US', inc: 'name,location,email,dob,cell,picture'},
                                  this.onFetchOk, this.onFetchError);
    this.employees = api.fetch();
    this.addEmployeesToPage();
  }
  /**
   * Adds employees to page
   */
  addEmployeesToPage() {
    if (this.fetchError) {
      return
    }

  }

  /**
   * Callback in case of a a succesful fetch operation
   * @param {object} data from Api
   */
  onFetchOk(data) {
    // console.log({data});

  }

  /**
   * Callback in case of a fetch error
   * @param {error} error object
   */
  onFetchError(error) {
    this.fetchError = true;

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

