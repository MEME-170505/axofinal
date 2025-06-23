// ===== COMPOSABLE PARA ALERTAS GLOBALES =====
// Sistema centralizado para mostrar notificaciones en toda la aplicación

export function useAlert() {
  // ===== FUNCIÓN PRINCIPAL PARA MOSTRAR ALERTAS =====
  const showAlert = (type, title, message, duration = 4000) => {
    // Crear evento personalizado para comunicarse con el componente CustomAlert
    const event = new CustomEvent('show-alert', {
      detail: { type, title, message, duration }
    })
    // Disparar el evento globalmente
    window.dispatchEvent(event)
  }

  // ===== FUNCIONES DE CONVENIENCIA =====
  // Alerta de éxito (verde)
  const showSuccess = (title, message = '') => {
    showAlert('success', title, message)
  }

  // Alerta de error (rojo)
  const showError = (title, message = '') => {
    showAlert('error', title, message)
  }

  // Alerta de advertencia (amarillo)
  const showWarning = (title, message = '') => {
    showAlert('warning', title, message)
  }

  // Alerta informativa (azul)
  const showInfo = (title, message = '') => {
    showAlert('info', title, message)
  }

  // ===== DIÁLOGO DE CONFIRMACIÓN =====
  // Reemplaza el confirm() nativo con un modal personalizado
  const showConfirm = (title, message, onConfirm, onCancel) => {
    return new Promise((resolve) => {
      const confirmEvent = new CustomEvent('show-confirm', {
        detail: { 
          title, 
          message, 
          onConfirm: () => {
            if (onConfirm) onConfirm()
            resolve(true) // Resuelve la promesa con true si confirma
          },
          onCancel: () => {
            if (onCancel) onCancel()
            resolve(false) // Resuelve la promesa con false si cancela
          }
        }
      })
      window.dispatchEvent(confirmEvent)
    })
  }

  // ===== EXPORTAR FUNCIONES =====
  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  }
}