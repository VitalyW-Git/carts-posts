import { createRouter, createWebHistory } from 'vue-router'
import PostsCarts from "./pages/PostsCarts.vue";
import DetailPost from "./pages/DetailPost.vue";


const router =  createRouter({
    routes: [
        {
            path: '/',
            component: PostsCarts,
            name: 'postsCarts',
        },
        {
            path: '/detail/:id',
            component: DetailPost,
            name: 'detailPost',
            props: true
        },
    ],
    history: createWebHistory()
})

export default router