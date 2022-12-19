import { validateForm } from './validation.js';
import { allowFormSubmission, form } from './validation.js';
import { initEffects, effectsList, Effect, effectLevelValue, slider } from './effects.js';
import { sendData } from './api.js';
import { renderMessage } from './message.js';
import { FILE_TYPES, Scale } from './consts.js';

const uploadFileButton = document.querySelector('#upload-file');
const editingForm = document.querySelector('.img-upload__overlay');
const closeEditingFormButton = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');

const sliderWrapper = document.querySelector('.img-upload__effect-level');

const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const fileChooser = document.querySelector('.img-upload__start input[type=file]');

const scaleControlValue = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');

const onScaleControlSmallerButtonClick = () => {
  const inputScale = Number.parseInt(scaleControlValue.value, 10);
  if (inputScale !== Scale.MIN) {
    const actualScale = inputScale - Scale.STEP;
    scaleControlValue.value = `${actualScale}%`;
    picturePreview.style.transform = `scale(${actualScale / 100})`;
  }
};

const onScaleControlBiggerButtonClick = () => {
  const inputScale = Number.parseInt(scaleControlValue.value, 10);
  if (inputScale !== Scale.MAX) {
    const actualScale = inputScale + Scale.STEP;
    scaleControlValue.value = `${actualScale}%`;
    picturePreview.style.transform = `scale(${actualScale / 100})`;
  }
};

const onFilterButtonChange = (evt) => {
  const evtHandler = evt.target.value;
  if (evtHandler === 'none') {
    sliderWrapper.classList.add('hidden');
    imgPreview.style.filter = 'none';
  }
  else {
    sliderWrapper.classList.remove('hidden');
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${evtHandler}`);
    slider.noUiSlider.updateOptions(Effect[evtHandler].options);
    slider.noUiSlider.on('update', () => {
      effectLevelValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `${Effect[evtHandler].filter}(${effectLevelValue.value}${Effect[evtHandler].units})`;
    });
  }
};

const closeUploadFormToDefault = () => {
  closeUploadForm();
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
  form.reset();
};

const onCloseUploadFormToDefaultClick = () => {
  closeUploadFormToDefault();
};

function closeUploadForm() {
  body.classList.remove('modal-open');
  editingForm.classList.add('hidden');
  uploadFileButton.value = '';
  effectsList.removeEventListener('change', onFilterButtonChange);
  scaleControlBiggerButton.removeEventListener('click', onScaleControlBiggerButtonClick);
  scaleControlSmallerButton.removeEventListener('click', onScaleControlSmallerButtonClick);
  document.removeEventListener('keydown', onEscKeyDown);
  closeEditingFormButton.removeEventListener('click', onCloseUploadFormToDefaultClick);
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeUploadFormToDefault();
    document.removeEventListener('keydown', onEscKeyDown);
  }
}

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(() => {
    closeUploadFormToDefault();
    renderMessage(true);
  },
  () => {
    closeUploadForm();
    renderMessage(false);
  },
  new FormData(evt.target),
  );
};

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

const onUploadFileButtonChange = () => {
  editingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  closeEditingFormButton.addEventListener('click', onCloseUploadFormToDefaultClick);
  allowFormSubmission();
  sliderWrapper.classList.add('hidden');
  effectsList.addEventListener('change', onFilterButtonChange);
  scaleControlSmallerButton.addEventListener('click', onScaleControlSmallerButtonClick);
  scaleControlBiggerButton.addEventListener('click', onScaleControlBiggerButtonClick);
};

const renderUploadForm = () => {
  fileChooser.addEventListener('change', onFileChooserChange);
  uploadFileButton.addEventListener('change', onUploadFileButtonChange);
  initEffects();
  validateForm();
  form.addEventListener('submit', onUploadFormSubmit);
};

export { renderUploadForm };
