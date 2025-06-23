// ===== STORE DE AUTENTICACIÓN =====
// Maneja el estado global de autenticación de usuarios

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // ===== ESTADO REACTIVO =====
  const user = ref(null) // Información del usuario actual

  // ===== COMPUTED PROPERTIES =====
  // Verificar si hay un usuario autenticado
  const isAuthenticated = computed(() => !!user.value)
  
  // Verificar si el usuario es administrador
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // Verificar si el usuario es cliente
  const isClient = computed(() => user.value?.role === 'client')

  // ===== FUNCIÓN DE LOGIN =====
  const login = (email, password) => {
    // CREDENCIALES DE PRUEBA - En producción esto se conectaría a una API
    
    // Cliente de prueba
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
    } 
    // Administrador de prueba
    else if (email === 'admin@gmail.com' && password === 'CISCO') {
      user.value = {
        id: 2,
        name: 'Administrador',
        email: 'admin@gmail.com',
        role: 'admin'
      }
      return { success: true, user: user.value }
    } 
    // Credenciales incorrectas
    else {
      return { success: false, message: 'Credenciales incorrectas' }
    }
  }

  // ===== FUNCIÓN DE LOGOUT =====
  const logout = () => {
    user.value = null // Limpiar datos del usuario
  }

  // ===== EXPORTAR FUNCIONES Y ESTADO =====
  return {
    user,
    isAuthenticated,
    isAdmin,
    isClient,
    login,
    logout
  }
})