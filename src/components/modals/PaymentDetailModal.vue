<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold">
            <i class="bi bi-receipt me-2"></i>
            Detalles del Pago
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <div v-if="payment" class="payment-details">
            <!-- Header con estado -->
            <div class="payment-header mb-4">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h4 class="mb-1">{{ payment.planName }}</h4>
                  <p class="text-muted mb-0">ID: {{ payment.purchaseId }}</p>
                </div>
                <div class="col-md-4 text-md-end">
                  <span :class="getStatusBadgeClass(payment.status)" class="badge fs-6 px-3 py-2">
                    {{ payment.status }}
                  </span>
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
                    <div class="info-item">
                      <label class="info-label">Nombre del Usuario</label>
                      <div class="info-value">{{ payment.userName || 'No especificado' }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="info-item">
                      <label class="info-label">Empresa</label>
                      <div class="info-value">{{ getCompanyName(payment.companyId) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Información del pago -->
            <div class="info-section mb-4">
              <h6 class="section-title">
                <i class="bi bi-credit-card me-2"></i>
                Información del Pago
              </h6>
              <div class="info-card">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="info-item">
                      <label class="info-label">Monto Total</label>
                      <div class="info-value amount-value">
                        ${{ payment.amount.toLocaleString() }} MXN
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="info-item">
                      <label class="info-label">Fecha de Pago</label>
                      <div class="info-value">{{ formatDate(payment.date) }}</div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="info-item">
                      <label class="info-label">Estado del Pago</label>
                      <div class="info-value">
                        <span :class="getStatusBadgeClass(payment.status)" class="badge">
                          {{ payment.status }}
                        </span>
                      </div>
                    </div>
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
              <div class="service-details-card">
                <div class="service-item">
                  <div class="service-icon">
                    <i class="bi bi-check-circle-fill"></i>
                  </div>
                  <div class="service-info">
                    <h6>{{ payment.planName }}</h6>
                    <p class="text-muted mb-0">Servicio contratado</p>
                  </div>
                  <div class="service-price">
                    ${{ payment.amount.toLocaleString() }} MXN
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline de actividad -->
            <div class="info-section">
              <h6 class="section-title">
                <i class="bi bi-clock-history me-2"></i>
                Historial de Actividad
              </h6>
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker bg-success"></div>
                  <div class="timeline-content">
                    <h6 class="timeline-title">Pago Creado</h6>
                    <p class="timeline-text">El pago fue registrado en el sistema</p>
                    <small class="timeline-date">{{ formatDate(payment.date) }}</small>
                  </div>
                </div>
                <div class="timeline-item" v-if="payment.status === 'Pagado' || payment.status === 'Liquidado'">
                  <div class="timeline-marker bg-primary"></div>
                  <div class="timeline-content">
                    <h6 class="timeline-title">Pago Procesado</h6>
                    <p class="timeline-text">El pago fue procesado exitosamente</p>
                    <small class="timeline-date">{{ formatDate(payment.date) }}</small>
                  </div>
                </div>
                <div class="timeline-item" v-if="payment.status === 'Liquidado'">
                  <div class="timeline-marker bg-success"></div>
                  <div class="timeline-content">
                    <h6 class="timeline-title">Pago Completado</h6>
                    <p class="timeline-text">El pago ha sido liquidado completamente</p>
                    <small class="timeline-date">{{ formatDate(payment.date) }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">
            <i class="bi bi-x-circle me-1"></i>
            Cerrar
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('edit', payment)">
            <i class="bi bi-pencil me-1"></i>
            Editar Pago
          </button>
          <
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
  payment: Object,
  companies: Array
});

const emit = defineEmits(['close', 'edit']);

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getCompanyName = (companyId) => {
  const company = props.companies?.find(c => c.id === companyId);
  return company ? company.name : 'Empresa no encontrada';
};

  
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.payment-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #dee2e6;
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

.info-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e9ecef;
}

.info-item {
  margin-bottom: 1rem;
}

.info-item:last-child {
  margin-bottom: 0;
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

.service-details-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid var(--primary-coral);
}

.service-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.service-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-coral);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.service-info {
  flex: 1;
}

.service-info h6 {
  margin-bottom: 0.25rem;
  color: var(--primary-blue);
}

.service-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-coral);
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #dee2e6;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #dee2e6;
}

.timeline-content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  margin-left: 1rem;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 0.25rem;
}

.timeline-text {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.timeline-date {
  color: #999;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .modal-dialog {
    margin: 0.5rem;
  }
  
  .payment-header {
    padding: 1rem;
  }
  
  .info-card {
    padding: 1rem;
  }
  
  .service-details-card {
    padding: 1rem;
  }
  
  .service-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .timeline {
    padding-left: 1.5rem;
  }
  
  .timeline-marker {
    left: -1.5rem;
  }
  
  .timeline-content {
    margin-left: 0.5rem;
  }
}
</style>