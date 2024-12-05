function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export { getRandomIntInclusive };

export const onEscapeKeydown = () => {

  document.addEventListener('keydown', (evt) => {
    const modalWindowElement = document.querySelector('.big-picture');
    if (evt.key === 'Escape') {
      evt.preventDefault();
      const body = document.querySelector('body');
      modalWindowElement.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};
