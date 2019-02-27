# JavaScript Techdegree Project #: Public API requests

A live version of this project can be found [here](https://rliess.github.io/js-techdegree-project5/).

The goal of this project was to build an app for a fictional company called “Awesome Startup”, a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.

The [Random User Generator API](https://randomuser.me/) is used to grab information for 12 random “employees” and use that data to build a prototype for an Awesome Startup employee directory.

## Installation

Since the app uses the Fetch API it can't be run locally. The following files and directories must be copied on a web server:

* `index.html`
* `css/` folder
* `js/` folder

Alternatively it can be run with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in [Visual Studio Code](https://code.visualstudio.com/).

The app uses ES6 classes with arrow functions and [class properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) in order to use callbacks and event handlers as methods while retaining the correct _this_ - it will only run in Google Chrome out of the box. Other browsers will need the source code transpiled with [Babel](https://babeljs.io/).

## Basic Project requirements

* With information provided from The Random User Generator API, send a request to the API, and use the response data to display 12 users, along with some basic information
  * Image
  * First and Last Name
  * Email
  * City or location
* When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed
  * Image
  * Birthday
  * Name
  * Email
  * Cell Number
  * Detailed Address (including street name and number, state or country, and post code)

## Exceeds Grade Project Requirements

* Employees can be filtered by name with a dynamically added search feature
* Functionality has been added to switch back and forth between employees when the detail modal window is open
* No errors in the console when the end or beginning of the list is reached
* At least one of the following style changes has been added
  * Color
  * Background color
  * Font
  * Box or text shadows

## Some Additional remarks

* The modal window can also be closed by pressing `ESC`

### ES6 Classes

* `AppPublicApi` manages the app
* `RandomUserApi` creates an interface with the Random User Api
* `ModalWindow` manages the modal window

### Search functionality

* The search input box will receive the focus when the page loads. It will also get the focus back after the modal window closes
* Clearing the search box and pressing `Enter` or clicking the search button will re-display all 12 employees.

### Design changes / CSS

* Changed font and color for header text, also added a text shadow
* Added a pulse animation for those cards that are found after a filter/search

### Some additional coding conventions

