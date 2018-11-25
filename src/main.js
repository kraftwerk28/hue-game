import Vue from 'vue';
import MainController from './components/MainController.vue';
import 'babel-polyfill';

(async () => {
  const translation = await fetch('../src/translations/translation-en.json')
    .then(d => d.json());
  window.vm = new Vue({
    el: '#app',
    render(h) {
      return h(MainController, {
        props: {
          translation
        }
      });
    },

  });
})();
