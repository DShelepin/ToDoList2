import { createErrorContainerHtml, createErrorHtml } from './htmlTemplates';

export function errorHandler(error) {
  const errorContainer = document.querySelector('[data-error-container]');

  if (errorContainer) {
    const errorHtml = createErrorHtml(error?.message || 'Что-то случилось');

    errorContainer.insertAdjacentHTML('beforeend', errorHtml);

    const errorsElement = document.querySelectorAll('[data-error]');

    const errorElement = errorsElement[errorsElement.length - 1];

    removeErrorAfterTimeout(errorElement);
  } else {
    const errorContainerHtml = createErrorContainerHtml(
      error?.message || 'Что-то случилось'
    );

    document.body.insertAdjacentHTML('beforeend', errorContainerHtml);

    const errorElement = document.querySelector('[data-error]');

    removeErrorAfterTimeout(errorElement);
  }

  document
    .querySelector('[data-error-container]')
    .addEventListener('click', (event) => {
      const errorElement = event.target.closest('[data-error]');
      const closeErrorButton = event.target.closest(
        '[data-close-error-button]'
      );

      if (errorElement && closeErrorButton) {
        removeError(errorElement);
      }
    });
}

function removeErrorAfterTimeout(errorElement) {
  setTimeout(() => {
    removeError(errorElement);
  }, 3000);
}

async function removeError(errorElement) {
  errorElement.classList.add('closeError');

  await removeElementAfterAnimationPromise(errorElement);

  const errorsElement = document.querySelectorAll('[data-error]');

  if (!errorsElement.length) {
    document.querySelector('[data-error-container]').remove();
  }
}
