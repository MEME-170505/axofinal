<template>
  <div class="servicio-card">
    <div class="servicio-header">
      <div class="servicio-icon">
        <i :class="servicio.icon"></i>
      </div>
      <div class="servicio-categoria">{{ servicio.categoria }}</div>
    </div>
    
    <div class="servicio-content">
      <h3 class="servicio-title">{{ servicio.title }}</h3>
      <p class="servicio-description">{{ servicio.description }}</p>
      
      <div class="servicio-details">
        <div class="detail-item">
          <i class="bi bi-clock"></i>
          <span>{{ servicio.tiempo }}</span>
        </div>
        <div class="detail-item">
          <i class="bi bi-currency-dollar"></i>
          <span>{{ servicio.price }} {{ servicio.moneda }}</span>
        </div>
      </div>
      
      <div class="servicio-incluye">
        <h4>Incluye:</h4>
        <ul>
          <li v-for="item in servicio.incluye" :key="item">
            <i class="bi bi-check2"></i>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="servicio-footer">
      <BotonPrimario
        variant="primary"
        icon="bi bi-arrow-right"
        block
        @click="$emit('solicitar')"
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
.servicio-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.servicio-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-coral), #d73c26);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.servicio-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.servicio-card:hover::before {
  transform: scaleX(1);
}

.servicio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.servicio-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.servicio-categoria {
  background: rgba(233, 79, 55, 0.1);
  color: var(--primary-coral);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.servicio-content {
  flex: 1;
  margin-bottom: 2rem;
}

.servicio-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.servicio-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.servicio-details {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.detail-item i {
  color: var(--primary-coral);
}

.servicio-incluye h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 0.75rem;
}

.servicio-incluye ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.servicio-incluye li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.servicio-incluye i {
  color: var(--primary-coral);
  font-weight: 600;
}

.servicio-footer {
  margin-top: auto;
}

@media (max-width: 768px) {
  .servicio-card {
    padding: 1.5rem;
  }
  
  .servicio-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .servicio-details {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .servicio-title {
    font-size: 1.25rem;
  }
}
</style>