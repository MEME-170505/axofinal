<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light py-3">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img
          src="https://i.pinimg.com/736x/88/4a/8e/884a8ed8ebfa49841a40ab82b1b70965.jpg"
          alt="AxoWeb Logo"
          class="logo rounded-logo me-2"
        />
        <span class="fw-bold">AxoWeb Digital</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" :class="{ 'fw-bold': isActive('/') }">
              Inicio
            </router-link>
          </li>
          
          <!-- Dropdown de Servicios -->
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
          
          <!-- User Account Button -->
          <li class="nav-item ms-lg-3">
            <button 
              v-if="!authStore.isAuthenticated" 
              class="btn btn-outline-primary rounded-pill px-4" 
              @click="showModal = true"
            >
              <i class="bi bi-person-circle me-2"></i>
              <span>Mi Cuenta</span>
            </button>
            
            <!-- usuario logueado -->
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
                <li v-if="authStore.isClient">
                  <router-link to="/cliente" class="dropdown-item">
                    <i class="bi bi-person me-2"></i>Mi Cuenta
                  </router-link>
                </li>
                <li v-if="authStore.isAdmin">
                  <router-link to="/admin" class="dropdown-item">
                    <i class="bi bi-shield me-2"></i>Panel Admin
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
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

  <!-- Login/Register Modal -->
  <div class="modal fade animate__animated animate__fadeIn" tabindex="-1" :class="{ show: showModal }" style="display: block;" v-if="showModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body pt-0">
          <div class="text-center mb-4">
            <img
              src="https://i.pinimg.com/736x/88/4a/8e/884a8ed8ebfa49841a40ab82b1b70965.jpg"
              alt="AxoWeb Logo"
              class="modal-logo mb-3"
            />
            <h5 class="modal-title fw-bold">{{ isLogin ? 'Bienvenido de vuelta' : 'Únete a nosotros' }}</h5>
            <p class="text-muted">{{ isLogin ? 'Inicia sesión para continuar' : 'Crea tu cuenta en segundos' }}</p>
          </div>
          
          <button class="btn btn-google w-100 mb-4 position-relative">
            <i class="bi bi-google position-absolute start-4"></i>
            Continuar con Google
          </button>

          <div class="divider-text mb-4">o</div>

          <form @submit.prevent="handleLogin">
            <div v-if="!isLogin" class="form-floating mb-3">
              <input type="text" class="form-control" id="name" placeholder="Nombre completo">
              <label for="name">Nombre completo</label>
            </div>

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

            <div v-if="!isLogin" class="form-floating mb-3">
              <input type="password" class="form-control" id="confirmPassword" placeholder="Confirmar contraseña">
              <label for="confirmPassword">Confirmar contraseña</label>
            </div>

            <div v-if="!isLogin" class="form-check mb-4">
              <input class="form-check-input" type="checkbox" id="terms">
              <label class="form-check-label small" for="terms">
                Acepto los <a href="#" class="text-decoration-none">términos y condiciones</a>
              </label>
            </div>

            <div v-if="loginError" class="alert alert-danger">
              {{ loginError }}
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2 mb-3">
              {{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
            </button>

            <p class="text-center mb-0">
              {{ isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?' }}
              <a href="#" @click.prevent="toggleForm" class="text-decoration-none">
                {{ isLogin ? 'Regístrate' : 'Inicia sesión' }}
              </a>
            </p>

            <!-- Demo Credentials -->
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

const isActive = (path) => route.path === path

const closeModal = () => {
  showModal.value = false
  loginError.value = ''
  loginForm.value = { email: '', password: '' }
}

const toggleForm = () => {
  isLogin.value = !isLogin.value
  loginError.value = ''
}

const handleLogin = () => {
  loginError.value = ''
  
  const result = authStore.login(loginForm.value.email, loginForm.value.password)
  
  if (result.success) {
    closeModal()
    // Redirect based on user role
    if (result.user.role === 'admin') {
      router.push('/admin')
    } else if (result.user.role === 'client') {
      router.push('/cliente')
    }
  } else {
    loginError.value = result.message
  }
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
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

.btn-google {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
  height: 45px;
}

.btn-google:hover {
  background-color: #f8f9fa;
  border-color: #ddd;
  transform: translateY(-1px);
}

.start-4 {
  left: 1rem;
}

.divider-text {
  position: relative;
  text-align: center;
  color: #6c757d;
}

.divider-text::before,
.divider-text::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #dee2e6;
}

.divider-text::before {
  left: 0;
}

.divider-text::after {
  right: 0;
}

.form-floating > .form-control {
  border: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.form-floating > .form-control:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

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

.dropdown-divider {
  margin: 0.5rem 0;
  border-color: #e9ecef;
}

/* Animación del dropdown */
.dropdown-menu {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.dropdown:hover .dropdown-menu,
.dropdown-menu.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Responsive */
@media (max-width: 991px) {
  .dropdown-menu {
    position: static !important;
    transform: none !important;
    opacity: 1 !important;
    box-shadow: none;
    border: 1px solid #e9ecef;
    margin-top: 0.5rem;
  }
  
  .dropdown-item {
    padding: 10px 15px;
  }
  
  .dropdown-item:hover {
    transform: none;
  }
}
</style>