import { getRandomPositiveInteger } from './util.js';
import {MAX_COUNT_PHOTOS, MESSAGE,DESCRIPTION, NAMES, CountComment, CountAvatar, CountLike} from './consts.js';

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomPositiveInteger(CountAvatar.MIN,CountAvatar.MAX)}.svg`,
  message: MESSAGE[getRandomPositiveInteger(0, MESSAGE.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
});

const createUserData = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTION[getRandomPositiveInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomPositiveInteger(CountLike.MIN, CountLike.MAX),
  comments: Array.from({length:getRandomPositiveInteger(CountComment.MIN, CountComment.MAX)}).map((_,index) => createComment(index + 1))
});

const getPhotos = () => Array.from({length: MAX_COUNT_PHOTOS}).map((_, index) => createUserData(index + 1));

export {getPhotos};
