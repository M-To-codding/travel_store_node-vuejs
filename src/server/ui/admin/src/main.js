import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import createRouter from './router';
// import vuetify from '@/plugins/vuetify';

Vue.use(Vuetify);

require('vuetify/dist/vuetify.css');
// require('vuetify/dist/vuetify.js');


const opts = {};

const vuetify = new Vuetify(opts);


Vue.config.productionTip = false;

// eslint-disable-next-line import/prefer-default-export
export async function createApp({ beforeApp = () => {}, afterApp = () => {} } = {}) {
  const router = createRouter();

  await beforeApp({
    router,
    vuetify,

  });

  router.afterEach((to) => {
    if (!to.name) {
      return false;
    }
    return true;
  });

  const app = new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  });

  const result = {
    app,
    router,

  };

  await afterApp(result);

  return result;
}
