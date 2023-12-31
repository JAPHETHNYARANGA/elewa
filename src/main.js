// main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from '../store';
import router from './router/router';
import NavigationBar from './components/NavigationBar.vue';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JavaScript bundle
import LoginModal from './components/LoginModal.vue';


const app = createApp(App); // Create the Vue application instance

app.component('topNavbar', NavigationBar);
app.component('loginModal', LoginModal);
store.dispatch('initFollowingUsers'); // Dispatch the initFollowingUsers action to initialize followingUsers from localStorage

app.use(store);
app.use(router); 

app.mount('#app'); // Mount the app to the DOM
