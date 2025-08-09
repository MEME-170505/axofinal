# 📋 EVIDENCIAS COMPLETAS PARA TESIS - AXOWEB DIGITAL

## 🔥 CÓDIGOS COMPLETOS - ARCHIVOS PRINCIPALES

### 1. src/main.js - NÚCLEO CENTRAL DE LA APLICACIÓN
```javascript
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
```

### 2. src/stores/auth.js - CENTRO DE CONTROL DE SEGURIDAD
```javascript
// ===== 🔐 STORE DE AUTENTICACIÓN - CENTRO DE CONTROL DE SEGURIDAD =====
// Este store es el CEREBRO de toda la seguridad de la aplicación
// Controla quién puede acceder a qué y cuándo

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // ===== 💾 ESTADO REACTIVO GLOBAL =====
  // Esta variable contiene TODA la información del usuario actual
  const user = ref(null) // null = no hay usuario logueado

  // ===== 🧮 COMPUTED PROPERTIES - LÓGICA INTELIGENTE =====
  // Estas funciones calculan automáticamente el estado basado en los datos
  
  // ¿Hay alguien logueado? TRUE/FALSE
  const isAuthenticated = computed(() => {
    const authenticated = !!user.value
    console.log(`🔍 Estado de autenticación: ${authenticated ? '✅ LOGUEADO' : '❌ NO LOGUEADO'}`)
    return authenticated
  })
  
  // ¿Es administrador? Poder TOTAL sobre la aplicación
  const isAdmin = computed(() => {
    const admin = user.value?.role === 'admin'
    if (admin) console.log('👑 Usuario con privilegios de ADMINISTRADOR')
    return admin
  })
  
  // ¿Es cliente? Acceso limitado a sus propios datos
  const isClient = computed(() => {
    const client = user.value?.role === 'client'
    if (client) console.log('👤 Usuario con rol de CLIENTE')
    return client
  })

  // ===== 🚪 FUNCIÓN DE LOGIN - PUERTA DE ENTRADA =====
  const login = (email, password) => {
    console.log(`🔑 Intento de login para: ${email}`)
    
    // 🧪 CREDENCIALES DE PRUEBA - En producción esto sería una API real
    
    // 👤 CLIENTE DE PRUEBA
    if (email === 'cliente@gmail.com' && password === 'cisco') {
      user.value = {
        id: 1,
        name: 'Mario González',
        email: 'cliente@gmail.com',
        role: 'client',
        company: 'Empresa S.A. de C.V.',
        phone: '123-456-7890'
      }
      console.log('✅ LOGIN EXITOSO - Cliente autenticado')
      return { success: true, user: user.value }
    } 
    // 👑 ADMINISTRADOR DE PRUEBA
    else if (email === 'admin@gmail.com' && password === 'CISCO') {
      user.value = {
        id: 2,
        name: 'Administrador',
        email: 'admin@gmail.com',
        role: 'admin'
      }
      console.log('✅ LOGIN EXITOSO - Administrador autenticado')
      return { success: true, user: user.value }
    } 
    // ❌ CREDENCIALES INCORRECTAS
    else {
      console.error('❌ LOGIN FALLIDO - Credenciales incorrectas')
      return { 
        success: false, 
        message: 'Credenciales incorrectas. Verifica tu email y contraseña.' 
      }
    }
  }

  // ===== 🚪 FUNCIÓN DE LOGOUT - SALIDA SEGURA =====
  const logout = () => {
    const userName = user.value?.name || 'Usuario desconocido'
    user.value = null // Limpiar TODOS los datos del usuario
    console.log(`👋 LOGOUT EXITOSO - ${userName} ha cerrado sesión`)
  }

  // ===== 📤 EXPORTAR FUNCIONES Y ESTADO =====
  // Estas son las funciones que otros componentes pueden usar
  return {
    // Estado
    user,
    // Computed properties
    isAuthenticated,
    isAdmin,
    isClient,
    // Métodos
    login,
    logout
  }
})

// 📝 NOTAS IMPORTANTES:
// - Este store se ejecuta en TODA la aplicación
// - Los cambios aquí afectan INMEDIATAMENTE a todos los componentes
// - La seguridad de la app depende COMPLETAMENTE de este store
// - En producción, las credenciales vendrían de una API segura
```

### 3. src/views/publicas/inicio/InicioView.vue - PÁGINA PRINCIPAL
```vue
<template>
  <!-- ===== 🏠 VISTA PRINCIPAL - PRIMERA IMPRESIÓN DEL SITIO ===== -->
  <!-- Esta es la página que ve CUALQUIER visitante al entrar al sitio -->
  <div class="inicio-view">
    <!-- 🎯 Hero Section - Sección principal con logo y mensaje de bienvenida -->
    <HeroInicio />
    
    <!-- 🛠️ Services Section - Muestra los servicios principales de forma horizontal -->
    <ServiciosInicio />
    
    <!-- 💡 Belief Section - Sección "CREEMOS TU NEGOCIO DIGITAL" -->
    <CreenciaSeccion />
    
    <!-- 🏢 Projects Section - Galería de proyectos con empresas clientes -->
    <ProyectosSeccion />
  </div>
</template>

<script setup>
// ===== 📦 IMPORTACIÓN DE COMPONENTES ESPECIALIZADOS =====
// Cada componente maneja UNA sección específica de la página
import HeroInicio from './components/HeroInicio.vue'        // Banner principal con logo
import ServiciosInicio from './components/ServiciosInicio.vue'  // Servicios en formato horizontal
import CreenciaSeccion from './components/CreenciaSeccion.vue'  // Call-to-action principal
import ProyectosSeccion from './components/ProyectosSeccion.vue' // Galería de clientes
</script>

<style scoped>
/* ===== 🎨 ESTILOS ESPECÍFICOS DE LA VISTA INICIO ===== */
.inicio-view {
  background-color: var(--primary-beige); /* Color de fondo consistente */
}
</style>
```

### 4. src/views/privadas/administradores/AdminView.vue - PANEL DE ADMINISTRACIÓN
```vue
<template>
  <!-- ===== 👑 PANEL DE ADMINISTRACIÓN - CONTROL TOTAL DEL SISTEMA ===== -->
  <!-- ACCESO RESTRINGIDO: Solo usuarios con rol 'admin' pueden ver esto -->
  <div class="admin-container">
    <div class="container py-5 animate__animated animate__fadeIn">
      <!-- 🛡️ Admin Header - Identificación visual del panel administrativo -->
      <AdminHeader />

      <!-- 🧭 Navigation Tabs - Sistema de pestañas para diferentes secciones -->
      <AdminNavigation 
        :activeTab="activeTab"
        @change-tab="activeTab = $event"
      />

      <!-- 📋 Tab Content - Contenido dinámico según la pestaña activa -->
      <div class="tab-content">
        <!-- 👥 Gestión de Clientes - CRUD completo de clientes -->
        <ClientesTab v-if="activeTab === 'clientes'" key="clientes-tab" />
        
        <!-- 👑 Gestión de Administradores - Control de usuarios admin -->
        <AdministradoresTab v-if="activeTab === 'administradores'" key="administradores-tab" />
        
        <!-- 🛠️ Gestión de Servicios - Planes y servicios ofrecidos -->
        <ServiciosTab v-if="activeTab === 'servicios'" key="servicios-tab" />
        
        <!-- 💰 Gestión de Pagos - VISTA MÁS CRÍTICA del sistema -->
        <PagosTab v-if="activeTab === 'pagos'" key="pagos-tab" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// ===== 📦 IMPORTACIÓN DE COMPONENTES ADMINISTRATIVOS =====
// Cada componente maneja una sección específica del panel admin
import AdminHeader from './components/AdminHeader.vue';           // Header con título y descripción
import AdminNavigation from './components/AdminNavigation.vue';   // Navegación por pestañas
import ClientesTab from './components/ClientesTab.vue';           // Gestión de clientes
import AdministradoresTab from './components/AdministradoresTab.vue'; // Gestión de admins
import ServiciosTab from './components/ServiciosTab.vue';         // Gestión de servicios
import PagosTab from './components/PagosTab.vue';               // Gestión de pagos (MÁS IMPORTANTE)

// ===== 🎛️ ESTADO REACTIVO LOCAL =====
const activeTab = ref('clientes'); // Pestaña activa por defecto
</script>

<style>
/* ===== 🎨 IMPORTACIÓN DE ESTILOS ADMINISTRATIVOS =====*/
/* Estilos específicos para vistas de administración */
@import '../../../assets/estiloadmin.css';
</style>
```

