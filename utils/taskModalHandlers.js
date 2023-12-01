import { createTask, updateTask } from '../api/task';
import { modes } from './constans';
import { errorHandler } from './errorHandler';
import { createTaskModalHtml } from './htmlTemplates';
import { renderNewTask, renderUpdatedTask } from './renders';
import { removeElementAfterAnimationPromise } from './utils';

export function onTaskModalContainerClick(event) {
  if (event.target.id === 'task-modal-container') {
    CloseTaskModal();
  }
}

export function CloseTaskModal() {
  const taskModalContainer = document.querySelector('#task-modal-container');
  const closeTaskModalButton = document.querySelector(
    '#close-task-modal-button'
  );

  taskModalContainer.classList.add('smoothClose');

  return removeElementAfterAnimationPromise(taskModalContainer, () => {
    closeTaskModalButton.removeEventListener('click', CloseTaskModal);
    taskModalContainer.removeEventListener('click', onTaskModalContainerClick)
});
}

export function openTaskModal(mode = modes.create, taskId) {
  const taskModalHtml = createTaskModalHtml(mode);

  document.body.insertAdjacentHTML('beforeend', taskModalHtml);

  const taskModalContainer = document.querySelector('#task-modal-container');
  const taskModal = document.querySelector('#task-modal');
  const closeTaskModalButton = document.querySelector(
    '#close-task-modal-button'
  );
  const submitTaskModalFormButton = document.querySelector(
    '#submit-task-modal-form-button'
  );

  closeTaskModalButton.addEventListener('click', CloseTaskModal);

  taskModalContainer.addEventListener('click', onTaskModalContainerClick);

  taskModal.addEventListener('submit', async (event) => {
    event.preventDefault();

    const elements = event.target.elements;

    const title = elements.title;
    const description = elements.description;
    const priority = elements.priority;

    const taskData = {
      title: title.value,
      description: description.value,
      priority: priority.value,
    };

    try {
      title.setAttribute('disabled', 'true');
      description.setAttribute('disabled', 'true');
      priority.setAttribute('disabled', 'true');
      closeTaskModalButton.setAttribute('disabled', 'true');
      submitTaskModalFormButton.setAttribute('disabled', 'true');

      if (mode === modes.create) {
        const newTask = await createTask(taskData);
        

        await CloseTaskModal();

        renderNewTask(newTask)
      } else {
        const updatedTask = await updateTask({
          id: taskId,
          ...taskData,
        });
        await CloseTaskModal();

        renderUpdatedTask(updatedTask);
      }
    } catch (error) {
      errorHandler(error)

      title.removeAttribute('disabled');
      description.removeAttribute('disabled');
      priority.removeAttribute('disabled');
      closeTaskModalButton.removeAttribute('disabled');
      submitTaskModalFormButton.removeAttribute('disabled');
    }
  });
}
