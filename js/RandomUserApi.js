'use strict';

/******************************************
  Treehouse Techdegree:
  FSJS project 5 - Public API Request
  Reinhard Liess, 2019
******************************************/
/** class for access to the Random User Api: https://randomuser.me/ */
class RandomUserApi {
  /**
   * Initialize Api
   * @param {object} Parent object (for callback management)
   * @param {object} Api options as key/value pairs
   * @param {function} Function called in case of successful fetch operation
   * @param {function} [callback] Function called in case of error
   */
  constructor(parent, objParams, cbOnFetchOk, cbOnError) {
    this.urlApi = 'https://randomuser.me/api/' + this.buildUri(objParams);
    this.parent = parent;
    this.cbOnFetchOk = cbOnFetchOk;
    this.cbOnError = cbOnError;
  }

  /**
   * Builds URI from object
   * @param {object} Api options as key/value pairs
   * @return {string} URI encoded string
   */
  buildUri(objParams) {
    let strOptions = '?';
    for (const prop in objParams) {
      if (objParams.hasOwnProperty(prop)) {
        strOptions += (`${prop}=${objParams[prop]}&`);
      }
    }
    return strOptions.slice(0, -1);
  }

  /**
   * Retrieves API data
   */
  fetch() {
    fetch(this.urlApi)
      .then(this.checkStatus)
      .then(response => response.json())
      .then(data => this.cbOnFetchOk(data))
      .catch(error => this.cbOnError(error));
  }

  checkStatus(response) {
    console.log({response});
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}
