<template>
 

    <!-- Modal -->
    <div tabindex="-1" aria-labelledby="exampleModalLabel" >
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