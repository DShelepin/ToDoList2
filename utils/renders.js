import { createTaskHtml, createArchiveTaskHtml } from './htmlTemplates';

export function renderUser(user) {
  const userContainer = document.querySelector('#user');

  userContainer.innerHTML = user.email;
}

export function renderActiveTasksLoader() {
  const tasksContainer = document.querySelector('#tasks-container');

  tasksContainer.innerHTML = `<div class="custom-loader"></div>`;
}

export function renderArchiveTasksLoader() {
  const archiveTasksContainer = document.querySelector(
    '#archive-tasks-container'
  );
  archiveTasksContainer.innerHTML = `<div class="custom-loader"></div>`;
}

export function renderActiveTasks(tasks) {
  const tasksContainer = document.querySelector('#tasks-container');

  if (tasks.length) {
    const tasksHtml = tasks.map((task) => createTaskHtml(task)).join('');

    tasksContainer.innerHTML = tasksHtml;
  } else {
    tasksContainer.innerHTML = `<div class="text-zinc-500">Нет задач</div>`;
  }
}

export function renderArchiveTasks(archiveTasks) {
  const archiveTasksContainer = document.querySelector(
    '#archive-tasks-container'
  );

  if (archiveTasks.length) {
    const tasksHtml = archiveTasks
      .map((archiveTask) => createArchiveTaskHtml(archiveTask))
      .join('');

    archiveTasksContainer.innerHTML = tasksHtml;
  } else {
    archiveTasksContainer.innerHTML = `<div class="text-zinc-500">Нет задач</div>`;
  }
}

export function renderNewTask(task) {
  const activeTasksContainer = document.querySelector('#tasks-container');
  const archiveTasksContainer = document.querySelector(
    '#archive-tasks-container'
  );

  const activeTasks = activeTasksContainer.querySelectorAll('.task');

  const newTask = createTaskHtml(task, true);

  if (activeTasks.length) {
    activeTasksContainer.insertAdjacentHTML('beforeend', newTask);
  } else {
    activeTasksContainer.innerHTML = newTask;
  }

  makeTextIfNoTaskInContainer(archiveTasksContainer);
}

export function renderNewArchiveTask(archiveTask) {
  const activeTasksContainer = document.querySelector('#tasks-container');
  const archiveTasksContainer = document.querySelector(
    '#archive-tasks-container'
  );

  const archiveTasks = archiveTasksContainer.querySelectorAll('.task');

  const newArchiveTask = createArchiveTaskHtml(archiveTask, true);

  if (archiveTasks.length) {
    archiveTasksContainer.insertAdjacentHTML('beforeend', newArchiveTask);
  } else {
    archiveTasksContainer.innerHTML = newArchiveTask;
  }

  makeTextIfNoTaskInContainer(activeTasksContainer);
}

export function renderUpdatedTask(task) {
  const taskContainer = document.querySelector(
    `[data-task-container-id="${task.id}"]`
  );

  taskContainer.insertAdjacentHTML('afterend', createTaskHtml(task));

  taskContainer.remove();
}
export function makeTextIfNoTaskInContainer(container) {
  const tasks = container.querySelectorAll('.task');
  if (!tasks.length) {
    container.innerHTML = `<div class="text-zinc-500">Нет задач</div>`;
  }
}

export function makeTextIfErrorInContainer(container) {
  const tasks = container.querySelectorAll('.task');

  if (!tasks.length) {
    container.innerHTML = `<div class="text-zinc-500">Ошибка при получении задач</div>`;
  }
}
