<template>
    <div class="container">
      <div class="row mt-5">
        <h2>Following page</h2>
        <div v-for="user in followingUsers" :key="user.id">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded border-0">
            <div class="card-title">
              <div class="row">
                <div class="col-7">
                  <div class="text-center">
                    <img
                      :src="user.avatar"
                      alt="avatar"
                      style="height: 4rem; width: auto;"
                    />
                  </div>
                </div>
                <div class="col-5 follow-icon">
                  <h4>{{ user.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FollowingPage',
    computed: {
      followingUsers() {
        return this.$store.state.followingUsers;
      },
    },
    async mounted() {
      // Dispatch the initFollowingUsers action to initialize the followingUsers array
      await this.$store.dispatch('initFollowingUsers');
  
      // Console.log each followed user
      this.followingUsers.forEach(user => {
        console.log(user.name, user.email);
      });
    },
  };
  </script>
  