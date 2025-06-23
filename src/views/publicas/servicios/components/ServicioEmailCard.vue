<template>
  <div class="servicio-email-card" :class="{ 'popular': servicio.popular }">
    <div class="servicio-badge" v-if="servicio.popular">
      <span>Más Popular</span>
    </div>
    
    <div class="servicio-header">
      <h3 class="servicio-nombre">{{ servicio.nombre }}</h3>
      <div class="servicio-precio">{{ servicio.precio }}</div>
      <p class="servicio-descripcion">{{ servicio.descripcion }}</p>
    </div>
    
    <div class="servicio-caracteristicas">
      <ul>
        <li v-for="caracteristica in servicio.caracteristicas" :key="caracteristica">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ caracteristica }}</span>
        </li>
      </ul>
    </div>
    
    <div class="servicio-footer">
      <BotonPrimario
        :variant="servicio.popular ? 'primary' : 'outline-primary'"
        icon="bi bi-envelope"
        block
        @click="$emit('solicitar', servicio)"
      >
        Solicitar Servicio
      </BotonPrimario>
    </div>
  </div>
</template>

<script setup>
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

defineProps({
  servicio: {
    type: Object,
    required: true
  }
})

defineEmits(['solicitar'])
</script>

<style scoped>
.servicio-email-card {
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

.servicio-email-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-purple);
}

.servicio-email-card.popular {
  border-color: var(--primary-purple);
  transform: scale(1.05);
}

.servicio-email-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.servicio-badge {
  position: absolute;
  top: 20px;
  right: -30px;
  background: var(--primary-purple);
  color: white;
  padding: 8px 40px;
  transform: rotate(45deg);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.servicio-header {
  text-align: center;
  margin-bottom: 2rem;
}

.servicio-nombre {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.servicio-precio {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-purple);
  margin-bottom: 1rem;
}

.servicio-descripcion {
  color: #666;
  margin-bottom: 0;
}

.servicio-caracteristicas {
  flex: 1;
  margin-bottom: 2rem;
}

.servicio-caracteristicas ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.servicio-caracteristicas li {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
}

.servicio-caracteristicas i {
  color: var(--primary-purple);
  margin-right: 0.75rem;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.servicio-caracteristicas span {
  color: #333;
  line-height: 1.4;
}

.servicio-footer {
  margin-top: auto;
}

@media (max-width: 768px) {
  .servicio-email-card {
    padding: 1.5rem;
  }
  
  .servicio-email-card.popular {
    transform: none;
  }
  
  .servicio-email-card.popular:hover {
    transform: translateY(-5px);
  }
  
  .servicio-nombre {
    font-size: 1.5rem;
  }
  
  .servicio-precio {
    font-size: 1.75rem;
  }
}
</style>