'use strict';

{
  class Util {
    /**
     * Creates an element, optionally setting its attributes, and appends
     * the element to a parent.
     * @param {string} name The tag name of the element to create.
     * @param {HTMLElement} parent The parent element.
     * @param {Object} options An object with attribute names and values.
     */
    static createAndAppend(name, parent, options = {}) {
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
    static tableRowData(listTable, th, td, src = '') {
      const tableRow = Util.createAndAppend('tr', listTable);
      const rowHeader = Util.createAndAppend('th', tableRow, {
        text: [th],
        class: 'th',
      });
      if (src !== '') {
        const rowData = Util.createAndAppend('td', tableRow);
        const link = Util.createAndAppend('a', rowData, {
          text: [td],
          href: [src],
          target: '_blank',
        });
      } else {
        const rowData = Util.createAndAppend('td', tableRow, {
          text: [td],
          class: 'td',
        });
      }
    }
    static convertTime(timeWithZone) {
      const day = new Date(timeWithZone);
      const updatedTime = day.toLocaleString();
      return updatedTime;
    }
  }

  window.Util = Util;
}
