<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4 col-sm-12 stat" style="max-height: 80vh; overflow-y: auto;">
        <div v-for="user in followingUsers" :key="user.id">
          <div class="card shadow-lg  mb-2 bg-white rounded border-0">
            <div class="card-title">
              <div class="row">
                <div class="col-2">
                  <div class="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                      class="rounded-circle img-fluid" style="width: 60px;">
                  </div>
                </div>
                <div class="col-7 follow-icon">
                  <h4>{{ user.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8 col-sm-12">
        <div class="row">
          <div class="col-sm-6 mt-3" v-for="post in followingPosts" :key="post.id">

            <div class="card h-100 shadow-lg p-3 mb-5 bg-white rounded border-0">
              <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top"
                alt="Hollywood Sign on The Hill" />
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FollowingPage',
  computed: {
    ...mapState(['followingUsers', 'posts']),
    // Filter posts by the userId of the users you follow
    followingPosts() {
      return this.posts.filter(post => this.followingUsers.some(user => user.id === post.userId));
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
  methods: {
    followUser(user) {
      this.$store.commit('followUser', user);
    },
  },
};
</script>

<style scoped>
.row {
  margin-top: 10%;
}

/* Apply flexbox to the row */
.row {
  display: flex;
}

/* Set a fixed width for the users column and prevent it from growing or shrinking */
.users-column {
  flex: 0 0 30%;
  /* Change the width as needed */
  max-height: 80vh;
  overflow-y: auto;
}
</style>