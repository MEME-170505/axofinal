<template>
  <!-- ===== 🎯 COMPONENTE BOTÓN REUTILIZABLE - PIEZA FUNDAMENTAL DE LA UI ===== -->
  <!-- Este botón se usa en TODA la aplicación - cambios aquí afectan GLOBALMENTE -->
  <button 
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 🔄 SPINNER DE CARGA - Feedback visual INMEDIATO al usuario -->
    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
    <!-- 🎨 ICONO OPCIONAL - Mejora la UX y hace el botón más expresivo -->
    <i v-else-if="icon" :class="icon + ' me-2'"></i>
    <!-- 📝 CONTENIDO DEL BOTÓN - Texto que viene del componente padre -->
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

// ===== 📥 PROPS DEL COMPONENTE - CONFIGURACIÓN EXTERNA =====
const props = defineProps({
  // 🎨 Variante del botón - Define el COLOR y ESTILO visual
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 'secondary', 'success', 'danger', 
      'warning', 'info', 'outline-primary', 'outline-secondary'
    ].includes(value)
  },
  // 📏 Tamaño del botón - Controla las DIMENSIONES
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  // 🏷️ Tipo de botón HTML - Comportamiento del formulario
  type: {
    type: String,
    default: 'button'
  },
  // 🚫 Estado deshabilitado - Previene interacciones
  disabled: {
    type: Boolean,
    default: false
  },
  // ⏳ Estado de carga - Muestra spinner y bloquea clicks
  loading: {
    type: Boolean,
    default: false
  },
  // 🎭 Icono opcional - Clase de Bootstrap Icons
  icon: {
    type: String,
    default: ''
  },
  // 🔘 Bordes redondeados - Estilo visual moderno
  rounded: {
    type: Boolean,
    default: false
  },
  // 📐 Ancho completo - Ocupa todo el espacio disponible
  block: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

// ===== 🎨 CLASES CSS DINÁMICAS - MAGIA DE LA REACTIVIDAD =====
const buttonClasses = computed(() => {
  const classes = ['btn', `btn-${props.variant}`]
  
  // 📏 Agregar clase de tamaño si no es el default
  if (props.size !== 'md') {
    classes.push(`btn-${props.size}`)
  }
  
  // 🔘 Agregar clase de bordes redondeados
  if (props.rounded) {
    classes.push('rounded-pill')
  }
  
  // 📐 Agregar clase de ancho completo
  if (props.block) {
    classes.push('w-100')
  }
  
  return classes.join(' ')
})

// ===== 🖱️ MANEJO DE CLICKS - CONTROL INTELIGENTE =====
const handleClick = (event) => {
  // 🛡️ Solo emitir click si NO está deshabilitado o cargando
  if (!props.disabled && !props.loading) {
    emit('click', event)
  } else {
    console.warn('🚫 Click bloqueado - Botón deshabilitado o en estado de carga')
  }
}
</script>

<style scoped>
/* ===== 🎨 ESTILOS DEL BOTÓN - IDENTIDAD VISUAL DE AXOWEB ===== */
.btn {
  transition: all 0.3s ease; /* Transición SUAVE para todos los efectos */
  font-weight: 600; /* Texto más BOLD para mejor legibilidad */
  border-radius: 8px; /* Bordes ligeramente redondeados por defecto */
}

/* 🚀 Efecto hover con elevación - Feedback visual INMEDIATO */
.btn:hover:not(:disabled) {
  transform: translateY(-2px); /* Elevación sutil */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada */
}

/* 🎯 Colores personalizados para botón primario - IDENTIDAD DE MARCA */
.btn-primary {
  background-color: var(--primary-coral); /* Color coral característico */
  border-color: var(--primary-coral);
  color: white;
}

.btn-primary:hover {
  background-color: #d73c26; /* Versión más INTENSA del coral */
  border-color: #d73c26;
  color: white;
}

/* 🔄 Animación del spinner de carga */
.spinner-border-sm {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 🚫 Estado deshabilitado */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
</style>