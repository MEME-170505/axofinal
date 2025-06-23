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
            <!-- Información del pago -->
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

            <!-- Información del cliente -->
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

            <!-- Detalles del servicio -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-box me-2"></i>
                Detalles del Servicio
              </h6>
              <div class="service-card">
                <div class="mb-3">
                  <label class="form-label">Plan/Servicio</label>
                  <select class="form-select" v-model="editForm.planName" @change="updateServicePrice">
                    <option value="">Seleccionar plan o servicio</option>
                    <option value="Plan Huevo">Plan Huevo - $15,000</option>
                    <option value="Plan Ajolote">Plan Ajolote - $25,000</option>
                    <option value="Plan Alebrije">Plan Alebrije - Personalizado</option>
                    <option value="Desarrollo de Ecommerce">Desarrollo de Ecommerce - $8,000</option>
                    <option value="Email Marketing">Email Marketing - $5,000</option>
                    <option value="Marketing Digital">Marketing Digital - $8,000</option>
                    <option value="Diseño UI/UX">Diseño UI/UX - $8,000</option>
                    <option value="Automatización">Automatización - $8,000</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Información de pago -->
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

            <!-- Notas adicionales -->
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
          </form>
        </div>

        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-outline-secondary me-2" @click="$emit('close')">
            <i class="bi bi-x-circle me-1"></i>
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="handleSubmit">
            <i class="bi bi-check-circle me-1"></i>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
  payment: Object,
  companies: Array
});

const emit = defineEmits(['close', 'save']);

const editForm = ref({
  id: null,
  purchaseId: '',
  userName: '',
  companyId: null,
  planName: '',
  amount: 0,
  status: 'Pendiente',
  date: '',
  notes: ''
});

// Precios predefinidos
const predefinedPrices = {
  'Plan Huevo': 15000,
  'Plan Ajolote': 25000,
  'Plan Alebrije': 0, // Personalizado
  'Desarrollo de Ecommerce': 8000,
  'Email Marketing': 5000,
  'Marketing Digital': 8000,
  'Diseño UI/UX': 8000,
  'Automatización': 8000
};

// Watch para cargar datos del pago cuando se abre el modal
watch(() => props.payment, (newPayment) => {
  if (newPayment) {
    editForm.value = {
      id: newPayment.id,
      purchaseId: newPayment.purchaseId,
      userName: newPayment.userName || '',
      companyId: newPayment.companyId,
      planName: newPayment.planName,
      amount: newPayment.amount,
      status: newPayment.status,
      date: newPayment.date,
      notes: newPayment.notes || ''
    };
  }
}, { immediate: true });

const updateServicePrice = () => {
  const selectedPlan = editForm.value.planName;
  if (selectedPlan && predefinedPrices[selectedPlan] !== undefined) {
    editForm.value.amount = predefinedPrices[selectedPlan];
  }
};

const getStatusBadgeClass = (status) => {
  const baseClasses = 'badge rounded-pill';
  switch (status) {
    case 'Pagado':
    case 'Liquidado':
      return `${baseClasses} bg-success`;
    case 'Pendiente':
      return `${baseClasses} bg-danger`;
    case 'Abono':
      return `${baseClasses} bg-warning`;
    default:
      return baseClasses;
  }
};

const handleSubmit = () => {
  // Validaciones básicas
  if (!editForm.value.userName) {
    alert('Por favor ingresa el nombre del usuario');
    return;
  }

  if (!editForm.value.planName) {
    alert('Por favor selecciona un plan o servicio');
    return;
  }

  if (!editForm.value.amount || editForm.value.amount <= 0) {
    alert('Por favor ingresa un monto válido');
    return;
  }

  if (!editForm.value.companyId) {
    alert('Por favor selecciona una empresa');
    return;
  }

  // Emitir los datos actualizados
  emit('save', { ...editForm.value });
};
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

@media (max-width: 768px) {
  .modal-dialog {
    margin: 0.5rem;
  }
  
  .info-card,
  .payment-card,
  .service-card {
    padding: 1rem;
  }
}
</style>