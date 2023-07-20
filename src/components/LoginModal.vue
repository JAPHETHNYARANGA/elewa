<template>
 
    <section class="vh-100" style="background-color: whitesmoke">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded border-0" style="border-radius: 1rem;">
          <div class="row g-0">
           
            <div class="col  d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black ">

                <form @submit.prevent="login">

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <span class="h1 fw-bold mb-0">Elewa</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                  <div class="form-outline mb-4">
                    <input type="text" id="form2Example17" class="form-control form-control-lg" v-model="username" />
                    <label class="form-label" for="form2Example17">Username</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" v-model="zipcode"/>
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                 
                  <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
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
            // location.reload()
            console.log('User data:', user); 
            this.$router.push('/');
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