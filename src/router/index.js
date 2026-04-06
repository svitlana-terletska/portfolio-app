import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'Home',
                // Lazy load HomeView component
                component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
            },
            {
                path: 'about',
                name: 'About',
                // Lazy load AboutView component
                component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
            },
            {
                path: 'graphics',
                name: 'Graphics',
                // Lazy load GraphicsView component
                component: () => import(/* webpackChunkName: "graphics" */ '@/views/GraphicsView.vue')
            },
            {
                path: '/case-study/rabbitry',
                name: 'CaseStudyRabbitry',
                // Lazy load CaseStudyRabbitry component
                component: () => import(/* webpackChunkName: "case-study-rabbitry" */ '@/views/CaseStudyRabbitry.vue'),
            },
            {
                path: '/case-study/budgeting',
                name: 'CaseStudyBudgeting',
                // Lazy load CaseStudyBudgeting component
                component: () => import(/* webpackChunkName: "case-study-budgeting" */ '@/views/CaseStudyBudgeting.vue'),
            },
            {
                path: '/case-study/vacation',
                name: 'CaseStudyVacation',
                // Lazy load CaseStudyVacation component
                component: () => import(/* webpackChunkName: "case-study-vacation" */ '@/views/CaseStudyVacation.vue'),
            },
            {
                path: '/case-study/real-estate',
                name: 'CaseStudyRealEstate',
                // Lazy load CaseStudyRealEstate component
                component: () => import(/* webpackChunkName: "case-study-real-estate" */ '@/views/CaseStudyRealEstate.vue'),
            },
            {
                path: '/case-study/medical',
                name: 'CaseStudyMedical',
                // Lazy load CaseStudyMedical component
                component: () => import(/* webpackChunkName: "case-study-medical" */ '@/views/CaseStudyMedical.vue'),
            },
            {
                path: '/case-studies',
                name: 'CaseStudies',
                // Lazy load CaseStudyCards component (assuming it's a view, not just a component used within other views)
                component: () => import(/* webpackChunkName: "case-studies" */ '@/views/CaseStudiesView.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    // ScrollBehavior function
    scrollBehavior(to, from, savedPosition) {
        // If a saved position is available (e.g., from browser back/forward buttons), use it
        if (savedPosition) {
            return savedPosition;
        } else {
            // Otherwise, scroll to the top of the page
            return { top: 0, left: 0, behavior: 'smooth' }; // 'smooth' for a smooth scroll animation
        }
    }
})

export default router
