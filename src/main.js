import {createApp} from 'vue'
import App from './App.vue'

import router from './router/router'
import axios from 'axios'

// import {useAuthStore} from '@/stores/auth.store';

import PrimeVue, {defaultOptions} from 'primevue/config';

import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Chart from 'primevue/chart';
import Chip from 'primevue/chip';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import ContextMenu from 'primevue/contextmenu';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import DynamicDialog from 'primevue/dynamicdialog';
import FileUpload from 'primevue/fileupload';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import MultiSelect from 'primevue/multiselect';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Password from 'primevue/password';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
import Ripple from 'primevue/ripple';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import Skeleton from 'primevue/skeleton';
import SplitButton from 'primevue/splitbutton';
import StyleClass from 'primevue/styleclass';
import Tag from 'primevue/tag';
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';
import Toolbar from 'primevue/toolbar';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import vueDebounce from 'vue-debounce'



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)



const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
});

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);

app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.directive('debounce', vueDebounce({ lock: true }))

app.component('AutoComplete', AutoComplete);
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Breadcrumb', Breadcrumb);
app.component('Button', Button);
app.component('Card', Card);
app.component('Calendar', Calendar);
app.component('Chart', Chart);
app.component('Chip', Chip);
app.component('Checkbox', Checkbox);
app.component('Column', Column);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('ContextMenu', ContextMenu);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Divider', Divider);
app.component('Dropdown', Dropdown);
app.component('Dialog', Dialog);
app.component('DynamicDialog', DynamicDialog);
app.component('FileUpload', FileUpload);
app.component('InputGroup', InputGroup);
app.component('InputGroupAddon', InputGroupAddon);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('MultiSelect', MultiSelect);
app.component('OverlayPanel', OverlayPanel);
app.component('Paginator', Paginator);
app.component('Password', Password);
app.component('ProgressBar', ProgressBar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('RadioButton', RadioButton);
app.component('Rating', Rating);
app.component('Row', Row);
app.component('SelectButton', SelectButton);
app.component('Skeleton', Skeleton);
app.component('SplitButton', SplitButton);
app.component('Tag', Tag);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Toast', Toast);
app.component('Textarea', Textarea);
app.component('Toolbar', Toolbar);
app.component("fa-icon", FontAwesomeIcon);

app.mount('#app')