const fullPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeButton = fullPicture.querySelector('.big-picture__cancel');

const updateComments = (comments) => {
  const usersComments = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    const commentAvatar = newComment.querySelector('.social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    const commentMessage = newComment.querySelector('.social__text');
    commentMessage.textContent = comment.message;
    fragment.appendChild(newComment);
  });

  usersComments.innerHTML = '';
  usersComments.appendChild(fragment);
};

const renderFullPicture = (picture) => {
  fullPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullPicture.querySelector('.comments-loader').classList.add('hidden');

  fullPicture.querySelector('.big-picture__img img').src = picture.url;
  fullPicture.querySelector('.likes-count').textContent = picture.likes;
  fullPicture.querySelector('.comments-count').textContent = picture.comments.length;
  fullPicture.querySelector('.social__caption').textContent = picture.description;
  updateComments(picture.comments);
};

const closePicture = () => {
  body.classList.remove('modal-open');
  fullPicture.classList.add('hidden');
};

const onPictureEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closePicture();
    document.removeEventListener('keydown', onPictureEscKeyDown);
  }
};

const onCloseButton = () => {
  closePicture();
  closeButton.removeEventListener('click', onCloseButton);
};

const openFullPicture = (element) => {
  body.classList.add('modal-open');
  fullPicture.classList.remove('hidden');

  fullPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullPicture.querySelector('.comments-loader').classList.add('hidden');

  renderFullPicture(element);

  closeButton.addEventListener('click', onCloseButton);
  document.addEventListener('keydown', onPictureEscKeyDown);
};

export {openFullPicture};
