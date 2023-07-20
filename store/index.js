// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user)); // Save the user data to localStorage
    },
  },
  actions: {
    // Your action functions go here
  },
  getters: {
    // Your getter functions go here
  },
});

export default store;
