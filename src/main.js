// ===== 🚀 NÚCLEO CENTRAL DE LA APLICACIÓN VUE.JS =====
// Este archivo es el CORAZÓN de toda la aplicación - aquí se inicializa TODO
// Sin este archivo, la aplicación simplemente NO EXISTE

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// ===== 🎨 IMPORTACIÓN DE ESTILOS CRÍTICOS =====
// Bootstrap: Framework CSS que da VIDA visual a todos los componentes
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Animate.css: Biblioteca de animaciones que hace que la UI sea ESPECTACULAR
import 'animate.css'
// Estilos personalizados: La IDENTIDAD VISUAL única de AxoWeb
import './style.css'

// ===== 🌐 IMPORTACIÓN DE VISTAS PÚBLICAS =====
// Estas son las páginas que CUALQUIER PERSONA puede ver sin restricciones
import Home from './views/publicas/inicio/InicioView.vue'
import Services from './views/publicas/servicios/ServiciosView.vue'
import About from './views/publicas/sobre-nosotros/SobreNosotrosView.vue'
import Contact from './views/publicas/contactanos/ContactanosView.vue'

// ===== 🛠️ VISTAS DE SERVICIOS ESPECÍFICOS =====
// Páginas ESPECIALIZADAS para cada servicio individual que ofrece AxoWeb
import DesarrolloWebView from './views/publicas/servicios/detalle/DesarrolloWebView.vue'
import EmailMarketingView from './views/publicas/servicios/detalle/EmailMarketingView.vue'
import DisenoUIUXView from './views/publicas/servicios/detalle/DisenoUIUXView.vue'
import MarketingDigitalView from './views/publicas/servicios/detalle/MarketingDigitalView.vue'
import AutomatizacionView from './views/publicas/servicios/detalle/AutomatizacionView.vue'

// ===== 🔐 VISTAS PRIVADAS - ACCESO RESTRINGIDO =====
// Estas vistas requieren AUTENTICACIÓN y ROLES específicos
import Cliente from './views/privadas/clientes/ClienteView.vue'
import Dashboard from './views/privadas/administradores/AdminView.vue'

// ===== 🎯 VISTAS ESPECIALES Y DE ERROR =====
import Ecommerce from './views/ofertas/Ecommerce.vue'
import Marketing from './views/ofertas/Marketing.vue'
import Error404 from './views/Error404.vue'
import PaymentSuccess from './views/PaymentSuccess.vue'

// ===== ⚡ CONFIGURACIÓN INICIAL CRÍTICA =====
// ORDEN IMPORTANTE: Pinia DEBE configurarse ANTES de importar stores
const app = createApp(App)
const pinia = createPinia()
app.use(pinia) // ¡ESTO ES CRUCIAL! Sin esto, los stores NO funcionan

// Importar el store de autenticación DESPUÉS de configurar Pinia
import { useAuthStore } from './stores/auth'

// ===== 🗺️ CONFIGURACIÓN COMPLETA DE RUTAS =====
// Este es el MAPA de navegación de toda la aplicación
const routes = [
  // 🌍 RUTAS PÚBLICAS - Acceso LIBRE para todos los usuarios
  { path: '/', component: Home },
  { path: '/servicios', component: Services },
  { path: '/sobre-nosotros', component: About },
  { path: '/contactanos', component: Contact },
  
  // 🛠️ RUTAS DE SERVICIOS ESPECÍFICOS - Páginas de detalle
  { path: '/servicios/desarrollo-web', component: DesarrolloWebView },
  { path: '/servicios/email-marketing', component: EmailMarketingView },
  { path: '/servicios/diseno-ui-ux', component: DisenoUIUXView },
  { path: '/servicios/marketing-digital', component: MarketingDigitalView },
  { path: '/servicios/automatizacion', component: AutomatizacionView },
  
  // 🔐 RUTAS PRIVADAS - ACCESO RESTRINGIDO POR ROL
  { 
    path: '/cliente', 
    component: Cliente,
    meta: { 
      requiresAuth: true,    // ¡REQUIERE estar logueado!
      role: 'client'         // ¡SOLO para clientes!
    }
  },
  { 
    path: '/admin', 
    component: Dashboard,
    meta: { 
      requiresAuth: true,    // ¡REQUIERE estar logueado!
      role: 'admin'          // ¡SOLO para administradores!
    }
  },
  
  // 🎯 RUTAS DE OFERTAS ESPECIALES
  { path: '/ecommerce', component: Ecommerce },
  { path: '/marketing-digital', component: Marketing },
  { path: '/pago-exitoso', component: PaymentSuccess },
  
  // 🚨 MANEJO DE ERRORES - Rutas no encontradas
  { path: '/404', component: Error404 },
  { path: '/:pathMatch(.*)*', redirect: '/404' } // Captura CUALQUIER ruta inválida
]

// ===== 🚦 CREAR ROUTER CON CONFIGURACIÓN AVANZADA =====
const router = createRouter({
  history: createWebHistory(), // URLs limpias sin # (modo historia)
  routes,
  scrollBehavior: () => ({ top: 0 }) // SIEMPRE ir al top al cambiar página
})

// ===== 🛡️ GUARDIA DE NAVEGACIÓN - SEGURIDAD MÁXIMA =====
// Esta función se ejecuta ANTES de cada cambio de ruta
// Es el GUARDIÁN que protege las rutas privadas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() 

  // 🔍 Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // ❌ Si NO está autenticado, RECHAZAR acceso
    if (!authStore.isAuthenticated) {
      console.warn('🚫 Acceso DENEGADO: Usuario no autenticado')
      return next('/') // Redirigir al inicio
    }

    // 🔍 Verificar si tiene el ROL correcto
    if (to.meta.role && authStore.user.role !== to.meta.role) {
      console.warn(`🚫 Acceso DENEGADO: Rol requerido: ${to.meta.role}, Rol actual: ${authStore.user.role}`)
      return next('/') // Redirigir si no tiene el rol adecuado
    }
  }

  // ✅ Todo OK, permitir navegación
  next()
})

// ===== 🚀 MONTAJE FINAL DE LA APLICACIÓN =====
// Este es el momento donde la aplicación COBRA VIDA
app.use(router)
app.mount('#app') // Conectar con el elemento HTML #app

console.log('🎉 AxoWeb Digital - Aplicación iniciada exitosamente!')