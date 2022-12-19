import { openFullPicture } from './full-picture.js';

const picturesContainer = document.querySelector('.pictures');

const getPictureTemplate = ({id, url, comments, likes}) => `<a href="#" class="picture js-picture" data-id="${id}">
<img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments">${comments.length}</span>
  <span class="picture__likes">${likes}</span>
</p>
</a>`;

let photos = [];

const onPicturesClick = (evt) => {
  const target = evt.target;
  const picture = target.closest('.js-picture');

  if (picture) {
    const id = +picture.dataset.id;
    const [ photo ] = photos.filter((element) => element.id === id);
    openFullPicture(photo);
  }
};

const createThumbnails = () => {
  picturesContainer.insertAdjacentHTML('beforeend', photos.map((photo) => getPictureTemplate(photo)).join(''));
};

const removeThumbnails = () => {
  const pictures = picturesContainer.querySelectorAll('.js-picture');
  pictures.forEach((picture) => picture.remove());
};

const renderThumbnails = (data) => {
  photos = data.slice();
  createThumbnails();
  picturesContainer.addEventListener('click', onPicturesClick);
};

export { renderThumbnails, removeThumbnails };
