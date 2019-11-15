'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';
      contributors.forEach(contributor =>
        this.renderContributionsDetails(contributor),
      );
    }
    renderContributionsDetails(item) {
      const ul = createAndAppend('ul', this.container);
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
  }

  window.ContributorsView = ContributorsView;
}
