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
        class="smoothOpen bg-black backdrop-blur-sm bg-opacity-30 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
        id="taskModalContainer"
      >
        <form id="taskModal" class="w-full max-w-md bg-white p-8 rounded-lg max-h-full">
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
            <button type="button" class="button button-gray" id="closeTaskModalButton">Отменить</button>
            <button class="button button-green" id="submitTaskModalFormButton">${submitButtonText}</button>
          </div>
        </form>
      </div>

    `;
}

export function createTaskHtml(task, isNew = false) {
 const classByPriority = {
  [priorities.high]:'red',
  [priorities.medium]: 'yellow',
  [priorities.low]: 'blue',
  [priorities.empty]: '',
 }

  return `
    <div class="task ${isNew ? 'openTask' : ''}">
    <label class="checkboxWrapper">
      <input type="checkbox" />
      <div class="checkbox ${classByPriority[task.priority]}"></div>
    </label>
    <div class="ml-2 cursor-pointer hover:opacity-70 w-3/4">
      <div class="mb-1 line-clamp-1">${task.title}</div>
      <div class="text-sm text-zinc-500 line-clamp-3">
       ${task.description}
      </div>
    </div>
    </div>
`;
}
