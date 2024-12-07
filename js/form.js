import { isEscapeKey } from './util';

const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const inputHashtag = document.querySelector('.text__hashtags');
const inputTextarea = document.querySelector('.text__description');

const onUploadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onUploadOverlayEscKeydown);

    imgUploadCancel.removeEventListener('click', onCloseModalClick);

    inputHashtag.removeEventListener('focus', onInputFocus);
    inputHashtag.removeEventListener('blur', onInputBlur);

    inputTextarea.removeEventListener('focus', onInputFocus);
    inputTextarea.removeEventListener('blur', onInputBlur);
  }
};

imgUploadInput.addEventListener('change', () => {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  imgUploadCancel.addEventListener('click', onCloseModalClick);

  inputHashtag.addEventListener('focus', onInputFocus);
  inputHashtag.addEventListener('blur', onInputBlur);

  inputTextarea.addEventListener('focus', onInputFocus);
  inputTextarea.addEventListener('blur', onInputBlur);
});

function onCloseModalClick() {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  imgUploadCancel.removeEventListener('click', onCloseModalClick);
}

function onInputFocus() {
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
}

function onInputBlur() {
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
}


