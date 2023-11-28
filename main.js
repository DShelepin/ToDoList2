import { getActiveTasks, getArchiveTasks } from './api/task';
import { getUser } from './api/user';
import {
  renderActiveTasks,
  renderActiveTasksLoader,
  renderArchiveTasks,
  renderArchiveTasksLoader,
  renderUser,
} from './utils/renders';
import { openTaskModal } from './utils/taskModalHandlers';
import { onActiveTasksContainerCkick, onArchiveTasksContainerCkick } from './utils/tasksContainerHendler';

function removeUserLoader() {
  const loader = document.querySelector('#loader').remove();

  if (loader) {
    loader.remove();
  }
}

async function getAndRenderActiveTasks() {
  renderActiveTasksLoader();

  const activeTasks = await getActiveTasks();

  renderActiveTasks(activeTasks);
}

async function getAndRenderArchiveTasks() {
  renderArchiveTasksLoader();

  const archiveTasks = await getArchiveTasks();

  renderArchiveTasks(archiveTasks);
}

async function start() {
  try {
    const user = await getUser();

    if (!user) {
      window.location.href = '/auth/login.html';
    }

    renderUser(user);

    removeUserLoader();

    await getAndRenderActiveTasks();

    await getAndRenderArchiveTasks();

    const addTaskButton = document.querySelector('#addTaskButton');
    const activeTasksContainer = document.querySelector('#tasksContainer');
    const archiveTasksContainer = document.querySelector('#archiveTasksContainer');


    addTaskButton.addEventListener('click', (event) => openTaskModal());
    activeTasksContainer.addEventListener('click', onActiveTasksContainerCkick);
    archiveTasksContainer.addEventListener('click', onArchiveTasksContainerCkick);
  } catch (error) {
    console.log('error', error);
  }
}

start();
