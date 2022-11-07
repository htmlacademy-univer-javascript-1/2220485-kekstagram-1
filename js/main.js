import { createThumbnails } from './thumbnails.js';
import { getPhotos } from './data.js';
import {renderUploadForm} from './form.js';

const data = getPhotos();
createThumbnails(data);
renderUploadForm();


