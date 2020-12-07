# JavaScript Techdegree Project #5: Public API requests

## Description

In this project I accessed the [Random User API](https://randomuser.me/) to retrieve information for 12 random "employees" and use that data to build a prototype for an employee directory of a fictional company called "Awesome Startup". When any part of an employee item in the directory is clicked, a modal window pops up displaying detailed information about that employee. I also implemented a search function by which the employee list can be filtered by name. Also, functionality has been added to switch back and forth between employees when the detail modal window is open, both in browse and search modes.

A live version of this project can be found [here](https://reinhardliess.github.io/employee-directory/).

### Some Additional remarks

- The modal window can also be closed by pressing `ESC`

### ES6 Classes

- `AppPublicApi` manages the app
- `RandomUserApi` creates an interface with the Random User Api
- `ModalWindow` manages the modal window

### Search functionality

- The search input box will receive the focus when the page loads. It will also get the focus back after the modal window closes
- Clearing the search box and pressing `Enter` or clicking the search button will reset and re-display all 12 employees.
- Added a pulse animation for those cards that are found after a filter/search

## Installation

Since the app uses the Fetch API it might not run locally. The following files and directories must be copied on a web server:

- `index.html`
- `css/` folder
- `js/` folder

Alternatively it can be run with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in [Visual Studio Code](https://code.visualstudio.com/).

## Technologies Used

- ES6 Classes (OOP)
- Fetch API
- JSON
- DOM manipulation
