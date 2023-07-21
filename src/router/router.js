import { createRouter, createWebHistory } from "vue-router";
import FeedPageVue from "@/Pages/FeedPage.vue";
import LoginModalVue from "@/components/LoginModal.vue";
import MyFeedsComponent from "@/Pages/MyFeeds.vue";
import ProfilePage from "@/Pages/ProfilePage.vue";
import FollowingPage from "@/Pages/FollowingPage.vue";
import UsersPageVue from "@/Pages/UsersPage.vue";
import SubscribePage from '@/Pages/SubscribePage.vue';
import MessagesPage from '@/Pages/MessagesPage.vue';

const routes  = [
    {
        path:'/login',
        name:'login',
        component: LoginModalVue
    },
    {
        path:'',
        name:'feeds',
        component:FeedPageVue
    },
    {
      path:'/myfeeds',
      name:'myFeeds',
      component:MyFeedsComponent
    },
    {
      path:'/profile',
      name:'profile',
      component:ProfilePage
    },
    {
      path:'/following',
      name:'Following ',
      component: FollowingPage 
    },
    {
      path:'/users',
      name:'users',
      component:UsersPageVue
    },
    {
      path:'/subscribe',
      name:'subscribe',
      component: SubscribePage
    },
    {
      path:'/messages',
      name:'messages',
      component: MessagesPage
    }
   
   
]

const router = createRouter({
    history:createWebHistory('/elewa/'),
    routes
})

export default router