### 5. src/views/privadas/administradores/components/PagosTab.vue - CENTRO FINANCIERO
```vue
<template>
  <!-- ===== 💰 VISTA PRINCIPAL DE GESTIÓN DE PAGOS - CENTRO DE CONTROL FINANCIERO ===== -->
  <!-- Esta es la vista MÁS IMPORTANTE para administradores - aquí se controla TODO el dinero -->
  <div class="pagos-tab">
    <div class="pagos-layout">
      
      <!-- ===== 🏢 SIDEBAR DE EMPRESAS - NAVEGACIÓN LATERAL INTELIGENTE ===== -->
      <!-- Panel que muestra TODAS las empresas y permite filtrar pagos por empresa -->
      <div class="empresas-sidebar">
        <div class="sidebar-header">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="mb-0">
              <i class="bi bi-building me-2"></i>
              Empresas Registradas
            </h5>
            <!-- 📊 Contador dinámico de empresas -->
            <span class="badge bg-light text-dark">{{ empresas.length }}</span>
          </div>
        </div>
        
        <!-- 🔍 Buscador de empresas - Filtrado en TIEMPO REAL -->
        <div class="search-container mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar empresa o cliente..."
              v-model="searchEmpresa"
            >
          </div>
        </div>

        <!-- 📋 Lista de empresas con información CLAVE -->
        <div class="empresas-list">
          <EmpresaItem
            v-for="empresa in empresasFiltradas"
            :key="empresa.id"
            :empresa="empresa"
            :is-selected="selectedEmpresa?.id === empresa.id"
            :payments-count="getPaymentsCount(empresa.id)"
            :total-amount="getTotalAmount(empresa.id)"
            :show-actions="true"
            @select="selectEmpresa"
            @edit="editEmpresa"
            @delete="deleteEmpresa"
            @view-payments="viewEmpresaPayments"
          />
        </div>
      </div>

      <!-- ===== 💳 CONTENIDO PRINCIPAL - TABLA DE PAGOS MAESTRA ===== -->
      <div class="pagos-content">
        <!-- 🎯 Header con información contextual -->
        <div class="content-header">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h4 class="mb-1">
                <i class="bi bi-clock-history me-2"></i>
                Historial de Pagos
                <!-- 🏢 Mostrar empresa seleccionada si existe -->
                <span v-if="selectedEmpresa" class="text-light opacity-75">- {{ selectedEmpresa.name }}</span>
              </h4>
              <small class="text-light opacity-75">{{ pagosFiltrados.length }} registro(s) encontrado(s)</small>
            </div>
            <!-- ➕ Botón para crear nuevo pago -->
            <BotonPrimario
              variant="outline-light"
              icon="bi bi-plus-circle"
              @click="showCreateModal = true"
            >
              Crear Nuevo Pago
            </BotonPrimario>
          </div>
        </div>

        <!-- ===== 🔍 FILTROS DE BÚSQUEDA AVANZADA ===== -->
        <div class="filters-section mb-4">
          <div class="row g-3">
            <!-- 📊 Filtro por estado del pago -->
            <div class="col-md-3">
              <select class="form-select" v-model="filterStatus">
                <option value="">Todos los estados</option>
                <option value="Pagado">✅ Pagado</option>
                <option value="Pendiente">⏳ Pendiente</option>
                <option value="Abono">💰 Abono</option>
                <option value="Liquidado">🎯 Liquidado</option>
              </select>
            </div>
            <!-- 📅 Filtro por fecha específica -->
            <div class="col-md-3">
              <input type="date" class="form-control" v-model="filterDate">
            </div>
            <!-- 🔍 Búsqueda de texto libre -->
            <div class="col-md-6">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Buscar por usuario, ID de transacción o servicio..."
                v-model="searchTerm"
              >
            </div>
          </div>
        </div>

        <!-- ===== 📊 TABLA DE PAGOS - CORAZÓN DEL SISTEMA ===== -->
        <div class="payments-table-container">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>👤 Usuario</th>
                <th>📦 Plan/Servicio</th>
                <th>💰 Monto</th>
                <th>📊 Estado</th>
                <th>📅 Fecha</th>
                <th>🔢 ID Compra</th>
                <th>📝 Notas</th>
                <th>⚙️ Acciones</th>
              </tr>
            </thead>
            <tbody>
              <!-- 🔄 Componente reutilizable para cada fila de pago -->
              <FilaPago
                v-for="pago in pagosFiltrados"
                :key="pago.id"
                :pago="pago"
                :show-delete="true"
                @liquidar="handleLiquidar"
                @abonar="handleAbonar"
                @view="viewPago"
                @edit="editPago"
                @delete="deletePago"
              />
              <!-- 📭 Estado vacío cuando no hay pagos -->
              <tr v-if="pagosFiltrados.length === 0">
                <td colspan="8" class="text-center py-4 text-muted">
                  <div class="empty-state">
                    <i class="bi bi-inbox fs-1 mb-2"></i>
                    <p class="mb-0">No se encontraron pagos con los filtros aplicados</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ===== 🎭 MODALES - INTERFACES DE INTERACCIÓN ===== -->
    
    <!-- ➕ Modal Sidebar para crear nuevo pago -->
    <CreatePaymentSidebar
      :show="showCreateModal"
      :selected-company="selectedEmpresa"
      :companies="empresas"
      :planes="planes"
      :servicios="servicios"
      @close="showCreateModal = false"
      @save="createPago"
    />

    <!-- 👁️ Modal para ver detalles completos del pago -->
    <PaymentDetailModal
      v-if="showDetailModal"
      :show="showDetailModal"
      :payment="selectedPago"
      :companies="empresas"
      @close="showDetailModal = false"
      @edit="editPago"
    />

    <!-- ✏️ Modal para editar pago existente -->
    <PaymentEditModal
      v-if="showEditModal"
      :show="showEditModal"
      :payment="editingPago"
      :companies="empresas"
      :planes="planes"
      :servicios="servicios"
      @close="showEditModal = false"
      @save="updatePago"
    />

    <!-- 🏢 Modal para editar información de empresa -->
    <CompanyEditModal
      v-if="showCompanyEditModal"
      :show="showCompanyEditModal"
      :company="editingCompany"
      @close="showCompanyEditModal = false"
      @save="updateCompany"
    />

    <!-- 💰 Modal para acciones de pago (liquidar/abonar) -->
    <PaymentActionModal
      v-if="showActionModal"
      :show="showActionModal"
      :payment="actionPayment"
      :action="currentAction"
      @close="showActionModal = false"
      @confirm="handlePaymentAction"
    />
  </div>
</template>

<script setup>
// ===== 📦 IMPORTACIONES CRÍTICAS =====
import { ref, computed } from 'vue'
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'
import EmpresaItem from '../../../../components/ui/EmpresaItem.vue'
import FilaPago from '../../../../components/ui/FilaPago.vue'
import CreatePaymentSidebar from '../../../../components/modals/CreatePaymentSidebar.vue'
import PaymentDetailModal from '../../../../components/modals/PaymentDetailModal.vue'
import PaymentEditModal from '../../../../components/modals/PaymentEditModal.vue'
import CompanyEditModal from '../../../../components/modals/CompanyEditModal.vue'
import PaymentActionModal from '../../../../components/modals/PaymentActionModal.vue'
import { useAlert } from '../../../../composables/useAlert'

const { showSuccess, showError, showConfirm } = useAlert()

// ===== 🎛️ ESTADO REACTIVO - CONTROL TOTAL DE LA INTERFAZ =====
// Variables para controlar filtros y búsquedas
const searchEmpresa = ref('')
const searchTerm = ref('')
const filterStatus = ref('')
const filterDate = ref('')
const selectedEmpresa = ref(null)

// Variables para controlar modales
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const showEditModal = ref(false)
const showCompanyEditModal = ref(false)
const showActionModal = ref(false)

// Variables para datos temporales
const selectedPago = ref(null)
const editingPago = ref(null)
const editingCompany = ref(null)
const actionPayment = ref(null)
const currentAction = ref('')

// ===== 🏢 DATOS DE EMPRESAS - BASE DE CLIENTES =====
// En una aplicación REAL, estos datos vendrían de una API
const empresas = ref([
  {
    id: 1,
    name: 'Electrocopy',
    client: 'Juan Pérez',
    email: 'juan@electrocopy.com',
    phone: '123-456-7890',
    address: 'Av. Principal 123, Ciudad',
    industry: 'Tecnología',
    notes: 'Cliente premium con múltiples servicios'
  },
  {
    id: 2,
    name: 'DAI',
    client: 'María García',
    email: 'maria@dai.com',
    phone: '098-765-4321',
    address: 'Calle Comercio 456, Ciudad',
    industry: 'Servicios',
    notes: 'Empresa de despacho aduanal'
  },
  {
    id: 3,
    name: 'Bufin del Norte',
    client: 'Carlos López',
    email: 'carlos@bufin.com',
    phone: '555-123-4567',
    address: 'Zona Industrial 789, Ciudad',
    industry: 'Consultoría',
    notes: 'Consultora especializada en comercio exterior'
  }
])

// ===== 📦 DATOS DE PLANES Y SERVICIOS - CATÁLOGO DE PRODUCTOS =====
const planes = ref([
  { id: 1, nombre: 'Plan Huevo', precio: 15000 },
  { id: 2, nombre: 'Plan Ajolote', precio: 25000 },
  { id: 3, nombre: 'Plan Alebrije', precio: 0 } // Personalizado
])

const servicios = ref([
  { id: 1, nombre: 'Desarrollo de E-commerce', precio: 8000 },
  { id: 2, nombre: 'Email Marketing', precio: 5000 },
  { id: 3, nombre: 'Marketing Digital', precio: 8000 },
  { id: 4, nombre: 'Diseño UI/UX', precio: 8000 },
  { id: 5, nombre: 'Automatización', precio: 8000 }
])

// ===== 💰 DATOS DE PAGOS - REGISTRO FINANCIERO COMPLETO =====
const pagos = ref([
  {
    id: 1,
    userName: 'Juan Pérez',
    companyId: 1,
    planName: 'Plan Ajolote',
    amount: 25000,
    status: 'Pagado',
    date: '2024-01-15',
    purchaseId: 'TXN123456789',
    notes: 'Pago realizado mediante transferencia bancaria. Cliente solicita factura.',
    services: ['Plan Ajolote']
  },
  {
    id: 2,
    userName: 'Ana López',
    companyId: 1,
    planName: 'Marketing Digital + Email Marketing',
    amount: 13000,
    status: 'Pendiente',
    date: '2024-01-19',
    purchaseId: 'TXN987654321',
    notes: 'Servicios múltiples contratados',
    services: ['Marketing Digital', 'Email Marketing']
  },
  {
    id: 3,
    userName: 'María García',
    companyId: 2,
    planName: 'Desarrollo de E-commerce',
    amount: 8000,
    status: 'Abono',
    date: '2024-01-20',
    purchaseId: 'TXN456789123',
    notes: 'Primer abono recibido',
    services: ['Desarrollo de E-commerce']
  }
])

// ===== 🧮 COMPUTED PROPERTIES - LÓGICA REACTIVA INTELIGENTE =====
// Filtrar empresas según búsqueda en TIEMPO REAL
const empresasFiltradas = computed(() => {
  if (!searchEmpresa.value) return empresas.value
  return empresas.value.filter(empresa => 
    empresa.name.toLowerCase().includes(searchEmpresa.value.toLowerCase()) ||
    empresa.client.toLowerCase().includes(searchEmpresa.value.toLowerCase())
  )
})

// Filtrar pagos según MÚLTIPLES criterios simultáneos
const pagosFiltrados = computed(() => {
  let filtered = pagos.value

  // 🏢 Filtrar por empresa seleccionada
  if (selectedEmpresa.value) {
    filtered = filtered.filter(pago => pago.companyId === selectedEmpresa.value.id)
  }

  // 🔍 Filtrar por término de búsqueda
  if (searchTerm.value) {
    filtered = filtered.filter(pago => 
      pago.userName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.purchaseId.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.planName.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  // 📊 Filtrar por estado
  if (filterStatus.value) {
    filtered = filtered.filter(pago => pago.status === filterStatus.value)
  }

  // 📅 Filtrar por fecha
  if (filterDate.value) {
    filtered = filtered.filter(pago => pago.date === filterDate.value)
  }

  return filtered
})

// ===== 🏢 MÉTODOS PARA GESTIÓN DE EMPRESAS =====
const selectEmpresa = (empresa) => {
  selectedEmpresa.value = empresa
  console.log(`🏢 Empresa seleccionada: ${empresa.name}`)
}

const editEmpresa = (empresa) => {
  editingCompany.value = empresa
  showCompanyEditModal.value = true
  console.log(`✏️ Editando empresa: ${empresa.name}`)
}

const deleteEmpresa = async (empresa) => {
  // 🚨 Mostrar confirmación CRÍTICA antes de eliminar
  const confirmed = await showConfirm(
    'Eliminar Empresa',
    `¿Estás ABSOLUTAMENTE SEGURO de que deseas eliminar la empresa "${empresa.name}"? Esta acción es IRREVERSIBLE y eliminará TODOS los datos asociados.`
  )
  
  if (confirmed) {
    const index = empresas.value.findIndex(e => e.id === empresa.id)
    if (index > -1) {
      empresas.value.splice(index, 1)
      // Limpiar selección si era la empresa eliminada
      if (selectedEmpresa.value?.id === empresa.id) {
        selectedEmpresa.value = null
      }
      showSuccess('Empresa eliminada', `La empresa "${empresa.name}" ha sido eliminada exitosamente`)
      console.log(`🗑️ Empresa eliminada: ${empresa.name}`)
    }
  }
}

// ===== 💰 MÉTODOS PARA GESTIÓN DE PAGOS =====
// Contar pagos por empresa - ESTADÍSTICA IMPORTANTE
const getPaymentsCount = (companyId) => {
  const count = pagos.value.filter(pago => pago.companyId === companyId).length
  return count
}

// Calcular total de dinero por empresa - MÉTRICA FINANCIERA CLAVE
const getTotalAmount = (companyId) => {
  const total = pagos.value
    .filter(pago => pago.companyId === companyId)
    .reduce((total, pago) => total + pago.amount, 0)
  return total
}

// ===== 💸 ACCIONES DE PAGO CRÍTICAS =====
const handleLiquidar = (pago) => {
  actionPayment.value = pago
  currentAction.value = 'liquidar'
  showActionModal.value = true
  console.log(`💰 Iniciando liquidación de: ${pago.purchaseId}`)
}

const handleAbonar = (pago) => {
  actionPayment.value = pago
  currentAction.value = 'abonar'
  showActionModal.value = true
  console.log(`💵 Iniciando abono para: ${pago.purchaseId}`)
}

const handlePaymentAction = (actionData) => {
  const { action, payment, notes, abonoAmount } = actionData
  const index = pagos.value.findIndex(p => p.id === payment.id)
  
  if (index > -1) {
    if (action === 'liquidar') {
      pagos.value[index].status = 'Liquidado'
      pagos.value[index].notes = notes || 'Pago liquidado completamente'
      showSuccess('Pago liquidado', `El pago de $${payment.amount.toLocaleString()} ha sido marcado como liquidado`)
      console.log(`✅ Pago liquidado: ${payment.purchaseId}`)
    } else if (action === 'abonar') {
      pagos.value[index].status = 'Abono'
      pagos.value[index].notes = notes || `Abono registrado: $${abonoAmount.toLocaleString()}`
      showSuccess('Abono registrado', `Se ha registrado un abono de $${abonoAmount.toLocaleString()}`)
      console.log(`💵 Abono registrado: $${abonoAmount.toLocaleString()} para ${payment.purchaseId}`)
    }
  }
  
  // Limpiar estado del modal
  showActionModal.value = false
  actionPayment.value = null
  currentAction.value = ''
}

const createPago = (pagoData) => {
  const newPago = {
    ...pagoData,
    id: Date.now() // Generar ID único temporal
  }
  pagos.value.push(newPago)
  showCreateModal.value = false
  showSuccess('Pago creado', `Nuevo pago de $${pagoData.amount.toLocaleString()} registrado exitosamente`)
  console.log(`➕ Nuevo pago creado: ${newPago.purchaseId}`)
}
</script>

<!-- ===== 🎨 ESTILOS ESPECÍFICOS DEL COMPONENTE ===== -->
<style scoped>
/* 🏗️ Layout principal con sidebar y contenido */
.pagos-tab {
  height: calc(100vh - 200px); /* Altura dinámica que se adapta */
}

.pagos-layout {
  display: flex;
  height: 100%;
  gap: 1rem;
}

/* 🏢 Sidebar de empresas - Panel lateral inteligente */
.empresas-sidebar {
  width: 350px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-left: 4px solid var(--primary-coral); /* Borde distintivo */
}

.sidebar-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

/* 💳 Contenido principal - Área de trabajo */
.pagos-content {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 4px solid var(--primary-coral); /* Borde distintivo */
}

.content-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

/* 📊 Estilos de tabla mejorados */
.table thead th {
  background: #f8f9fa;
  color: var(--primary-blue);
  border: none;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  position: sticky; /* Header fijo al hacer scroll */
  top: 0;
  z-index: 10;
}

/* ===== 📱 RESPONSIVE DESIGN INTELIGENTE ===== */
@media (max-width: 1200px) {
  .pagos-layout {
    flex-direction: column; /* Stack vertical en pantallas medianas */
    height: auto;
  }
  
  .empresas-sidebar {
    width: 100%;
    height: 300px;
  }
}
</style>
```

