import { modes, priorities } from './constans';

export function createTaskModalHtml(mode = modes.create) {
  let title = 'Новая задача';
  let submitButtonText = 'Создать';

  if (mode === modes.edit) {
    title = 'Редактировать задачу';
    submitButtonText = 'Сохранить';
  }

  return `
    <div
        class="smoothOpen bg-black backdrop-blur-sm bg-opacity-30 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center "
        id="task-modal-container"
      >
      
     
        <form id="task-modal" class="w-full max-w-md bg-white p-8 rounded-lg max-h-full relative">
        ${
          mode === modes.edit
            ? `<div class="absolute top-0 right-0 bottom-0 left-0 bg-white rounded-lg flex justify-center items-center" id="task-loader">
        <div class="custom-loader"></div>
      </div>`
            : ''
        }
          <h2 class="text-lg font-bold text-blue-600 border-b-2 pb-2 mb-4">
           ${title}
          </h2>
          <label for="title" class="block mb-1">Название</label>
          <input
            id="title"
            type="text"
            class="w-full h-10 rounded-lg px-4 border mb-2"
            required
          />
          <label for="description" class="block mb-1">Описание</label>
          <textarea
            id="description"
            class="w-full h-32 rounded-lg px-4 py-2 border max-h-56 mb-2"
          ></textarea>
          <label for="priority" class="block mb-1">Приоритет</label>
          <select id="priority" class="w-full h-10 rounded-lg px-4 border mb-8">
            <option value="${priorities.high}">Высокий</option>
            <option value="${priorities.medium}">Средний</option>
            <option value="${priorities.low}">Низкий</option>
            <option value="${priorities.empty}" selected>Без приоритета</option>
          </select>
          <div class="flex justify-between">
            <button type="button" class="button button-gray" id="close-task-modal-button">Отменить</button>
            <button class="button button-green" id="submit-task-modal-form-button">${submitButtonText}</button>
          </div>
        </form>
      </div>

    `;
}

export function createTaskHtml(task, isNew = false) {
  const classByPriority = {
    [priorities.high]: 'red',
    [priorities.medium]: 'yellow',
    [priorities.low]: 'blue',
    [priorities.empty]: '',
  };

  return `
    <div class="task ${isNew ? 'openTask' : ''}" data-task-container-id="${
    task.id
  }">
    <label class="checkboxWrapper" data-task-id="${task.id}" data-task-checkbox>
      <input type="checkbox"  />
      <div class="checkbox ${classByPriority[task.priority]}"></div>
    </label>
    <div class="ml-2 cursor-pointer hover:opacity-70 w-3/4" data-task-id="${
      task.id
    }" data-task-content>
      <div class="mb-1 line-clamp-1">${task.title}</div>
      <div class="text-sm text-zinc-500 line-clamp-3">
       ${task.description}
      </div>
    </div>
    </div>
`;
}

export function createArchiveTaskHtml(archiveTask, isNew = false) {
  const checkboxClassByPriority = {
    [priorities.high]: 'red',
    [priorities.medium]: 'yellow',
    [priorities.low]: 'blue',
    [priorities.empty]: '',
  };

  const contentClassByPriority = {
    [priorities.high]: 'decoration-red-700',
    [priorities.medium]: 'decoration-yellow-700',
    [priorities.low]: 'decoration-blue-700',
    [priorities.empty]: 'decoration-black',
  };

  return `
    <div class="task ${
      isNew ? 'openTask' : ''
    }" data-archive-tasks-container-id="${archiveTask.id}">
    <label class="checkboxWrapper" data-archive-task-id="${
      archiveTask.id
    }" data-task-checkbox>
      <input type="checkbox" checked />
      <div class="checkbox ${
        checkboxClassByPriority[archiveTask.priority]
      }"></div>
    </label>
    <div class="ml-2 w-3/4">
      <div class="mb-1 line-clamp-1 line-through ${
        contentClassByPriority[archiveTask.priority]
      }">${archiveTask.title}</div>
      <div class="text-sm text-zinc-500 line-clamp-3 ${
        contentClassByPriority[archiveTask.priority]
      }">
       ${archiveTask.description}
      </div>
    </div>
    <div class="ml-auto flex items-center">
        <button class="button button-red" data-delete-task-button data-task-title="${
          archiveTask.title
        }">Удалить</button>
      </div>
    </div>
`;
}

export function createModalHtml({ title, submitButtonText }) {
  return `
  <div
  class="smoothOpen bg-black backdrop-blur-sm bg-opacity-30 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  data-modal-container
>
  <div class="w-full max-w-md bg-white p-8 rounded-lg max-h-full">
    <h2 class="text-lg font-bold mb-6 text-center">
     ${title}
    </h2>
    <div class="flex justify-between">
      <button class="button button-gray" data-close-modal-button>Отменить</button>
      <button class="button button-red" data-submit-modal-button>${submitButtonText}</button>
    </div>
  </div>
</div>
  `;
}

export function createErrorContainerHtml(errorMassage) {
return `
  <div class="fixed right-0 bottom-0 left-0 pb-10 px-5 flex flex-col gap-3 max-h-screen overflow-x-hidden" data-error-container>
   ${createErrorHtml(errorMassage)}
  </div>
`
}

export function createErrorHtml(errorMassage) {
  return `
   <div
    class="relative w-72 bg-red-700 rounded-lg text-white py-3 pl-8 pr-10 ml-auto openError"
    data-error
  >
    <span class="line-clamp-5">${errorMassage}</span>
    <div class="absolute top-3 right-3 w-6 h-6 cursor-pointer hover:opacity-70"
    data-close-error-button
    >
      <svg height="100%" viewBox="0 0 24 24" width="100%">
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          fill="#fff"
        ></path>
      </svg>
    </div>
  </div>
  `
}