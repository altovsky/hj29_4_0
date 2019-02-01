'use strict';

const wallpaper = document.querySelector('img[data-wallpaper]');
const username = document.querySelector('h3[data-username]');
const description = document.querySelector('p[data-description]');
const pic = document.querySelector('img[data-pic]');
const tweets = document.querySelector('output[data-tweets]');
const followers = document.querySelector('output[data-followers]');
const following = document.querySelector('output[data-following]');

function getData(url) {
  return new Promise((fulfill, reject) => {
    window.functionName = fulfill;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  });
}

function showData(data) {
  wallpaper.src = data.wallpaper;
  username.textContent = data.username;
  description.textContent = data.description;
  pic.src = data.pic;
  tweets.value = data.tweets;
  followers.value = data.followers;
  following.value = data.following;
}

getData('https://neto-api.herokuapp.com/twitter/jsonp?jsonp=functionName')
  .then(result => showData(result))
  .catch(error => {});