### 6. src/views/publicas/contactanos/components/ContactForm.vue - FORMULARIO SIN BASE DE DATOS
```vue
<template>
  <!-- ===== 📞 FORMULARIO DE CONTACTO INTELIGENTE - SIN BASE DE DATOS ===== -->
  <!-- INNOVACIÓN CLAVE: Envía directamente a WhatsApp sin backend -->
  <div class="card shadow-sm p-4 animate__animated animate__fadeInUp">
    <h3 class="text-center mb-4">Solicita una cotización para tu negocio</h3>
    
    <form @submit.prevent="submitForm">
      <!-- ===== 👤 DATOS PERSONALES - INFORMACIÓN BÁSICA DEL CLIENTE ===== -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input 
            type="text" 
            class="form-control" 
            id="nombre" 
            v-model="formData.nombre"
            :class="{'is-invalid': errors.nombre}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.nombre">
            {{ errors.nombre }}
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <label for="apellido" class="form-label">Apellido</label>
          <input 
            type="text" 
            class="form-control" 
            id="apellido" 
            v-model="formData.apellido"
            :class="{'is-invalid': errors.apellido}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.apellido">
            {{ errors.apellido }}
          </div>
        </div>
      </div>
      
      <!-- ===== 📧 INFORMACIÓN DE CONTACTO - DATOS CRÍTICOS ===== -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            v-model="formData.email"
            :class="{'is-invalid': errors.email}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input 
            type="tel" 
            class="form-control" 
            id="telefono" 
            v-model="formData.telefono"
            :class="{'is-invalid': errors.telefono}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.telefono">
            {{ errors.telefono }}
          </div>
        </div>
      </div>
      
      <!-- ===== 📋 ASUNTO Y MENSAJE - CONTENIDO DE LA SOLICITUD ===== -->
      <div class="mb-3">
        <label for="asunto" class="form-label">Asunto</label>
        <select 
          class="form-select" 
          id="asunto" 
          v-model="formData.asunto"
          :class="{'is-invalid': errors.asunto}"
          style="background-color: #fce7d2;"
          required
        >
          <option value="" disabled selected>Seleccione un asunto</option>
          <option value="cotizacion">Solicitar Cotización</option>
          <option value="informacion">Información General</option>
          <option value="soporte">Soporte Técnico</option>
          <option value="otro">Otro</option>
        </select>
        <div class="invalid-feedback" v-if="errors.asunto">
          {{ errors.asunto }}
        </div>
      </div>
      
      <div class="mb-4">
        <label for="mensaje" class="form-label">Mensaje</label>
        <textarea 
          class="form-control" 
          id="mensaje" 
          rows="5" 
          v-model="formData.mensaje"
          :class="{'is-invalid': errors.mensaje}"
          style="background-color: #fce7d2;"
          required
        ></textarea>
        <div class="invalid-feedback" v-if="errors.mensaje">
          {{ errors.mensaje }}
        </div>
      </div>
      
      <!-- ===== 🚀 BOTÓN DE ENVÍO - ACCIÓN PRINCIPAL ===== -->
      <div class="text-center">
        <BotonPrimario
          type="submit"
          variant="primary"
          size="lg"
          icon="bi bi-send"
          :loading="isSubmitting"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
        </BotonPrimario>
      </div>
      
      <!-- ===== ✅ CONFIRMACIÓN DE ENVÍO - FEEDBACK AL USUARIO ===== -->
      <div v-if="formSubmitted" class="alert alert-success mt-4 animate__animated animate__fadeIn">
        ¡Gracias por contactarnos! Te responderemos a la brevedad.
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

const emit = defineEmits(['submit'])

// ===== 📊 ESTADO REACTIVO DEL FORMULARIO =====
const formData = reactive({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
})

const errors = reactive({})
const isSubmitting = ref(false)
const formSubmitted = ref(false)

// ===== 🔍 VALIDACIÓN COMPLETA DEL FORMULARIO =====
// Valida TODOS los campos antes de enviar
const validateForm = () => {
  let valid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  // Validar nombre
  if (!formData.nombre) {
    errors.nombre = 'El nombre es requerido'
    valid = false
  }

  // Validar apellido
  if (!formData.apellido) {
    errors.apellido = 'El apellido es requerido'
    valid = false
  }

  // Validar email con REGEX
  if (!formData.email) {
    errors.email = 'El correo electrónico es requerido'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'El correo electrónico no es válido'
    valid = false
  }

  // Validar teléfono
  if (!formData.telefono) {
    errors.telefono = 'El teléfono es requerido'
    valid = false
  }

  // Validar asunto
  if (!formData.asunto) {
    errors.asunto = 'Por favor seleccione un asunto'
    valid = false
  }

  // Validar mensaje
  if (!formData.mensaje) {
    errors.mensaje = 'El mensaje es requerido'
    valid = false
  }

  return valid
}

// ===== 📤 ENVÍO DEL FORMULARIO - PROCESAMIENTO PRINCIPAL =====
// CLAVE: No usa base de datos, envía directamente a WhatsApp
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simular procesamiento (en la vida real sería instantáneo)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 📡 Emitir datos al componente padre para envío a WhatsApp
    emit('submit', { ...formData })
    
    // 🔄 Resetear formulario después del envío exitoso
    Object.assign(formData, {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    })
    
    formSubmitted.value = true
    
    // ⏰ Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      formSubmitted.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* ===== 🎨 ESTILOS DEL FORMULARIO ===== */
.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.card {
  border: none;
  border-radius: 20px;
}
</style>
```

