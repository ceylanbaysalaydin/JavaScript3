'use strict';

{
  const { createAndAppend } = window.Util;
  const { tableRowData } = window.Util;
  const { convertTime } = window.Util;
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
      tableRowData(listTable, 'Repository:', repo.name, repo['html_url']);
      tableRowData(listTable, 'Description:', repo.description);
      tableRowData(listTable, 'Forks:', repo.forks);
      tableRowData(listTable, 'Updated:', convertTime(repo['updated_at']));
    }
  }

  window.RepoView = RepoView;
}
