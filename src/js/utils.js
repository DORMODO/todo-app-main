// Import necessary DOM elements and functions from other modules
import {
  appElement,
  inputElement,
  itemsLeftElement,
  filterButtons,
} from "./elements.js";
import { renderTaskList } from "./renderTaskList.js";

// Function to retrieve data from localStorage
export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : []; // Parse JSON data or return empty array if no data found
};

// Function to toggle dark mode
export const toggleDarkMode = () => {
  appElement.classList.toggle("App--isDark"); // Toggle dark mode class on app element
  saveToDB("darkModeFlag", appElement.classList.contains("App--isDark")); // Save dark mode state to localStorage
};

// Function to delete a task
export const deleteTask = (index) => {
  const tasks = fetchData("tasks"); // Get current tasks
  tasks.splice(index, 1); // Remove task at specified index
  saveToDB("tasks", tasks); // Save updated tasks to localStorage
  applyCurrentFilter(); // Re-apply current filter to update UI
};

// Function to add a new task
export const addTask = (e) => {
  e.preventDefault(); // Prevent form submission
  const taskValue = inputElement.value.trim(); // Get trimmed input value
  if (!taskValue) return; // If input is empty, do nothing

  const task = { value: taskValue, isCompleted: false }; // Create new task object
  const tasks = fetchData("tasks"); // Get current tasks
  tasks.push(task); // Add new task to tasks array
  saveToDB("tasks", tasks); // Save updated tasks to localStorage
  applyCurrentFilter(); // Re-apply current filter to update UI
  inputElement.value = ""; // Clear input field
};

// Function to save data to localStorage
export const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data)); // Save stringified data to localStorage
};

// Function to initialize data on startup
export const initDataOnStartup = () => {
  fetchData("darkModeFlag") && toggleDarkMode(); // Apply dark mode if flag is set
  applyCurrentFilter(); // Apply current filter to render tasks
};

// Function to toggle task completion status
export const toggleTasks = (index) => {
  const tasks = fetchData("tasks"); // Get current tasks
  tasks[index].isCompleted = !tasks[index].isCompleted; // Toggle completion status
  saveToDB("tasks", tasks); // Save updated tasks to localStorage
  applyCurrentFilter(); // Re-apply current filter to update UI
};

// Function to update the count of remaining tasks
export const updateItemsLeftCount = (tasks) => {
  const itemsLeft = tasks.filter((task) => !task.isCompleted).length; // Count incomplete tasks
  itemsLeftElement.textContent = `${itemsLeft} item${itemsLeft !== 1 ? "s" : ""} left`; // Update text content
};

// Function to clear completed tasks
export const clearCompleted = () => {
  const tasks = fetchData("tasks").filter((task) => !task.isCompleted); // Keep only incomplete tasks
  saveToDB("tasks", tasks); // Save updated tasks to localStorage
  applyCurrentFilter(); // Re-apply current filter to update UI
};

// Function to filter tasks based on specified filter
export const filterTasks = (filter) => {
  const tasks = fetchData("tasks"); // Get all tasks
  switch (filter) {
    case "active":
      return tasks.filter((task) => !task.isCompleted); // Return only active tasks
    case "completed":
      return tasks.filter((task) => task.isCompleted); // Return only completed tasks
    default:
      return tasks; // Return all tasks
  }
};

// Function to apply current filter and update UI
export const applyCurrentFilter = () => {
  const currentFilter = localStorage.getItem("currentFilter") || "all"; // Get current filter or default to "all"
  const filteredTasks = filterTasks(currentFilter); // Apply filter to tasks
  renderTaskList(filteredTasks); // Render filtered tasks
  updateFilterButtons(currentFilter); // Update filter button states
};

// Function to update filter button states
export const updateFilterButtons = (currentFilter) => {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter); // Add/remove active class based on current filter
  });
};

// Function to initialize drag and drop functionality
export const initDragAndDrop = () => {
  const taskItems = document.querySelectorAll(".task-list__item");

  taskItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", drop);
  });
};

// Function to handle drag start event
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index); // Set dragged item's index
}

// Function to handle drag over event
function dragOver(e) {
  e.preventDefault(); // Prevent default to allow drop
}

// Function to handle drop event
function drop(e) {
  e.preventDefault();
  const draggedIndex = parseInt(e.dataTransfer.getData("text")); // Get dragged item's index
  const dropIndex = parseInt(
    e.target.closest(".task-list__item").dataset.index
  ); // Get drop target's index

  if (draggedIndex !== dropIndex) {
    const tasks = fetchData("tasks"); // Get current tasks
    const [reorderedItem] = tasks.splice(draggedIndex, 1); // Remove dragged item
    tasks.splice(dropIndex, 0, reorderedItem); // Insert dragged item at new position
    saveToDB("tasks", tasks); // Save updated tasks to localStorage
    applyCurrentFilter(); // Re-apply current filter to update UI
  }
}
