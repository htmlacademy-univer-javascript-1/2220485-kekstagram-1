import { createThumbnails } from './thumbnails.js';
import { getPhotos } from './data.js';
import './form.js';
import './validation.js';

const data = getPhotos();
createThumbnails(data);