### 7. src/components/Navbar.vue - NAVEGACIÓN PRINCIPAL
```vue
<template>
<!-- ===== 🧭 NAVEGACIÓN PRINCIPAL - CENTRO DE CONTROL DE ACCESO ===== -->
<!-- Este componente es CRÍTICO: controla toda la navegación y autenticación -->
<div>
  <nav class="navbar navbar-expand-lg navbar-light py-3">
    <div class="container">
      <!-- ===== 🏷️ BRAND/LOGO - IDENTIDAD VISUAL ===== -->
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img
          src="https://i.pinimg.com/736x/88/4a/8e/884a8ed8ebfa49841a40ab82b1b70965.jpg"
          alt="AxoWeb Logo"
          class="logo rounded-logo me-2"
        />
        <span class="fw-bold">AxoWeb Digital</span>
      </router-link>

      <!-- ===== 📱 BOTÓN HAMBURGUESA - RESPONSIVE MOBILE ===== -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- ===== 🗺️ MENÚ DE NAVEGACIÓN PRINCIPAL ===== -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <!-- 🏠 Enlace al inicio -->
          <li class="nav-item">
            <router-link to="/" class="nav-link" :class="{ 'fw-bold': isActive('/') }">
              Inicio
            </router-link>
          </li>
          
          <!-- ===== 🛠️ DROPDOWN DE SERVICIOS - NAVEGACIÓN INTELIGENTE ===== -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Servicios
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/servicios" class="dropdown-item">
                  <i class="bi bi-grid-3x3-gap me-2"></i>Todos los Servicios
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <!-- Enlaces directos a servicios específicos -->
              <li>
                <router-link to="/servicios/ecommerce" class="dropdown-item">
                  <i class="bi bi-cart me-2"></i>E-commerce
                </router-link>
              </li>
              <li>
                <router-link to="/servicios/desarrollo-web" class="dropdown-item">
                  <i class="bi bi-laptop me-2"></i>Desarrollo Web
                </router-link>
              </li>
              <li>
                <router-link to="/servicios/diseno-ui-ux" class="dropdown-item">
                  <i class="bi bi-palette me-2"></i>Diseño UI/UX
                </router-link>
              </li>
              <li>
                <router-link to="/servicios/email-marketing" class="dropdown-item">
                  <i class="bi bi-envelope me-2"></i>Email Marketing
                </router-link>
              </li>
              <li>
                <router-link to="/servicios/automatizacion" class="dropdown-item">
                  <i class="bi bi-robot me-2"></i>Automatización
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link to="/servicios/marketing-digital" class="dropdown-item">
                  <i class="bi bi-megaphone me-2"></i>Marketing Digital
                </router-link>
              </li>
            </ul>
          </li>

          <!-- 🏢 Enlaces institucionales -->
          <li class="nav-item">
            <router-link to="/sobre-nosotros" class="nav-link" :class="{ 'fw-bold': isActive('/sobre-nosotros') }">
              Sobre Nosotros
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contactanos" class="nav-link" :class="{ 'fw-bold': isActive('/contactanos') }">
              Contáctanos
            </router-link>
          </li>
          
          <!-- ===== 🔐 SISTEMA DE AUTENTICACIÓN INTEGRADO ===== -->
          <li class="nav-item ms-lg-3">
            <!-- 🚪 Botón de login si NO está autenticado -->
            <button 
              v-if="!authStore.isAuthenticated" 
              class="btn btn-outline-primary rounded-pill px-4" 
              @click="showModal = true"
            >
              <i class="bi bi-person-circle me-2"></i>
              <span>Mi Cuenta</span>
            </button>
            
            <!-- ===== 👤 DROPDOWN DE USUARIO LOGUEADO ===== -->
            <div v-else class="dropdown">
              <button 
                class="btn btn-primary rounded-pill px-4 dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                <i class="bi bi-person-check me-2"></i>
                {{ authStore.user.name }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <!-- 👤 Acceso para clientes -->
                <li v-if="authStore.isClient">
                  <router-link to="/cliente" class="dropdown-item">
                    <i class="bi bi-person me-2"></i>Mi Cuenta
                  </router-link>
                </li>
                <!-- 👑 Acceso para administradores -->
                <li v-if="authStore.isAdmin">
                  <router-link to="/admin" class="dropdown-item">
                    <i class="bi bi-shield me-2"></i>Panel Admin
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <!-- 🚪 Cerrar sesión -->
                <li>
                  <button class="dropdown-item text-danger" @click="logout">
                    <i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- ===== 🎭 MODAL DE LOGIN/REGISTRO INTEGRADO ===== -->
  <!-- Modal que aparece cuando el usuario hace click en "Mi Cuenta" -->
  <div class="modal fade animate__animated animate__fadeIn" tabindex="-1" :class="{ show: showModal }" style="display: block;" v-if="showModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body pt-0">
          <!-- ===== 🎨 HEADER DEL MODAL CON LOGO ===== -->
          <div class="text-center mb-4">
            <img
              src="https://i.pinimg.com/736x/88/4a/8e/884a8ed8ebfa49841a40ab82b1b70965.jpg"
              alt="AxoWeb Logo"
              class="modal-logo mb-3"
            />
            <h5 class="modal-title fw-bold">{{ isLogin ? 'Bienvenido de vuelta' : 'Únete a nosotros' }}</h5>
            <p class="text-muted">{{ isLogin ? 'Inicia sesión para continuar' : 'Crea tu cuenta en segundos' }}</p>
          </div>
          
          <!-- ===== 🌐 BOTÓN DE GOOGLE - OPCIÓN ALTERNATIVA ===== -->
          <button class="btn btn-google w-100 mb-4 position-relative">
            <i class="bi bi-google position-absolute start-4"></i>
            Continuar con Google
          </button>

          <div class="divider-text mb-4">o</div>

          <!-- ===== 📝 FORMULARIO DE LOGIN/REGISTRO ===== -->
          <form @submit.prevent="handleLogin">
            <!-- Campo de nombre (solo para registro) -->
            <div v-if="!isLogin" class="form-floating mb-3">
              <input type="text" class="form-control" id="name" placeholder="Nombre completo">
              <label for="name">Nombre completo</label>
            </div>

            <!-- ===== 📧 EMAIL - CAMPO CRÍTICO ===== -->
            <div class="form-floating mb-3">
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                placeholder="nombre@ejemplo.com"
                v-model="loginForm.email"
                required
              >
              <label for="email">Correo electrónico</label>
            </div>

            <!-- ===== 🔒 PASSWORD - SEGURIDAD ===== -->
            <div class="form-floating mb-3">
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                placeholder="Contraseña"
                v-model="loginForm.password"
                required
              >
              <label for="password">Contraseña</label>
            </div>

            <!-- Confirmación de contraseña (solo para registro) -->
            <div v-if="!isLogin" class="form-floating mb-3">
              <input type="password" class="form-control" id="confirmPassword" placeholder="Confirmar contraseña">
              <label for="confirmPassword">Confirmar contraseña</label>
            </div>

            <!-- Términos y condiciones (solo para registro) -->
            <div v-if="!isLogin" class="form-check mb-4">
              <input class="form-check-input" type="checkbox" id="terms">
              <label class="form-check-label small" for="terms">
                Acepto los <a href="#" class="text-decoration-none">términos y condiciones</a>
              </label>
            </div>

            <!-- ===== ❌ MENSAJE DE ERROR ===== -->
            <div v-if="loginError" class="alert alert-danger">
              {{ loginError }}
            </div>

            <!-- ===== 🚀 BOTÓN DE ENVÍO ===== -->
            <button type="submit" class="btn btn-primary w-100 py-2 mb-3">
              {{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
            </button>

            <!-- ===== 🔄 TOGGLE ENTRE LOGIN Y REGISTRO ===== -->
            <p class="text-center mb-0">
              {{ isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?' }}
              <a href="#" @click.prevent="toggleForm" class="text-decoration-none">
                {{ isLogin ? 'Regístrate' : 'Inicia sesión' }}
              </a>
            </p>

            <!-- ===== 🧪 CREDENCIALES DE PRUEBA - PARA DESARROLLO ===== -->
            <div class="mt-4 p-3 bg-light rounded">
              <h6 class="mb-2">Credenciales de prueba:</h6>
              <small class="d-block mb-1"><strong>Cliente:</strong> cliente@gmail.com / cisco</small>
              <small class="d-block"><strong>Admin:</strong> admin@gmail.com / CISCO</small>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// ===== 🎛️ ESTADO REACTIVO LOCAL =====
const showModal = ref(false)
const isLogin = ref(true)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref({
  email: '',
  password: ''
})

const loginError = ref('')

// ===== 🔍 FUNCIÓN PARA DETECTAR RUTA ACTIVA ===== 
const isActive = (path) => route.path === path

// ===== 🚪 CERRAR MODAL Y LIMPIAR DATOS =====
const closeModal = () => {
  showModal.value = false
  loginError.value = ''
  loginForm.value = { email: '', password: '' }
}

// ===== 🔄 ALTERNAR ENTRE LOGIN Y REGISTRO =====
const toggleForm = () => {
  isLogin.value = !isLogin.value
  loginError.value = ''
}

// ===== 🔐 MANEJO DEL LOGIN - FUNCIÓN CRÍTICA =====
const handleLogin = () => {
  loginError.value = ''
  
  // 🎯 Intentar login usando el store de autenticación
  const result = authStore.login(loginForm.value.email, loginForm.value.password)
  
  if (result.success) {
    closeModal()
    // 🎯 Redirección inteligente según el rol del usuario
    if (result.user.role === 'admin') {
      router.push('/admin')      // Administradores van al panel admin
    } else if (result.user.role === 'client') {
      router.push('/cliente')    // Clientes van a su área personal
    }
  } else {
    loginError.value = result.message
  }
}

// ===== 🚪 LOGOUT - CERRAR SESIÓN SEGURA =====
const logout = () => {
  authStore.logout()
  router.push('/') // Redirigir al inicio después del logout
}
</script>

<style scoped>
/* ===== 🎨 ESTILOS DE LA NAVEGACIÓN ===== */
.navbar {
  background-color: var(--primary-beige);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo {
  height: 40px;
  width: 40px;
}

.rounded-logo {
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
}

.nav-link {
  color: var(--primary-blue);
  margin: 0 10px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-coral);
}

/* ===== 🎭 ESTILOS DEL MODAL ===== */
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 5px;
}

/* ===== 🎨 DROPDOWN MEJORADO ===== */
.dropdown-menu {
  border: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 0.5rem 0;
  min-width: 250px;
}

.dropdown-item {
  padding: 12px 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.dropdown-item:hover {
  background-color: var(--primary-beige);
  color: var(--primary-coral);
  transform: translateX(5px);
}

.dropdown-item i {
  width: 20px;
  color: var(--primary-coral);
}
</style>
```

