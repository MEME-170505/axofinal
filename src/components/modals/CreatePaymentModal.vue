<template>
  <div class="modal fade" tabindex="-1" :class="{ show: show }" style="display: block;" v-if="show">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold">
            <i class="bi bi-plus-circle me-2"></i>
            Crear Nuevo Pago
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <!-- Información del Usuario -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-person-circle me-2"></i>
                Nombre del Usuario
              </h6>
              <div class="info-card">
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="form.userName" 
                  placeholder="Nombre del usuario"
                  required
                >
              </div>
            </div>

            <!-- Fecha de contratación -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-calendar me-2"></i>
                Fecha de contratación
              </h6>
              <div class="info-card">
                <input 
                  type="date" 
                  class="form-control" 
                  v-model="form.contractDate"
                >
              </div>
            </div>

            <!-- Información de la Empresa -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-building me-2"></i>
                Información de la Empresa
              </h6>
              <div class="info-card">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Nombre de la empresa</label>
                    <select class="form-select" v-model="form.companyId" @change="updateCompanyInfo">
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
                  <div class="col-md-6">
                    <label class="form-label">Folio</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="form.folio" 
                      placeholder="Folio"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Plan / Servicio -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-box me-2"></i>
                Plan / Servicio
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
                    <label class="form-label">Plan o Servicio</label>
                    <select class="form-select" v-model="form.selectedService" @change="updateServicePrice">
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
                  <div class="mb-3">
                    <label class="form-label">Cliente</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="form.client"
                      placeholder="Nombre del cliente"
                    >
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
                  <div class="mb-3">
                    <label class="form-label">Cliente</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="form.client"
                      placeholder="Nombre del cliente"
                    >
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Tipo de Pago</label>
                  <select class="form-select" v-model="form.paymentType">
                    <option value="">Tipo de pago (Completo o Abono)</option>
                    <option value="Completo">Completo</option>
                    <option value="Abono">Abono</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Asignar Pago -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-currency-dollar me-2"></i>
                Asignar Pago
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
                        v-model="form.totalAmount"
                        placeholder="0.00"
                        step="0.01"
                      >
                      <span class="input-group-text">MXN</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Abonado</label>
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input 
                        type="number" 
                        class="form-control" 
                        v-model="form.paidAmount"
                        placeholder="0.00"
                        step="0.01"
                      >
                      <span class="input-group-text">MXN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notas -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-chat-text me-2"></i>
                Notas
              </h6>
              <div class="info-card">
                <textarea 
                  class="form-control" 
                  rows="3" 
                  v-model="form.notes"
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
                Crear Pago
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
import { ref, watch, computed } from 'vue'

const props = defineProps({
  show: Boolean,
  selectedCompany: Object,
  companies: Array,
  planes: Array,
  servicios: Array
})

const emit = defineEmits(['close', 'save'])

const serviceType = ref('predefined')
const showServiceSelector = ref(false)
const selectedServices = ref([])

const form = ref({
  userName: '',
  contractDate: '',
  companyId: null,
  companyName: '',
  folio: '',
  totalAmount: 0,
  paidAmount: 0,
  selectedService: null,
  client: '',
  paymentType: '',
  notes: ''
})

// Watch para cargar datos de la empresa seleccionada
watch(() => props.selectedCompany, (newCompany) => {
  if (newCompany) {
    form.value.companyId = newCompany.id
    form.value.companyName = newCompany.name
    form.value.client = newCompany.client
  }
}, { immediate: true })

const updateCompanyInfo = () => {
  const company = props.companies.find(c => c.id === form.value.companyId)
  if (company) {
    form.value.companyName = company.name
    form.value.client = company.client
  }
}

const updateServicePrice = () => {
  if (form.value.selectedService && form.value.selectedService.precio) {
    form.value.totalAmount = form.value.selectedService.precio
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
    form.value.totalAmount = selectedServices.value.reduce((total, service) => 
      total + service.precio, 0
    )
  }
}

const getServiceName = () => {
  if (serviceType.value === 'predefined' && form.value.selectedService) {
    return form.value.selectedService.nombre
  } else if (serviceType.value === 'custom' && selectedServices.value.length > 0) {
    return selectedServices.value.map(s => s.nombre).join(' + ')
  }
  return ''
}

const handleSubmit = () => {
  if (!form.value.userName || !form.value.companyId) {
    alert('Por favor completa todos los campos requeridos')
    return
  }

  if (serviceType.value === 'predefined' && !form.value.selectedService) {
    alert('Por favor selecciona un plan o servicio')
    return
  }

  if (serviceType.value === 'custom' && selectedServices.value.length === 0) {
    alert('Por favor selecciona al menos un servicio')
    return
  }

  if (!form.value.totalAmount || form.value.totalAmount <= 0) {
    alert('Por favor ingresa un monto válido')
    return
  }

  const paymentData = {
    userName: form.value.userName,
    contractDate: form.value.contractDate,
    companyId: form.value.companyId,
    planName: getServiceName(),
    amount: parseFloat(form.value.totalAmount),
    status: form.value.paymentType === 'Completo' ? 'Pagado' : 'Pendiente',
    date: new Date().toISOString().split('T')[0],
    purchaseId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    notes: form.value.notes,
    services: serviceType.value === 'predefined' 
      ? [form.value.selectedService.nombre]
      : selectedServices.value.map(s => s.nombre)
  }

  emit('save', paymentData)
  resetForm()
}

const resetForm = () => {
  form.value = {
    userName: '',
    contractDate: '',
    companyId: props.selectedCompany?.id || null,
    companyName: props.selectedCompany?.name || '',
    folio: '',
    totalAmount: 0,
    paidAmount: 0,
    selectedService: null,
    client: props.selectedCompany?.client || '',
    paymentType: '',
    notes: ''
  }
  selectedServices.value = []
  serviceType.value = 'predefined'
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