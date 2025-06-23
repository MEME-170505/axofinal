<template>
  <div class="lista-servicios">
    <SectionHeader
      v-if="showHeader"
      :title="title"
      :subtitle="subtitle"
      :icon="headerIcon"
    />

    <div class="servicios-grid" :class="gridClasses">
      <ServicioCard
        v-for="servicio in servicios"
        :key="servicio.id || servicio.nombre"
        :servicio="servicio"
        :type="type"
        :show-solicitar="showSolicitar"
        :show-edit="showEdit"
        :show-delete="showDelete"
        @solicitar="handleSolicitar"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <div v-if="servicios.length === 0" class="empty-state text-center py-5">
      <i class="bi bi-inbox fs-1 text-muted mb-3"></i>
      <h5 class="text-muted">{{ emptyMessage }}</h5>
      <p class="text-muted">{{ emptyDescription }}</p>
      <BotonPrimario
        v-if="showCreateButton"
        variant="primary"
        icon="bi bi-plus-circle"
        @click="handleCreate"
      >
        {{ createButtonText }}
      </BotonPrimario>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from './SectionHeader.vue'
import ServicioCard from './ServicioCard.vue'
import BotonPrimario from './BotonPrimario.vue'

const props = defineProps({
  servicios: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  headerIcon: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'service',
    validator: (value) => ['plan', 'service', 'admin'].includes(value)
  },
  columns: {
    type: Number,
    default: 3,
    validator: (value) => [1, 2, 3, 4].includes(value)
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showSolicitar: {
    type: Boolean,
    default: true
  },
  showEdit: {
    type: Boolean,
    default: false
  },
  showDelete: {
    type: Boolean,
    default: false
  },
  showCreateButton: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'No hay servicios disponibles'
  },
  emptyDescription: {
    type: String,
    default: 'Agrega servicios para comenzar'
  },
  createButtonText: {
    type: String,
    default: 'Crear Servicio'
  }
})

const emit = defineEmits(['solicitar', 'edit', 'delete', 'create'])

const gridClasses = computed(() => {
  const classes = ['row', 'g-4']
  
  switch (props.columns) {
    case 1:
      classes.push('row-cols-1')
      break
    case 2:
      classes.push('row-cols-1', 'row-cols-md-2')
      break
    case 3:
      classes.push('row-cols-1', 'row-cols-md-2', 'row-cols-lg-3')
      break
    case 4:
      classes.push('row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'row-cols-xl-4')
      break
  }
  
  return classes.join(' ')
})

const handleSolicitar = (servicio) => {
  emit('solicitar', servicio)
}

const handleEdit = (servicio) => {
  emit('edit', servicio)
}

const handleDelete = (servicio) => {
  emit('delete', servicio)
}

const handleCreate = () => {
  emit('create')
}
</script>

<style scoped>
.lista-servicios {
  margin-bottom: 2rem;
}

.servicios-grid {
  margin-bottom: 2rem;
}

.servicios-grid .col-1,
.servicios-grid .col-md-2,
.servicios-grid .col-lg-3,
.servicios-grid .col-xl-4 {
  display: flex;
}

.empty-state {
  background: #f8f9fa;
  border-radius: 16px;
  border: 2px dashed #dee2e6;
  margin: 2rem 0;
}

.empty-state:hover {
  border-color: var(--primary-coral);
  background: rgba(233, 79, 55, 0.05);
}
</style>