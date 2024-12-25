import { debounce } from './util.js';
import { FILTER, SORTFUNC } from './const.js';
import { renderPhotos } from './render-photos.js';

let currentFilter = FILTER.default;
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

function onFilterChanger(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button') || activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  debounce(applyFilter);
}

export function applyFilter() {
  let filterredPictures = [];

  if (currentFilter === FILTER.default) {
    filterredPictures = pictures;
  }

  if (currentFilter === FILTER.random) {
    filterredPictures = pictures.toSorted(SORTFUNC.random).slice(0, 10);
  }

  if (currentFilter === FILTER.discussed) {
    filterredPictures = pictures.toSorted(SORTFUNC.discussed);
  }

  const photosContainer = document.querySelector('.pictures.container');
  const links = photosContainer.querySelectorAll('a');
  links.forEach((link) => link.remove());

  renderPhotos(filterredPictures);

  return filterredPictures;
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filter--inactive');
  filterElement.addEventListener('click', onFilterChanger);
  pictures = picturesData;
}

export { configFilter };
