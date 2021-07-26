import Vue from 'vue'
import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2'
import Notifications from 'vue-notification'

import Authorization from './authorisation'
import router from './router'
import store from './store'
import i18n from './i18n'
import './bootstrapVue'
import './icons'
import './progress'
import './loading'
import './table'
// import './registerServiceWorker'
// import './registerServiceWorker'

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(Notifications);
Vue.use(Authorization);


Vue.directive('dateFormat', {
    bind(el) {
        el.oninput = function (e) {
            if (!e.isTrusted) {
                return;
            }
            let x = this.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
            let cursor = this.value.slice(0, el.selectionStart).length;

            if (x[1] && x[2] && x[3]) {
                this.value = x[1] + '-' + x[2] + '-' + x[3];
                // if (e.data !== null) {
                // }
            } else if (x[1] && x[2]) {
                this.value = x[1] + '-' + x[2];
                // if (e.data !== null) {
                // }
            } else {
                this.value = x[1];
            }
            if (e.data !== null && this.value.length < 10 && (this.value.length - cursor == 1)) {
                cursor += 1;
            }

            el.setSelectionRange(cursor, cursor);
            el.dispatchEvent(new Event('input'));

        }
    }
});

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
