import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'
import './style.css'

// Import de vistas públicas
import Home from './views/publicas/inicio/InicioView.vue'
import Services from './views/publicas/servicios/ServiciosView.vue'
import About from './views/publicas/sobre-nosotros/SobreNosotrosView.vue'
import Contact from './views/publicas/contactanos/ContactanosView.vue'

// Import de vistas de servicios específicos
import DesarrolloWebView from './views/publicas/servicios/detalle/DesarrolloWebView.vue'
import EmailMarketingView from './views/publicas/servicios/detalle/EmailMarketingView.vue'
import DisenoUIUXView from './views/publicas/servicios/detalle/DisenoUIUXView.vue'
import MarketingDigitalView from './views/publicas/servicios/detalle/MarketingDigitalView.vue'
import AutomatizacionView from './views/publicas/servicios/detalle/AutomatizacionView.vue'

// Import de vistas privadas
import Cliente from './views/privadas/clientes/ClienteView.vue'
import Dashboard from './views/privadas/administradores/AdminView.vue'

// Import de vistas de ofertas
import Ecommerce from './views/ofertas/Ecommerce.vue'
import Marketing from './views/ofertas/Marketing.vue'
import Error404 from './views/Error404.vue'
import PaymentSuccess from './views/PaymentSuccess.vue'

// Crea Pinia y App primero
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Importa el store *DESPUÉS* de usar pinia
import { useAuthStore } from './stores/auth'

// Define rutas
const routes = [
  { path: '/', component: Home },
  { path: '/servicios', component: Services },
  { path: '/sobre-nosotros', component: About },
  { path: '/contactanos', component: Contact },
  
  // Rutas de servicios específicos
  { path: '/servicios/desarrollo-web', component: DesarrolloWebView },
  { path: '/servicios/email-marketing', component: EmailMarketingView },
  { path: '/servicios/diseno-ui-ux', component: DisenoUIUXView },
  { path: '/servicios/marketing-digital', component: MarketingDigitalView },
  { path: '/servicios/automatizacion', component: AutomatizacionView },
  
  // Rutas privadas
  { 
    path: '/cliente', 
    component: Cliente,
    meta: { requiresAuth: true, role: 'client' }
  },
  { 
    path: '/admin', 
    component: Dashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  
  // Rutas de ofertas
  { path: '/ecommerce', component: Ecommerce },
  { path: '/marketing-digital', component: Marketing },
  { path: '/pago-exitoso', component: PaymentSuccess },
  { path: '/404', component: Error404 },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

// Crea router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// Guarda de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() 

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next('/')
    }

    if (to.meta.role && authStore.user.role !== to.meta.role) {
      return next('/')
    }
  }

  next()
})

app.use(router)
app.mount('#app')