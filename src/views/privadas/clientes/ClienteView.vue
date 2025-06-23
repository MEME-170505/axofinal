<template>
  <div class="cliente-view">
    <div class="container py-5 animate__animated animate__fadeIn">
      <!-- Header -->
      <ClienteHeader :usuario="usuario" />

      <!-- Navigation Tabs -->
      <ClienteNavigation 
        :active-tab="activeTab"
        @change-tab="activeTab = $event"
      />

      <!-- Content -->
      <div class="tab-content">
        <!-- Inicio Tab -->
        <ClienteInicio 
          v-if="activeTab === 'inicio'"
          :usuario="usuario"
          @update-usuario="updateUsuario"
        />

        <!-- Servicios Tab -->
        <ClienteServicios 
          v-if="activeTab === 'servicios'"
          :planes="planes"
          @renovar="renovarPlan"
          @cancelar="cancelarPlan"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ClienteHeader from './components/ClienteHeader.vue'
import ClienteNavigation from './components/ClienteNavigation.vue'
import ClienteInicio from './components/ClienteInicio.vue'
import ClienteServicios from './components/ClienteServicios.vue'
import { useAlert } from '../../../composables/useAlert'

const { showSuccess, showInfo } = useAlert()

const activeTab = ref('inicio')

const usuario = ref({
  nombre: 'Mario',
  apellido: 'González',
  telefono: '123-456-7890',
  email: 'mario@ejemplo.com',
  empresa: 'Empresa S.A. de C.V.'
})

const planes = ref([
  {
    id: 1,
    icon: 'bi bi-globe fs-4',
    nombre: 'Plan Web Básico',
    estado: 'Activo',
    fechaVencimiento: '13/06/2024'
  },
  {
    id: 2,
    icon: 'bi bi-envelope fs-4',
    nombre: 'Email Marketing Pro',
    estado: 'Por vencer',
    fechaVencimiento: '28/02/2024'
  },
  {
    id: 3,
    icon: 'bi bi-megaphone fs-4',
    nombre: 'Marketing Digital',
    estado: 'Vencido',
    fechaVencimiento: '15/01/2024'
  },
  {
    id: 4,
    icon: 'bi bi-robot fs-4',
    nombre: 'Automatización',
    estado: 'Activo',
    fechaVencimiento: '01/12/2024'
  }
])

const updateUsuario = (nuevosDatos) => {
  Object.assign(usuario.value, nuevosDatos)
  showSuccess('Datos actualizados', 'Tu información ha sido guardada exitosamente')
}

const renovarPlan = (plan) => {
  showInfo('Renovación solicitada', `Se ha solicitado la renovación del plan: ${plan.nombre}`)
  // Aquí iría la lógica para renovar el plan
}

const cancelarPlan = (plan) => {
  showInfo('Cancelación solicitada', `Se ha solicitado la cancelación del plan: ${plan.nombre}`)
  // Aquí iría la lógica para cancelar el plan
}
</script>

<style scoped>
.cliente-view {
  background-color: var(--primary-beige);
  min-height: 100vh;
}

.tab-content {
  margin-top: 2rem;
}
</style>