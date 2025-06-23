<template>
  <span :class="badgeClasses" class="payment-status-badge">
    <i :class="statusIcon" class="me-1"></i>
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['sm', 'normal', 'lg'].includes(value)
  }
})

const badgeClasses = computed(() => {
  const baseClasses = ['badge', 'rounded-pill', 'd-inline-flex', 'align-items-center']
  
  // Size classes
  if (props.size === 'sm') {
    baseClasses.push('fs-7')
  } else if (props.size === 'lg') {
    baseClasses.push('fs-6', 'px-3', 'py-2')
  }
  
  // Status classes
  switch (props.status) {
    case 'Pagado':
    case 'Liquidado':
      baseClasses.push('bg-success')
      break
    case 'Pendiente':
      baseClasses.push('bg-danger')
      break
    case 'Abono':
      baseClasses.push('bg-warning', 'text-dark')
      break
    default:
      baseClasses.push('bg-secondary')
  }
  
  return baseClasses.join(' ')
})

const statusIcon = computed(() => {
  switch (props.status) {
    case 'Pagado':
    case 'Liquidado':
      return 'bi bi-check-circle-fill'
    case 'Pendiente':
      return 'bi bi-clock-fill'
    case 'Abono':
      return 'bi bi-cash-coin'
    default:
      return 'bi bi-question-circle-fill'
  }
})
</script>

<style scoped>
.payment-status-badge {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.fs-7 {
  font-size: 0.75rem;
}
</style>