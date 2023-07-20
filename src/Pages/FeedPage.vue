<template>
    <topNavbar @search-query-changed="performSearch"></topNavbar>





    <div class="container mt-5">



        <div class="row mt-5" v-if="posts.length">

            <div class="col-md-4 col-sm-12" style="padding-top: 80px;" v-for="post in posts" :key="post.id">
                <div class="card shadow-lg p-3 mb-5 bg-white rounded border-0">
                    <div class="card-title">
                        <div class="row">
                            <div class="col-7">
                                <div class="card-text">Posted by:

                                    <div class="posted">{{ post.ownerName }}</div>
                                </div>
                            </div>
                            <div class="col-5 follow-icon">
                                <img src="/follow.png" alt="follow">
                                <span class="follow-text">Follow</span>
                            </div>


                        </div>

                    </div>
                    <div class="card-body">

                        <h5 class="card-title">{{ post.title }}</h5>

                        <p class="card-text">{{ post.body }}</p>


                        <div class="row">
                            <div class="col">
                                <img src="/like.png" alt="follow">
                              
                            </div>
                            <div class="col">
                                <img src="/comment.png" alt="follow">
                             
                            </div>
                            <div class="col">
                                <img src="/outbox.png" alt="follow">
                            </div>
                        </div>

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
            users: [], // Add a property to store user data
            searchQuery: '', // Add a searchQuery property to store the search query
        };
    },
    async mounted() {
        await this.fetchPosts();
        await this.fetchUsers(); // Fetch user data
        this.matchPostsToUsers(); // Match posts to their owners
    },
    methods: {
        async fetchPosts() {
            // Fetch all posts
            const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
            try {
                const response = await axios.get(apiUrl);
                this.posts = response.data;
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        async fetchUsers() {
            // Fetch all users
            const apiUrl = 'https://jsonplaceholder.typicode.com/users';
            try {
                const response = await axios.get(apiUrl);
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        matchPostsToUsers() {
            // Match each post to its owner using the userId property
            this.posts.forEach(post => {
                const user = this.users.find(user => user.id === post.userId);
                if (user) {
                    post.ownerName = user.name; // Add an ownerName property to each post
                }
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
            return this.posts.filter(post =>
                post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
};
</script>


<style scoped>
img {
    height: 2rem;
    width: auto;
}
img:hover{
    cursor: pointer;
}
.follow-icon {
    position: relative; /* Set the container to relative positioning */
}

.follow-text {
    position: absolute; /* Set the Follow text to absolute positioning */
    top: 0; /* Position it at the top of the container */
    left: 0; /* Position it at the left of the container */
    display: none; /* Hide it by default */
    background-color: #ffffff; /* Set the background color */
    padding: 2px 5px; /* Add padding to the text */
    border-radius: 3px; /* Add some border radius for styling */
}

.follow-icon:hover .follow-text {
    display: block; /* Show the Follow text on hover */
}


.posted {
    color: blue;
    font-weight: bold;
}
</style>
