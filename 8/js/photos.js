import { getRandomIntInclusive } from './util.js';

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!'];

const NAMES = ['Сергей', 'Ваня', 'Артем', 'Костя', 'Маша', 'Ира', 'Семен', 'Веня', 'Саша', 'Игорь', 'Аня', 'Света', 'Сеня', 'Андрей', 'Алексей', 'Женя', 'Виталик', 'Едвига', 'Агафья', 'Миша', 'Оксана', 'Юля', 'Милана', 'Инна', 'Нелли'];

const getMessage = () => {
  const randomCountForMessages = getRandomIntInclusive(1, 2);
  let messageText = '';

  for (let index = 0; index < randomCountForMessages; index++) {
    const randomStr = MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)];
    messageText = `${messageText} ${randomStr}`;
  }

  return messageText;
};

const getName = () => NAMES[getRandomIntInclusive(0, NAMES.length - 1)];

const getComments = () => {
  const newComments = [];
  const commentsCount = getRandomIntInclusive(1, 30);

  for (let index = 0; index < commentsCount; index++) {
    const newComment = {
      id: Math.random(),
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      message: getMessage(),
      name: getName(),
    };

    newComments.push(newComment);
  }

  return newComments;
};

export const getPhotos = () => {
  const newPhotos = [];

  for (let index = 0; index < 25; index++) {
    const photo = {
      id: Math.random(),
      url: `photos/${index + 1}.jpg`,
      description: 'фото, загруженное пользователем',
      likes: getRandomIntInclusive(15, 200),
      comments: getComments()
    };
    newPhotos.push(photo);
  }

  return newPhotos;
};

export const PHOTOS_OBJECTS = getPhotos();
