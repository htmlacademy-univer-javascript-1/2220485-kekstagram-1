const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const inputHashtag = document.querySelector('.text__hashtags');
const inputComments = document.querySelector('.text__description');

let errorMessage = '';

const error = () => errorMessage;

const hashtagHandler = (value) => {
  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.lenght === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указывать больше ${MAX_HASHTAGS} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    errorMessage = '';
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, hashtagHandler, error);
pristine.addValidator(inputComments, (value) => value.length <= 140, 'Длина комментария не может составлять больше 140 символов');

//если форма заполнена не по правилам, то кнопка "опубликовать" недоступна
const onInput = () => {
  if (pristine.validate()) {
    submitButton.disabled = false;
  }
  else {
    submitButton.disabled = true;
  }
};

inputHashtag.addEventListener('input', onInput);
inputComments.addEventListener('input', onInput);

const stopPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

inputHashtag.addEventListener('keydown', stopPropagation);
inputComments.addEventListener('keydown', stopPropagation);
