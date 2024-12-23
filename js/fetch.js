import { configFilter } from './filter.js';
import { renderPhotos } from './render-photos.js';

const Urls = {
  GET: 'https://31.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://31.javascript.htmlacademy.pro/kekstagram',
};

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

const sendRequest = (url, method, body) => {
  fetch(
    url,
    {
      method,
      body,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    },
  ).then((response) => response.json()).then((data) => {
    onSuccess(data);


  }).catch((err) => {
    onError(err);
  });
};

const loadData = () => sendRequest(Urls.GET, 'GET', null, onSuccess, onError);
const uploadData = (body) => sendRequest(Urls.POST, 'POST', body, onSuccess, onError);

export { loadData, uploadData, PHOTOS_OBJECTS };
