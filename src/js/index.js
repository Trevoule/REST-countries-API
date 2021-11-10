import '../css/styles.css';
import markUpCountryTpl from '../templates/markUpCountryCard.hbs'
import API from './api-service';
import getRefs from './getRefs';
import debounce from 'lodash.debounce';
import notify from './pnotify';

const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value.trim();

  if (searchQuery !== "") {
  return API.fetchCountry(searchQuery)
    .then(country => {
      console.log(country);
      if (country.length > 10) {

        notify.Message(`${country.length}`)
        return
      }

      if (country.length !== 1) {
        initialize(country)
        return;
      }
      renderCountryCard(...country)
    })
    .catch(error => console.log(`Ошибка ${error}`))
  }
  countryContainerRender('');
}

function initialize(countriesData) {
  let countries;
  let country = '';
  countries = countriesData;
  for (let i = 0; i < countries.length; i++){
    country += `<li class ="value">${countries[i].name}</li>`
  }
  countryContainerRender(country);
}

function renderCountryCard(country) {
    const markup = markUpCountryTpl(country)
  countryContainerRender(markup);
};

function countryContainerRender(item) {
  refs.countryContainer.innerHTML = item;
}
