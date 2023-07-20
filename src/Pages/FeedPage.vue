<template>
    <topNavbar @search-query-changed="performSearch"></topNavbar>


    <div v-if="showAlert">
        {{ alertMessage }}
    </div>

    <div class="container mt-5">
        <div class="row mt-5" v-if="posts.length">

            <div style="padding-top: 2rem;" v-for="post in posts" :key="post.id">

                <div class="container mt-5 mb-5">
                    <div class="row d-flex align-items-center justify-content-center">
                        <div class="col-md-6">
                            <div class="card ">
                                {{ post.id }}
                                <div class="d-flex justify-content-between p-2 px-3">
                                    <div class="d-flex flex-row align-items-center">
                                        <img src="https://i.imgur.com/UXdKE3o.jpg" width="50" class="rounded-circle">
                                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold">{{
                                            post.ownerName }}</span> <small class="text-primary">{{ post.title}}</small>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row mt-1 ellipsis"> <small class="mr-2">20 mins</small> <i
                                            class="fa fa-ellipsis-h"></i> </div>
                                </div>
                                <div class="p-2">
                                    <p class="text-justify">{{ post.body }}.</p>
                                    <hr>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex flex-row icons d-flex align-items-center"> <i
                                                class="fa fa-heart"></i> <i class="fa fa-smile-o ml-2"></i> </div>
                                        <div class="d-flex flex-row muted-color"> <span>{{ post.comments.length }}
                                                Comments</span> </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col">
                                            <!-- Pass the message "Login to like" to the handleLike function -->
                                            <img @click="handleLike(post, 'Login to like')"
                                                :src="post.likes > 0 ? '/liked.png' : '/like.png'" alt="like">
                                            <span>{{ post.likes }} Likes</span>
                                        </div>

                                        <div class="col">
                                            <!-- Pass the message "Login to comment" to the toggleComments function -->
                                            <img @click="toggleComments(post, 'Login to comment')" src="/comment.png"
                                                alt="follow">
                                        </div>
                                        <div class="col">
                                            <!-- Pass the message "Login to block" to the handleLike function (modify the message accordingly) -->
                                            <img @click="toggleBlock(post, 'Login to block')" src="/block.png" alt="follow">
                                        </div>
                                        <div class="col">
                                            <!-- Pass the message "Login to perform this action" to the toggleComments function (modify the message accordingly) -->
                                            <img @click="toggleMessages(post, 'Login to send direct message')"
                                                src="/outbox.png" alt="follow">
                                        </div>
                                    </div>

                                    <hr>
                                    <div class="comments" v-if="post.showComments && post.comments && post.comments.length">

                                        <div class="comments" v-for="comment in post.comments" :key="comment.id">

                                            <div class="d-flex flex-row mb-2"> <img src="https://i.imgur.com/1YrCKa1.jpg"
                                                    width="40" class="rounded-image">
                                                <div class="d-flex flex-column ml-2"> <span class="name">{{ comment.name
                                                }}</span> <small class="comment-text">{{ comment.body }}</small>

                                                </div>
                                            </div>
                                            <div class="comment-input"> <input type="text" class="form-control">
                                                <div class="fonts"> <i class="fa fa-camera"></i> </div>
                                            </div>
                                        </div>


                                        <div class="comment-input"> <input type="text" class="form-control">
                                            <div class="fonts"> <i class="fa fa-camera"></i> </div>
                                        </div>
                                    </div>
                                </div>
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
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name: 'PostsList',
    data() {
        return {
            posts: [],
            users: [], // Add a property to store user data
            searchQuery: '',

        };
    },

    async mounted() {
        try {
            if (this.posts.length === 0) {
                // If posts data is not available in Vuex store, fetch it from the API and update the store
                await this.fetchPosts();
                await this.fetchUsers(); // Fetch user data
                this.matchPostsToUsers(); // Match posts to their owners
            } else {
                // If posts data is available in Vuex store, no need to fetch from the API
                this.matchPostsToUsers(); // Match posts to their owners
            }

            // Fetch posts and comments using the Vuex action and filter out blocked posts
            await this.$store.dispatch('fetchPostsAndComments');

            // Filter out blocked posts for the logged-in user
            const blockedPostIds = this.$store.state.blockedPosts;
            this.posts = this.posts.filter((post) => !blockedPostIds.includes(post.id));
        } catch (error) {
            console.error('Error fetching posts and comments:', error);
        }
    },

    methods: {
        ...mapMutations(['incrementLikes']),
        ...mapActions(['likePost', 'unlikePost']),

        toggleAlert(message) {
            alert(message); // Use Vue's alert function to show the alert message
            setTimeout(() => {
                this.showAlert = false;
            }, 3000); // Hide the alert after 3 seconds (if you still want to hide it)
        },

        async handleLike(post) {
            try {
                if (post.likes > 0) {
                    // Unlike the post
                    const success = await this.likePost(post.id);
                    if (!success) {
                        // Handle failure (optional)
                    }
                } else {
                    // Like the post
                    const success = await this.unlikePost(post.id);
                    if (!success) {
                        // Handle failure (optional)
                    }
                }
            } catch (error) {
                console.error('Error liking/unliking the post:', error);
            }
        },
        async fetchPosts() {
            // Fetch all posts
            const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
            try {
                const response = await axios.get(apiUrl);
                this.posts = response.data;

                // Initialize the showComments property for each post
                for (const post of this.posts) {
                    post.showComments = false;
                    post.comments = []; // Initialize the comments array
                }

                // Fetch comments for each post concurrently and add them to the post object
                const fetchCommentsPromises = this.posts.map(post => this.fetchComments(post.id));
                const commentsList = await Promise.all(fetchCommentsPromises);

                // Now, assign the comments to each post
                for (let i = 0; i < this.posts.length; i++) {
                    this.posts[i].comments = commentsList[i];
                }
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
        async matchPostsToUsers() {
            // Match each post to its owner using the userId property
            this.posts.forEach((post) => {
                const user = this.users.find((user) => user.id === post.userId);
                if (user) {
                    post.ownerName = user.name; // Add an ownerName property to each post
                }
            });
        },
        async performSearch(searchQuery) {
            // Filter posts based on the search query
            this.searchQuery = searchQuery;
        },
        async fetchComments(postId) {
            try {
                const apiUrl = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
                const response = await axios.get(apiUrl);
                return response.data;
            } catch (error) {
                console.error('Error fetching comments:', error);
                return [];
            }
        },

        toggleComments(post, message) {
            if (!this.$store.state.user) {
                // User is not logged in, show the provided message in an alert
                alert(message);
                return;
            }

            post.showComments = !post.showComments;
        },
        toggleMessages(post, message) {
            if (!this.$store.state.user) {
                // User is not logged in, show the provided message in an alert
                alert(message);
                return;
            }

            // post.showComments = !post.showComments;
        },

        toggleBlock(post) {
            if (!this.$store.state.user) {
                // User is not logged in, show the provided message in an alert
                this.toggleAlert('Login to block');
                return;
            }

            const postId = post.id;
            if (this.isPostBlocked(postId)) {
                // Post is already blocked, unblock it
                this.unblockPost(postId);
                this.toggleAlert('Post unblocked successfully.');
               
            } else {
                // Block the post
                this.blockPost(postId);
                this.toggleAlert('Post blocked successfully.');
                window.location.reload(); 
            }
        },


        isPostBlocked(postId) {
            return this.$store.state.blockedPosts.includes(postId);
        },

        blockPost(postId) {
            this.$store.commit('blockPost', postId);
        },

        unblockPost(postId) {
            this.$store.commit('unblockPost', postId);
        },

    },
    computed: {
        ...mapState(['posts']),
        filteredPosts() {
            // Filter posts based on the search query
            return this.posts.filter((post) =>
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

img:hover {
    cursor: pointer;
}

.follow-icon {
    position: relative;
}

.follow-text {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    background-color: #ffffff;
    padding: 2px 5px;
    border-radius: 3px;
}

.follow-icon:hover .follow-text {
    display: block;
}


.posted {
    color: blue;
    font-weight: bold;
}
</style>
