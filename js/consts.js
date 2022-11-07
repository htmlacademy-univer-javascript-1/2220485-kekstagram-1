const MAX_COUNT_PHOTOS = 25;
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Красота!',
  'Необыкновенно!',
  'Жизнь прекрасна!',
];

const NAMES = [
  'Анастасия',
  'Михаил',
  'Елизавета',
  'Леонид',
  'Максим',
  'Светлана',
];

const CountLike = {
  MIN: 15,
  MAX: 200,
};

const CountAvatar = {
  MIN: 1,
  MAX: 6,
};

const CountComment = {
  MIN: 1,
  MAX: 8,
};

const ErrorMessage = {
  SEPARETED_BY_SPACES: 'Хэш-теги разделяются пробелами',
  START_WITH: 'Хэш-тег должен начинаться с символа #',
  NO_REPEAT: 'Хэш-теги не должны повторяться',
  HASHTAG_MAX_LENGTH: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
  MAX_COUNT_HASHTAG: `Нельзя указывать больше ${MAX_HASHTAGS} хэш-тегов`,
  UNACCEPTABLE_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
  COMMENT_MAX_LENGTH: 'Длина комментария не может составлять больше 140 символов'
};

export {MAX_COUNT_PHOTOS, MESSAGE,DESCRIPTION, NAMES, CountAvatar, CountLike, CountComment, MAX_SYMBOLS, MAX_HASHTAGS, ErrorMessage};

