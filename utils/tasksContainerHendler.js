import { getTask } from "../api/task";
import { modes } from "./constans";
import { openTaskModal } from "./taskModalHandlers";

export async function onTasksContainerCkick(event) {
  const taskCheckbox = event.target.closest('[data-taskCheckbox]');
  const taskContent = event.target.closest('[data-taskContent]');

  if (taskCheckbox && event.target.tagName !== 'INPUT') {
    console.log('event.target.tagName', event.target.tagName);
  }

  if (taskContent) {
    const taskId = taskContent.dataset.taskid

    openTaskModal(modes.edit, taskId);

    const task = await getTask(taskId);

    const taskModal = document.querySelector('#taskModal');
    const taskLoader = document.querySelector('#taskLoader');

    if (taskModal && taskLoader) {
      const elements = taskModal.elements;

      elements.title.value = task.title;
      elements.description.value = task.description;
      elements.priority.value = task.priority;

      taskLoader.remove();
    }
  }
}
