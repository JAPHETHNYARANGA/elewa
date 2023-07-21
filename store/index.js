// store.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        followingUsers: [], // Initialize an array to store the users you are following
        posts: JSON.parse(localStorage.getItem('posts')) || [], // Initialize an array to store the posts
        comments: {}, // Initialize an object to store comments (use post ID as keys)
        users: [], // Initialize an array to store the fetched users
        blockedPosts: JSON.parse(localStorage.getItem('blockedPosts')) || [], // Initialize an array to store the blocked posts for the logged-in user
        subscribedUserPosts: JSON.parse(localStorage.getItem('subscribedUserPosts')) || [],
        viewedPostsCount: 0,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        initializeFollowingUsers(state) {
            const followingUsers = JSON.parse(localStorage.getItem('followingUsers')) || [];
            state.followingUsers = followingUsers;
        },
        followUser(state, user) {
            const existingUser = state.followingUsers.find(u => u.id === user.id);
            if (!existingUser) {
                state.followingUsers.push(user); // Add the user to the followingUsers array
                // Save the updated followingUsers to localStorage
                localStorage.setItem('followingUsers', JSON.stringify(state.followingUsers));
            }
        },
        unfollowUser(state, user) {
            const index = state.followingUsers.findIndex(u => u.id === user.id);
            if (index !== -1) {
                state.followingUsers.splice(index, 1); // Remove the user from the followingUsers array
                // Save the updated followingUsers to localStorage
                localStorage.setItem('followingUsers', JSON.stringify(state.followingUsers));
            }
        },
        setUsers(state, users) {
            state.users = users; // Set the fetched users from the API
        },
        // Mutation to set the comments for a post
        setComments(state, { postId, comments }) {
            state.comments[postId] = comments;
        },
        setPosts(state, posts) {
            state.posts = posts.map(post => ({ ...post, likes: 0 }));
            localStorage.setItem('posts', JSON.stringify(state.posts)); // Save posts data to local storage
        },

        // Mutation to increment likes for a post
        incrementLikes(state, { postId }) {
            const post = state.posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
            }
        },
        // Mutation to decrement likes for a post
        decrementLikes(state, { postId }) {
            const post = state.posts.find(p => p.id === postId);
            if (post) {
                post.likes--;
            }
        },
        updateLikes(state, { postId, newLikes }) {
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.likes = newLikes;
            }
        },

        // Mutation to block a post
        blockPost(state, postId) {
            state.blockedPosts.push(postId);
            // Save the updated blockedPosts to localStorage
            localStorage.setItem('blockedPosts', JSON.stringify(state.blockedPosts));
        },

        // Mutation to unblock a post
        unblockPost(state, postId) {
            const index = state.blockedPosts.findIndex((id) => id === postId);
            if (index !== -1) {
                state.blockedPosts.splice(index, 1);
                // Save the updated blockedPosts to localStorage
                localStorage.setItem('blockedPosts', JSON.stringify(state.blockedPosts));
            }
        },
        setSubscribedUserPosts(state, posts) {
            state.subscribedUserPosts = posts;
            localStorage.setItem('subscribedUserPosts', JSON.stringify(posts));
        },
        incrementViewedPostsCount(state, count) {
            state.viewedPostsCount += count;
        },
    },
    actions: {
        async likePost({ commit }, postId) {
            try {
                // Perform the API request to like the post
                const response = await axios.post(`https://your-api-url.com/posts/${postId}/like`);

                // Assuming the API returns the updated post data, you can update the likes count in Vuex
                const updatedPost = response.data;
                commit('updateLikes', { postId, newLikes: updatedPost.likes });

                console.log('Post liked successfully.');
                return true; // Return true indicating success
            } catch (error) {
                console.error('Error liking the post:', error);
                return false; // Return false indicating failure
            }
        },

        // Action to fetch posts and comments from API and store them in Vuex
        async fetchPostsAndComments({ commit, state }) {
            try {
                if (!state.posts || state.posts.length === 0) {
                    // If posts data is not available in Vuex store or is empty, fetch it from the API
                    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
                    const posts = postsResponse.data;
                    commit('setPosts', posts);
                }

                // Filter out blocked posts for the logged-in user
                const blockedPostIds = state.blockedPosts;
                const unsubscribedUser = state.user ? !state.user.subscribed : true;

                const filteredPosts = state.posts.filter(
                    (post) => !blockedPostIds.includes(post.id) && (!unsubscribedUser || post.likes < 20)
                );

                // Fetch comments for each post concurrently and add them to the comments object
                const fetchCommentsPromises = filteredPosts.map((post) =>
                    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                );
                const commentsResponses = await Promise.all(fetchCommentsPromises);
                commentsResponses.forEach((response, index) => {
                    const postId = filteredPosts[index].id;
                    const comments = response.data;
                    commit('setComments', { postId, comments });
                });
                // Increment viewedPostsCount
                commit('incrementViewedPostsCount', filteredPosts.length);
            } catch (error) {
                console.error('Error fetching posts and comments:', error);
            }
        },

        // Action to initialize followingUsers array from localStorage
        initFollowingUsers({ commit }) {
            commit('initializeFollowingUsers');
            return Promise.resolve();
        },
        async fetchUsers({ commit }) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                commit('setUsers', response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        // Action to fetch posts for subscribed users from API and store them in Vuex
        async fetchSubscribedUserPosts({ commit }) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const posts = response.data;
                commit('setSubscribedUserPosts', posts);
            } catch (error) {
                console.error('Error fetching subscribed user posts:', error);
            }
        },
    },
    getters: {
        // Your getter functions go here
    },
});

export default store;
