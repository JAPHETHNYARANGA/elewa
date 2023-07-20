import { createStore } from 'vuex';
import axios from 'axios'; // Add this line to import axios

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        followingUsers: [], // Initialize an array to store the users you are following
        posts: [], // Initialize an array to store the posts
        comments: {}, // Initialize an object to store comments (use post ID as keys)
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        followUser(state, user) {
            const existingUser = state.followingUsers.find(u => u.id === user.id);
            if (!existingUser) {
                state.followingUsers.push(user); // Add the user to the followingUsers array
                // Save the updated followingUsers to localStorage
                localStorage.setItem('followingUsers', JSON.stringify(state.followingUsers));
            }
        },

        // Mutation to set the comments for a post
        setComments(state, { postId, comments }) {
            state.comments[postId] = comments;
        },
        // Mutation to increment likes for a post
        setPosts(state, posts) {
            state.posts = posts.map(post => ({ ...post, likes: 0 })); // Initialize the likes property to 0
        },
        // ...
        // Mutation to increment likes for a post
        incrementLikes(state, { postId }) {
            const post = state.posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
            }
        },
    },
    actions: {
        // Your other action functions go here

        // Action to fetch posts and comments from API and store them in Vuex
        async fetchPostsAndComments({ commit }) {
            try {
                const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const posts = postsResponse.data;
                commit('setPosts', posts);

                // Fetch comments for each post concurrently and add them to the comments object
                const fetchCommentsPromises = posts.map(post => axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`));
                const commentsResponses = await Promise.all(fetchCommentsPromises);
                commentsResponses.forEach((response, index) => {
                    const postId = posts[index].id;
                    const comments = response.data;
                    commit('setComments', { postId, comments });
                });
            } catch (error) {
                console.error('Error fetching posts and comments:', error);
            }
        },
        // Action to initialize followingUsers array from localStorage
        initFollowingUsers({ commit }) {
            commit('initializeFollowingUsers');
            return Promise.resolve();
        },
    },
    getters: {
        // Your getter functions go here
    },
});

export default store;
