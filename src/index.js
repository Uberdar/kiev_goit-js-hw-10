import './css/styles.css';

const DEBOUNCE_DELAY = 300;

var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
let searchValue = '';

const inputEl = document.querySelector('input#search-box');
const countryEl = document.querySelector('ul.country-list');

inputEl.addEventListener('input', debounce(inputValue, 300));

function inputValue(e) {
  console.log('e.target.value: ', e.target.value);
  searchValue = e.target.value;
  console.log('searchValue: ', searchValue);
  getCountries(searchValue);
}

function getCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(r => r.json())
    .then(renderCountriesList)
    .catch(() => {
      console.log('nothing found!');
      return;
    });
}

function renderCountriesList(countries) {
  const markup = countries
    .map(oneCountry => {
      return `<li>
            <p><b>Name</b>: ${oneCountry.name.common}</p>
          </li>`;
    })
    .join('');
  countryEl.innerHTML = markup;
}
