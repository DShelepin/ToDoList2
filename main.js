import { getUser } from './api/user';
import { openTaskModal } from './utils/taskModalHandlers';

async function start() {
  try {
    const user = await getUser();
    if (!user) {
      window.location.href = '/auth/login.html';
    }

    const addTaskButton = document.querySelector('#addTaskButton');

    addTaskButton.addEventListener('click',openTaskModal);
  } catch (error) {
    console.log('error', error);
  }
}

start();
