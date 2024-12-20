import './util.js';
import './photos.js';
import './functions.js';
import './render-photos.js';
import './form.js';
import './form-validate-pristine.js';
import './effects.js';
import './fetch.js';
import './filter.js';
import { configFilter } from './filter.js';
import { loadData } from './fetch.js';
import { renderPhotos } from './render-photos.js';

let PHOTOS_OBJECTS = [];

const onSuccess = (data) => {
  PHOTOS_OBJECTS = data.slice();
  renderPhotos(PHOTOS_OBJECTS);
  configFilter(PHOTOS_OBJECTS);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const ALERT_SHOW_TIME = 5000;

const onError = () => {
  const template = document.querySelector('#data-error').content;
  const fragment = template.cloneNode(true);
  const alertContainer = fragment.querySelector('.data-error');

  alertContainer.querySelector('.data-error__title').textContent = 'Ошибка загрузки фотографий';
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

loadData(onSuccess, onError);

export { PHOTOS_OBJECTS };
