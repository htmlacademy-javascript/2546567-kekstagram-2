function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomIntInclusive, isEscapeKey };
