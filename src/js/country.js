class Country {
  constructor(url) {
    this.url = url;
    this.input = document.querySelector('#inputText');
    this.list = document.querySelector('#root');
    this.init();
  }

  init() {
    // console.log('init');
    this.input.addEventListener(
      'input',
      _.debounce(this.fetchСountries.bind(this), 500),
    );
  }

  fetchСountries() {
    // console.log('fetchСountries');
    // console.log(this.input.value);
    this.url = `https://restcountries.eu/rest/v2/name/${this.input.value}`;

    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        this.renderData(data);
      })
      .catch(err =>
        //   notice({
        //     text: 'Please enter the country',
        //   }),
        this.removeData(),
      );
  }
  renderData = arrData => {
    // console.log(this);
    if (this.input.value === 0) {
      this.removeData();
    }
    if (arrData.length > 2 && arrData.length < 10) {
      arrData.map(({ name }) => {
        this.list.insertAdjacentHTML(
          'beforeend',
          `<li class="text"> Country: ${name}</li>`,
        );
      });
    }
    if (arrData.length > 10) {
      const myNotice = notice({
        text: 'Need to make the request more specific',
      });
    }
    if (arrData.length === 1) {
      arrData.map(({ name, capital, population, languages, flag }) => {
        let objLanguages = languages.map(elem => elem.name);

        this.list.insertAdjacentHTML(
          'beforeend',
          `<li class ="flag"> <img class="gallery__image" src="${flag}"  alt=""/></li>
             <li class="text"> Country: ${name}</li>
             <li class="text"> Capital: ${capital}</li>
             <li class="text"> Population: ${population}</li>
             <li class="text"> Languages: ${objLanguages}</li>`,
        );
      });
    }
  };
  removeData() {
    console.log('removeData');
    this.list.innerHTML = '';
  }
}
let _ = require('lodash');
import { notice } from '@pnotify/core';

new Country();
