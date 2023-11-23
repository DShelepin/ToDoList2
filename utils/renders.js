import { createTaskHtml } from './htmlTemplates';

export function renderUser(user) {
  const userContainer = document.querySelector('#user');
  userContainer.innerHTML = user.email;
}

export function renderTasksLoader() {
  const tasksContainer = document.querySelector('#tasksContainer');
  tasksContainer.innerHTML = `<div class="custom-loader"></div>`;
}

export function renderTasks(tasks) {
  const tasksContainer = document.querySelector('#tasksContainer');

  if (tasks.length) {
    const tasksHtml = tasks.map((task) => createTaskHtml(task)).join('');

    tasksContainer.innerHTML = tasksHtml;
  } else {
    tasksContainer.innerHTML = `<div class="text-zinc-500">Нет задач</div>`;
  }
}

export function renderNewTask(task) {
  const tasksContainer = document.querySelector('#tasksContainer');

  const tasks = tasksContainer.querySelectorAll('.task')

  const newTask = createTaskHtml(task, true)

  if(tasks.length) {
    tasksContainer.insertAdjacentHTML('beforeend', newTask);
  }else{
    tasksContainer.innerHTML = newTask
  }

  
}
