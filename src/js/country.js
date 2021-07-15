class Country {
  constructor(url) {
    this.url = url;
    this.input = document.querySelector('#inputText');
    this.list = document.querySelector('#root');
    this.init();
  }

  init() {
    console.log('init');
    this.input.addEventListener(
      'input',
      _.debounce(this.fetchСountries.bind(this), 500),
    );
  }

  fetchСountries() {
    console.log('fetchСountries');
    console.log(this.input.value);
    this.url = `https://restcountries.eu/rest/v2/name/${this.input.value}`;

    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        data, console.log(data), this.renderData(data);
      });
  }
  renderData = arrData => {
    if (arrData.length > 2 && arrData.length < 10) {
      let dataCollection = arrData.map(({ name }) => {
        let p = document.createElement('p');
        p.textContent = name;
        return p;
      });
      this.list.append(...dataCollection);
    }
    if (arrData.length > 10) {
      alert('More than 10');
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
}
let _ = require('lodash');
new Country();