## 🔥 CÓDIGOS CORTOS - FRAGMENTOS REPRESENTATIVOS

### 8. components/PlanesSection.vue + PlanCard.vue - SISTEMA DE PLANES
```vue
<!-- PlanesSection.vue - CONTENEDOR DE PLANES -->
<template>
  <section class="planes-section">
    <div class="container">
      <!-- 🎯 Header de la sección -->
      <SectionHeader
        title="Nuestros Planes"
        subtitle="Soluciones completas diseñadas para cada etapa de tu negocio"
        icon="bi bi-box-seam"
        color="coral"
        size="xl"
      />
      
      <!-- 📦 Grid responsivo de planes -->
      <div class="planes-grid">
        <div 
          v-for="(plan, index) in planes" 
          :key="plan.id"
          class="plan-card-wrapper animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <!-- 🎴 Componente reutilizable para cada plan -->
          <PlanCard 
            :plan="plan"
            @solicitar="$emit('solicitar', plan)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<!-- PlanCard.vue - TARJETA INDIVIDUAL DE PLAN -->
<template>
  <div class="plan-card" :class="{ 'popular': plan.popular }">
    <!-- 🏆 Badge de "Más Popular" -->
    <div class="plan-badge" v-if="plan.popular">
      <span>Más Popular</span>
    </div>
    
    <!-- 📋 Header del plan con imagen y precio -->
    <div class="plan-header">
      <div class="plan-image" v-if="plan.img">
        <img :src="plan.img" :alt="plan.nombre" class="img-fluid">
      </div>
      <h3 class="plan-title">{{ plan.nombre }}</h3>
      <div class="plan-price">
        <span class="price-amount">{{ plan.precio }}</span>
      </div>
    </div>
    
    <!-- ✅ Lista de características incluidas -->
    <div class="plan-features">
      <h4 class="features-title">Incluye:</h4>
      <ul class="features-list">
        <li v-for="detalle in plan.detalles" :key="detalle" class="feature-item">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ detalle }}</span>
        </li>
      </ul>
    </div>
    
    <!-- 🚀 Botón de acción principal -->
    <div class="plan-footer">
      <BotonPrimario
        :variant="plan.popular ? 'primary' : 'outline-primary'"
        icon="bi bi-rocket-takeoff"
        block
        @click="$emit('solicitar')"
      >
        {{ plan.precio === 'Cotización' ? 'Solicitar Cotización' : 'Comenzar Ahora' }}
      </BotonPrimario>
    </div>
  </div>
</template>
```

