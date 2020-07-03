/*
Обновил ветку мастер и создал ветку module3-task2. Можно приступать работе
материал для изучения перед 3-ей лекции:
  * https://developer.mozilla.org/ru/docs/Web/API/Console
  * https://htmlacademy.ru/blog/boost/frontend/collections-js
  * https://habr.com/ru/post/243815/
  * https://habr.com/ru/post/413287/
  * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
лекция 3 https://up.htmlacademy.ru/javascript/19/module/3/lecture
задание к 3-ей лекции https://up.htmlacademy.ru/javascript/20/tasks/8
*/

'use strict';

const COUTN_PICTURES = 25
const MockData = {
  COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  NAMES: ['Артем','Тамби','Алекс','Сеня','Джорджина'],
}
const pictureTmpl = document.querySelector('#picture').content.children[0];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const getRandomComment = () => {
  let comments = []
    comments.push({
      avatar: `img/avatar-${getRandomNumber(0, 6)}.svg`,
      message: MockData.COMMENTS[getRandomNumber(0, MockData.COMMENTS.length - 1)],
      name: MockData.NAMES[getRandomNumber(0, MockData.NAMES.length - 1)]
    })
  return comments
}

const createPictureDescObj = () => {
  let obj = []

  for (let i = 1; i <= COUTN_PICTURES; i++) {
    obj.push({
      url: `photos/${i}.jpg`,
      description: 'описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: getRandomComment()
    })
  }

  return obj;
}

const renderPicture = (pictureObj) => {
  const newPictureElement = pictureTmpl.cloneNode(true)
  let comment = pictureObj.comments[0].message

  newPictureElement.querySelector('img').src = pictureObj.url
  newPictureElement.querySelector('.picture__comments').textContent = comment
  newPictureElement.querySelector('.picture__likes').textContent = pictureObj.likes

  return newPictureElement
}

function addPicturesToList() {
  const pictureListElement = document.querySelector('.pictures');
  const fragmentPictures = document.createDocumentFragment();

  for (let i = 0; i < createPictureDescObj().length; i++) {
    fragmentPictures.append(renderPicture(createPictureDescObj()[i]))
  }

  return pictureListElement.append(fragmentPictures)
}

addPicturesToList()
