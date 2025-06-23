<template>
  <div class="servicio-card h-100" :class="cardClasses">
    <div class="card-body">
      <!-- Header -->
      <div class="card-header-content mb-3">
        <div v-if="servicio.image" class="service-image mb-3">
          <img :src="servicio.image" :alt="servicio.title" class="img-fluid rounded">
        </div>
        <div v-else-if="servicio.icon" class="service-icon-wrapper mb-3">
          <i :class="servicio.icon + ' service-icon'"></i>
        </div>
        
        <div class="d-flex justify-content-between align-items-start">
          <h4 class="card-title">{{ servicio.title || servicio.nombre }}</h4>
          <span v-if="servicio.price || servicio.precio" class="price-badge">
            {{ servicio.price || servicio.precio }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="card-content mb-4">
        <div v-if="servicio.detalles" v-html="servicio.detalles" class="service-details"></div>
        <p v-else-if="servicio.description || servicio.descripcion" class="service-description">
          {{ servicio.description || servicio.descripcion }}
        </p>
        <p v-if="servicio.subinfo" class="service-subinfo text-muted">
          {{ servicio.subinfo }}
        </p>
      </div>

      <!-- Actions -->
      <div class="card-actions mt-auto">
        <div class="d-flex gap-2 justify-content-center">
          <BotonPrimario
            v-if="showSolicitar"
            :variant="primaryButtonVariant"
            :icon="primaryButtonIcon"
            @click="handleSolicitar"
          >
            {{ primaryButtonText }}
          </BotonPrimario>
          
          <BotonPrimario
            v-if="showEdit"
            variant="outline-secondary"
            icon="bi bi-pencil"
            size="sm"
            @click="handleEdit"
          >
            Editar
          </BotonPrimario>
          
          <BotonPrimario
            v-if="showDelete"
            variant="outline-danger"
            icon="bi bi-trash"
            size="sm"
            @click="handleDelete"
          >
            Eliminar
          </BotonPrimario>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BotonPrimario from './BotonPrimario.vue'

const props = defineProps({
  servicio: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'plan',
    validator: (value) => ['plan', 'service', 'admin'].includes(value)
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
  }
})

const emit = defineEmits(['solicitar', 'edit', 'delete'])

const cardClasses = computed(() => {
  const classes = ['card', 'shadow-sm', 'rounded-4']
  
  if (props.type === 'admin') {
    classes.push('admin-service-card')
  } else {
    classes.push('service-card')
  }
  
  return classes.join(' ')
})

const primaryButtonText = computed(() => {
  switch (props.type) {
    case 'plan':
      return 'Solicitar mi plan'
    case 'service':
      return 'Solicitar'
    case 'admin':
      return 'Ver detalles'
    default:
      return 'Solicitar'
  }
})

const primaryButtonVariant = computed(() => {
  return props.type === 'admin' ? 'outline-primary' : 'primary'
})

const primaryButtonIcon = computed(() => {
  return props.type === 'admin' ? 'bi bi-eye' : 'bi bi-cart-plus'
})

const handleSolicitar = () => {
  emit('solicitar', props.servicio)
}

const handleEdit = () => {
  emit('edit', props.servicio)
}

const handleDelete = () => {
  emit('delete', props.servicio)
}
</script>

<style scoped>
.servicio-card {
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.servicio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.service-image img {
  max-height: 150px;
  width: 100%;
  object-fit: cover;
}

.service-icon-wrapper {
  text-align: center;
}

.service-icon {
  font-size: 3rem;
  color: var(--primary-coral);
}

.card-title {
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 0;
}

.price-badge {
  background: var(--primary-coral);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
}

.service-details {
  text-align: left;
}

.service-details ul {
  list-style: none;
  padding: 0;
}

.service-details li {
  margin-bottom: 0.5rem;
}

.service-description {
  color: #666;
  line-height: 1.6;
}

.service-subinfo {
  font-size: 0.9rem;
  font-style: italic;
}

.card-actions {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f1f3f4;
}

.admin-service-card {
  border-left: 4px solid var(--primary-coral);
}

.admin-service-card:hover {
  border-left-color: #d73c26;
}
</style>