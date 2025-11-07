import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import AdoptionDetailView from '../views/AdoptionDetailView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import CommunityView from '../views/CommunityView.vue'
import AdoptionForm from '../views/AdoptionForm.vue'
import AdoptionGallery from '../views/AdoptionGallery.vue'
import ReportForm from '../views/ReportForm.vue'
import DonationPage from '../views/DonationPage.vue'
import DonationDetail from '../views/DonationDetail.vue'
import ClosestClinicView from '../views/ClosestClinicView.vue'
import Dashboard from '../views/Dashboard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/home',
      name: 'home',
      component: Homepage
    },
    {
      path: '/adopsi',
      name: 'adoption-gallery',
      component: AdoptionGallery
    },
    {
      path: '/adopsi/:id',
      name: 'adoption-detail',
      component: AdoptionDetailView
    },
    {
      path: '/adopsi/:id/form',
      name: 'adoption-form',
      component: AdoptionForm
    },
    {
      path: '/lapor',
      name: 'report-form',
      component: ReportForm
    },
    {
      path: '/klinik-terdekat',
      name: 'closest-clinic',
      component: ClosestClinicView
    },
    {
      path: '/donasi',
      name: 'donation-page',
      component: DonationPage
    },
    {
      path: '/donasi/:id',
      name: 'donation-detail',
      component: DonationDetail
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/komunitas',
      name: 'community',
      component: CommunityView
    }
  ]
})
export default router