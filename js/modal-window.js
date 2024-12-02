import { PHOTOS_OBJECTS } from './photos.js';
const modalWindowElement = document.querySelector('.big-picture');
const bigPilctureCancel = modalWindowElement.querySelector('.big-picture__cancel');
const photosContainer = document.querySelector('.pictures.container');
const bigPictureImg = modalWindowElement.querySelector('.big-picture__img').querySelector('img');

photosContainer.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('picture__img')) {
    return;
  }

  modalWindowElement.classList.remove('hidden');

  const htmlElementId = evt.target.getAttribute('pictureobjid');

  for (let index = 0; index < PHOTOS_OBJECTS.length; index++) {
    const pictureObj = PHOTOS_OBJECTS[index];
    if (pictureObj.id === Number(htmlElementId)) {

      bigPictureImg.src = pictureObj.url;
      const socialCommentCount = document.querySelector('.social__comment-count');
      socialCommentCount.querySelector('.social__comment-shown-count').textContent = pictureObj.comments.length;
      socialCommentCount.querySelector('.social__comment-total-count').textContent = pictureObj.comments.length;
      document.querySelector('.social__caption').textContent = pictureObj.description;
      socialCommentCount.classList.add('hidden');

      const commentsLoader = document.querySelector('.comments-loader');
      commentsLoader.classList.add('hidden');

      const body = document.querySelector('body');
      body.classList.add('modal-open');

      const socialCommentsList = document.querySelector('.social__comments');
      socialCommentsList.innerHTML = '';


      for (let i = 0; i < pictureObj.comments.length; i++) {
        const comment = pictureObj.comments[i];

        const socialComment = document.createElement('li');
        socialComment.classList.add('social__comment');

        const socialPicture = document.createElement('img');
        socialPicture.classList.add('social__picture');
        socialPicture.src = comment.avatar;
        socialPicture.alt = 'Аватар комментатора фотографии';
        socialPicture.width = '35';
        socialPicture.height = '35';

        const socialText = document.createElement('p');
        socialText.classList.add('social__text');
        socialText.textContent = comment.message;

        socialComment.appendChild(socialPicture);
        socialComment.appendChild(socialText);
        socialCommentsList.appendChild(socialComment);
      }


    }
  }


});

bigPilctureCancel.addEventListener('click', () => {
  modalWindowElement.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    modalWindowElement.classList.add('hidden');
  }
});
