export const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

export const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: ((a, b) => b.comments.length - a.comments.length)
};
