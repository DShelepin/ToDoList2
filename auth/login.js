import { login } from '../api/user';
import { errorHandler } from '../utils/errorHandler';

async function onSubmit(event) {
  event.preventDefault();
  const elements = event.target.elements;

  const email = elements.email;
  const emailValue = email.value;

  const password = elements.password;
  const passwordValue = password.value;


  const loginButton = elements.loginButton;


  try {

    email.setAttribute('disabled', 'true');
    password.setAttribute('disabled', 'true');
    loginButton.setAttribute('disabled', 'true');

await login(emailValue, passwordValue);

   window.location.href = '/'
  } catch (error) {
    email.removeAttribute('disabled');
    password.removeAttribute('disabled');
    loginButton.removeAttribute('disabled');

    errorHandler(error)
  }
}

async function start() {
  try {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', onSubmit);
  } catch (error) {
    errorHandler(error)
  }
}

start();
