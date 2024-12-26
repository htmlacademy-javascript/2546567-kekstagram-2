function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const isEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    return true;
  } else {
    return false;
  }
};


function debounce(callback, timeoutDelay = 500) {
  let timeoutId = null;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => callback(), timeoutDelay);
}


export { getRandomIntInclusive, isEscapeKey, debounce };

