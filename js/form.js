import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

imgUploadInput.addEventListener('change', onOpenModalClick);

function onOpenModalClick() {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  imgUploadCancel.addEventListener('click', onCloseModalClick);
}

function onCloseModalClick() {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  imgUploadCancel.removeEventListener('click', onCloseModalClick);
}

function onUploadOverlayEscKeydown(evt) {
  if (isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')) {
    onCloseModalClick();
  }
}


