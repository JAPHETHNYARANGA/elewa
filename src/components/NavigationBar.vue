<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #516BEB;">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">Elewa</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Your navigation links here -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/">
                            <a class="nav-link active" aria-current="page" href="#">Feed</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="myfeeds" @click="checkLoginStatus">
                            <a class="nav-link" href="#">My Feeds</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="users" @click="checkLoginStatus">
                            <a class="nav-link" href="#">Users</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="following" @click="checkLoginStatus">
                            <a class="nav-link" href="#">Following</a>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="subscribe" @Click="checkLoginStatus">
                            <a class="nav-link ">Subscribe</a>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="messages" @Click="checkLoginStatus">
                            <a class="nav-link ">Chats</a>
                        </router-link>
                    </li>
                </ul>

                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="$store.state.user">
                        {{ $store.state.user.name }}
                    </li>
                </ul>

                <ul class="navbar-nav ">
                    <li class="nav-item" v-if="!$store.state.user">
                        <router-link to="login">
                            <a class="nav-link ">Login</a>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="$store.state.user" @click="logout">
                        <a class="nav-link ">Logout</a>
                    </li>
                    <li class="nav-item" v-if="$store.state.user">
                        <router-link to="profile">
                            <a class="nav-link ">Profile</a>
                        </router-link>
                    </li>
                </ul>

                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        v-model="searchQuery" @input="performSearch">
                </form>
            </div>
        </div>
    </nav>
</template>
  
  <!-- The rest of your script and style tags remain unchanged -->
  
  

  

<script>
export default {
    data() {
        return {
            searchQuery: '', // Store the search query entered in the input field
        };
    },
    methods: {
        performSearch() {
            // Emit an event to notify the parent component (PostsList) about the search query change
            this.$emit('search-query-changed', this.searchQuery);
        },
        logout() {
            // Dispatch the logout action to reset user data to null
            this.$store.commit('setUser', null);
            this.$router.push('/');

        },
        checkLoginStatus() {
            // Check if the user is logged in
            if (!this.$store.state.user) {
                // If not logged in, show an alert message
                window.alert('Please login first to access My Feeds.');

                this.$router.push('/');
            }
        },
    },
};
</script>


<style scoped>
.navbar-brand {
    font-size: 1.4em;
}

.navbar-dark .navbar-nav a.nav-link {
    color: #ffffff;
    font-size: 1.1em;
}

.dropdown-menu {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border: none;
    border-radius: 0;
    padding: 0.7em;
}

@media only screen and (min-width: 992px) {
    .dropdown:hover .dropdown-menu {
        display: flex;
    }

    .dropdown-menu.show {
        display: flex;
    }
}

.dropdown-menu ul {
    list-style: none;
    padding: 0;
}

.dropdown-menu li .dropdown-item {
    color: gray;
    font-size: 1em;
    padding: 0.5em 1em;
}

.dropdown-menu li .dropdown-item:hover {
    background-color: #f1f1f1;
}

.dropdown-menu li:first-child a {
    font-weight: bold;
    font-size: 1.1em;
    text-transform: uppercase;
    color: #516beb;
}

.dropdown-menu li:first-child a:hover {
    background-color: #f1f1f1;
}

@media only screen and (max-width: 992px) {
    .dropdown-menu.show {
        flex-wrap: wrap;
        max-height: 350px;
        overflow-y: scroll;
    }
}

@media only screen and (min-width: 992px) and (max-width: 1140px) {
    .dropdown:hover .dropdown-menu {
        width: 40vw;
        flex-wrap: wrap;
    }
}

.dropdown-menu {
    border-radius: 0;
    border: none;
    padding: 0.5em;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.23);
}

.dropdown-menu ul {
    list-style: none;
    padding: 0;
}

.dropdown-menu li a {
    color: gray;
    padding: 0.5em 1em;
}

.dropdown-menu li:first-child a {
    font-weight: bold;
    font-size: 1.1em;
    color: #516beb;
}

@media screen and (min-width: 993px) {
    .dropdown:hover .dropdown-menu {
        display: flex;
    }

    .dropdown-menu.show {
        display: flex;
    }
}

@media screen and (max-width: 992px) {
    .dropdown-menu.show {
        max-height: 60vh;
        overflow-y: scroll;
    }
}
</style>