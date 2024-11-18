import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { key, store } from './store';

// Import the Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// Import Google Icons main.js or App.vue
import 'material-symbols';

// Import the Font Awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import all solid icons
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons

// Add all solid icons to the library
library.add(fas);

// Optionally, import CSS for icons
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App).use(store, key).use(router);

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
