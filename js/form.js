import { resetEffect } from './create-filters.js';
import { isEscapeKey } from './util.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');

imgUploadInput.addEventListener('change', onOpenModalClick);

function onOpenModalClick() {

  const errorBox = document.querySelector('.pristine-error');
  if (errorBox) {
    errorBox.remove();
  }

  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  imgUploadCancel.addEventListener('click', onCloseModalClick);

  const file = imgUploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      imagePreview.querySelector('img').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.querySelector('img').src = '';
  }
}

function onCloseModalClick() {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  imgUploadCancel.removeEventListener('click', onCloseModalClick);
  resetEffect();
}

function onUploadOverlayEscKeydown(evt) {
  if (isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')) {
    onCloseModalClick();
    resetEffect();
  }
}

// зум
const changeZoom = (factor = 1) => {

  let size = parseInt(scaleControlValue.value, 10) + (Zoom.STEP * factor);


  if (size < Zoom.MIN) {
    size = Zoom.MIN;
  }


  if (size > Zoom.MAX) {
    size = Zoom.MAX;
  }

  scaleControlValue.value = `${size}%`;

  imagePreview.querySelector('img').style.transform = `scale(${size / 100})`;
};

const onMinusButtonClick = () => {
  changeZoom(-1);
};

const onPlusButtonClick = () => {
  changeZoom();
};

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);
