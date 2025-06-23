import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isClient = computed(() => user.value?.role === 'client')

  const login = (email, password) => {
    // Credenciales de prueba
    if (email === 'cliente@gmail.com' && password === 'cisco') {
      user.value = {
        id: 1,
        name: 'Mario González',
        email: 'cliente@gmail.com',
        role: 'client',
        company: 'Empresa S.A. de C.V.',
        phone: '123-456-7890'
      }
      return { success: true, user: user.value }
    } else if (email === 'admin@gmail.com' && password === 'CISCO') {
      user.value = {
        id: 2,
        name: 'Administrador',
        email: 'admin@gmail.com',
        role: 'admin'
      }
      return { success: true, user: user.value }
    } else {
      return { success: false, message: 'Credenciales incorrectas' }
    }
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isClient,
    login,
    logout
  }
})