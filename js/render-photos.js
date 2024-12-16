import './modal-window.js';

const fragment = new DocumentFragment();

const photosContainer = document.querySelector('.pictures.container');

const template = document.querySelector('#picture').content;

const renderPhotos = (objects) => {

  objects.forEach((obj) => {
    const copy = template.cloneNode(true);

    copy.querySelector('.picture__img').src = obj.url;
    copy.querySelector('.picture__img').dataset.pictureId = obj.id;
    copy.querySelector('.picture__likes').textContent = obj.likes;
    copy.querySelector('.picture__comments').textContent = obj.comments.length;

    fragment.appendChild(copy);
  });

  photosContainer.appendChild(fragment);
};

export { renderPhotos };


