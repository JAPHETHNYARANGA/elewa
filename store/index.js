// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    followingUsers: [], // Initialize an array to store the users you are following
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    followUser(state, user) {
      const existingUser = state.followingUsers.find(u => u.id === user.id);
      if (!existingUser) {
        state.followingUsers.push(user); // Add the user to the followingUsers array
        // Save the updated followingUsers to localStorage
        localStorage.setItem('followingUsers', JSON.stringify(state.followingUsers));
      }
    },
    // Add a new mutation to initialize the followingUsers array from localStorage on app startup
    initializeFollowingUsers(state) {
      const followingUsers = JSON.parse(localStorage.getItem('followingUsers'));
      if (Array.isArray(followingUsers)) {
        state.followingUsers = followingUsers;
      }
    },
    setFollowingUsers(state, users) {
      state.followingUsers = users;
    },
  },
  actions: {
    // Your other action functions go here

    // Action to initialize followingUsers array from localStorage
    initFollowingUsers({ commit }) {
      commit('initializeFollowingUsers');
      return Promise.resolve(); 
    },
  },
  getters: {
    // Your getter functions go here
  },
});

export default store;
