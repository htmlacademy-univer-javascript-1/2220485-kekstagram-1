import { renderThumbnails, removeThumbnails } from './thumbnails.js';
import { shuffleArray, debounce } from './utils.js';
import { MAX_COUNT_RANDOM_PHOTOS } from './consts.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let photos = [];

const getFilteredPhotos = (id) => {
  let filteredPhotos = [];

  switch(id) {
    case Filter.RANDOM:
      filteredPhotos = shuffleArray(photos).slice(0, MAX_COUNT_RANDOM_PHOTOS);
      break;
    case Filter.DISCUSSED:
      filteredPhotos = photos.slice().sort((photoA, photoB) => photoA.comments.length - photoB.comments.length);
      break;
    default:
      filteredPhotos = photos.slice();
  }
  return filteredPhotos;
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

const onFiltersFormClick = (evt) => {
  const id = evt.target.id;
  removeThumbnails();
  renderThumbnails(getFilteredPhotos(id));
  filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const initFilters = (data) => {
  photos = data.slice();
  renderThumbnails(photos);
  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce(onFiltersFormClick));
};

export { initFilters };
