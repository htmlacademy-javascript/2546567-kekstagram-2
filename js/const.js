export const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

export const SORTFUNC = {
  getRandom: () => 0.5 - Math.random(),
  getDiscussed: ((a, b) => b.comments.length - a.comments.length)
};


