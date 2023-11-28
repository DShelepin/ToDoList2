import { getTask, updateTask } from '../api/task';
import { modes, statuses } from './constans';
import { renderNewArchiveTask } from './renders';
import { CloseTaskModal, openTaskModal } from './taskModalHandlers';

export async function onActiveTasksContainerCkick(event) {
  const taskCheckbox = event.target.closest('[data-taskCheckbox]');
  const taskContent = event.target.closest('[data-taskContent]');
  const taskContainer = event.target.closest('.task');

  if (taskCheckbox && event.target.tagName !== 'INPUT') {
    const taskId = taskCheckbox.dataset.taskid;
    taskContainer.classList.add('disabled');

    try {
      const archiveTask = await updateTask({
        id: taskId,
        status: statuses.archive,
      });

      taskCheckbox.classList.add('closeTask');

      const animationPromise = () =>
        new Promise((res) => {
          const onAnimationEnd = () => {
            taskContainer.removeEventListener("animationend", onAnimationEnd);

            taskContainer.remove();

            res();
          };

          taskContainer.addEventListener("animationend", onAnimationEnd);
        });

      await animationPromise();

      renderNewArchiveTask(archiveTask);
    } catch (error) {
      console.log('error', error);

      taskContainer.classList.remove('disabled');
    }
  }

  if (taskContent) {
    const taskId = taskContent.dataset.taskid;

    openTaskModal(modes.edit, taskId);

    try {
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
    } catch (error) {
      console.log('error', error);

      CloseTaskModal();
    }
  }
}

export async function onArchiveTasksContainerCkick(event) {
  const taskCheckbox = event.target.closest('[data-taskCheckbox]');

  if (taskCheckbox && event.target.tagName !== 'INPUT') {
    console.log('archive task checkbox click');
  }
}