### 9. ui/TablaPagos.vue + ui/FilaPago.vue + ui/PaymentStatusBadge.vue - SISTEMA DE TABLAS
```vue
<!-- TablaPagos.vue - CONTENEDOR DE TABLA REUTILIZABLE -->
<template>
  <div class="tabla-pagos">
    <!-- 📊 Header opcional con título y acciones -->
    <div class="table-header mb-3" v-if="showHeader">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">
            <i class="bi bi-clock-history me-2"></i>
            {{ title }}
          </h5>
          <small class="text-muted">{{ pagos.length }} registro(s)</small>
        </div>
        <div class="table-actions">
          <BotonPrimario
            v-if="showCreateButton"
            variant="primary"
            icon="bi bi-plus-circle"
            @click="handleCreate"
          >
            Crear Nuevo Pago
          </BotonPrimario>
        </div>
      </div>
    </div>

    <!-- 📋 Tabla responsiva con datos -->
    <div class="table-container">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Usuario</th>
              <th>Plan/Servicio</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>ID Compra</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- 🔄 Componente reutilizable para cada fila -->
            <FilaPago
              v-for="pago in pagos"
              :key="pago.id"
              :pago="pago"
              :show-delete="showDeleteButton"
              @view="handleView"
              @edit="handleEdit"
              @delete="handleDelete"
            />
            <!-- 📭 Estado vacío -->
            <tr v-if="pagos.length === 0">
              <td colspan="8" class="text-center py-4 text-muted">
                <div class="empty-state">
                  <i class="bi bi-inbox fs-1 mb-2"></i>
                  <p class="mb-0">{{ emptyMessage }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<!-- FilaPago.vue - FILA INDIVIDUAL DE PAGO -->
<template>
  <tr class="fila-pago" :class="{ 'highlight': isHighlighted }">
    <!-- 👤 Información del usuario -->
    <td>
      <div class="user-info">
        <i class="bi bi-person-circle me-2 text-coral"></i>
        <span>{{ pago.userName || 'N/A' }}</span>
      </div>
    </td>
    <!-- 📦 Información del plan/servicio -->
    <td>
      <div class="plan-info">
        <i class="bi bi-box me-2 text-coral"></i>
        <div>
          <div class="fw-bold">{{ pago.planName }}</div>
          <small class="text-muted" v-if="pago.services && pago.services.length > 1">
            +{{ pago.services.length - 1 }} servicios más
          </small>
        </div>
      </div>
    </td>
    <!-- 💰 Monto del pago -->
    <td>
      <span class="fw-bold text-success">${{ pago.amount.toLocaleString() }}</span>
    </td>
    <!-- 📊 Estado con badge colorizado -->
    <td>
      <PaymentStatusBadge :status="pago.status" />
    </td>
    <!-- 📅 Fecha formateada -->
    <td>{{ formatDate(pago.date) }}</td>
    <!-- 🔢 ID de transacción -->
    <td>
      <code class="text-muted">{{ pago.purchaseId }}</code>
    </td>
    <!-- 📝 Notas truncadas -->
    <td>
      <div class="notes-cell">
        <span v-if="pago.notes" class="text-muted" :title="pago.notes">
          {{ truncateText(pago.notes, 30) }}
        </span>
        <span v-else class="text-muted">-</span>
      </div>
    </td>
    <!-- ⚙️ Botones de acción -->
    <td>
      <PaymentActionButtons
        :payment="pago"
        :show-liquidar="showLiquidar"
        :show-abonar="showAbonar"
        :show-view="showView"
        :show-edit="showEdit"
        :show-delete="showDelete"
        @liquidar="handleLiquidar"
        @abonar="handleAbonar"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </td>
  </tr>
</template>

<!-- PaymentStatusBadge.vue - BADGE DE ESTADO -->
<template>
  <span :class="badgeClasses" class="payment-status-badge">
    <i :class="statusIcon" class="me-1"></i>
    {{ status }}
  </span>
</template>

<script setup>
// ===== 🎨 LÓGICA PARA COLORES Y ICONOS SEGÚN ESTADO =====
const badgeClasses = computed(() => {
  const baseClasses = ['badge', 'rounded-pill', 'd-inline-flex', 'align-items-center']
  
  // 🎨 Colores según el estado del pago
  switch (props.status) {
    case 'Pagado':
    case 'Liquidado':
      baseClasses.push('bg-success')    // ✅ Verde para pagos completos
      break
    case 'Pendiente':
      baseClasses.push('bg-danger')     // ❌ Rojo para pagos pendientes
      break
    case 'Abono':
      baseClasses.push('bg-warning', 'text-dark') // ⚠️ Amarillo para abonos
      break
    default:
      baseClasses.push('bg-secondary') // ⚫ Gris para estados desconocidos
  }
  
  return baseClasses.join(' ')
})

// ===== 🎭 ICONOS SEGÚN ESTADO =====
const statusIcon = computed(() => {
  switch (props.status) {
    case 'Pagado':
    case 'Liquidado':
      return 'bi bi-check-circle-fill'      // ✅ Check para completados
    case 'Pendiente':
      return 'bi bi-clock-fill'             // ⏰ Reloj para pendientes
    case 'Abono':
      return 'bi bi-cash-coin'              // 💰 Moneda para abonos
    default:
      return 'bi bi-question-circle-fill'   // ❓ Pregunta para desconocidos
  }
})
</script>
```

