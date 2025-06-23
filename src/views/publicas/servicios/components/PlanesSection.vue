<template>
  <section class="planes-section">
    <div class="container">
      <SectionHeader
        title="Nuestros Planes"
        subtitle="Soluciones completas diseñadas para cada etapa de tu negocio"
        icon="bi bi-box-seam"
        color="coral"
        size="xl"
      />
      
      <div class="planes-grid">
        <div 
          v-for="(plan, index) in planes" 
          :key="plan.id"
          class="plan-card-wrapper animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <PlanCard 
            :plan="plan"
            @solicitar="$emit('solicitar', plan)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '../../../../components/ui/SectionHeader.vue'
import PlanCard from './PlanCard.vue'

defineProps({
  planes: {
    type: Array,
    required: true
  }
})

defineEmits(['solicitar'])
</script>

<style scoped>
.planes-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, var(--primary-beige) 100%);
}

.planes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .planes-section {
    padding: 60px 0;
  }
  
  .planes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
}
</style>