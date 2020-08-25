import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "popper.js";
import "./assets/app.scss";
import jQuery from "jquery";
import {fb} from "./firebase";

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('Products', require('./sections/Products.vue').default);

let app = '';

fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});


