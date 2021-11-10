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
  const countryData = countriesData.reduce((acc, country) => {
    acc += `<li class="value">${country.name}</li>`
    return acc
  },'')
  countryContainerRender(countryData);
}

function renderCountryCard(country) {
  const markup = markUpCountryTpl(country)
  countryContainerRender(markup);
};

function countryContainerRender(item) {
  refs.countryContainer.innerHTML = item;
}
