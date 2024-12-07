const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
let errorMessage;

const formUpload = document.querySelector('.img-upload__form');
const errorField = document.querySelector('.img-upload__item');
const errorFieldTextarea = document.querySelector('.img-upload__item-text');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const inputHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

if (!inputHashtag.value) {
  imgUploadSubmit.disabled = true;
}

const hashtegsHandler = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }
  const inputArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хеш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-za-аё0-9]{1,19}$/i.test(item)),
      error: 'Хеш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
      errorField.textContent = rule.error;
    } else {
      errorField.textContent = '';
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, hashtegsHandler, () => errorMessage, 2, false);


const onHashtagInput = () => {
  if (pristine.validate() && inputHashtag.value.length > 0) {
    //разблокировка кнопки
    imgUploadSubmit.disabled = false;
  } else {
    //блокировка кнопки
    imgUploadSubmit.disabled = true;
  }
};

inputHashtag.addEventListener('input', onHashtagInput);

const textDescriptionHandler = (value) => {
  errorMessage = '';

  if (!value) {
    return true;
  }

  const rules = [
    {
      check: inputHashtag.value.length === 0,
      error: 'Необходимо заполнить поле с хеш-тегами',
    },
    {
      check: value.length > MAX_COMMENT_LENGTH,
      error: `Максимальное количество символов: ${MAX_COMMENT_LENGTH}`,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
      errorFieldTextarea.textContent = rule.error;
      imgUploadSubmit.disabled = true;
    } else {
      errorFieldTextarea.textContent = '';
      imgUploadSubmit.disabled = false;
    }
    return !isInvalid;
  });
};

pristine.addValidator(textDescription, textDescriptionHandler, () => errorMessage, 2, false);
