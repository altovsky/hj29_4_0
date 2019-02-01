'use strict';

const name = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');
const url = 'https://neto-api.herokuapp.com/profile/me?jsonp=parseProfile';

function showProfile(profile) {
  pic.src = profile.pic;
  name.textContent = profile.name;
  position.textContent = profile.position;
  description.textContent = profile.description;
  getTech(profile.id);
  content.style.display = 'initial';
}

function loadProfile(data) {
  return new Promise((fulfill, reject) => {
    window.parseProfile = fulfill;
    const script = document.createElement('script');
    script.src = data;
    document.body.appendChild(script);
  });
}

function getTech(id) {
  loadTech(`https://neto-api.herokuapp.com/profile/${id}/technologies?jsonp=parseTechnologies`)
    .then(result => {
      for (let tech of result) {
        technologies.innerHTML += `<span class="devicons devicons-${tech}"></span>`;
      }
    })
    .catch(error => console.log(error.message));
}

function loadTech(data) {
  return new Promise((fulfill, reject) => {
    window.parseTechnologies = fulfill;
    const script = document.createElement('script');
    script.src = data;
    document.body.appendChild(script);
  });
}

loadProfile(url)
  .then(showProfile)
  .catch(error => console.log(error.message));
