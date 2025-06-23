<template>
  <div class="paquete-card" :class="{ 'popular': paquete.popular }">
    <div class="paquete-badge" v-if="paquete.popular">
      <span>Más Popular</span>
    </div>
    
    <div class="paquete-header">
      <h3 class="paquete-nombre">{{ paquete.nombre }}</h3>
      <div class="paquete-precio">{{ paquete.precio }}</div>
      <p class="paquete-descripcion">{{ paquete.descripcion }}</p>
    </div>
    
    <div class="paquete-caracteristicas">
      <ul>
        <li v-for="caracteristica in paquete.caracteristicas" :key="caracteristica">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ caracteristica }}</span>
        </li>
      </ul>
    </div>
    
    <div class="paquete-footer">
      <BotonPrimario
        :variant="paquete.popular ? 'primary' : 'outline-primary'"
        icon="bi bi-arrow-right"
        block
        @click="$emit('solicitar', paquete)"
      >
        Solicitar Paquete
      </BotonPrimario>
    </div>
  </div>
</template>

<script setup>
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

defineProps({
  paquete: {
    type: Object,
    required: true
  }
})

defineEmits(['solicitar'])
</script>

<style scoped>
.paquete-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.paquete-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-coral);
}

.paquete-card.popular {
  border-color: var(--primary-coral);
  transform: scale(1.05);
}

.paquete-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.paquete-badge {
  position: absolute;
  top: 20px;
  right: -30px;
  background: var(--primary-coral);
  color: white;
  padding: 8px 40px;
  transform: rotate(45deg);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.paquete-header {
  text-align: center;
  margin-bottom: 2rem;
}

.paquete-nombre {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.paquete-precio {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-coral);
  margin-bottom: 1rem;
}

.paquete-descripcion {
  color: #666;
  margin-bottom: 0;
}

.paquete-caracteristicas {
  flex: 1;
  margin-bottom: 2rem;
}

.paquete-caracteristicas ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.paquete-caracteristicas li {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
}

.paquete-caracteristicas i {
  color: var(--primary-coral);
  margin-right: 0.75rem;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.paquete-caracteristicas span {
  color: #333;
  line-height: 1.4;
}

.paquete-footer {
  margin-top: auto;
}

@media (max-width: 768px) {
  .paquete-card {
    padding: 1.5rem;
  }
  
  .paquete-card.popular {
    transform: none;
  }
  
  .paquete-card.popular:hover {
    transform: translateY(-5px);
  }
  
  .paquete-nombre {
    font-size: 1.5rem;
  }
  
  .paquete-precio {
    font-size: 1.75rem;
  }
}
</style>