import { createTaskHtml, createArchiveTaskHtml } from './htmlTemplates';

export function renderUser(user) {
  const userContainer = document.querySelector('#user');
  userContainer.innerHTML = user.email;
}

export function renderActiveTasksLoader() {
  const tasksContainer = document.querySelector('#tasksContainer');
  tasksContainer.innerHTML = `<div class="custom-loader"></div>`;
}

export function renderArchiveTasksLoader() {
  const archiveTasksContainer = document.querySelector(
    '#archiveTasksContainer'
  );
  archiveTasksContainer.innerHTML = `<div class="custom-loader"></div>`;
}

export function renderActiveTasks(tasks) {
  const tasksContainer = document.querySelector('#tasksContainer');

  if (tasks.length) {
    const tasksHtml = tasks.map((task) => createTaskHtml(task)).join('');

    tasksContainer.innerHTML = tasksHtml;
  } else {
    tasksContainer.innerHTML = `<div class="text-zinc-500">Нет задач</div>`;
  }
}

export function renderArchiveTasks(archiveTasks) {
  const archiveTasksContainer = document.querySelector(
    '#archiveTasksContainer'
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
  const tasksContainer = document.querySelector('#tasksContainer');

  const tasks = tasksContainer.querySelectorAll('.task');

  const newTask = createTaskHtml(task, true);

  if (tasks.length) {
    tasksContainer.insertAdjacentHTML('beforeend', newTask);
  } else {
    tasksContainer.innerHTML = newTask;
  }
}

export function renderNewArchiveTask(archiveTask) {
  const activeTasksContainer = document.querySelector('#tasksContainer');
  const archiveTasksContainer = document.querySelector('#archiveTasksContainer');

  const archiveTasks = archiveTasksContainer.querySelectorAll('.task');

  const activeTasks = activeTasksContainer.querySelectorAll('.task');
  const newArchiveTask = createArchiveTaskHtml(archiveTask, true);

  if (archiveTasks.length) {
    archiveTasksContainer.insertAdjacentHTML('beforeend', newArchiveTask);
  } else {
    archiveTasksContainer.innerHTML = newArchiveTask;
  }

  if(!activeTasks.length) {
    activeTasksContainer.innerHTML = `<div class="text-zinc-500">Нет задач</div>`
  }
}

export function renderUpdatedTask(task) {
  const taskContainer = document.querySelector(
    `[data-taskContainerId="${task.id}"]`
  );

  taskContainer.insertAdjacentHTML('afterend', createTaskHtml(task));

  taskContainer.remove();
}
