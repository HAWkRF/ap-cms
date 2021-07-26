import Vue from 'vue'
import {library, dom, config} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faHome, faUser, faArrowsAltH, faAngleRight, faCoins, faUsers, faIndustry,
    faEdit, faEye, faSort, faSortUp, faSortDown,
    faSignInAlt, faTrashAlt,
    faUpload, faFileExcel, faLink,
    faCheck, faTimes, faSync, faStar, faHeart, faRubleSign, faMapMarker,
    faBorderAll, faListOl, faListUl, faGripLines, faPlus, faSquare, faBoxes, faBars,
    faCog, faSearch, faQuestion, faChevronLeft, faChevronRight, faUserPlus, faInfo, faDownload
} from '@fortawesome/free-solid-svg-icons'
import {faSmile, faListAlt, faCheckCircle, faBuilding, faAddressCard, faCircle,
    faClone, faEnvelope, faEnvelopeOpen, faCalendarAlt, faMoneyBillAlt} from '@fortawesome/free-regular-svg-icons'
import {faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'

const iconsList = [
    faHome, faUser, faSignInAlt, faTrashAlt, faEdit, faSort, faSortUp, faSortDown,
    faUpload, faCheck, faTimes, faSync, faEye, faStar, faHeart,
    faFileExcel, faLink, faRubleSign, faMapMarker,
    faArrowsAltH, faAngleRight, faCoins, faUsers, faIndustry,
    faBorderAll, faListOl, faListUl, faGripLines, faPlus, faSquare, faBoxes, faBars,
    faCog, faSearch, faQuestion, faChevronLeft, faChevronRight, faUserPlus, faInfo, faDownload,

    faSmile, faListAlt, faCheckCircle, faBuilding, faAddressCard, faCircle, faClone, faEnvelope,
    faEnvelopeOpen, faInstagram, faYoutube, faCalendarAlt, faMoneyBillAlt
];
// config.searchPseudoElements = true;
config.autoReplaceSvg = "nest";
library.add(...iconsList);
Vue.component('font-awesome-icon', FontAwesomeIcon);

dom.watch();
