import { onCloseModalClick } from './form.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
let errorMessage;

const form = document.querySelector('.img-upload__form');
const formUpload = document.querySelector('.img-upload__form');
const errorField = document.querySelector('.img-upload__item');
const errorFieldTextarea = document.querySelector('.img-upload__item-text');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const inputHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

const hashtegsHandler = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }
  const inputsArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputsArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хеш-тегов`,
    },
    {
      check: inputsArray.some((item) => !/^#[a-za-аё0-9]{1,19}$/i.test(item)),
      error: 'Хеш-тег содержит недопустимые символы',
    },
    {
      check: hasDuplicatesIgnoreCase(inputsArray),
      error: 'Хеш-тег должны быть уникальными',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
      const errorBox = document.createElement('div');
      errorBox.classList.add('pristine-error');
      errorBox.textContent = rule.error;
      errorField.appendChild(errorBox);
    } else {
      errorField.textContent = '';
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, hashtegsHandler, () => errorMessage, 2, false);

const onHashtagInput = () => {
  imgUploadSubmit.disabled = !(pristine.validate());
};

inputHashtag.addEventListener('input', onHashtagInput);

const textDescriptionHandler = (value) => {
  errorMessage = '';

  if (!value) {
    return true;
  }

  const rules = [
    {
      check: value.length > MAX_COMMENT_LENGTH,
      error: `Максимальное количество символов: ${MAX_COMMENT_LENGTH}`,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
      const errorBox = document.createElement('div');
      errorBox.classList.add('pristine-error');
      errorBox.textContent = rule.error;
      errorFieldTextarea.appendChild(errorBox);

      imgUploadSubmit.disabled = true;
    } else {
      errorFieldTextarea.textContent = '';
      imgUploadSubmit.disabled = false;
    }
    return !isInvalid;
  });
};

pristine.addValidator(textDescription, textDescriptionHandler, () => errorMessage, 2, false);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  const formData = new FormData(form);
  sendData(formData);
});

function sendData(formData) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json()).then(() => {
      const successMessage = document.querySelector('.success');

      if (successMessage) {
        successMessage.remove();
      }
      inputHashtag.value = '';
      textDescription.value = '';

      const effectsList = document.querySelectorAll('.effects__item');

      effectsList.forEach((item) => {
        item.querySelector('input').checked = item.querySelector('input').id === 'effect-none';
      });

      const template = document.querySelector('#success').content;
      const fragment = template.cloneNode(true);
      const alertContainer = fragment.querySelector('.success');

      alertContainer.querySelector('.success__title').textContent = 'Изображение успешно загружено';
      const successButton = alertContainer.querySelector('.success__button');

      successButton.addEventListener('click', () => {
        alertContainer.remove();
        onCloseModalClick();
      });

      const closeAlertModal = (e) => {
        if (!e.target.classList.contains('success__inner')) {
          alertContainer.remove();
          onCloseModalClick();
          document.removeEventListener('click', closeAlertModal);
        }
      };

      document.addEventListener('click', closeAlertModal);

      document.body.append(alertContainer);

    })
    .catch(() => {
      const successMessage = document.querySelector('.success');

      if (successMessage) {
        successMessage.remove();
      }

      const template = document.querySelector('#error').content;
      const fragment = template.cloneNode(true);
      const alertContainer = fragment.querySelector('.error');

      alertContainer.querySelector('.error__title').textContent = 'Ошибка загрузки файла';
      document.body.append(alertContainer);

      const errorButton = document.querySelector('.error__button');

      errorButton.addEventListener('click', () => {
        alertContainer.remove();
      });

      document.body.addEventListener('click', (e) => {
        if (!e.target.classList.contains('error__inner')) {
          alertContainer.remove();
        }
      });
    });
}

function hasDuplicatesIgnoreCase(arr) {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i].toLowerCase();
    for (let j = i + 1; j < arr.length; j++) {
      if (current === arr[j].toLowerCase()) {
        return true;
      }
    }
  }
  return false;
}
