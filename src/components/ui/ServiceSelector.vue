<template>
  <div class="service-selector">
    <div class="service-type-tabs mb-3">
      <button 
        type="button"
        class="btn"
        :class="serviceType === 'predefined' ? 'btn-primary' : 'btn-outline-primary'"
        @click="setServiceType('predefined')"
      >
        <i class="bi bi-list-ul me-2"></i>
        Predefinido
      </button>
      <button 
        type="button"
        class="btn ms-2"
        :class="serviceType === 'custom' ? 'btn-primary' : 'btn-outline-primary'"
        @click="setServiceType('custom')"
      >
        <i class="bi bi-gear me-2"></i>
        Personalizado
      </button>
    </div>

    <!-- Predefinido -->
    <div v-if="serviceType === 'predefined'">
      <div class="mb-3">
        <label class="form-label">Plan o Servicio</label>
        <select class="form-select" v-model="selectedService" @change="updatePrice">
          <option value="">Seleccionar plan o servicio</option>
          <optgroup label="Planes">
            <option 
              v-for="plan in planes" 
              :key="'plan-' + plan.id" 
              :value="{ type: 'plan', ...plan }"
            >
              {{ plan.nombre }} - ${{ plan.precio.toLocaleString() }}
            </option>
          </optgroup>
          <optgroup label="Servicios">
            <option 
              v-for="servicio in servicios" 
              :key="'service-' + servicio.id" 
              :value="{ type: 'service', ...servicio }"
            >
              {{ servicio.nombre }} - ${{ servicio.precio.toLocaleString() }}
            </option>
          </optgroup>
        </select>
      </div>
    </div>

    <!-- Personalizado -->
    <div v-if="serviceType === 'custom'">
      <div class="mb-3">
        <label class="form-label">Servicios Seleccionados</label>
        <div class="selected-services mb-2">
          <span 
            v-for="service in selectedServices" 
            :key="service.id + '-' + service.type"
            class="badge bg-primary me-2 mb-2 d-inline-flex align-items-center"
          >
            {{ service.nombre }} - ${{ service.precio.toLocaleString() }}
            <button 
              type="button" 
              class="btn-close btn-close-white ms-2" 
              @click="removeService(service)"
              style="font-size: 0.7em;"
            ></button>
          </span>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-primary btn-sm" 
          @click="showServiceModal = true"
        >
          <i class="bi bi-plus me-1"></i>
          Agregar Servicio
        </button>
      </div>
      
      <div class="total-display p-3 bg-light rounded">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold">Total:</span>
          <span class="fs-5 fw-bold text-primary">${{ totalAmount.toLocaleString() }} MXN</span>
        </div>
      </div>
    </div>

    <!-- Service Selection Modal -->
    <div class="modal fade" v-if="showServiceModal" style="display: block;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-plus-circle me-2"></i>
              Seleccionar Servicios
            </h5>
            <button type="button" class="btn-close" @click="showServiceModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-4">
              <h6 class="text-primary">
                <i class="bi bi-box-seam me-2"></i>
                Planes
              </h6>
              <div class="list-group">
                <button 
                  v-for="plan in planes" 
                  :key="'modal-plan-' + plan.id"
                  type="button" 
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  @click="addService({ type: 'plan', ...plan })"
                  :disabled="isServiceSelected({ type: 'plan', ...plan })"
                  :class="{ 'list-group-item-success': isServiceSelected({ type: 'plan', ...plan }) }"
                >
                  <div>
                    <div class="fw-bold">{{ plan.nombre }}</div>
                    <small class="text-muted">Plan completo</small>
                  </div>
                  <span class="badge bg-primary">${{ plan.precio.toLocaleString() }}</span>
                </button>
              </div>
            </div>
            
            <div>
              <h6 class="text-primary">
                <i class="bi bi-tools me-2"></i>
                Servicios Individuales
              </h6>
              <div class="list-group">
                <button 
                  v-for="servicio in servicios" 
                  :key="'modal-service-' + servicio.id"
                  type="button" 
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  @click="addService({ type: 'service', ...servicio })"
                  :disabled="isServiceSelected({ type: 'service', ...servicio })"
                  :class="{ 'list-group-item-success': isServiceSelected({ type: 'service', ...servicio }) }"
                >
                  <div>
                    <div class="fw-bold">{{ servicio.nombre }}</div>
                    <small class="text-muted">Servicio individual</small>
                  </div>
                  <span class="badge bg-primary">${{ servicio.precio.toLocaleString() }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="me-auto">
              <strong>Total seleccionado: ${{ totalAmount.toLocaleString() }} MXN</strong>
            </div>
            <button type="button" class="btn btn-secondary" @click="showServiceModal = false">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showServiceModal"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  planes: {
    type: Array,
    default: () => []
  },
  servicios: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Object,
    default: () => ({
      type: 'predefined',
      selectedService: null,
      selectedServices: [],
      totalAmount: 0
    })
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const serviceType = ref(props.modelValue.type || 'predefined')
const selectedService = ref(props.modelValue.selectedService || null)
const selectedServices = ref(props.modelValue.selectedServices || [])
const showServiceModal = ref(false)

const totalAmount = computed(() => {
  if (serviceType.value === 'predefined' && selectedService.value) {
    return selectedService.value.precio || 0
  } else if (serviceType.value === 'custom') {
    return selectedServices.value.reduce((total, service) => total + (service.precio || 0), 0)
  }
  return 0
})

const setServiceType = (type) => {
  serviceType.value = type
  if (type === 'predefined') {
    selectedServices.value = []
  } else {
    selectedService.value = null
  }
  emitChange()
}

const updatePrice = () => {
  emitChange()
}

const addService = (service) => {
  if (!isServiceSelected(service)) {
    selectedServices.value.push(service)
    emitChange()
  }
  showServiceModal.value = false
}

const removeService = (service) => {
  const index = selectedServices.value.findIndex(s => 
    s.id === service.id && s.type === service.type
  )
  if (index > -1) {
    selectedServices.value.splice(index, 1)
    emitChange()
  }
}

const isServiceSelected = (service) => {
  return selectedServices.value.some(s => 
    s.id === service.id && s.type === service.type
  )
}

const emitChange = () => {
  const value = {
    type: serviceType.value,
    selectedService: selectedService.value,
    selectedServices: selectedServices.value,
    totalAmount: totalAmount.value,
    serviceName: getServiceName()
  }
  
  emit('update:modelValue', value)
  emit('change', value)
}

const getServiceName = () => {
  if (serviceType.value === 'predefined' && selectedService.value) {
    return selectedService.value.nombre
  } else if (serviceType.value === 'custom' && selectedServices.value.length > 0) {
    return selectedServices.value.map(s => s.nombre).join(' + ')
  }
  return ''
}

// Watch para cambios externos
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    serviceType.value = newValue.type || 'predefined'
    selectedService.value = newValue.selectedService || null
    selectedServices.value = newValue.selectedServices || []
  }
}, { deep: true })
</script>

<style scoped>
.service-type-tabs {
  display: flex;
  justify-content: center;
}

.selected-services {
  min-height: 50px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 0.75rem;
  background: #f8f9fa;
}

.selected-services:empty::before {
  content: "No hay servicios seleccionados";
  color: #6c757d;
  font-style: italic;
}

.total-display {
  border: 2px solid var(--primary-coral);
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
}

.list-group-item:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.list-group-item-success {
  background-color: #d1e7dd;
  border-color: #badbcc;
}

.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

@media (max-width: 768px) {
  .service-type-tabs {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .service-type-tabs .btn {
    width: 100%;
  }
}
</style>
</template>