class Country {
  constructor(url) {
    this.url = url;
    this.input = document.querySelector('#inputText');
    this.list = document.querySelector('#root');
    this.init();
    this.fetchСountries();
    this.debounce;
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
    fetch(this.url).then(res => console.log(res));
  }
}
let _ = require('lodash');
new Country();
