import { MAX_HASHTAGS, MAX_SYMBOLS, ErrorMessage} from './consts.js';

const submitButton = document.querySelector('.img-upload__submit');

const form = document.querySelector('.img-upload__form');
const inputHashtag = form.querySelector('.text__hashtags');
const inputComment = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

let errorMessage = '';

const error = () => errorMessage;

const hashtagHandler = (value) => {
  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.lenght === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: ErrorMessage.SEPARETED_BY_SPACES,
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: ErrorMessage.START_WITH,
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: ErrorMessage.NO_REPEAT,
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: ErrorMessage.HASHTAG_MAX_LENGTH,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: ErrorMessage.MAX_COUNT_HASHTAG,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: ErrorMessage.UNACCEPTABLE_SYMBOLS,
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

const buttonAdjustment = () => {
  if (pristine.validate()) {
    submitButton.disabled = false;
  }
  else {
    submitButton.disabled = true;
  }
};

const validateForm = () => {
  pristine.addValidator(inputHashtag, hashtagHandler, error);
  pristine.addValidator(inputComment, (value) => value.length <= 140, ErrorMessage.COMMENT_MAX_LENGTH);
  buttonAdjustment();
};

const onInputHashtag = () => {
  buttonAdjustment();
};

const onInputComment = () => {
  buttonAdjustment();
};

inputHashtag.addEventListener('input', onInputHashtag);
inputComment.addEventListener('input', onInputComment);

const stopPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

inputHashtag.addEventListener('keydown', stopPropagation);
inputComment.addEventListener('keydown', stopPropagation);

export{validateForm};
