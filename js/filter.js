import { FILTER, SORTFUNC } from './const.js';
import { renderPhotos } from './render-photos.js';
import { debounce } from './util.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const filterElement = document.querySelector('.img-filters');
let currentFilter = FILTER.default;
let pictures = [];

function onFilterChanger(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button') || activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

export function applyFilter() {
  let filterredPictures = [];

  if (currentFilter === FILTER.default) {
    filterredPictures = pictures;
  }

  if (currentFilter === FILTER.random) {
    filterredPictures = pictures.toSorted(SORTFUNC.getRandom).slice(0, 10);
  }

  if (currentFilter === FILTER.discussed) {
    filterredPictures = pictures.toSorted(SORTFUNC.getDiscussed);
  }

  const photosContainer = document.querySelector('.pictures.container');
  const links = photosContainer.querySelectorAll('a');
  links.forEach((link) => link.remove());

  renderPhotos(filterredPictures);

  return filterredPictures;
}

function setFilterConfig(picturesData) {
  filterElement.classList.remove('img-filter--inactive');
  filterElement.addEventListener('click', debounce(onFilterChanger));
  pictures = picturesData;
}

export { setFilterConfig };
