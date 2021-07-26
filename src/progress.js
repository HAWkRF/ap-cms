import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

const options = {
    color: '#FFDD32',
    failedColor: '#ff0000',
    location: 'top',
};

Vue.use(VueProgressBar, options);
