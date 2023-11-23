import { getTasks } from './api/task';
import { getUser } from './api/user';
import { renderTasks, renderTasksLoader, renderUser } from './utils/renders';
import { openTaskModal } from './utils/taskModalHandlers';

function removeUserLoader () {
   const loader = document.querySelector('#loader').remove()

   if(loader) {
    loader.remove()
   }
}

async function start() {
  try {
    const user = await getUser();

    if (!user) {
      window.location.href = '/auth/login.html';
    }

    renderUser(user)

    removeUserLoader()

     renderTasksLoader()

    const tasks = await getTasks()


    renderTasks(tasks)

    const addTaskButton = document.querySelector('#addTaskButton');

    addTaskButton.addEventListener('click',openTaskModal);
  } catch (error) {
    console.log('error', error);
  }
}

start();
