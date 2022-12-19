import { isEscapeKey } from './utils.js';
import { ALERT_SHOW_TIME } from './consts.js';

const errorMessageTemplate = `<section class="error js-message">
<div class="error__inner">
  <h2 class="error__title js-message-inner">Ошибка загрузки файла</h2>
  <button type="button" class="error__button js-message-btn">Загрузить другой файл</button>
</div>
</section>`;

const successMessageTemplate = `<section class="success js-message">
<div class="success__inner">
  <h2 class="success__title js-message-inner">Изображение успешно загружено</h2>
  <button type="button" class="success__button js-message-btn">Круто!</button>
</div>
</section>`;

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    document.removeEventListener('keydown', onDocumentEscKeydown);
    removeMessage();
  }
};

const onDocumentClick = (evt) => {
  const target = evt.target;

  if (target.closest('.js-message-inner') && !target.classList.contains('js-message-btn')) {
    return;
  }

  document.removeEventListener('click', onDocumentClick);
  removeMessage();
};

const renderMessage = (isSuccess = false) => {
  document.body.insertAdjacentHTML('beforeend', isSuccess ? successMessageTemplate : errorMessageTemplate);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

function removeMessage() {
  const message = document.querySelector('.js-message');
  message.remove();
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const errorGetDataMessage = () => {
  const alertForm = document.createElement('div');
  alertForm.style.zIndex = '100';
  alertForm.style.position = 'absolute';
  alertForm.style.left = '0';
  alertForm.style.top = '0';
  alertForm.style.right = '0';
  alertForm.style.padding = '15px';
  alertForm.style.fontSize = '20px';
  alertForm.style.textAlign = 'center';
  alertForm.style.backgroundColor = '#FF6666';

  alertForm.textContent = 'Произошла ошибка при загрузке фотографий. Обновите страницу.';

  document.body.append(alertForm);

  setTimeout(() => {
    alertForm.remove();
  }, ALERT_SHOW_TIME);
};

export { renderMessage, errorGetDataMessage };
