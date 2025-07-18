import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'

import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import './assets/theme.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import 'primeflex/primeflex.css';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog';


const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Calendar', Calendar)
app.component('Textarea', Textarea)
app.component('Toast', Toast);
app.component('Dialog', Dialog);


app.mount('#app')