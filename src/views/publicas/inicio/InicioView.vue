<template>
  <div class="inicio-view">
    <!-- Hero Section -->
    <HeroInicio />
    
    <!-- Services Section -->
    <ServiciosInicio />
    
    <!-- Belief Section -->
    <CreenciaSeccion />
    
    <!-- Projects Section -->
    <ProyectosSeccion />
  </div>
</template>

<script setup>
import HeroInicio from './components/HeroInicio.vue'
import ServiciosInicio from './components/ServiciosInicio.vue'
import CreenciaSeccion from './components/CreenciaSeccion.vue'
import ProyectosSeccion from './components/ProyectosSeccion.vue'
</script>

<style scoped>
.inicio-view {
  background-color: var(--primary-beige);
}
</style>