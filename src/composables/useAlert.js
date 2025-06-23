// Composable for using alerts throughout the application
export function useAlert() {
  const showAlert = (type, title, message, duration = 4000) => {
    const event = new CustomEvent('show-alert', {
      detail: { type, title, message, duration }
    })
    window.dispatchEvent(event)
  }

  const showSuccess = (title, message = '') => {
    showAlert('success', title, message)
  }

  const showError = (title, message = '') => {
    showAlert('error', title, message)
  }

  const showWarning = (title, message = '') => {
    showAlert('warning', title, message)
  }

  const showInfo = (title, message = '') => {
    showAlert('info', title, message)
  }

  // Confirmation dialog replacement
  const showConfirm = (title, message, onConfirm, onCancel) => {
    return new Promise((resolve) => {
      const confirmEvent = new CustomEvent('show-confirm', {
        detail: { 
          title, 
          message, 
          onConfirm: () => {
            if (onConfirm) onConfirm()
            resolve(true)
          },
          onCancel: () => {
            if (onCancel) onCancel()
            resolve(false)
          }
        }
      })
      window.dispatchEvent(confirmEvent)
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  }
}