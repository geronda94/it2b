import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // <-- Импорт 1



import './style.css'

import "/src/assets/css/variables.css";
import "/src/assets/css/animations.css";



/* --- 1. FontAwesome Imports --- */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Импортируем конкретные иконки (Solid)
import {
  faSun, faMoon, faXmark, faNetworkWired, faDatabase, faLaptopCode, faGlobe, faArrowRight, faCheck,
  faBars, faWind, faServer, faRobot, faMagnifyingGlassChart, faBullseye,  faTableColumns,
  faMicrochip,
  faTimes,
  faDollarSign,
  faCheckCircle,
  faUser,
  faEnvelope,
  faAddressBook,
  faBriefcase,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
// Импортируем бренды (Brands)
import { faGithub, faTelegram, faVuejs, faDocker, faNodeJs } from '@fortawesome/free-brands-svg-icons'
// Добавляем их в библиотеку
library.add(
  faSun, faMoon, faXmark,
  faNetworkWired, faDatabase, faLaptopCode,
  faGithub, faGlobe, faArrowRight, faTelegram, faCheck, faBars, faWind, faServer,
  faVuejs, faDocker, faNodeJs, faRobot, faMagnifyingGlassChart, faBullseye, faTableColumns, faMicrochip,
  faTimes, faDollarSign, faCheckCircle, faUser, faEnvelope, faAddressBook, faBriefcase, faChevronDown
)



import router from './router' // <-- Импорт роутера
import 'flyonui/flyonui' // Этот импорт должен быть здесь

const app = createApp(App)


/* --- 2. Регистрация компонента --- */
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router) // <-- Подключение роутера
app.use(createPinia())
app.mount('#app')