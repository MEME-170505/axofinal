<template>
  <div class="alert-container">
    <transition-group name="alert" tag="div">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="getAlertClass(alert.type)"
        class="custom-alert animate__animated animate__fadeInRight"
      >
        <div class="alert-content">
          <div class="alert-icon">
            <i :class="getAlertIcon(alert.type)"></i>
          </div>
          <div class="alert-text">
            <div class="alert-title">{{ alert.title }}</div>
            <div class="alert-message">{{ alert.message }}</div>
          </div>
          <button class="alert-close" @click="removeAlert(alert.id)">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="alert-progress" :style="{ animationDuration: alert.duration + 'ms' }"></div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const alerts = ref([])
let alertId = 0

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
  
  setTimeout(() => {
    removeAlert(id)
  }, duration)
}

const removeAlert = (id) => {
  const index = alerts.value.findIndex(alert => alert.id === id)
  if (index > -1) {
    alerts.value.splice(index, 1)
  }
}

const getAlertClass = (type) => {
  const baseClass = 'alert-item'
  switch (type) {
    case 'success':
      return `${baseClass} alert-success`
    case 'error':
      return `${baseClass} alert-error`
    case 'warning':
      return `${baseClass} alert-warning`
    case 'info':
      return `${baseClass} alert-info`
    default:
      return baseClass
  }
}

const getAlertIcon = (type) => {
  switch (type) {
    case 'success':
      return 'bi bi-check-circle-fill'
    case 'error':
      return 'bi bi-x-circle-fill'
    case 'warning':
      return 'bi bi-exclamation-triangle-fill'
    case 'info':
      return 'bi bi-info-circle-fill'
    default:
      return 'bi bi-bell-fill'
  }
}

// Expose methods globally
const showSuccess = (title, message) => addAlert('success', title, message)
const showError = (title, message) => addAlert('error', title, message)
const showWarning = (title, message) => addAlert('warning', title, message)
const showInfo = (title, message) => addAlert('info', title, message)

// Global event listeners
onMounted(() => {
  window.addEventListener('show-alert', (event) => {
    const { type, title, message, duration } = event.detail
    addAlert(type, title, message, duration)
  })
})

onUnmounted(() => {
  window.removeEventListener('show-alert', () => {})
})

// Expose methods to parent
defineExpose({
  showSuccess,
  showError,
  showWarning,
  showInfo
})
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
}

.custom-alert {
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  position: relative;
}

.alert-content {
  display: flex;
  align-items: flex-start;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  gap: 1rem;
}

.alert-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
}

.alert-text {
  flex: 1;
  min-width: 0;
}

.alert-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--primary-blue);
}

.alert-message {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
}

.alert-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #999;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.alert-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.alert-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  transform-origin: left;
  animation: progress linear forwards;
}

@keyframes progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Alert Type Styles */
.alert-success .alert-icon {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.alert-success .alert-progress {
  background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
}

.alert-error .alert-icon {
  background: linear-gradient(135deg, #dc3545 0%, #e74c3c 100%);
}

.alert-error .alert-progress {
  background: linear-gradient(90deg, #dc3545 0%, #e74c3c 100%);
}

.alert-warning .alert-icon {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
}

.alert-warning .alert-progress {
  background: linear-gradient(90deg, #ffc107 0%, #fd7e14 100%);
}

.alert-info .alert-icon {
  background: linear-gradient(135deg, #17a2b8 0%, #007bff 100%);
}

.alert-info .alert-progress {
  background: linear-gradient(90deg, #17a2b8 0%, #007bff 100%);
}

/* Animations */
.alert-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.alert-leave-active {
  transition: all 0.3s ease-in;
}

.alert-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.alert-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.alert-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .alert-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .alert-content {
    padding: 1rem;
  }
  
  .alert-icon {
    width: 35px;
    height: 35px;
    font-size: 1.1rem;
  }
  
  .alert-title {
    font-size: 0.9rem;
  }
  
  .alert-message {
    font-size: 0.8rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .alert-content {
    background: rgba(33, 37, 41, 0.95);
    color: white;
  }
  
  .alert-title {
    color: white;
  }
  
  .alert-message {
    color: #ccc;
  }
  
  .alert-close {
    color: #ccc;
  }
  
  .alert-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
}
</style>