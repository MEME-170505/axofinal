<template>
  <!-- ===== COMPONENTE BOTÓN REUTILIZABLE ===== -->
  <!-- Botón personalizable con diferentes variantes, tamaños e iconos -->
  <button 
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Spinner de carga cuando loading=true -->
    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
    <!-- Icono opcional -->
    <i v-else-if="icon" :class="icon + ' me-2'"></i>
    <!-- Contenido del botón -->
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

// ===== PROPS DEL COMPONENTE =====
const props = defineProps({
  // Variante del botón (colores)
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline-primary', 'outline-secondary'].includes(value)
  },
  // Tamaño del botón
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  // Tipo de botón HTML
  type: {
    type: String,
    default: 'button'
  },
  // Estado deshabilitado
  disabled: {
    type: Boolean,
    default: false
  },
  // Estado de carga
  loading: {
    type: Boolean,
    default: false
  },
  // Icono opcional (clase de Bootstrap Icons)
  icon: {
    type: String,
    default: ''
  },
  // Bordes redondeados
  rounded: {
    type: Boolean,
    default: false
  },
  // Ancho completo
  block: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

// ===== CLASES CSS DINÁMICAS =====
const buttonClasses = computed(() => {
  const classes = ['btn', `btn-${props.variant}`]
  
  // Agregar clase de tamaño si no es el default
  if (props.size !== 'md') {
    classes.push(`btn-${props.size}`)
  }
  
  // Agregar clase de bordes redondeados
  if (props.rounded) {
    classes.push('rounded-pill')
  }
  
  // Agregar clase de ancho completo
  if (props.block) {
    classes.push('w-100')
  }
  
  return classes.join(' ')
})

// ===== MANEJO DE CLICKS =====
const handleClick = (event) => {
  // Solo emitir click si no está deshabilitado o cargando
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* ===== ESTILOS DEL BOTÓN ===== */
.btn {
  transition: all 0.3s ease; /* Transición suave para efectos hover */
}

/* Efecto hover con elevación */
.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Colores personalizados para botón primario */
.btn-primary {
  background-color: var(--primary-coral);
  border-color: var(--primary-coral);
}

.btn-primary:hover {
  background-color: #d73c26;
  border-color: #d73c26;
}
</style>