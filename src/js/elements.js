// Select the dark theme toggle element
export const darkThemeToggleElement =
  document.querySelector(".DarkThemeToggle");

// Select the main app container element
export const appElement = document.querySelector(".App");

// Select the task search bar button
export const taskSearchBarBtn = document.querySelector(
  ".TaskSearchBar__button"
);

// Select the input element for adding new tasks
export const inputElement = document.querySelector(".TaskSearchBar__input");

// Select the container for the task list
export const taskListElement = document.querySelector(".task-list__items");

// Select the task list link (unused in current implementation)
export const taskListLink = document.querySelector(".TaskList__link");

/*  Function solution: By defining getDeleteIcons() and getTasksCheckbox() as functions,
    every time they are called, they fetch the current state of the DOM.
    This ensures the functions return up-to-date elements, including any new or removed tasks.\
*/

// Function to get all delete icons (called when needed to ensure up-to-date selection)
export const getDeleteIcons = () =>
  document.querySelectorAll(".task-list__delete-icon");

// Function to get all task checkboxes (called when needed to ensure up-to-date selection)
export const getTasksCheckbox = () =>
  document.querySelectorAll(".task-list__checkbox");

// Select the element that displays the count of remaining tasks
export const itemsLeftElement = document.querySelector(
  ".task-list__info-items-left"
);

// Select all filter buttons
export const filterButtons = document.querySelectorAll(
  ".task-list__filter-btn"
);

// Select the "Clear completed" button
export const clearCompletedBtn = document.querySelector(
  ".task-list__clear-btn"
);
