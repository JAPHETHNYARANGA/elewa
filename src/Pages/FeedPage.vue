<template>
    <topNavbar @search-query-changed="performSearch"></topNavbar>

    <div class="container">

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
    name: 'PostsList',
    data() {
        return {
            posts: [],
            searchQuery: '', // Add a searchQuery property to store the search query
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            // Fetch all posts
            const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
            axios
                .get(apiUrl)
                .then(response => {
                    this.posts = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        performSearch(searchQuery) {
            // Filter posts based on the search query
            this.searchQuery = searchQuery;
        },
    },
    computed: {
        filteredPosts() {
            // Filter posts based on the search query
            return this.posts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
};
</script>

<style scoped></style>