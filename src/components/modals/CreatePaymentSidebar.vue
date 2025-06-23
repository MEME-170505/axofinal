<template>
  <div>
    <!-- Payment Sidebar -->
    <div class="payment-sidebar" :class="{ 'active': show }">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h5 class="mb-0">
            <i class="bi bi-plus-circle me-2"></i>
            Crear Nuevo Pago
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>

        <div class="sidebar-body">
          <!-- Información del Usuario -->
          <div class="info-section mb-4">
            <h6 class="section-title">
              <i class="bi bi-person me-2"></i>
              Información del Usuario
            </h6>
            <div class="info-card">
              <div class="mb-3">
                <label class="form-label">Nombre del Usuario</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="paymentForm.userName" 
                  placeholder="Nombre del usuario"
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Fecha de contratación</label>
                <input 
                  type="date" 
                  class="form-control" 
                  v-model="paymentForm.contractDate"
                >
              </div>
            </div>
          </div>

          <!-- Información de la Empresa -->
          <div class="info-section mb-4">
            <h6 class="section-title">
              <i class="bi bi-building me-2"></i>
              Información de la Empresa
            </h6>
            <div class="info-card">
              <div class="mb-3">
                <label class="form-label">Nombre de la empresa</label>
                <select class="form-select" v-model="paymentForm.companyId" @change="updateCompanyInfo">
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
              <div class="mb-3">
                <label class="form-label">Folio</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="paymentForm.folio" 
                  placeholder="Folio"
                >
              </div>
            </div>
          </div>

          <!-- Plan/Service Selection -->
          <div class="info-section mb-4">
            <h6 class="section-title">
              <i class="bi bi-box me-2"></i>
              Plan / Servicio
            </h6>
            <div class="service-card">
              <!-- Service Type Selection -->
              <div class="mb-3">
                <label class="form-label">Tipo de Servicio</label>
                <div class="btn-group w-100" role="group">
                  <input 
                    type="radio" 
                    class="btn-check" 
                    name="serviceType" 
                    id="predefined" 
                    value="predefined" 
                    v-model="serviceType"
                  >
                  <label class="btn btn-outline-primary" for="predefined">
                    <i class="bi bi-list-ul me-1"></i>
                    Predefinido
                  </label>
                  
                  <input 
                    type="radio" 
                    class="btn-check" 
                    name="serviceType" 
                    id="custom" 
                    value="custom" 
                    v-model="serviceType"
                  >
                  <label class="btn btn-outline-primary" for="custom">
                    <i class="bi bi-gear me-1"></i>
                    Personalizado
                  </label>
                </div>
              </div>

              <!-- Servicios Predefinidos -->
              <div v-if="serviceType === 'predefined'" class="mb-3">
                <label class="form-label">Plan o Servicio</label>
                <select 
                  class="form-select" 
                  v-model="paymentForm.planService" 
                  @change="updatePredefinedPrice"
                >
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

              <!-- Servicios Personalizados -->
              <div v-if="serviceType === 'custom'" class="mb-3">
                <label class="form-label">Servicios Personalizados</label>
                <div class="custom-services-container">
                  <div class="services-grid">
                    <div 
                      v-for="service in availableServices" 
                      :key="service.id"
                      class="service-option"
                      :class="{ 'selected': selectedServices.includes(service.id) }"
                      @click="toggleService(service.id)"
                    >
                      <div class="service-checkbox">
                        <i class="bi bi-check" v-if="selectedServices.includes(service.id)"></i>
                      </div>
                      <div class="service-details">
                        <div class="service-name">{{ service.name }}</div>
                        <div class="service-price">${{ service.price.toLocaleString() }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Listado de servicios seleccionados -->
                  <div v-if="selectedServices.length > 0" class="selected-summary mt-3">
                    <h6 class="mb-2">Servicios Seleccionados:</h6>
                    <div class="selected-list">
                      <div 
                        v-for="serviceId in selectedServices" 
                        :key="serviceId"
                        class="selected-item"
                      >
                        <span>{{ getServiceById(serviceId).name }}</span>
                        <span class="price">${{ getServiceById(serviceId).price.toLocaleString() }}</span>
                        <button 
                          type="button" 
                          class="btn-remove"
                          @click="toggleService(serviceId)"
                        >
                          <i class="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                    <div class="total-price">
                      <strong>Total: ${{ calculateTotal().toLocaleString() }} MXN</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Cliente</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="paymentForm.client"
                  placeholder="Nombre del cliente"
                >
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
              <div class="mb-3">
                <label class="form-label">Monto Total</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="paymentForm.totalAmount"
                    placeholder="0.00"
                    readonly
                  >
                  <span class="input-group-text">MXN</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Abonado</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="paymentForm.paidAmount"
                    placeholder="0.00"
                    @input="updatePaymentStatus"
                  >
                  <span class="input-group-text">MXN</span>
                </div>
              </div>
              <div class="payment-summary" v-if="paymentForm.totalAmount && paymentForm.paidAmount">
                <div class="d-flex justify-content-between">
                  <span>Restante:</span>
                  <span class="fw-bold text-warning">
                    ${{ (paymentForm.totalAmount - paymentForm.paidAmount).toLocaleString() }} MXN
                  </span>
                </div>
              </div>

              <!-- Botones de Pago -->
              <div class="payment-buttons mt-4">
                <div class="row g-2">
                  <div class="col-6">
                    <button 
                      type="button" 
                      class="btn btn-success w-100"
                      @click="setPaymentType('Completo')"
                      :class="{ 'active': paymentForm.paymentType === 'Completo' }"
                    >
                      <i class="bi bi-check-circle me-1"></i>
                      Liquidar
                    </button>
                  </div>
                  <div class="col-6">
                    <button 
                      type="button" 
                      class="btn btn-warning w-100"
                      @click="setPaymentType('Abono')"
                      :class="{ 'active': paymentForm.paymentType === 'Abono' }"
                    >
                      <i class="bi bi-cash me-1"></i>
                      Abono
                    </button>
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
                v-model="paymentForm.notes"
                placeholder="Agregar notas o comentarios sobre este pago..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="sidebar-footer">
          <button class="btn btn-outline-secondary me-2" @click="$emit('close')">
            <i class="bi bi-x-circle me-1"></i>
            Cancelar
          </button>
          <button class="btn btn-primary" @click="createPayment">
            <i class="bi bi-plus-circle me-2"></i>
            Crear Pago
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="sidebar-overlay" :class="{ 'active': show }" @click="$emit('close')"></div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useAlert } from '../../composables/useAlert'

