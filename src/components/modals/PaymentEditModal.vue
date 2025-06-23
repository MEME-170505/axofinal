<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold">
            <i class="bi bi-pencil-square me-2"></i>
            Editar Pago
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <!-- Información del Pago -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-info-circle me-2"></i>
                Información del Pago
              </h6>
              <div class="info-card">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">ID de Transacción</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      :value="editForm.purchaseId"
                      readonly
                      disabled
                    >
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Fecha de Pago</label>
                    <input 
                      type="date" 
                      class="form-control" 
                      v-model="editForm.date"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Información del Cliente -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-person-circle me-2"></i>
                Información del Cliente
              </h6>
              <div class="info-card">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Nombre del Usuario</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="editForm.userName"
                      placeholder="Nombre del usuario"
                    >
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Empresa</label>
                    <select class="form-select" v-model="editForm.companyId">
                      <option value="">Seleccionar empresa</option>
                      <option 
                        v-for="company in companies" 
                        :key="company.id" 
                        :value="company.id"
                      >
                        {{ company.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detalles del Servicio -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-box me-2"></i>
                Detalles del Servicio
              </h6>
              <div class="service-card">
                <div class="service-type-tabs mb-3">
                  <button 
                    type="button"
                    class="btn"
                    :class="serviceType === 'predefined' ? 'btn-primary' : 'btn-outline-primary'"
                    @click="serviceType = 'predefined'"
                  >
                    <i class="bi bi-list-ul me-2"></i>
                    Predefinido
                  </button>
                  <button 
                    type="button"
                    class="btn ms-2"
                    :class="serviceType === 'custom' ? 'btn-primary' : 'btn-outline-primary'"
                    @click="serviceType = 'custom'"
                  >
                    <i class="bi bi-gear me-2"></i>
                    Personalizado
                  </button>
                </div>

                <!-- Predefinido -->
                <div v-if="serviceType === 'predefined'">
                  <div class="mb-3">
                    <label class="form-label">Plan/Servicio</label>
                    <select class="form-select" v-model="editForm.selectedService" @change="updateServicePrice">
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
                        :key="service.id"
                        class="badge bg-primary me-2 mb-2"
                      >
                        {{ service.nombre }} - ${{ service.precio.toLocaleString() }}
                        <button 
                          type="button" 
                          class="btn-close btn-close-white ms-2" 
                          @click="removeService(service)"
                        ></button>
                      </span>
                    </div>
                    <button 
                      type="button" 
                      class="btn btn-outline-primary btn-sm" 
                      @click="showServiceSelector = true"
                    >
                      <i class="bi bi-plus me-1"></i>
                      Agregar Servicio
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Información de Pago -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-currency-dollar me-2"></i>
                Información de Pago
              </h6>
              <div class="payment-card">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Monto Total</label>
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input 
                        type="number" 
                        class="form-control" 
                        v-model="editForm.amount"
                        placeholder="0.00"
                        step="0.01"
                      >
                      <span class="input-group-text">MXN</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Estado del Pago</label>
                    <select class="form-select" v-model="editForm.status">
                      <option value="Pendiente">Pendiente</option>
                      <option value="Abono">Abono</option>
                      <option value="Pagado">Pagado</option>
                      <option value="Liquidado">Liquidado</option>
                    </select>
                  </div>
                </div>

                <!-- Indicador visual del estado -->
                <div class="status-indicator mt-3">
                  <div class="d-flex align-items-center justify-content-between">
                    <span>Estado actual:</span>
                    <span :class="getStatusBadgeClass(editForm.status)" class="badge fs-6 px-3 py-2">
                      {{ editForm.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notas Adicionales -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-chat-text me-2"></i>
                Notas Adicionales
              </h6>
              <div class="info-card">
                <textarea 
                  class="form-control" 
                  rows="3" 
                  v-model="editForm.notes"
                  placeholder="Agregar notas o comentarios sobre este pago..."
                ></textarea>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">
                <i class="bi bi-x-circle me-1"></i>
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-check-circle me-1"></i>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Service Selector Modal -->
    <div class="modal fade" v-if="showServiceSelector" style="display: block;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Seleccionar Servicios</h5>
            <button type="button" class="btn-close" @click="showServiceSelector = false"></button>
          </div>
          <div class="modal-body">
            <h6>Planes</h6>
            <div class="list-group mb-3">
              <button 
                v-for="plan in planes" 
                :key="'modal-plan-' + plan.id"
                type="button" 
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                @click="addService({ type: 'plan', ...plan })"
                :disabled="isServiceSelected({ type: 'plan', ...plan })"
              >
                <span>{{ plan.nombre }}</span>
                <span class="badge bg-primary">${{ plan.precio.toLocaleString() }}</span>
              </button>
            </div>
            
            <h6>Servicios</h6>
            <div class="list-group">
              <button 
                v-for="servicio in servicios" 
                :key="'modal-service-' + servicio.id"
                type="button" 
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                @click="addService({ type: 'service', ...servicio })"
                :disabled="isServiceSelected({ type: 'service', ...servicio })"
              >
                <span>{{ servicio.nombre }}</span>
                <span class="badge bg-primary">${{ servicio.precio.toLocaleString() }}</span>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showServiceSelector = false">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  payment: Object,
  companies: Array,
  planes: Array,
  servicios: Array
})

const emit = defineEmits(['close', 'save'])

const serviceType = ref('predefined')
const showServiceSelector = ref(false)
const selectedServices = ref([])

const editForm = ref({
  id: null,
  purchaseId: '',
  userName: '',
  companyId: null,
  selectedService: null,
  amount: 0,
  status: 'Pendiente',
  date: '',
  notes: ''
})

// Watch para cargar datos del pago cuando se abre el modal
watch(() => props.payment, (newPayment) => {
  if (newPayment) {
    editForm.value = {
      id: newPayment.id,
      purchaseId: newPayment.purchaseId,
      userName: newPayment.userName || '',
      companyId: newPayment.companyId,
      selectedService: null,
      amount: newPayment.amount,
      status: newPayment.status,
      date: newPayment.date,
      notes: newPayment.notes || ''
    }
    
    // Determinar si es servicio personalizado o predefinido
    if (newPayment.services && newPayment.services.length > 1) {
      serviceType.value = 'custom'
      selectedServices.value = newPayment.services.map(serviceName => {
        // Buscar en planes
        const plan = props.planes.find(p => p.nombre === serviceName)
        if (plan) return { type: 'plan', ...plan }
        
        // Buscar en servicios
        const service = props.servicios.find(s => s.nombre === serviceName)
        if (service) return { type: 'service', ...service }
        
        return null
      }).filter(Boolean)
    } else {
      serviceType.value = 'predefined'
      // Buscar el servicio/plan actual
      const serviceName = newPayment.planName
      const plan = props.planes.find(p => p.nombre === serviceName)
      if (plan) {
        editForm.value.selectedService = { type: 'plan', ...plan }
      } else {
        const service = props.servicios.find(s => s.nombre === serviceName)
        if (service) {
          editForm.value.selectedService = { type: 'service', ...service }
        }
      }
    }
  }
}, { immediate: true })

const updateServicePrice = () => {
  if (editForm.value.selectedService && editForm.value.selectedService.precio) {
    editForm.value.amount = editForm.value.selectedService.precio
  }
}

const addService = (service) => {
  if (!isServiceSelected(service)) {
    selectedServices.value.push(service)
    updateCustomTotal()
  }
  showServiceSelector.value = false
}

const removeService = (service) => {
  const index = selectedServices.value.findIndex(s => 
    s.id === service.id && s.type === service.type
  )
  if (index > -1) {
    selectedServices.value.splice(index, 1)
    updateCustomTotal()
  }
}

const isServiceSelected = (service) => {
  return selectedServices.value.some(s => 
    s.id === service.id && s.type === service.type
  )
}

const updateCustomTotal = () => {
  if (serviceType.value === 'custom') {
    editForm.value.amount = selectedServices.value.reduce((total, service) => 
      total + service.precio, 0
    )
  }
}

const getServiceName = () => {
  if (serviceType.value === 'predefined' && editForm.value.selectedService) {
    return editForm.value.selectedService.nombre
  } else if (serviceType.value === 'custom' && selectedServices.value.length > 0) {
    return selectedServices.value.map(s => s.nombre).join(' + ')
  }
  return ''
}

const getStatusBadgeClass = (status) => {
  const baseClasses = 'badge rounded-pill'
  switch (status) {
    case 'Pagado':
    case 'Liquidado':
      return `${baseClasses} bg-success`
    case 'Pendiente':
      return `${baseClasses} bg-danger`
    case 'Abono':
      return `${baseClasses} bg-warning`
    default:
      return baseClasses
  }
}

const handleSubmit = () => {
  // Validaciones básicas
  if (!editForm.value.userName) {
    alert('Por favor ingresa el nombre del usuario')
    return
  }

  if (serviceType.value === 'predefined' && !editForm.value.selectedService) {
    alert('Por favor selecciona un plan o servicio')
    return
  }

  if (serviceType.value === 'custom' && selectedServices.value.length === 0) {
    alert('Por favor selecciona al menos un servicio')
    return
  }

  if (!editForm.value.amount || editForm.value.amount <= 0) {
    alert('Por favor ingresa un monto válido')
    return
  }

  if (!editForm.value.companyId) {
    alert('Por favor selecciona una empresa')
    return
  }

  // Emitir los datos actualizados
  const updatedPayment = {
    ...editForm.value,
    planName: getServiceName(),
    services: serviceType.value === 'predefined' 
      ? [editForm.value.selectedService.nombre]
      : selectedServices.value.map(s => s.nombre)
  }
  
  emit('save', updatedPayment)
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.section-title {
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-coral);
  display: flex;
  align-items: center;
}

.info-card,
.payment-card,
.service-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e9ecef;
}

.payment-card {
  border-color: var(--primary-coral);
}

.service-card {
  border-color: var(--primary-blue);
}

.service-type-tabs {
  display: flex;
  justify-content: center;
}

.selected-services {
  min-height: 40px;
  border: 1px dashed #dee2e6;
  border-radius: 8px;
  padding: 0.5rem;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.status-indicator {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.form-label {
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.input-group-text {
  background: white;
  border-color: #dee2e6;
  color: var(--primary-blue);
  font-weight: 600;
}

.list-group-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .modal-dialog {
    margin: 0.5rem;
  }
  
  .info-card,
  .payment-card,
  .service-card {
    padding: 1rem;
  }
  
  .service-type-tabs {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>