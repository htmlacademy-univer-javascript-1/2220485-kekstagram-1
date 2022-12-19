export const MAX_SYMBOLS = 20;
export const MAX_HASHTAGS = 5;
export const COMMENT_MAX_LENGTH = 140;
export const TIMEOUT_DELAY = 500;
export const MAX_COUNT_RANDOM_PHOTOS = 10;
export const ALERT_SHOW_TIME = 5000;
export const FILE_TYPES = ['jpg', 'jpeg', 'png'];
export const DEFAULT_RENDERED_COMMENTS = 5;
export const STEP_ADDED_COMMENTS = 5;

export const ErrorMessage = {
  SEPARETED_BY_SPACES: 'Хэш-теги разделяются пробелами',
  START_WITH: 'Хэш-тег должен начинаться с символа #',
  NO_REPEAT: 'Хэш-теги не должны повторяться',
  HASHTAG_MAX_LENGTH: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
  MAX_COUNT_HASHTAG: `Нельзя указывать больше ${MAX_HASHTAGS} хэш-тегов`,
  UNACCEPTABLE_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
  COMMENT_MAX_LENGTH: 'Длина комментария не может составлять больше 140 символов'
};

export const Scale = {
  MIN: 25,
  STEP: 25,
  MAX: 100
};

export const Url = {
  'GET': 'https://26.javascript.pages.academy/kekstagram/data',
  'POST': 'https://26.javascript.pages.academy/kekstagram'
};
