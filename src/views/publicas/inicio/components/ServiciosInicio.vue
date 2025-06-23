<template>
  <section class="services-section">
    <div class="container">
      <div class="text-center">
        <h3 class="section-title">Nuestros Servicios</h3>
        <div class="title-underline"></div>
      </div>

      <div class="row justify-content-center">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="col-lg-10 mb-4"
        >
          <div class="service-row animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.2}s` }">
            <div
              class="service-icon-container"
              :style="{ backgroundColor: service.color }"
            >
              <i :class="`bi ${service.icon} service-icon`"></i>
              <span class="service-title">{{ service.shortTitle }}</span>
            </div>
            <div class="service-description">
              <p class="service-text">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    icon: 'bi-laptop',
    shortTitle: 'Desarrollo Web',
    description: 'Desarrollo de tu página y tu negocio dentro del mundo digital.',
    color: '#f76c5e',
  },
  {
    icon: 'bi-envelope-paper-heart',
    shortTitle: 'Email Marketing',
    description: 'Correos electrónicos que venden, sustentados con una estrategia orientada a resultados.',
    color: '#8857e2',
  },
  {
    icon: 'bi-palette2',
    shortTitle: 'Diseño UX/UI',
    description: 'Diseñamos el concepto de tu tienda en línea para programarla a la medida.',
    color: '#0d6efd',
  },
  {
    icon: 'bi-megaphone-fill',
    shortTitle: 'Publicidad digital',
    description: 'Implementación de publicidad creativa en redes sociales y Google.',
    color: '#0dcaf0',
  },
  {
    icon: 'bi-robot',
    shortTitle: 'Automatización',
    description: 'Implementación de Servicio de Automatización a tus tareas más comunes dentro de tu empresa.',
    color: '#ffc107',
  },
])
</script>

<style scoped>
.services-section {
  background-color: #F6F1E6;
  padding: 5rem 0;
}

.section-title {
  color: var(--primary-coral);
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.title-underline {
  height: 3px;
  width: 100px;
  background: var(--primary-coral);
  margin: 1rem auto 3rem;
}

.service-row {
  transition: var(--transition-base);
  background-color: #f6f1e6;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}

.service-row:hover {
  transform: translateX(10px);
  box-shadow: var(--shadow-md);
}

.service-icon-container {
  width: 120px;
  height: 120px;
  min-width: 120px;
  transition: var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
}

.service-icon {
  font-size: 2.5rem;
  color: white;
}

.service-title {
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 0.5rem;
  text-align: center;
}

.service-description {
  background-color: white;
  border: 2px solid var(--primary-coral);
  border-radius: 15px;
  transition: var(--transition-base);
  height: 100%;
  flex-grow: 1;
  margin-left: 1rem;
  padding: 1.5rem;
}

.service-text {
  color: var(--primary-blue);
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}

@media (max-width: 768px) {
  .service-row {
    flex-direction: column;
    text-align: center;
  }

  .service-description {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>