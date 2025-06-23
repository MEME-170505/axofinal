<template>
  <div class="plan-card" :class="{ 'popular': plan.popular }">
    <div class="plan-badge" v-if="plan.popular">
      <span>Más Popular</span>
    </div>
    
    <div class="plan-header">
      <div class="plan-image" v-if="plan.img">
        <img :src="plan.img" :alt="plan.nombre" class="img-fluid">
      </div>
      <div class="plan-icon" v-else>
        <i class="bi bi-stars"></i>
      </div>
      
      <h3 class="plan-title">{{ plan.nombre }}</h3>
      <p class="plan-description">{{ plan.descripcion }}</p>
      
      <div class="plan-price">
        <span class="price-amount">{{ plan.precio }}</span>
        <span class="price-currency" v-if="plan.moneda !== 'personalizada'">{{ plan.moneda }}</span>
        <div class="price-period">{{ plan.periodo }}</div>
      </div>
    </div>
    
    <div class="plan-features">
      <h4 class="features-title">Incluye:</h4>
      <ul class="features-list">
        <li v-for="detalle in plan.detalles" :key="detalle" class="feature-item">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ detalle }}</span>
        </li>
      </ul>
    </div>
    
    <div class="plan-footer">
      <BotonPrimario
        :variant="plan.popular ? 'primary' : 'outline-primary'"
        icon="bi bi-rocket-takeoff"
        block
        @click="$emit('solicitar')"
      >
        {{ plan.precio === 'Cotización' ? 'Solicitar Cotización' : 'Comenzar Ahora' }}
      </BotonPrimario>
    </div>
  </div>
</template>

<script setup>
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

defineProps({
  plan: {
    type: Object,
    required: true
  }
})

defineEmits(['solicitar'])
</script>

<style scoped>
.plan-card {
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

.plan-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-coral);
}

.plan-card.popular {
  border-color: var(--primary-coral);
  transform: scale(1.05);
}

.plan-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.plan-badge {
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

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-image {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-coral);
}

.plan-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plan-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
}

.plan-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.plan-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.plan-price {
  margin-bottom: 1rem;
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-coral);
}

.price-currency {
  font-size: 1.2rem;
  color: var(--primary-coral);
  margin-left: 0.5rem;
}

.price-period {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.plan-features {
  flex: 1;
  margin-bottom: 2rem;
}

.features-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
}

.feature-item i {
  color: var(--primary-coral);
  margin-right: 0.75rem;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.feature-item span {
  color: #333;
  line-height: 1.4;
}

.plan-footer {
  margin-top: auto;
}

@media (max-width: 768px) {
  .plan-card {
    padding: 1.5rem;
  }
  
  .plan-card.popular {
    transform: none;
  }
  
  .plan-card.popular:hover {
    transform: translateY(-5px);
  }
  
  .plan-title {
    font-size: 1.5rem;
  }
  
  .price-amount {
    font-size: 2rem;
  }
}
</style>