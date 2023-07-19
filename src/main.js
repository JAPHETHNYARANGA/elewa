import { createApp } from 'vue'
import App from './App.vue'
import NavigationBar from './components/NavigationBar.vue';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JavaScript bundle

const app = createApp(App); // Create the Vue application instance

app.component('topNavbar', NavigationBar);

app.mount('#app'); // Mount the app to the DOM
