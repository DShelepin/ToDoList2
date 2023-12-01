import { logout } from '../api/user';
import { errorHandler } from './errorHandler';
import { createModalHtml } from './htmlTemplates';
import { removeElementAfterAnimationPromise } from './utils';

export function onLogoutButtonClick() {
  const modalHtml = createModalHtml({
    title: `Вы уверены, что хотите выйти?`,
    submitButtonText: 'Выйти',
  });

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modalContainer = document.querySelector('[data-modal-container]');
  const closeModalButton = document.querySelector('[data-close-modal-button]');
  const submitModalButton = document.querySelector(
    '[data-submit-modal-button]'
  );

  const closeModal = () => {
    modalContainer.classList.add('smoothClose');

    return removeElementAfterAnimationPromise(modalContainer, () => {
      modalContainer.removeEventListener('click', onModalContainerClick);
      closeModalButton.removeEventListener('click', closeModal);
      submitModalButton.removeEventListener('click', onSubmitModalButtonClick);
    });
  };

  const onModalContainerClick = (event) => {
    if (event.target.dataset.hasOwnProperty('modalContainer')) {
      closeModal();
    }
  };

  const onSubmitModalButtonClick = async () => {
    try {
      await logout();

      await closeModal();

      window.location.href = '../auth/login.html';
    } catch (error) {
      errorHandler(error);
    }
  };

  modalContainer.addEventListener('click', onModalContainerClick);
  closeModalButton.addEventListener('click', closeModal);
  submitModalButton.addEventListener('click', onSubmitModalButtonClick);
}