### 10. modals/CreatePaymentSidebar.vue + ui/ServiceSelector.vue - CREACIÓN DE PAGOS
```vue
<!-- CreatePaymentSidebar.vue - SIDEBAR PARA CREAR PAGOS -->
<template>
  <div>
    <!-- ===== 📱 SIDEBAR DESLIZANTE - INTERFAZ PRINCIPAL ===== -->
    <div class="payment-sidebar" :class="{ 'active': show }">
      <div class="sidebar-content">
        <!-- 🎯 Header del sidebar -->
        <div class="sidebar-header">
          <h5 class="mb-0">
            <i class="bi bi-plus-circle me-2"></i>
            Crear Nuevo Pago
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>

        <div class="sidebar-body">
          <!-- ===== 👤 INFORMACIÓN DEL USUARIO ===== -->
          <div class="info-section mb-4">
            <h6 class="section-title">
              <i class="bi bi-person me-2"></i>
              Información del Usuario
            </h6>
            <div class="info-card">
              <div class="mb-3">
                <label class="form-label">Nombre del Usuario</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="paymentForm.userName" 
                  placeholder="Nombre del usuario"
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Fecha de contratación</label>
                <input 
                  type="date" 
                  class="form-control" 
                  v-model="paymentForm.contractDate"
                >
              </div>
            </div>
          </div>

          <!-- ===== 🏢 INFORMACIÓN DE LA EMPRESA ===== -->
          <div class="info-section mb-4">
            <h6 class="section-title">
              <i class="bi bi-building me-2"></i>
              Información de la Empresa
            </h6>
            <div class="info-card">
              <div class="mb-3">
                <label class="form-label">Nombre de la empresa</label>
                <select class="form-select" v-model="paymentForm.companyId" @change="updateCompanyInfo">
                  <option value="">Seleccionar empresa</option>
                  <option 
                    v-for="company in companies" 
                    :key="company.id" 
                    :value="company.id"
                  >
                    {{ company.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- ===== 📦 SELECCIÓN DE SERVICIOS - CORAZÓN DEL SISTEMA ===== -->
          <div class="info-section mb-4">
            <h6 class="section-title">
              <i class="bi bi-box me-2"></i>
              Plan / Servicio
            </h6>
            <div class="service-card">
              <!-- 🎛️ Toggle entre Predefinido y Personalizado -->
              <div class="mb-3">
                <label class="form-label">Tipo de Servicio</label>
                <div class="btn-group w-100" role="group">
                  <input 
                    type="radio" 
                    class="btn-check" 
                    name="serviceType" 
                    id="predefined" 
                    value="predefined" 
                    v-model="serviceType"
                  >
                  <label class="btn btn-outline-primary" for="predefined">
                    <i class="bi bi-list-ul me-1"></i>
                    Predefinido
                  </label>
                  
                  <input 
                    type="radio" 
                    class="btn-check" 
                    name="serviceType" 
                    id="custom" 
                    value="custom" 
                    v-model="serviceType"
                  >
                  <label class="btn btn-outline-primary" for="custom">
                    <i class="bi bi-gear me-1"></i>
                    Personalizado
                  </label>
                </div>
              </div>

              <!-- ===== 📋 SERVICIOS PREDEFINIDOS ===== -->
              <div v-if="serviceType === 'predefined'" class="mb-3">
                <label class="form-label">Plan o Servicio</label>
                <select 
                  class="form-select" 
                  v-model="paymentForm.planService" 
                  @change="updatePredefinedPrice"
                >
                  <option value="">Seleccionar plan o servicio</option>
                  <optgroup label="Planes">
                    <option 
                      v-for="plan in planes" 
                      :key="'plan-' + plan.id" 
                      :value="{ type: 'plan', ...plan }"
                    >
                      {{ plan.nombre }} - ${{ plan.precio.toLocaleString() }}
                    </option>
                  </optgroup>
                  <optgroup label="Servicios">
                    <option 
                      v-for="servicio in servicios" 
                      :key="'service-' + servicio.id" 
                      :value="{ type: 'service', ...servicio }"
                    >
                      {{ servicio.nombre }} - ${{ servicio.precio.toLocaleString() }}
                    </option>
                  </optgroup>
                </select>
              </div>

              <!-- ===== 🎨 SERVICIOS PERSONALIZADOS - GRID VISUAL ===== -->
              <div v-if="serviceType === 'custom'" class="mb-3">
                <label class="form-label">Servicios Personalizados</label>
                <div class="custom-services-container">
                  <!-- 🎯 Grid de servicios seleccionables -->
                  <div class="services-grid">
                    <div 
                      v-for="service in availableServices" 
                      :key="service.id"
                      class="service-option"
                      :class="{ 'selected': selectedServices.includes(service.id) }"
                      @click="toggleService(service.id)"
                    >
                      <!-- ✅ Checkbox visual -->
                      <div class="service-checkbox">
                        <i class="bi bi-check" v-if="selectedServices.includes(service.id)"></i>
                      </div>
                      <div class="service-details">
                        <div class="service-name">{{ service.name }}</div>
                        <div class="service-price">${{ service.price.toLocaleString() }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 📊 Resumen de servicios seleccionados -->
                  <div v-if="selectedServices.length > 0" class="selected-summary mt-3">
                    <h6 class="mb-2">Servicios Seleccionados:</h6>
                    <div class="selected-list">
                      <div 
                        v-for="serviceId in selectedServices" 
                        :key="serviceId"
                        class="selected-item"
                      >
                        <span>{{ getServiceById(serviceId).name }}</span>
                        <span class="price">${{ getServiceById(serviceId).price.toLocaleString() }}</span>
                        <button 
                          type="button" 
                          class="btn-remove"
                          @click="toggleService(serviceId)"
                        >
                          <i class="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                    <!-- 💰 Total calculado automáticamente -->
                    <div class="total-price">
                      <strong>Total: ${{ calculateTotal().toLocaleString() }} MXN</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 💳 ASIGNAR PAGO - SECCIÓN FINANCIERA ===== -->
          <div class="info-section mb-4">
            <h6 class="section-title">
              <i class="bi bi-currency-dollar me-2"></i>
              Asignar Pago
            </h6>
            <div class="payment-card">
              <!-- 💰 Monto total (readonly, se calcula automáticamente) -->
              <div class="mb-3">
                <label class="form-label">Monto Total</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="paymentForm.totalAmount"
                    placeholder="0.00"
                    readonly
                  >
                  <span class="input-group-text">MXN</span>
                </div>
              </div>
              
              <!-- 💵 Monto abonado (editable) -->
              <div class="mb-3">
                <label class="form-label">Abonado</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="paymentForm.paidAmount"
                    placeholder="0.00"
                    @input="updatePaymentStatus"
                  >
                  <span class="input-group-text">MXN</span>
                </div>
              </div>

              <!-- ===== 🎯 BOTONES DE LIQUIDAR Y ABONAR ===== -->
              <!-- Estos botones cambian el estado visual y calculan automáticamente -->
              <div class="payment-buttons mt-4">
                <div class="row g-2">
                  <div class="col-6">
                    <button 
                      type="button" 
                      class="btn btn-success w-100"
                      @click="setPaymentType('Completo')"
                      :class="{ 'active': paymentForm.paymentType === 'Completo' }"
                    >
                      <i class="bi bi-check-circle me-1"></i>
                      Liquidar
                    </button>
                  </div>
                  <div class="col-6">
                    <button 
                      type="button" 
                      class="btn btn-warning w-100"
                      @click="setPaymentType('Abono')"
                      :class="{ 'active': paymentForm.paymentType === 'Abono' }"
                    >
                      <i class="bi bi-cash me-1"></i>
                      Abono
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== 🚀 FOOTER CON ACCIONES PRINCIPALES ===== -->
        <div class="sidebar-footer">
          <button class="btn btn-outline-secondary me-2" @click="$emit('close')">
            <i class="bi bi-x-circle me-1"></i>
            Cancelar
          </button>
          <button class="btn btn-primary" @click="createPayment">
            <i class="bi bi-plus-circle me-2"></i>
            Crear Pago
          </button>
        </div>
      </div>
    </div>

    <!-- ===== 🌫️ OVERLAY - FONDO DIFUMINADO ===== -->
    <div class="sidebar-overlay" :class="{ 'active': show }" @click="$emit('close')"></div>
  </div>
</template>
```

