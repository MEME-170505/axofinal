<template>
  <div class="confirm-overlay" v-if="show" @click="handleCancel">
    <div class="confirm-dialog animate__animated animate__zoomIn" @click.stop>
      <div class="confirm-header">
        <div class="confirm-icon">
          <i class="bi bi-question-circle-fill"></i>
        </div>
        <h4 class="confirm-title">{{ title }}</h4>
      </div>
      
      <div class="confirm-body">
        <p class="confirm-message">{{ message }}</p>
      </div>
      
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

const show = ref(false)
const title = ref('')
const message = ref('')
let onConfirm = null
let onCancel = null

const handleConfirm = () => {
  show.value = false
  if (onConfirm) onConfirm()
}

const handleCancel = () => {
  show.value = false
  if (onCancel) onCancel()
}

const showConfirm = (data) => {
  title.value = data.title
  message.value = data.message
  onConfirm = data.onConfirm
  onCancel = data.onCancel
  show.value = true
}

onMounted(() => {
  window.addEventListener('show-confirm', (event) => {
    showConfirm(event.detail)
  })
})

onUnmounted(() => {
  window.removeEventListener('show-confirm', () => {})
})
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.confirm-dialog {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 90%;
  overflow: hidden;
}

.confirm-header {
  text-align: center;
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

.confirm-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.75rem;
}

.confirm-title {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
}

.confirm-body {
  padding: 1.5rem 2rem;
  text-align: center;
}

.confirm-message {
  color: #666;
  margin: 0;
  line-height: 1.5;
  font-size: 1rem;
}

.confirm-footer {
  padding: 1rem 2rem 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn {
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 576px) {
  .confirm-dialog {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
  
  .confirm-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .confirm-body {
    padding: 1rem 1.5rem;
  }
  
  .confirm-footer {
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column;
  }
  
  .confirm-footer .btn {
    width: 100%;
    margin: 0.25rem 0;
  }
}
</style>