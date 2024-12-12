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

  imagePreview.style.transform = `scale(${size / 100})`;
};

const onMinusButtonClick = () => {
  changeZoom(-1);
};

const onPlusButtonClick = () => {
  changeZoom();
};

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

