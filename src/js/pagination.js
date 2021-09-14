import Pagination from 'tui-pagination';

const container = document.getElementById('tui-pagination-container');
const options = {
  // below default value of options
  totalItems: 199,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: `<a href="" class="tui-page-btn">{{page}}</a>`,
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export const pagination = new Pagination(container, options);

export function onPaginationBarPush(eventData) {
  // event.preventDefault();
  // const inputValue = refs.searchField.value;
  // page = eventData.page;
  // axios
  //   .get(
  //     `${baseApi}?image_type=photo&orientation=horizontal&q=${inputValue}&page=${page}&per_page=12&key=${myApiKey}`,
  //   )
  //   .then(res => res.data.hits)
  //   .then((refs.gallery.innerHTML = ''))
  //   .then(renderMurkup)
  //   .catch(errRes);
  console.log(eventData);
}
