'use strict';

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}
function tableRowData(listTable, th, td, src = '') {
  const tableRow = createAndAppend('tr', listTable);
  const rowHeader = createAndAppend('th', tableRow, {
    text: [th],
    class: 'th',
  });
  if (src !== '') {
    const rowData = createAndAppend('td', tableRow);
    const link = createAndAppend('a', rowData, {
      text: [td],
      href: [src],
      target: '_blank',
    });
  } else {
    const rowData = createAndAppend('td', tableRow, {
      text: [td],
      class: 'td',
    });
  }
}
function convertTime(timeWithZone) {
  const day = new Date(timeWithZone);
  const updatedTime = day.toLocaleString();
  return updatedTime;
}
function updateContainersOnChange(data) {
  const selectRepo = document.querySelector('select');
  selectRepo.addEventListener('change', function() {
    document.querySelector('section.repo-container ul').remove();
    document.querySelector('#contributorsList').remove();
    renderRepoContainer(data);
    renderRepoContributors(data);
  });
}
function renderContributionsDetails(item) {
  const ul = document.querySelector('#contributorsList');
  const li = createAndAppend('li', ul);
  const img = createAndAppend('img', li, {
    src: item['avatar_url'],
    class: 'avatar',
  });
  createAndAppend('a', li, {
    text: item.login,
    href: item['html_url'],
    target: '_blank',
  });
  createAndAppend('span', li, { text: item.contributions });
}
function renderRepoContributors(data) {
  const selectedIndex = document.querySelector('select').selectedIndex;
  let selectedRepo = data[selectedIndex];
  const contributorsSection = document.querySelector('.contributors-container');
  const ul = createAndAppend('ul', contributorsSection, {
    id: 'contributorsList',
  });
  const h6 = createAndAppend('h6', ul, { text: 'Contributions' });
  fetchJSON(selectedRepo['contributors_url'])
    .then(data => data.forEach(renderContributionsDetails))
    .catch(err => {
      errorHandle(err, ul);
    });
  return data;
}
function renderRepoDetails(repo, ul) {
  const li = createAndAppend('li', ul);
  const listTable = createAndAppend('table', li);
  tableRowData(listTable, 'Repository:', repo.name, repo['html_url']);
  tableRowData(listTable, 'Description:', repo.description);
  tableRowData(listTable, 'Forks:', repo.forks);
  tableRowData(listTable, 'Updated:', convertTime(repo['updated_at']));
}
function renderRepoContainer(data) {
  const selectedIndex = document.querySelector('select').selectedIndex;
  const repoContainer = document.querySelector('section.repo-container');
  const ul = createAndAppend('ul', repoContainer);
  renderRepoDetails(data[selectedIndex], ul);
  return data;
}
function setAndSortSelectOption(data) {
  data = data.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  data.forEach((item, index) => {
    const repoName = item['name'];
    const select = document.querySelector('select');
    createAndAppend('option', select, { text: [repoName], value: [index] });
  });
  return data;
}
function errorHandle(err, appendTo) {
  createAndAppend('div', appendTo, {
    text: `${err.message}`,
    class: 'alert-error',
  });
}
async function fetchJSON(url) {
  try {
    const response = await axios.get(url);
    if (!response.statusText) {
      throw new Error(`${response.status} ${response.statusText}`);
    } else {
      return response.data;
    }
  } catch (e) {
    throw new Error(e);
  }
}

function main(url) {
  fetchJSON(url)
    .then(data => setAndSortSelectOption(data))
    .then(data => {
      renderRepoContainer(data);
      renderRepoContributors(data);
      updateContainersOnChange(data);
    })
    .catch(e => {
      const root = document.querySelector('#root');
      errorHandle(e, root);
    });
}
const HYF_REPOS_URL =
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
main(HYF_REPOS_URL);