### 11. components/system/CustomAlert.vue + components/system/ConfirmDialog.vue - SISTEMA DE NOTIFICACIONES
```vue
<!-- CustomAlert.vue - SISTEMA DE ALERTAS GLOBALES -->
<template>
  <!-- ===== 🚨 CONTENEDOR DE ALERTAS - POSICIÓN FIJA ===== -->
  <div class="alert-container">
    <!-- 🔄 Transición animada para múltiples alertas -->
    <transition-group name="alert" tag="div">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="getAlertClass(alert.type)"
        class="custom-alert animate__animated animate__fadeInRight"
      >
        <!-- 📋 Contenido de la alerta -->
        <div class="alert-content">
          <!-- 🎨 Icono según el tipo -->
          <div class="alert-icon">
            <i :class="getAlertIcon(alert.type)"></i>
          </div>
          <!-- 📝 Texto de la alerta -->
          <div class="alert-text">
            <div class="alert-title">{{ alert.title }}</div>
            <div class="alert-message">{{ alert.message }}</div>
          </div>
          <!-- ❌ Botón para cerrar -->
          <button class="alert-close" @click="removeAlert(alert.id)">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <!-- ⏱️ Barra de progreso para auto-dismiss -->
        <div class="alert-progress" :style="{ animationDuration: alert.duration + 'ms' }"></div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ===== 📊 ESTADO DE ALERTAS =====
const alerts = ref([])
let alertId = 0

// ===== ➕ AGREGAR NUEVA ALERTA =====
const addAlert = (type, title, message, duration = 4000) => {
  const id = ++alertId
  const alert = {
    id,
    type,
    title,
    message,
    duration
  }
  
  alerts.value.push(alert)
  
  // ⏰ Auto-remover después del tiempo especificado
  setTimeout(() => {
    removeAlert(id)
  }, duration)
}

// ===== 🗑️ REMOVER ALERTA =====
const removeAlert = (id) => {
  const index = alerts.value.findIndex(alert => alert.id === id)
  if (index > -1) {
    alerts.value.splice(index, 1)
  }
}

// ===== 🎨 CLASES CSS SEGÚN TIPO =====
const getAlertClass = (type) => {
  const baseClass = 'alert-item'
  switch (type) {
    case 'success':
      return `${baseClass} alert-success`    // ✅ Verde para éxito
    case 'error':
      return `${baseClass} alert-error`      // ❌ Rojo para errores
    case 'warning':
      return `${baseClass} alert-warning`    // ⚠️ Amarillo para advertencias
    case 'info':
      return `${baseClass} alert-info`       // ℹ️ Azul para información
    default:
      return baseClass
  }
}

// ===== 🎭 ICONOS SEGÚN TIPO =====
const getAlertIcon = (type) => {
  switch (type) {
    case 'success':
      return 'bi bi-check-circle-fill'       // ✅ Check para éxito
    case 'error':
      return 'bi bi-x-circle-fill'           // ❌ X para errores
    case 'warning':
      return 'bi bi-exclamation-triangle-fill' // ⚠️ Triángulo para advertencias
    case 'info':
      return 'bi bi-info-circle-fill'        // ℹ️ Info para información
    default:
      return 'bi bi-bell-fill'               // 🔔 Campana por defecto
  }
}

// ===== 🌍 ESCUCHADORES GLOBALES DE EVENTOS =====
onMounted(() => {
  // 📡 Escuchar eventos personalizados desde cualquier parte de la app
  window.addEventListener('show-alert', (event) => {
    const { type, title, message, duration } = event.detail
    addAlert(type, title, message, duration)
  })
})

onUnmounted(() => {
  // 🧹 Limpiar listeners al destruir el componente
  window.removeEventListener('show-alert', () => {})
})
</script>

<!-- ConfirmDialog.vue - MODAL DE CONFIRMACIÓN ELEGANTE -->
<template>
  <!-- ===== 🤔 OVERLAY DE CONFIRMACIÓN ===== -->
  <div class="confirm-overlay" v-if="show" @click="handleCancel">
    <div class="confirm-dialog animate__animated animate__zoomIn" @click.stop>
      <!-- 🎯 Header con icono y título -->
      <div class="confirm-header">
        <div class="confirm-icon">
          <i class="bi bi-question-circle-fill"></i>
        </div>
        <h4 class="confirm-title">{{ title }}</h4>
      </div>
      
      <!-- 📝 Cuerpo con mensaje -->
      <div class="confirm-body">
        <p class="confirm-message">{{ message }}</p>
      </div>
      
      <!-- ⚙️ Footer con botones de acción -->
      <div class="confirm-footer">
        <button class="btn btn-outline-secondary me-2" @click="handleCancel">
          <i class="bi bi-x-circle me-1"></i>
          Cancelar
        </button>
        <button class="btn btn-primary" @click="handleConfirm">
          <i class="bi bi-check-circle me-1"></i>
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ===== 🎛️ ESTADO DEL MODAL =====
const show = ref(false)
const title = ref('')
const message = ref('')
let onConfirm = null
let onCancel = null

// ===== ✅ MANEJAR CONFIRMACIÓN =====
const handleConfirm = () => {
  show.value = false
  if (onConfirm) onConfirm()
}

// ===== ❌ MANEJAR CANCELACIÓN =====
const handleCancel = () => {
  show.value = false
  if (onCancel) onCancel()
}

// ===== 📡 MOSTRAR CONFIRMACIÓN DESDE EVENTO GLOBAL =====
const showConfirm = (data) => {
  title.value = data.title
  message.value = data.message
  onConfirm = data.onConfirm
  onCancel = data.onCancel
  show.value = true
}

// ===== 🌍 LISTENER GLOBAL PARA CONFIRMACIONES =====
onMounted(() => {
  window.addEventListener('show-confirm', (event) => {
    showConfirm(event.detail)
  })
})

onUnmounted(() => {
  window.removeEventListener('show-confirm', () => {})
})
</script>
```

## 🎯 **FUNCIONAMIENTO DE FORMULARIOS SIN BASE DE DATOS**

### **📱 INTEGRACIÓN CON WHATSAPP:**
```javascript
// ===== 📞 FUNCIÓN PARA CREAR MENSAJE DE WHATSAPP ===== 
// Esta función toma los datos del formulario y crea un mensaje estructurado
const crearMensajeContacto = (data) => {
  let mensaje = `📞 *Nuevo Contacto desde la Web* 📞\n\n`
  mensaje += `👤 *Datos del Cliente:*\n`
  mensaje += `• Nombre: ${data.nombre} ${data.apellido}\n`
  mensaje += `• Email: ${data.email}\n`
  mensaje += `• Teléfono: ${data.telefono}\n`
  mensaje += `• Asunto: ${data.asunto}\n\n`
  mensaje += `💬 *Mensaje:*\n${data.mensaje}\n\n`
  mensaje += `📅 *Fecha:* ${new Date().toLocaleDateString('es-MX')}`
  
  return mensaje
}

// ===== 🚀 FUNCIÓN PARA ENVIAR A WHATSAPP =====
// Abre WhatsApp con el mensaje precompuesto
const enviarWhatsApp = (mensaje) => {
  const numeroWhatsApp = '528714742958'
  const mensajeCodificado = encodeURIComponent(mensaje)
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`
  
  window.open(url, '_blank') // Abre en nueva pestaña
}
```

## 📸 **CAPTURAS REQUERIDAS PARA EVIDENCIAS:**

### **🏠 1. Portada (Inicio)**
- Hero section con logo de AxoWeb
- Servicios en formato horizontal
- Sección "CREEMOS TU NEGOCIO DIGITAL"
- Galería de proyectos con empresas clientes

### **📦 2. Grid de Planes**
- Tres planes: Huevo, Ajolote, Alebrije
- Badge "Más Popular" en Plan Ajolote
- Precios y características listadas
- Botones de "Solicitar Plan"

### **📞 3. Contacto abriendo WhatsApp**
- Formulario de contacto completo
- Validaciones en tiempo real
- Botón "Enviar Mensaje" activo
- Ventana de WhatsApp abriéndose con mensaje precompuesto

### **👤 4. Panel Cliente (tabs)**
- Header con nombre del cliente
- Navegación por pestañas (Inicio/Servicios)
- Formulario editable de datos personales
- Tabla de servicios contratados con estados

### **👑 5. Panel Admin (tabs)**
- Header de administración con icono de escudo
- 4 pestañas: Clientes, Administradores, Servicios, Pagos
- Cada pestaña con su contenido específico
- Botones de acciones administrativas

### **💰 6. Pagos: layout dual y modal de crear pago**
- Sidebar izquierdo con lista de empresas
- Tabla principal de pagos con filtros
- Modal sidebar deslizante para crear pago
- Servicios predefinidos vs personalizados

### **🚨 7. Toast de alerta y confirm dialog**
- Alertas flotantes en esquina superior derecha
- Diferentes tipos: éxito, error, advertencia, info
- Modal de confirmación elegante
- Animaciones de entrada y salida

### **🚫 8. 404 y PaymentSuccess**
- Página 404 con logo expresivo y elementos flotantes
- Página de pago exitoso con animación de confeti
- Enlaces útiles y botones de navegación
- Diseño consistente con la identidad visual

---

## 🎯 **RESUMEN TÉCNICO PARA TESIS:**

### **🏗️ ARQUITECTURA:**
- **Frontend SPA** con Vue.js 3 + Composition API
- **Sin backend tradicional** - Formularios vía WhatsApp
- **Autenticación local** con roles (admin/cliente)
- **Componentes reutilizables** con props y eventos

### **🎨 DISEÑO:**
- **Bootstrap 5** para grid y componentes base
- **Variables CSS** para consistencia visual
- **Animate.css** para transiciones suaves
- **Responsive design** con 4 breakpoints

### **⚡ FUNCIONALIDADES:**
- **Gestión completa de pagos** (crear, editar, liquidar, abonar)
- **Sistema de alertas global** con eventos personalizados
- **Filtros avanzados** en tiempo real
- **Modales especializados** para cada acción

### **🚀 INNOVACIONES:**
- **Formularios sin BD** enviando a WhatsApp
- **Sidebar inteligente** con estadísticas en tiempo real
- **Componentes altamente reutilizables**
- **Sistema de estado reactivo** con Pinia

Esta documentación completa te proporciona **TODAS LAS EVIDENCIAS** necesarias para tu tesis, con código comentado profesionalmente y explicaciones técnicas detalladas.