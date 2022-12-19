import { renderUploadForm } from './form.js';
import { getData } from './api.js';
import { errorGetDataMessage } from './message.js';
import { initFilters } from './filters.js';

getData((photos) => initFilters(photos), () => errorGetDataMessage());
renderUploadForm();
