import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { getDb, putDb } from './database';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
} else {
  window.addEventListener('load', () => {
    getDb().then((content) => {
      if (content.length > 0) {
        document.querySelector('#editor').value = content[0].content;
      }
    })
    .catch((err) => {
      console.error('Error fetching data from IndexedDB:', err);
    });
  });
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
