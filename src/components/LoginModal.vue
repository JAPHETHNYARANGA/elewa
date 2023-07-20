<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Login
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="login">
                        <div class="form-group mt-5">
                            <label for="username">UserName</label>
                            <input v-model="username" type="text" class="form-control" id="username"
                                placeholder="Enter Username">
                        </div>
                        <div class="form-group mt-5">
                            <label for="zipcode">Zip Code</label>
                            <input v-model="zipcode" type="password" class="form-control" id="zipcode"
                                placeholder="Zip Code">
                        </div>
                        <button type="submit" class="btn btn-primary mt-5 w-100">Login</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>
</template>



<script>
import axios from 'axios';

export default {
  // Your existing login component code...

  methods: {
    login() {
      // Fetch the data from the API
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          const users = response.data;
          // Find the user based on the username
          const user = users.find((u) => u.username === this.username);
          if (user && user.address.zipcode === this.zipcode) {
            alert('Login successful!');
            // Store the user data in the Vuex store
            this.$store.commit('setUser', user); // Commit the 'setUser' mutation to store the user data in Vuex
            location.reload()
            console.log('User data:', user); 
          } else {
            alert('Login failed! Please check your credentials.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          alert('An error occurred while fetching user data. Please try again later.');
        });
    },
  },
};
</script>