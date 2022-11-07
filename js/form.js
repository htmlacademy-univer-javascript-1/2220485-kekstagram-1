import {validateForm} from './validation.js';

const uploadFileButton = document.querySelector('#upload-file');
const editingForm = document.querySelector('.img-upload__overlay');
const closeEditingFormButton = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');

const inputHashtag = document.querySelector('.text__hashtags');
const inputComments = document.querySelector('.text__description');

const closeEditingForm = () => {
  body.classList.remove('modal-open');
  editingForm.classList.add('hidden');
  uploadFileButton.value = '';
  inputComments.value = '';
  inputHashtag.value = '';
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeEditingForm();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

closeEditingFormButton.addEventListener('click', closeEditingForm);

const renderUploadForm = () => {
  uploadFileButton.addEventListener('change', () => {
    editingForm.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeyDown);
  });
  validateForm();
};

export{renderUploadForm};

