<template>
  <div class="payment-actions d-flex gap-2">
    <BotonPrimario
      v-if="showLiquidar && canLiquidar"
      variant="success"
      size="sm"
      icon="bi bi-check-circle"
      @click="handleLiquidar"
      :loading="loading"
    >
      Liquidar
    </BotonPrimario>
    
    <BotonPrimario
      v-if="showAbonar && canAbonar"
      variant="warning"
      size="sm"
      icon="bi bi-cash-coin"
      @click="handleAbonar"
      :loading="loading"
    >
      Abonar
    </BotonPrimario>
    
    <BotonPrimario
      v-if="showView"
      variant="outline-primary"
      size="sm"
      icon="bi bi-eye"
      @click="handleView"
      title="Ver detalles"
    >
      Ver
    </BotonPrimario>
    
    <BotonPrimario
      v-if="showEdit"
      variant="outline-secondary"
      size="sm"
      icon="bi bi-pencil"
      @click="handleEdit"
      title="Editar"
    >
      Editar
    </BotonPrimario>
    
    <BotonPrimario
      v-if="showDelete"
      variant="outline-danger"
      size="sm"
      icon="bi bi-trash"
      @click="handleDelete"
      title="Eliminar"
    >
      Eliminar
    </BotonPrimario>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BotonPrimario from './BotonPrimario.vue'

const props = defineProps({
  payment: {
    type: Object,
    required: true
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
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['liquidar', 'abonar', 'view', 'edit', 'delete'])

const canLiquidar = computed(() => {
  return ['Pendiente', 'Abono'].includes(props.payment.status)
})

const canAbonar = computed(() => {
  return ['Pendiente'].includes(props.payment.status)
})

const handleLiquidar = () => {
  emit('liquidar', props.payment)
}

const handleAbonar = () => {
  emit('abonar', props.payment)
}

const handleView = () => {
  emit('view', props.payment)
}

const handleEdit = () => {
  emit('edit', props.payment)
}

const handleDelete = () => {
  emit('delete', props.payment)
}
</script>

<style scoped>
.payment-actions {
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .payment-actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>