const props = defineProps({
  show: Boolean,
  selectedCompany: Object,
  companies: {
    type: Array,
    default: () => []
  },
  planes: {
    type: Array,
    default: () => []
  },
  servicios: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'save'])

const { showSuccess, showError } = useAlert()

const serviceType = ref('predefined')
const selectedServices = ref([])

const paymentForm = ref({
  userName: '',
  contractDate: '',
  companyId: null,
  companyName: '',
  folio: '',
  planService: null,
  client: '',
  totalAmount: 0,
  paidAmount: 0,
  paymentType: '',
  notes: ''
})

// Servicios disponibles para personalización
const availableServices = ref([
  { id: 1, name: 'Diseño UI/UX', price: 8000 },
  { id: 2, name: 'Desarrollo Web', price: 15000 },
  { id: 3, name: 'Email Marketing', price: 5000 },
  { id: 4, name: 'Marketing Digital', price: 8000 },
  { id: 5, name: 'Automatización', price: 8000 },
  { id: 6, name: 'Correo Empresarial', price: 3000 },
  { id: 7, name: 'E-commerce', price: 12000 },
  { id: 8, name: 'SEO', price: 6000 }
])

// Watch para cargar datos de la empresa seleccionada
watch(() => props.selectedCompany, (newCompany) => {
  if (newCompany) {
    paymentForm.value.companyId = newCompany.id
    paymentForm.value.companyName = newCompany.name
    paymentForm.value.client = newCompany.client
  }
}, { immediate: true })

