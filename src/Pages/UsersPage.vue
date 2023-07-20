<template>
    <main>
        <div class="container bg-transparent my-4 p-3" style="position: relative;">
            <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                <!-- Use v-for to loop through users and display their information -->
                <div class="col" v-for="user in users" :key="user.id">
                    <div class="h-100 shadow-sm card shadow-lg p-3 mb-5 bg-white rounded border-0">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                            class="rounded-circle img-fluid" style="width: 150px;">
                        <div class="card-body">
                            <div class="clearfix mb-3">
                                <span class="float-start badge rounded-pill bg-primary">{{ user.company.name }}</span>
                                <span class="float-end price-hp">{{ user.email }}</span>
                            </div>
                            <h5 class="card-title">{{ user.name }}</h5>
                            <div class="text-center my-4">
                                <a href="#" class="btn btn-warning">Follow</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [], // Initialize an empty array to store the fetched users
        };
    },
    async mounted() {
        try {
            // Fetch all users from the API using axios
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            this.users = response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
};
</script>
  
<style scoped>
.container {
    margin-top: 5% !important;
}
</style>
  