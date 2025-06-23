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
      <PaymentStatusBadge :status="pago.status" />
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
      <PaymentActionButtons
        :payment="pago"
        :show-liquidar="showLiquidar"
        :show-abonar="showAbonar"
        :show-view="showView"
        :show-edit="showEdit"
        :show-delete="showDelete"
        @liquidar="handleLiquidar"
        @abonar="handleAbonar"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </td>
  </tr>
</template>

<script setup>
import PaymentStatusBadge from './PaymentStatusBadge.vue'
import PaymentActionButtons from './PaymentActionButtons.vue'

const props = defineProps({
  pago: {
    type: Object,
    required: true
  },
  isHighlighted: {
    type: Boolean,
    default: false
  },
  showLiquidar: {
    type: Boolean,
    default: true
  },
  showAbonar: {
    type: Boolean,
    default: true
  },
  showView: {
    type: Boolean,
    default: true
  },
  showEdit: {
    type: Boolean,
    default: true
  },
  showDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['liquidar', 'abonar', 'view', 'edit', 'delete'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX')
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const handleLiquidar = (payment) => {
  emit('liquidar', payment)
}

const handleAbonar = (payment) => {
  emit('abonar', payment)
}

const handleView = (payment) => {
  emit('view', payment)
}

const handleEdit = (payment) => {
  emit('edit', payment)
}

const handleDelete = (payment) => {
  emit('delete', payment)
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

.text-coral {
  color: var(--primary-coral) !important;
}
</style>
</template>