<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            <i class="bi bi-envelope me-2"></i>
            Solicitar {{ type === 'plan' ? 'Plan' : 'Servicio' }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <!-- Item Info -->
          <div class="item-info mb-4">
            <div class="d-flex align-items-center gap-3">
              <div v-if="item?.img" class="item-image">
                <img :src="item.img" :alt="item.nombre || item.title" class="img-fluid rounded">
              </div>
              <div v-else-if="item?.icon" class="item-icon">
                <i :class="item.icon"></i>
              </div>
              <div>
                <h6 class="mb-1">{{ item?.nombre || item?.title }}</h6>
                <p class="text-muted mb-0">{{ item?.precio || item?.price }}</p>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <form @submit.prevent="handleSubmit">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre *</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  v-model="formData.nombre"
                  required
                >
              </div>
              <div class="col-md-6">
                <label for="apellido" class="form-label">Apellido *</label>
                <input
                  type="text"
                  class="form-control"
                  id="apellido"
                  v-model="formData.apellido"
                  required
                >
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">Correo Electrónico *</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="formData.email"
                  required
                >
              </div>
              <div class="col-md-6">
                <label for="telefono" class="form-label">Teléfono *</label>
                <input
                  type="tel"
                  class="form-control"
                  id="telefono"
                  v-model="formData.telefono"
                  required
                >
              </div>
              <div class="col-12">
                <label for="empresa" class="form-label">Empresa</label>
                <input
                  type="text"
                  class="form-control"
                  id="empresa"
                  v-model="formData.empresa"
                  placeholder="Nombre de tu empresa (opcional)"
                >
              </div>
              <div class="col-12">
                <label for="mensaje" class="form-label">Mensaje adicional</label>
                <textarea
                  class="form-control"
                  id="mensaje"
                  rows="3"
                  v-model="formData.mensaje"
                  placeholder="Cuéntanos más sobre tus necesidades..."
                ></textarea>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <BotonPrimario
                type="button"
                variant="outline-secondary"
                @click="$emit('close')"
              >
                Cancelar
              </BotonPrimario>
              <BotonPrimario
                type="submit"
                variant="primary"
                icon="bi bi-send"
                :loading="isSubmitting"
              >
                Enviar Solicitud
              </BotonPrimario>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BotonPrimario from '../ui/BotonPrimario.vue'

const props = defineProps({
  show: Boolean,
  item: Object,
  type: String
})

const emit = defineEmits(['close', 'submit'])

const isSubmitting = ref(false)
const formData = reactive({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  empresa: '',
  mensaje: ''
})

// Reset form when modal opens
watch(() => props.show, (newValue) => {
  if (newValue) {
    Object.assign(formData, {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      empresa: '',
      mensaje: ''
    })
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const solicitudData = {
      ...formData,
      itemId: props.item?.id,
      itemName: props.item?.nombre || props.item?.title,
      itemPrice: props.item?.precio || props.item?.price,
      type: props.type,
      fecha: new Date().toISOString()
    }
    
    emit('submit', solicitudData)
  } catch (error) {
    console.error('Error al enviar solicitud:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.item-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-coral);
}

.item-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.item-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-coral);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.form-control:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}
</style>