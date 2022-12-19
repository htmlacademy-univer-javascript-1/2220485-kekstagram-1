import { isEscapeKey } from './utils.js';
import { STEP_ADDED_COMMENTS, DEFAULT_RENDERED_COMMENTS } from './consts.js';

const fullPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeButton = fullPicture.querySelector('.big-picture__cancel');
const fullPictureCommentsList = fullPicture.querySelector('.social__comments');
const shownCommentsCount = document.querySelector('.social__comment-count');
const commentsBtnLoader = document.querySelector('.comments-loader');

let actualComments = [];
let countRenderedComments = DEFAULT_RENDERED_COMMENTS;

const getCommentTemplate = ({avatar, message, name}) => `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>
</li>`;

const getCounterCommentsTemplate = (commentsCount) => `${Math.min(countRenderedComments, commentsCount)} из <span class="comments-count">${commentsCount}</span> комментариев`;

const getCounterComments = () => {
  shownCommentsCount.innerHTML = '';
  shownCommentsCount.insertAdjacentHTML('afterbegin', getCounterCommentsTemplate(actualComments.length));
};

const renderComments = () => {
  getCounterComments();

  fullPictureCommentsList.innerHTML = '';
  const commentsTemplate = actualComments.slice(0, countRenderedComments ).map((comment) => getCommentTemplate(comment)).join('');
  fullPictureCommentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

  if (countRenderedComments >= actualComments.length) {
    commentsBtnLoader.removeEventListener('click', onCommentsBtnLoaderClick);
    commentsBtnLoader.classList.add('hidden');
  }
};

const initComments = (comments) => {
  actualComments = comments.slice();
  fullPictureCommentsList.innerHTML = '';

  if (comments.length === 0) {
    commentsBtnLoader.classList.add('hidden');
    shownCommentsCount.textContent = 'Нет комментариев';
    return;
  }

  renderComments();
  commentsBtnLoader.addEventListener('click', onCommentsBtnLoaderClick);
};

const renderFullPicture = (picture) => {
  fullPicture.querySelector('.big-picture__img img').src = picture.url;
  fullPicture.querySelector('.likes-count').textContent = picture.likes;
  fullPicture.querySelector('.social__caption').textContent = picture.description;

  initComments(picture.comments);
};

const closePicture = () => {
  body.classList.remove('modal-open');
  fullPicture.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
  commentsBtnLoader.classList.remove('hidden');
  commentsBtnLoader.removeEventListener('click', onCommentsBtnLoaderClick);
  countRenderedComments = DEFAULT_RENDERED_COMMENTS;
};

function onDocumentEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closePicture();
  }
}

function onCloseButtonClick() {
  closePicture();
}

function onCommentsBtnLoaderClick() {
  countRenderedComments += STEP_ADDED_COMMENTS;
  renderComments();
}

const openFullPicture = (element) => {
  body.classList.add('modal-open');
  fullPicture.classList.remove('hidden');

  renderFullPicture(element);

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
};

export { openFullPicture };
