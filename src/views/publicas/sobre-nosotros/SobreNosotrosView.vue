<template>
  <div class="about-page">
    <div class="container py-5">
      <SectionHeader
        title="Sobre Nosotros"
        subtitle="Conoce nuestra historia, misión y los valores que nos impulsan"
        icon="bi bi-people"
        color="coral"
        size="xl"
      />
      
      <!-- Misión Section -->
      <MisionSeccion />
      
      <!-- Visión Section -->
      <VisionSeccion />
      
      <!-- Filosofía Section -->
      <FilosofiaSeccion />

      <!-- Valores Section -->
      <ValoresSeccion />
    </div>
  </div>
</template>

<script setup>
import SectionHeader from '../../../components/ui/SectionHeader.vue'
import MisionSeccion from './components/MisionSeccion.vue'
import VisionSeccion from './components/VisionSeccion.vue'
import FilosofiaSeccion from './components/FilosofiaSeccion.vue'
import ValoresSeccion from './components/ValoresSeccion.vue'
</script>

<style scoped>
.about-page {
  background-color: #F9E4CF;
  min-height: 100vh;
}
</style>