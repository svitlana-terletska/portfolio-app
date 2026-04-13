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
                component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
                meta: {
                    title: 'Svitlana Terletska — UX Designer Portfolio',
                    description: 'UX Designer portfolio featuring case studies in mobile app design, responsive websites, and user research.'
                }
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
                meta: {
                    title: 'Vacation Planner App Case Study — Svitlana Terletska',
                    description: 'UX case study for a vacation planner mobile app helping users organize trips, save places, and navigate by distance.'
                }
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

                component: () => import(/* webpackChunkName: "case-studies" */ '@/views/CaseStudiesView.vue'),
                meta: {
                    title: 'Case Studies — Svitlana Terletska',
                    description: 'UX design case studies covering Vacation Planner, Budgeting App, Real Estate, Rabbitry, and Medical Cost features.'
                }
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
