import cardSetTemplateHBS from '../templates/set-of-cards.hbs';
import { error, info } from '@pnotify/core';
import '@pnotify/core/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { getEventsByOptions } from '../js/events-api';
import refs from './refs';
import { getEventID } from './open-close-modal';
import { pagination, showPagination, hidePagination } from './pagination';

window.addEventListener('keydown', onKeyboardClick);
refs.countryInput.addEventListener('input', onCountrySelect);
refs.backdropRef.addEventListener('click', onbuttonMoreClick);
refs.inputSearch.addEventListener('click', onInput);
refs.keywordInput.addEventListener('dblclick', clearInput);

function onbuttonMoreClick(event) {
  const keyword = localStorage.getItem('author');
  const country = refs.countryInput.value;

  let action = event.target.dataset.action;

  if (action) {
    refs.backdropRef.classList.remove('open');

    clearArtiklesContainer();
    renderingCardSet(country, keyword);
    refs.countryInput.value = '';
    refs.keywordInput.value = keyword;
  }
}

function clearArtiklesContainer() {
  refs.cardSetContainer.innerHTML = '';
}

function onKeyboardClick(e) {
  if (e.code === 'Enter') onInput();
}

function onCountrySelect() {
  refs.keywordInput.value = '';
  const keyword = refs.keywordInput.value;
  const country = refs.countryInput.value;
  localStorage.setItem('keyword', keyword);
  localStorage.setItem('country', country);
  renderingCardSet(country, keyword);
}

function onInput() {
  const keyword = refs.keywordInput.value;
  const country = refs.countryInput.value;
  localStorage.setItem('keyword', keyword);
  localStorage.setItem('country', country);
  if (keyword === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    renderingCardSet(country, keyword);
  }
}

function clearInput() {
  refs.keywordInput.value = '';
}

function errAction(err) {
  // refs.keywordInput.value = '';
  localStorage.removeItem('keyword');
  localStorage.removeItem('country');
  localStorage.removeItem('page');
  hidePagination();
  // renderingCardSet();
  error({
    text: err,
    delay: 4000,
  });
}

function rendering(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
  refs.cardSetContainer.innerHTML = cardSetTemplateAction;
}

export default function renderingCardSet(country, keyword, page) {
  page = page === '' ? 0 : page;
  getEventsByOptions(country, keyword, page)
    .then(res => {
      const totalPages = res.totalPages > 41 ? 41 : res.totalPages;
      // const pages = totalPages < 41 && totalPages > 1 ? totalPages : totalPages;
      if (totalPages > 1) {
        showPagination();
      } else {
        hidePagination();
      }
      pagination._options.totalItems = totalPages;
      localStorage.setItem('page', page);
      pagination._paginate(res.number + 1);
      return res;
    })
    .then(rendering)
    .catch(err => errAction(err));
}
