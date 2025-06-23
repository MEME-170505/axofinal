<template>
  <tr class="fila-pago" :class="{ 'highlight': isHighlighted }">
    <td>
      <div class="user-info">
        <i class="bi bi-person-circle me-2 text-coral"></i>
        <span>{{ pago.userName || 'N/A' }}</span>
      </div>
    </td>
    <td>
      <div class="plan-info">
        <i class="bi bi-box me-2 text-coral"></i>
        <div>
          <div class="fw-bold">{{ pago.planName }}</div>
          <small class="text-muted" v-if="pago.services && pago.services.length > 1">
            +{{ pago.services.length - 1 }} servicios más
          </small>
        </div>
      </div>
    </td>
    <td>
      <span class="fw-bold text-success">${{ pago.amount.toLocaleString() }}</span>
    </td>
    <td>
      <span :class="getStatusBadgeClass(pago.status)">
        {{ pago.status }}
      </span>
    </td>
    <td>{{ formatDate(pago.date) }}</td>
    <td>
      <code class="text-muted">{{ pago.purchaseId }}</code>
    </td>
    <td>
      <div class="notes-cell">
        <span v-if="pago.notes" class="text-muted" :title="pago.notes">
          {{ truncateText(pago.notes, 30) }}
        </span>
        <span v-else class="text-muted">-</span>
      </div>
    </td>
    <td>
      <div class="btn-group btn-group-sm">
        <BotonPrimario
          variant="outline-primary"
          size="sm"
          icon="bi bi-eye"
          @click="handleView"
          title="Ver detalles"
        />
        <BotonPrimario
          variant="outline-secondary"
          size="sm"
          icon="bi bi-pencil"
          @click="handleEdit"
          title="Editar"
        />
        <BotonPrimario
          v-if="showDelete"
          variant="outline-danger"
          size="sm"
          icon="bi bi-trash"
          @click="handleDelete"
          title="Eliminar"
        />
      </div>
    </td>
  </tr>
</template>

<script setup>
import BotonPrimario from './BotonPrimario.vue'

const props = defineProps({
  pago: {
    type: Object,
    required: true
  },
  isHighlighted: {
    type: Boolean,
    default: false
  },
  showDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['view', 'edit', 'delete'])

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

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX')
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const handleView = () => {
  emit('view', props.pago)
}

const handleEdit = () => {
  emit('edit', props.pago)
}

const handleDelete = () => {
  emit('delete', props.pago)
}
</script>

<style scoped>
.fila-pago {
  transition: all 0.3s ease;
}

.fila-pago:hover {
  background-color: #f8f9fa;
  transform: scale(1.01);
}

.fila-pago.highlight {
  background-color: rgba(233, 79, 55, 0.1);
  border-left: 4px solid var(--primary-coral);
}

.user-info,
.plan-info {
  display: flex;
  align-items: center;
}

.notes-cell {
  max-width: 150px;
  overflow: hidden;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.text-coral {
  color: var(--primary-coral) !important;
}
</style>