// Watch para resetear el formulario cuando cambia el tipo de servicio
watch(serviceType, (newType) => {
  if (newType === 'predefined') {
    selectedServices.value = []
    paymentForm.value.planService = null
    paymentForm.value.totalAmount = 0
  } else {
    paymentForm.value.planService = null
    paymentForm.value.totalAmount = calculateTotal()
  }
})

// Watch para actualizar el total cuando cambian los servicios seleccionados
watch(selectedServices, () => {
  if (serviceType.value === 'custom') {
    paymentForm.value.totalAmount = calculateTotal()
  }
}, { deep: true })

const updateCompanyInfo = () => {
  const company = props.companies.find(c => c.id === paymentForm.value.companyId)
  if (company) {
    paymentForm.value.companyName = company.name
    paymentForm.value.client = company.client
  }
}

const updatePredefinedPrice = () => {
  if (paymentForm.value.planService && paymentForm.value.planService.precio !== undefined) {
    paymentForm.value.totalAmount = paymentForm.value.planService.precio
  }
}

const toggleService = (serviceId) => {
  const index = selectedServices.value.indexOf(serviceId)
  if (index > -1) {
    selectedServices.value.splice(index, 1)
  } else {
    selectedServices.value.push(serviceId)
  }
}

const getServiceById = (serviceId) => {
  return availableServices.value.find(service => service.id === serviceId)
}

const calculateTotal = () => {
  return selectedServices.value.reduce((total, serviceId) => {
    const service = getServiceById(serviceId)
    return total + (service ? service.price : 0)
  }, 0)
}

const setPaymentType = (type) => {
  paymentForm.value.paymentType = type
  if (type === 'Completo') {
    paymentForm.value.paidAmount = paymentForm.value.totalAmount
  }
}

const updatePaymentStatus = () => {
  const total = paymentForm.value.totalAmount
  const paid = paymentForm.value.paidAmount
  
  if (paid >= total) {
    paymentForm.value.paymentType = 'Completo'
  } else if (paid > 0) {
    paymentForm.value.paymentType = 'Abono'
  } else {
    paymentForm.value.paymentType = ''
  }
}

const createPayment = () => {
  // Validaciones
  if (!paymentForm.value.userName) {
    showError('Error', 'El nombre del usuario es requerido')
    return
  }

  if (!paymentForm.value.client) {
    showError('Error', 'El nombre del cliente es requerido')
    return
  }

  if (!paymentForm.value.companyId) {
    showError('Error', 'Debe seleccionar una empresa')
    return
  }

  if (serviceType.value === 'predefined' && !paymentForm.value.planService) {
    showError('Error', 'Debe seleccionar un plan o servicio')
    return
  }

  if (serviceType.value === 'custom' && selectedServices.value.length === 0) {
    showError('Error', 'Debe seleccionar al menos un servicio personalizado')
    return
  }

  if (!paymentForm.value.totalAmount || paymentForm.value.totalAmount <= 0) {
    showError('Error', 'El monto total debe ser mayor a 0')
    return
  }

  if (!paymentForm.value.paymentType) {
    showError('Error', 'Debe seleccionar el tipo de pago')
    return
  }

  // Crear objeto de pago
  const newPayment = {
    id: Date.now(),
    companyId: paymentForm.value.companyId,
    userName: paymentForm.value.userName,
    planName: getServiceName(),
    services: getServicesList(),
    amount: paymentForm.value.totalAmount,
    paidAmount: paymentForm.value.paidAmount,
    status: getPaymentStatus(),
    date: new Date().toISOString().split('T')[0],
    contractDate: paymentForm.value.contractDate,
    folio: paymentForm.value.folio,
    client: paymentForm.value.client,
    notes: paymentForm.value.notes,
    purchaseId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    serviceType: serviceType.value,
    selectedServiceIds: serviceType.value === 'custom' ? selectedServices.value : []
  }

  // Emitir evento para guardar
  emit('save', newPayment)
  
  // Resetear formulario
  resetForm()
  
  showSuccess('Pago creado', 'El pago ha sido creado exitosamente')
}

