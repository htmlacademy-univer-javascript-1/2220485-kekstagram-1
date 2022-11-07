import { getPhotos } from './data.js';
import { renderUploadForm } from './form.js';
import { makeBigPictures } from './thumbnails.js';

const data = getPhotos();
makeBigPictures(data);
renderUploadForm();
