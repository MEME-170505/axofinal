<template>
  <div class="cliente-servicios animate__animated animate__fadeIn">
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">
              <i class="bi bi-grid me-2"></i>
              Servicio
            </th>
            <th scope="col">
              <i class="bi bi-info-circle me-2"></i>
              Estado
            </th>
            <th scope="col">
              <i class="bi bi-calendar me-2"></i>
              Vencimiento
            </th>
            <th scope="col">
              <i class="bi bi-gear me-2"></i>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(plan, index) in planes" 
            :key="plan.id" 
            class="animate__animated animate__fadeInUp" 
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <td>
              <div class="d-flex align-items-center">
                <div class="plan-icon me-3">
                  <i :class="plan.icon"></i>
                </div>
                <div>
                  <h6 class="mb-0">{{ plan.nombre }}</h6>
                  <small class="text-muted">Plan activo</small>
                </div>
              </div>
            </td>
            <td>
              <span :class="getStatusClass(plan.estado)">
                <i :class="getStatusIcon(plan.estado)" class="me-1"></i>
                {{ plan.estado }}
              </span>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <i class="bi bi-calendar-event me-2 text-muted"></i>
                <span>{{ plan.fechaVencimiento }}</span>
              </div>
            </td>
            <td>
              <div class="d-flex gap-2">
                <BotonPrimario
                  variant="primary"
                  size="sm"
                  icon="bi bi-arrow-clockwise"
                  @click="$emit('renovar', plan)"
                >
                  Renovar
                </BotonPrimario>
                <BotonPrimario
                  variant="outline-danger"
                  size="sm"
                  icon="bi bi-x-circle"
                  @click="$emit('cancelar', plan)"
                >
                  Cancelar
                </BotonPrimario>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="planes.length === 0" class="empty-state text-center py-5">
      <i class="bi bi-inbox fs-1 text-muted mb-3"></i>
      <h5 class="text-muted">No tienes servicios activos</h5>
      <p class="text-muted">Contacta con nosotros para contratar un nuevo servicio</p>
      <BotonPrimario
        variant="primary"
        icon="bi bi-whatsapp"
        @click="contactarSoporte"
      >
        Contactar Soporte
      </BotonPrimario>
    </div>
  </div>
</template>

<script setup>
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

defineProps({
  planes: {
    type: Array,
    required: true
  }
})

defineEmits(['renovar', 'cancelar'])

const getStatusClass = (estado) => {
  const baseClasses = 'badge rounded-pill'
  switch (estado) {
    case 'Activo':
      return `${baseClasses} bg-success`
    case 'Por vencer':
      return `${baseClasses} bg-warning text-dark`
    case 'Vencido':
      return `${baseClasses} bg-danger`
    default:
      return baseClasses
  }
}

const getStatusIcon = (estado) => {
  switch (estado) {
    case 'Activo':
      return 'bi bi-check-circle-fill'
    case 'Por vencer':
      return 'bi bi-exclamation-triangle-fill'
    case 'Vencido':
      return 'bi bi-x-circle-fill'
    default:
      return 'bi bi-circle'
  }
}

const contactarSoporte = () => {
  const numeroWhatsApp = '528714742958'
  const mensaje = encodeURIComponent('¡Hola! Me gustaría obtener información sobre sus servicios disponibles.')
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.plan-icon {
  width: 50px;
  height: 50px;
  background-color: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-coral);
  border: 2px solid var(--primary-coral);
}

.badge {
  font-size: 0.875rem;
  padding: 0.5em 1em;
}

.table > :not(caption) > * > * {
  padding: 1.25rem 0.75rem;
}

.table-hover tbody tr:hover {
  background-color: rgba(233, 79, 55, 0.05);
}

.empty-state {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 3rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .table-responsive {
    font-size: 0.875rem;
  }
  
  .d-flex.gap-2 {
    flex-direction: column;
    gap: 0.5rem !important;
  }
  
  .plan-icon {
    width: 40px;
    height: 40px;
  }
}
</style>