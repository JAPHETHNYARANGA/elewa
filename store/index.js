// store.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    followingUsers: [], // Initialize an array to store the users you are following
    posts: JSON.parse(localStorage.getItem('posts')) || [], // Initialize an array to store the posts
    comments: {}, // Initialize an object to store comments (use post ID as keys)
    users: [], // Initialize an array to store the fetched users
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    initializeFollowingUsers(state) {
      const followingUsers = JSON.parse(localStorage.getItem('followingUsers')) || [];
      state.followingUsers = followingUsers;
    },
    followUser(state, user) {
      const existingUser = state.followingUsers.find(u => u.id === user.id);
      if (!existingUser) {
        state.followingUsers.push(user); // Add the user to the followingUsers array
        // Save the updated followingUsers to localStorage
        localStorage.setItem('followingUsers', JSON.stringify(state.followingUsers));
      }
    },
    unfollowUser(state, user) {
      const index = state.followingUsers.findIndex(u => u.id === user.id);
      if (index !== -1) {
        state.followingUsers.splice(index, 1); // Remove the user from the followingUsers array
        // Save the updated followingUsers to localStorage
        localStorage.setItem('followingUsers', JSON.stringify(state.followingUsers));
      }
    },
    setUsers(state, users) {
      state.users = users; // Set the fetched users from the API
    },
    // Mutation to set the comments for a post
    setComments(state, { postId, comments }) {
      state.comments[postId] = comments;
    },
    setPosts(state, posts) {
      state.posts = posts.map(post => ({ ...post, likes: 0 }));
      localStorage.setItem('posts', JSON.stringify(state.posts)); // Save posts data to local storage
    },
    // Mutation to increment likes for a post
    incrementLikes(state, { postId }) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes++;
      }
    },
  },
  actions: {
    // Your other action functions go here

    // Action to fetch posts and comments from API and store them in Vuex
    async fetchPostsAndComments({ commit, state }) {
      try {
        if (!state.posts || state.posts.length === 0) {
          // If posts data is not available in Vuex store or is empty, fetch it from the API
          const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
          const posts = postsResponse.data;
          commit('setPosts', posts);
        }

        // Fetch comments for each post concurrently and add them to the comments object
        const fetchCommentsPromises = state.posts.map(post =>
          axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
        );
        const commentsResponses = await Promise.all(fetchCommentsPromises);
        commentsResponses.forEach((response, index) => {
          const postId = state.posts[index].id;
          const comments = response.data;
          commit('setComments', { postId, comments });
        });
      } catch (error) {
        console.error('Error fetching posts and comments:', error);
      }
    },
    // Action to initialize followingUsers array from localStorage
    initFollowingUsers({ commit }) {
      commit('initializeFollowingUsers');
      return Promise.resolve();
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },
  getters: {
    // Your getter functions go here
  },
});

export default store;
