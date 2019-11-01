'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

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
  function tableRowData(listTable, th, td, src) {
    const tableRow = createAndAppend('tr', listTable);
    const rowHeader = createAndAppend('th', tableRow, {
      text: [th],
      class: 'th',
    });
    if (th === 'Repository:') {
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

  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul);
    const listTable = createAndAppend('table', li);
    tableRowData(listTable, 'Repository:', repo.name, repo['html_url']);
    tableRowData(listTable, 'Description:', repo.description);
    tableRowData(listTable, 'Forks:', repo.forks);
    tableRowData(listTable, 'Updated:', convertTime(repo['updated_at']));
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      repos = repos.sort((a, b) => a.name.localeCompare(b.name, 'en'));
      repos = repos.slice(0, 10);
      const h1 = createAndAppend('h1', root);
      h1.innerHTML = 'HYF Repositories';
      const ul = createAndAppend('ul', root);
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
