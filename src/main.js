import Vue from 'vue';
// import Grid from './components/Grid.vue';
// import Menu from './components/Menu.vue';
import MainController from './components/MainController.vue';

window.vm = new Vue({
  el: '#app',
  data: {
    
  },
  render(h) {
    return h(MainController);
  }
});
