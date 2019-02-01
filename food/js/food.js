'use strict';

const rows = document.querySelectorAll('td');
const ingredients = Array.from(rows).find(td => td.hasAttribute('data-ingredients'));
const pic = document.querySelector('.cover');
const title = pic.querySelector('font');
const rating = Array.from(document.querySelectorAll('td > h1')).find(element => element.hasAttribute('data-rating'));
const votes = Array.from(rating.parentElement.children).find(element => element.hasAttribute('data-votes'));
const star = document.querySelector('.stars > em');
const consumers = document.querySelector('.consumers');

function showRecipe(data) {
  console.log(data);
  pic.style.backgroundImage = `url(${data.pic}`;
  title.textContent = data.title;
  ingredients.textContent = data.ingredients.join(', ');
}

function showRating(data) {
  rating.textContent = data.rating.toPrecision(2);
  star.style.width = `${data.rating * 10}` + '%';
  votes.textContent = `${data.votes} оценок`;
}

function showUsers(data) {
  let list = [];
  data.consumers.forEach(user => {
    list.push(`<img src="${user.pic}" title="${user.name}" alt="">`);
  });
  list.push(`<span>(+${data.total - data.consumers.length})</span>`);
  consumers.innerHTML = list.join(' ');
}

function load(url) {
  const functionName = `function${String(Math.random()).slice(-3)}`;
  return new Promise((fulfill, reject) => {
    window[functionName] = fulfill;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

load('https://neto-api.herokuapp.com/food/42')
  .then(showRecipe);

load('https://neto-api.herokuapp.com/food/42/rating')
  .then(showRating);

load('https://neto-api.herokuapp.com/food/42/consumers')
  .then(showUsers);
