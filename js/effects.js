const DEFEULT_EFFECT_LEVEL = 100;
const RADIX = 10;
const EFFECT_STEP = 0.01;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const imagePreview = uploadForm.querySelector('.img-upload__preview');
const sliderUpload = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const image = imagePreview.querySelector('img');

effectLevelValue.value = DEFEULT_EFFECT_LEVEL;

let currentEffect = '';

sliderUpload.classList.add('visually-hidden');

const effects = {
  none: () => {
    sliderUpload.classList.add('visually-hidden');
    return 'none';
  },

  chrome: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValue.value, RADIX) * EFFECT_STEP})`;
  },

  sepia: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue.value, RADIX) * EFFECT_STEP})`;
  },

  marvin: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValue.value)}%)`;
  },
  phobos: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectLevelValue.value, RADIX) * MAX_BLUR_VALUE) * EFFECT_STEP}px)`;
  },
  heat: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectLevelValue.value, RADIX) * MAX_BRIGHTNESS) * EFFECT_STEP})`;
  }
};

const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    sliderElement.noUiSlider.set(Slider.MAX);
    effectLevelValue.value = Number(Slider.MAX);

    currentEffect = target.classList[1].replace('effects__preview--', '');
    image.style.filter = effects[currentEffect]();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

sliderElement.noUiSlider.on('change', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  image.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
}
);

export { image, effects };
