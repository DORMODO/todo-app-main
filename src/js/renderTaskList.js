import { taskListElement } from './elements.js';
import { initDragAndDrop, updateItemsLeftCount } from './utils.js';
import { initTaskListeners } from "./eventListeners.js";

export const renderTaskList = (tasks) => {
    if (tasks.length === 0) {
        renderEmptyState();
        return;
    }

    let taskList = "";
    tasks.forEach((task, index) => {
        taskList += `
            <li class="task-list__item${task.isCompleted ? " task-list__item--isActive" : ""}" data-index="${index}" draggable="true">
                <div class='task-list__checkbox' tabindex="0" role="checkbox" aria-checked="${task.isCompleted}">
                    <img class='task-list__checkbox-icon' src="./images/icon-check.svg" alt="Mark as complete" />
                </div>
                <div class='task-list__content'>
                    <p class='task-list__description'>${task.value}</p>
                    <button class='task-list__delete-icon' aria-label="Delete task">
                        <img src="./images/icon-cross.svg" alt="Delete task"/>
                    </button>
                </div>
            </li>
        `;
    });
    taskListElement.innerHTML = taskList;

    updateItemsLeftCount(tasks);
    initDragAndDrop();
    initTaskListeners();
};

const renderEmptyState = () => {
    taskListElement.innerHTML = `
        <li class="emptyList">
            <img src="./images/icon-empty.svg" alt="list is empty" class="emptyList__img"/>
            <p>No tasks to display</p>
        </li>
    `;
};
