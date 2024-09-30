// Import necessary DOM elements and functions
import {
  clearCompletedBtn,
  darkThemeToggleElement,
  filterButtons,
  getDeleteIcons,
  getTasksCheckbox,
  taskSearchBarBtn,
} from "./elements.js";
import {
  addTask,
  applyCurrentFilter,
  clearCompleted,
  deleteTask,
  toggleDarkMode,
  toggleTasks,
} from "./utils.js";

// Function to initialize task-specific event listeners
export const initTaskListeners = () => {
  // Add click event listeners to all delete icons
  getDeleteIcons().forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const index = parseInt(
        e.target.closest(".task-list__item").dataset.index
      );
      deleteTask(index); // Call deleteTask function with the task's index
    });
  });

  // Add click and keydown event listeners to all task checkboxes
  getTasksCheckbox().forEach((box) => {
    box.addEventListener("click", (e) => {
      const index = parseInt(
        e.target.closest(".task-list__item").dataset.index
      );
      toggleTasks(index); // Call toggleTasks function with the task's index
    });
  });
};

// Function to initialize global event listeners
export const initListeners = () => {
  // Add click event listener to dark theme toggle
  darkThemeToggleElement.addEventListener("click", toggleDarkMode);

  // Add click event listener to task search bar button (for adding new tasks)
  taskSearchBarBtn.addEventListener("click", addTask);

  // Add click event listener to "Clear completed" button
  clearCompletedBtn.addEventListener("click", clearCompleted);

  // Add click event listener to "Filters buttons"
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      localStorage.setItem("currentFilter", filter);
      applyCurrentFilter();
    });
  });
};


