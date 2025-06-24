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