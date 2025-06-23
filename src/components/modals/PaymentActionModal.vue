<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold">
            <i :class="[modalIcon, 'me-2']"></i>
            {{ modalTitle }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <!-- Payment Info -->
          <div class="payment-info mb-4">
            <div class="info-card">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="info-label">Cliente</label>
                  <div class="info-value">{{ payment.userName }}</div>
                </div>
                <div class="col-md-6">
                  <label class="info-label">Servicio</label>
                  <div class="info-value">{{ payment.planName }}</div>
                </div>
                <div class="col-md-6">
                  <label class="info-label">Monto Total</label>
                  <div class="info-value amount-value">${{ payment.amount.toLocaleString() }} MXN</div>
                </div>
                <div class="col-md-6">
                  <label class="info-label">Estado Actual</label>
                  <div class="info-value">
                    <PaymentStatusBadge :status="payment.status" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Form -->
          <form @submit.prevent="handleSubmit">
            <div v-if="action === 'abonar'" class="mb-4">
              <label class="form-label fw-bold">Monto del Abono</label>
              <div class="input-group input-group-lg">
                <span class="input-group-text">$</span>
                <input 
                  type="number" 
                  class="form-control" 
                  v-model="abonoAmount"
                  placeholder="0.00"
                  step="0.01"
                  :max="payment.amount"
                  required
                >
                <span class="input-group-text">MXN</span>
              </div>
              <div class="form-text">
                Máximo: ${{ payment.amount.toLocaleString() }} MXN
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Notas</label>
              <textarea 
                class="form-control" 
                rows="3" 
                v-model="notes"
                :placeholder="notesPlaceholder"
              ></textarea>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">
                <i class="bi bi-x-circle me-1"></i>
                Cancelar
              </button>
              <button type="submit" class="btn" :class="submitButtonClass">
                <i :class="[submitButtonIcon, 'me-1']"></i>
                {{ submitButtonText }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import PaymentStatusBadge from '../ui/PaymentStatusBadge.vue'

const props = defineProps({
  show: Boolean,
  payment: Object,
  action: {
    type: String,
    required: true,
    validator: (value) => ['liquidar', 'abonar'].includes(value)
  }
})

const emit = defineEmits(['close', 'confirm'])

const abonoAmount = ref(0)
const notes = ref('')

const modalTitle = computed(() => {
  return props.action === 'liquidar' ? 'Liquidar Pago' : 'Registrar Abono'
})

const modalIcon = computed(() => {
  return props.action === 'liquidar' ? 'bi bi-check-circle' : 'bi bi-cash-coin'
})

const notesPlaceholder = computed(() => {
  return props.action === 'liquidar' 
    ? 'Agregar notas sobre la liquidación del pago...'
    : 'Agregar notas sobre el abono realizado...'
})

const submitButtonClass = computed(() => {
  return props.action === 'liquidar' ? 'btn-success' : 'btn-warning'
})

const submitButtonIcon = computed(() => {
  return props.action === 'liquidar' ? 'bi bi-check-circle' : 'bi bi-cash-coin'
})

const submitButtonText = computed(() => {
  return props.action === 'liquidar' ? 'Liquidar Pago' : 'Registrar Abono'
})

const handleSubmit = () => {
  const data = {
    action: props.action,
    payment: props.payment,
    notes: notes.value
  }

  if (props.action === 'abonar') {
    if (!abonoAmount.value || abonoAmount.value <= 0) {
      alert('Por favor ingresa un monto válido para el abono')
      return
    }
    if (abonoAmount.value > props.payment.amount) {
      alert('El monto del abono no puede ser mayor al monto total')
      return
    }
    data.abonoAmount = parseFloat(abonoAmount.value)
  }

  emit('confirm', data)
}

watch(() => props.show, (newValue) => {
  if (newValue) {
    abonoAmount.value = 0
    notes.value = ''
  }
})
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.info-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e9ecef;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.25rem;
  display: block;
}

.info-value {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 500;
}

.amount-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-coral);
}

.form-control:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.input-group-text {
  background: white;
  border-color: #dee2e6;
  color: var(--primary-blue);
  font-weight: 600;
}
</style>
