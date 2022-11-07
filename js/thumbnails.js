import { openFullPicture } from './fullPicture.js';
import { getPhotos } from './data.js';

const getPictureTemplate = ({id, url, comments, likes}) => `<a href="#" class="picture js-picture" data-id="${id}">
<img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments">${comments.length}</span>
  <span class="picture__likes">${likes}</span>
</p>
</a>`;

const renderThumbnails = (data) => {
  const mainContainer = document.querySelector('.js-pictures');
  mainContainer.insertAdjacentHTML('beforeend', data.map((photo) => getPictureTemplate(photo)).join(''));
};

const makeBigPictures = (data) => {
  renderThumbnails(data);
  const pictures = document.querySelectorAll('.js-picture');

  pictures.forEach((picture) => {
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      const target = evt.target;
      const parent = target.closest('.js-picture');
      const id = parent.dataset.id;
      openFullPicture(data[id - 1]);
    });
  });
};

export {makeBigPictures};