const getServiceName = () => {
  if (serviceType.value === 'predefined' && paymentForm.value.planService) {
    return paymentForm.value.planService.nombre
  } else if (serviceType.value === 'custom' && selectedServices.value.length > 0) {
    return `Servicios Personalizados (${selectedServices.value.length})`
  }
  return ''
}

const getServicesList = () => {
  if (serviceType.value === 'predefined' && paymentForm.value.planService) {
    return [paymentForm.value.planService.nombre]
  } else if (serviceType.value === 'custom') {
    return selectedServices.value.map(id => getServiceById(id).name)
  }
  return []
}

const getPaymentStatus = () => {
  const total = paymentForm.value.totalAmount
  const paid = paymentForm.value.paidAmount
  
  if (paid >= total) {
    return 'Pagado'
  } else if (paid > 0) {
    return 'Abono'
  } else {
    return 'Pendiente'
  }
}

const resetForm = () => {
  paymentForm.value = {
    userName: '',
    contractDate: '',
    companyId: props.selectedCompany?.id || null,
    companyName: props.selectedCompany?.name || '',
    folio: '',
    planService: null,
    client: props.selectedCompany?.client || '',
    totalAmount: 0,
    paidAmount: 0,
    paymentType: '',
    notes: ''
  }
  selectedServices.value = []
  serviceType.value = 'predefined'
}
</script>

<style scoped>
/* Payment Sidebar */
.payment-sidebar {
  position: fixed;
  top: 0;
  right: -600px;
  width: 600px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease;
  z-index: 1050;
  overflow-y: auto;
}

.payment-sidebar.active {
  right: 0;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

.sidebar-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1040;
}

.sidebar-overlay.active {
  opacity: 1;
  visibility: visible;
}

.info-section {
  margin-bottom: 1.5rem;
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

.payment-summary {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid #dee2e6;
}

.payment-buttons .btn {
  transition: all 0.3s ease;
}

.payment-buttons .btn.active {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.payment-buttons .btn-success.active {
  background-color: #198754;
  border-color: #198754;
}

.payment-buttons .btn-warning.active {
  background-color: #fd7e14;
  border-color: #fd7e14;
}

/* Custom Services Styles */
.custom-services-container {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  border: 2px solid #e9ecef;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.service-option {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.service-option:hover {
  border-color: var(--primary-coral);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.service-option.selected {
  border-color: var(--primary-coral);
  background: rgba(233, 79, 55, 0.1);
}

.service-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  transition: all 0.3s ease;
}

.service-option.selected .service-checkbox {
  background: var(--primary-coral);
  border-color: var(--primary-coral);
  color: white;
}

.service-details {
  flex: 1;
}

.service-name {
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 0.25rem;
}

.service-price {
  font-size: 0.875rem;
  color: var(--primary-coral);
  font-weight: 600;
}

.selected-summary {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.selected-list {
  margin-bottom: 1rem;
}

.selected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border: 1px solid #e9ecef;
}

.selected-item .price {
  color: var(--primary-coral);
  font-weight: 600;
}

.btn-remove {
  background: none;
  border: none;
  color: #dc3545;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-remove:hover {
  background: #dc3545;
  color: white;
}

.total-price {
  text-align: right;
  padding-top: 0.5rem;
  border-top: 1px solid #dee2e6;
  color: var(--primary-coral);
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

@media (max-width: 1400px) {
  .payment-sidebar {
    width: 500px;
    right: -500px;
  }
}

@media (max-width: 1200px) {
  .payment-sidebar {
    width: 450px;
    right: -450px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .payment-sidebar {
    width: 100%;
    right: -100%;
  }
  
  .sidebar-body {
    padding: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar-header,
  .sidebar-footer {
    padding: 1rem;
  }
  
  .info-card,
  .payment-card,
  .service-card {
    padding: 1rem;
  }

  .payment-buttons .btn {
    font-size: 0.875rem;
    padding: 0.5rem;
  }
}

@media (max-width: 576px) {
  .service-option {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .service-checkbox {
    margin-right: 0;
  }
  
  .selected-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .payment-buttons .row {
    flex-direction: column;
  }

  .payment-buttons .col-6 {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>