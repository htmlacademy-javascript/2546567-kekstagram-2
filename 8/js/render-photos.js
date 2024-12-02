import { PHOTOS_OBJECTS } from './photos.js';
import './modal-window.js';

const fragment = new DocumentFragment();

const photosContainer = document.querySelector('.pictures.container');

const template = document.querySelector('#picture').content;

PHOTOS_OBJECTS.forEach((obj) => {
  const copy = template.cloneNode(true);

  copy.querySelector('.picture__img').src = obj.url;
  copy.querySelector('.picture__img').setAttribute('pictureobjid', obj.id);
  copy.querySelector('.picture__likes').textContent = obj.likes;
  copy.querySelector('.picture__comments').textContent = obj.comments.length;

  fragment.appendChild(copy);
});

photosContainer.appendChild(fragment);
