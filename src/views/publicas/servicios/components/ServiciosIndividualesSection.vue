<template>
  <section class="servicios-individuales-section">
    <div class="container">
      <SectionHeader
        title="Servicios Individuales"
        subtitle="Soluciones específicas para necesidades puntuales de tu negocio"
        icon="bi bi-tools"
        color="blue"
        size="xl"
      />
      
      <!-- Filtros -->
      <div class="filtros-container">
        <div class="filtros-wrapper">
          <button 
            v-for="categoria in categorias"
            :key="categoria"
            class="filtro-btn"
            :class="{ 'active': categoriaActiva === categoria }"
            @click="categoriaActiva = categoria"
          >
            {{ categoria }}
          </button>
        </div>
      </div>
      
      <!-- Grid de Servicios -->
      <div class="servicios-grid">
        <div 
          v-for="(servicio, index) in serviciosFiltrados" 
          :key="servicio.id"
          class="servicio-card-wrapper animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <ServicioCard 
            :servicio="servicio"
            @solicitar="$emit('solicitar', servicio)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../../../../components/ui/SectionHeader.vue'
import ServicioCard from './ServicioCard.vue'

const props = defineProps({
  servicios: {
    type: Array,
    required: true
  }
})

defineEmits(['solicitar'])

const categoriaActiva = ref('Todos')

const categorias = computed(() => {
  const cats = ['Todos', ...new Set(props.servicios.map(s => s.categoria))]
  return cats
})

const serviciosFiltrados = computed(() => {
  if (categoriaActiva.value === 'Todos') {
    return props.servicios
  }
  return props.servicios.filter(s => s.categoria === categoriaActiva.value)
})
</script>

<style scoped>
.servicios-individuales-section {
  padding: 80px 0;
  background: white;
}

.filtros-container {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.filtros-wrapper {
  display: flex;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 50px;
  border: 2px solid var(--primary-coral);
}

.filtro-btn {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  color: var(--primary-blue);
  transition: all 0.3s ease;
  cursor: pointer;
}

.filtro-btn:hover {
  background: rgba(233, 79, 55, 0.1);
}

.filtro-btn.active {
  background: var(--primary-coral);
  color: white;
  transform: scale(1.05);
}

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .servicios-individuales-section {
    padding: 60px 0;
  }
  
  .filtros-wrapper {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .filtro-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .servicios-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
}
</style>