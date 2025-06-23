// ===== ARCHIVO PRINCIPAL DE LA APLICACIÓN =====
// Este archivo es el punto de entrada de toda la aplicación Vue.js

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// ===== IMPORTACIÓN DE ESTILOS =====
// Bootstrap para componentes UI y diseño responsivo
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Animate.css para animaciones predefinidas
import 'animate.css'
// Estilos personalizados de la aplicación
import './style.css'

// ===== IMPORTACIÓN DE VISTAS PÚBLICAS =====
// Páginas que cualquier usuario puede ver sin autenticación
import Home from './views/publicas/inicio/InicioView.vue'
import Services from './views/publicas/servicios/ServiciosView.vue'
import About from './views/publicas/sobre-nosotros/SobreNosotrosView.vue'
import Contact from './views/publicas/contactanos/ContactanosView.vue'

// ===== VISTAS DE SERVICIOS ESPECÍFICOS =====
// Páginas detalladas de cada servicio individual
import DesarrolloWebView from './views/publicas/servicios/detalle/DesarrolloWebView.vue'
import EmailMarketingView from './views/publicas/servicios/detalle/EmailMarketingView.vue'
import DisenoUIUXView from './views/publicas/servicios/detalle/DisenoUIUXView.vue'
import MarketingDigitalView from './views/publicas/servicios/detalle/MarketingDigitalView.vue'
import AutomatizacionView from './views/publicas/servicios/detalle/AutomatizacionView.vue'

// ===== VISTAS PRIVADAS (REQUIEREN AUTENTICACIÓN) =====
import Cliente from './views/privadas/clientes/ClienteView.vue'
import Dashboard from './views/privadas/administradores/AdminView.vue'

// ===== VISTAS ESPECIALES =====
import Ecommerce from './views/ofertas/Ecommerce.vue'
import Marketing from './views/ofertas/Marketing.vue'
import Error404 from './views/Error404.vue'
import PaymentSuccess from './views/PaymentSuccess.vue'

// ===== CONFIGURACIÓN INICIAL =====
// Crear la aplicación Vue y el store de estado global
const app = createApp(App)
const pinia = createPinia()

// IMPORTANTE: Pinia debe configurarse ANTES de importar stores
app.use(pinia)

// Importar el store de autenticación DESPUÉS de configurar Pinia
import { useAuthStore } from './stores/auth'

// ===== CONFIGURACIÓN DE RUTAS =====
const routes = [
  // RUTAS PÚBLICAS - Accesibles sin autenticación
  { path: '/', component: Home },
  { path: '/servicios', component: Services },
  { path: '/sobre-nosotros', component: About },
  { path: '/contactanos', component: Contact },
  
  // RUTAS DE SERVICIOS ESPECÍFICOS
  { path: '/servicios/desarrollo-web', component: DesarrolloWebView },
  { path: '/servicios/email-marketing', component: EmailMarketingView },
  { path: '/servicios/diseno-ui-ux', component: DisenoUIUXView },
  { path: '/servicios/marketing-digital', component: MarketingDigitalView },
  { path: '/servicios/automatizacion', component: AutomatizacionView },
  
  // RUTAS PRIVADAS - Requieren autenticación y rol específico
  { 
    path: '/cliente', 
    component: Cliente,
    meta: { requiresAuth: true, role: 'client' } // Solo clientes autenticados
  },
  { 
    path: '/admin', 
    component: Dashboard,
    meta: { requiresAuth: true, role: 'admin' } // Solo administradores
  },
  
  // RUTAS DE OFERTAS ESPECIALES
  { path: '/ecommerce', component: Ecommerce },
  { path: '/marketing-digital', component: Marketing },
  { path: '/pago-exitoso', component: PaymentSuccess },
  
  // MANEJO DE ERRORES
  { path: '/404', component: Error404 },
  { path: '/:pathMatch(.*)*', redirect: '/404' } // Cualquier ruta no encontrada
]

// ===== CREAR ROUTER =====
const router = createRouter({
  history: createWebHistory(), // Usar URLs limpias (sin #)
  routes,
  scrollBehavior: () => ({ top: 0 }) // Siempre ir al top al cambiar de página
})

// ===== GUARDIA DE NAVEGACIÓN =====
// Controla el acceso a rutas protegidas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() 

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verificar si el usuario está autenticado
    if (!authStore.isAuthenticated) {
      return next('/') // Redirigir al inicio si no está autenticado
    }

    // Verificar si tiene el rol correcto
    if (to.meta.role && authStore.user.role !== to.meta.role) {
      return next('/') // Redirigir si no tiene el rol adecuado
    }
  }

  next() // Permitir navegación
})

// ===== MONTAR LA APLICACIÓN =====
app.use(router)
app.mount('#app')