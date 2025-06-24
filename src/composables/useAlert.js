// ===== 🚨 COMPOSABLE PARA ALERTAS GLOBALES - SISTEMA DE COMUNICACIÓN UNIVERSAL =====
// Este sistema permite mostrar notificaciones en CUALQUIER parte de la aplicación
// Es el MENSAJERO que comunica éxitos, errores y advertencias al usuario

export function useAlert() {
  // ===== 🎯 FUNCIÓN PRINCIPAL PARA MOSTRAR ALERTAS =====
  // Esta función es el CORAZÓN del sistema de notificaciones
  const showAlert = (type, title, message, duration = 4000) => {
    console.log(`🚨 ALERTA ${type.toUpperCase()}: ${title} - ${message}`)
    
    // 📡 Crear evento personalizado para comunicarse con CustomAlert.vue
    const event = new CustomEvent('show-alert', {
      detail: { type, title, message, duration }
    })
    
    // 🌍 Disparar el evento GLOBALMENTE - llega a toda la aplicación
    window.dispatchEvent(event)
  }

  // ===== ✅ ALERTA DE ÉXITO - Para celebrar logros =====
  const showSuccess = (title, message = '') => {
    showAlert('success', title, message)
    console.log(`🎉 ÉXITO: ${title}`)
  }

  // ===== ❌ ALERTA DE ERROR - Para reportar problemas CRÍTICOS =====
  const showError = (title, message = '') => {
    showAlert('error', title, message)
    console.error(`💥 ERROR: ${title} - ${message}`)
  }

  // ===== ⚠️ ALERTA DE ADVERTENCIA - Para situaciones que requieren ATENCIÓN =====
  const showWarning = (title, message = '') => {
    showAlert('warning', title, message)
    console.warn(`⚠️ ADVERTENCIA: ${title}`)
  }

  // ===== ℹ️ ALERTA INFORMATIVA - Para comunicar información IMPORTANTE =====
  const showInfo = (title, message = '') => {
    showAlert('info', title, message)
    console.info(`ℹ️ INFO: ${title}`)
  }

  // ===== 🤔 DIÁLOGO DE CONFIRMACIÓN - Reemplaza el confirm() nativo =====
  // Muestra un modal ELEGANTE en lugar del feo confirm() del navegador
  const showConfirm = (title, message, onConfirm, onCancel) => {
    console.log(`🤔 CONFIRMACIÓN SOLICITADA: ${title}`)
    
    return new Promise((resolve) => {
      const confirmEvent = new CustomEvent('show-confirm', {
        detail: { 
          title, 
          message, 
          onConfirm: () => {
            console.log('✅ Usuario CONFIRMÓ la acción')
            if (onConfirm) onConfirm()
            resolve(true) // Resuelve con TRUE si confirma
          },
          onCancel: () => {
            console.log('❌ Usuario CANCELÓ la acción')
            if (onCancel) onCancel()
            resolve(false) // Resuelve con FALSE si cancela
          }
        }
      })
      window.dispatchEvent(confirmEvent)
    })
  }

  // ===== 📤 EXPORTAR FUNCIONES - API PÚBLICA DEL COMPOSABLE =====
  return {
    showSuccess,   // Para celebrar éxitos
    showError,     // Para reportar errores
    showWarning,   // Para advertencias
    showInfo,      // Para información
    showConfirm    // Para confirmaciones
  }
}

// 📝 EJEMPLOS DE USO:
// const { showSuccess, showError } = useAlert()
// showSuccess('¡Pago creado!', 'El pago se registró correctamente')
// showError('Error crítico', 'No se pudo conectar con el servidor')

// 🎯 VENTAJAS DE ESTE SISTEMA:
// ✅ Consistencia visual en TODA la aplicación
// ✅ Fácil de usar desde CUALQUIER componente
// ✅ Configuración centralizada
// ✅ Animaciones y estilos profesionales
// ✅ No depende de librerías externas