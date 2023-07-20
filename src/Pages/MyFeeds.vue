<template>
    <div class="container mt-5">
      <div class="row mt-5" v-if="posts.length">
        <div class="col-md-4 col-sm-12" style="padding-top: 80px;" v-for="post in posts" :key="post.id">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded border-0">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: [],
      };
    },
    async mounted() {
      try {
        // Fetch the logged-in user data from Vuex store
        const user = this.$store.state.user;
        if (user) {
          // Get the user's ID
          const userId = user.id;
  
          // Fetch the posts data based on the user's ID
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
          this.posts = response.data;
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    },
  };
  </script>
  