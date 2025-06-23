<template>
  <div class="modal fade" tabindex="-1" :class="{ show: show }" style="display: block;" v-if="show">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold">Crear Nuevo Pago</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <!-- User and Company Info -->
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="info-card">
                <h6 class="mb-3">Información del Usuario</h6>
                <div class="mb-2">
                  <strong>Nombre del Usuario:</strong>
                  <input type="text" class="form-control mt-1" v-model="form.userName" placeholder="Nombre del usuario">
                </div>
                <div class="mb-2">
                  <strong>Fecha de contratación:</strong>
                  <input type="date" class="form-control mt-1" v-model="form.contractDate">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="info-card">
                <h6 class="mb-3">Información de la Empresa</h6>
                <div class="mb-2">
                  <strong>Nombre de la empresa:</strong>
                  <input type="text" class="form-control mt-1" v-model="form.companyName" readonly>
                </div>
                <div class="mb-2">
                  <strong>Folio:</strong>
                  <input type="text" class="form-control mt-1" v-model="form.folio" placeholder="Folio">
                </div>
              </div>
            </div>
          </div>

          <div class="row">
<!-- Asignación de pago -->
             <div class="col-md-6">
              <div class="payment-card">
                <h6 class="mb-3">Asignar Pago</h6>
                <div class="mb-3">
                  <label class="form-label">Monto Total</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="form.totalAmount"
                    placeholder="0.00"
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">Abonado</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="form.paidAmount"
                    placeholder="0.00"
                  >
                </div>
                <button class="btn btn-primary w-100" @click="createPayment">
                  <i class="bi bi-plus-circle me-2"></i>
                  CREAR PAGO
                </button>
              </div>
            </div>

<!-- Selección de plan/servicio -->
            <div class="col-md-6">
              <div class="service-card">
                <h6 class="mb-3">NOMBRE DE PLAN / SERVICIO</h6>
                <div class="mb-3">
                  <select class="form-select" v-model="form.planService">
                    <option value="">PLAN O SERVICIO</option>
                    <option value="Plan Huevo">Plan Huevo</option>
                    <option value="Plan Ajolote">Plan Ajolote</option>
                    <option value="Plan Alebrije">Plan Alebrije</option>
                    <option value="Desarrollo de Ecommerce">Desarrollo de Ecommerce</option>
                    <option value="Email Marketing">Email Marketing</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                  </select>
                </div>
                <div class="mb-3">
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="form.client"
                    placeholder="CLIENTE"
                  >
                </div>
                <div class="mb-3">
                  <select class="form-select" v-model="form.paymentType">
                    <option value="">TIPO DE PAGO (COMPLETO O ABONO)</option>
                    <option value="Completo">Completo</option>
                    <option value="Abono">Abono</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  selectedCompany: Object
});

const emit = defineEmits(['close', 'save']);

const form = ref({
  userName: '',
  contractDate: '',
  companyName: '',
  folio: '',
  totalAmount: 0,
  paidAmount: 0,
  planService: '',
  client: '',
  paymentType: ''
});

watch(() => props.selectedCompany, (newCompany) => {
  if (newCompany) {
    form.value.companyName = newCompany.name;
    form.value.client = newCompany.client;
  }
}, { immediate: true });

const createPayment = () => {
  if (!form.value.planService || !form.value.totalAmount) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }

  const paymentData = {
    ...form.value,
    companyId: props.selectedCompany?.id,
    status: form.value.paymentType === 'Completo' ? 'Pagado' : 'Pendiente',
    date: new Date().toISOString().split('T')[0],
    purchaseId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
  };

  emit('save', paymentData);
  resetForm();
};

const resetForm = () => {
  form.value = {
    userName: '',
    contractDate: '',
    companyName: props.selectedCompany?.name || '',
    folio: '',
    totalAmount: 0,
    paidAmount: 0,
    planService: '',
    client: props.selectedCompany?.client || '',
    paymentType: ''
  };
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.info-card,
.payment-card,
.service-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e9ecef;
  height: 100%;
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
</style>