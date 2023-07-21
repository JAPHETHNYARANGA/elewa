<template>
    <main>
      <div class="container bg-transparent my-4 p-3" style="position: relative;">
        <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          <!-- Use v-for to loop through users and display their information -->
          <div class="col" v-for="user in users" :key="user.id">
            <div class="card shadow-lg p-3 mb-5 bg-white rounded border-0 h-100 shadow-sm">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                class="rounded-circle img-fluid" style="width: 150px;">
              <div class="card-body">
                <div class="clearfix mb-3">
                  <span class="float-start badge rounded-pill bg-primary">{{ user.company.name }}</span>
                  <span class="float-end price-hp">{{ user.email }}</span>
                </div>
                <h5 class="card-title">{{ user.name }}</h5>
                <div class="text-center my-4">
                  <a
                    href="#"
                    :class="{'btn btn-warning': !isFollowing(user), 'btn btn-danger': isFollowing(user)}"
                    @click="followUser(user)"
                  >
                    {{ isFollowing(user) ? 'Unfollow' : 'Follow' }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="successMessage" class="alert alert-success fixed-bottom mb-0 py-2" role="alert">
        {{ successMessage }}
      </div>
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    async mounted() {
      try {
        // Fetch all users from the API using axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.$store.commit('setUsers', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    methods: {
      async followUser(user) {
        // Add or remove the user from followingUsers array in Vuex store
        if (this.isFollowing(user)) {
          // Dispatch the unfollowUser action to remove the user
          this.$store.commit('unfollowUser', user);
          this.successMessage = `You have unfollowed ${user.name}.`;
        } else {
          // Dispatch the followUser action to add the user
          this.$store.commit('followUser', user);
          this.successMessage = `You are now following ${user.name}.`;
        }
        // Clear the success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      isFollowing(user) {
        return this.$store.state.followingUsers.some(u => u.id === user.id);
      },
    },
    computed: {
      users() {
        return this.$store.state.users;
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 5% !important;
  }
  </style>
  