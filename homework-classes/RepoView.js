'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';

      const ul = createAndAppend('ul', this.container);
      this.renderRepoDetails(repo, ul);
    }

    renderRepoDetails(repo, ul) {
      const li = createAndAppend('li', ul);
      const listTable = createAndAppend('table', li);
      this.tableRowData(listTable, 'Repository:', repo.name, repo['html_url']);
      this.tableRowData(listTable, 'Description:', repo.description);
      this.tableRowData(listTable, 'Forks:', repo.forks);
      this.tableRowData(
        listTable,
        'Updated:',
        this.convertTime(repo['updated_at']),
      );
    }

    tableRowData(listTable, th, td, src = '') {
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
    convertTime(timeWithZone) {
      const day = new Date(timeWithZone);
      const updatedTime = day.toLocaleString();
      return updatedTime;
    }
  }

  window.RepoView = RepoView;
}
