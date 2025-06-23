<template>
  <div class="diseno-uiux-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb-section py-3 bg-light">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none">Inicio</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/servicios" class="text-decoration-none">Servicios</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Diseño UI/UX</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="hero-section text-center py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="service-icon-hero mb-4">
              <i class="bi bi-palette display-1"></i>
            </div>
            <h1 class="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
              Diseño UI/UX
            </h1>
            <p class="lead mb-5 animate__animated animate__fadeIn">
              Creamos experiencias digitales excepcionales que conectan con tus usuarios
            </p>
            <div class="price-range animate__animated animate__fadeInUp">
              <span class="price-label">Desde</span>
              <span class="price-amount">$8,000 - $15,000 MXN</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Description -->
    <div class="service-description py-5">
      <div class="container">
        <div class="row align-items-center mb-5">
          <div class="col-lg-6 animate__animated animate__fadeInLeft">
            <h2 class="mb-4">¿Qué es el Diseño UI/UX?</h2>
            <p class="lead mb-4">
              El diseño UI/UX es la creación de interfaces digitales intuitivas y atractivas que 
              proporcionan experiencias excepcionales a los usuarios.
            </p>
            <div class="feature-list">
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Investigación de usuarios y análisis de comportamiento</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Diseño de wireframes y prototipos interactivos</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Interfaces visuales atractivas y funcionales</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Testing de usabilidad y optimización</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6 animate__animated animate__fadeInRight">
            <div class="service-image">
              <img 
                src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg" 
                alt="Diseño UI/UX" 
                class="img-fluid rounded-4 shadow"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Packages -->
    <div class="packages-section py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Paquetes de Diseño UI/UX</h2>
        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="(paquete, index) in paquetes" :key="index">
            <PaqueteCard 
              :paquete="paquete"
              :delay="index * 0.2"
              @solicitar="solicitarPaquete"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Process Section -->
    <div class="process-section py-5">
      <div class="container">
        <h2 class="text-center mb-5">Nuestro Proceso de Diseño</h2>
        <div class="row g-4">
          <div class="col-lg-3 col-md-6" v-for="(step, index) in processSteps" :key="index">
            <div class="process-step animate__animated animate__fadeInUp"
                 :style="{ animationDelay: `${index * 0.2}s` }">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-icon">
                <i :class="step.icon"></i>
              </div>
              <h5>{{ step.title }}</h5>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section py-5">
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="mb-4">¿Listo para mejorar la experiencia de tus usuarios?</h2>
            <p class="mb-4">
              Contáctanos y descubre cómo podemos transformar tu proyecto digital
            </p>
            <div class="cta-buttons">
              <button class="btn btn-primary btn-lg me-3" @click="contactarWhatsApp">
                <i class="bi bi-whatsapp me-2"></i>
                Contactar por WhatsApp
              </button>
              <router-link to="/contactanos" class="btn btn-outline-primary btn-lg">
                <i class="bi bi-envelope me-2"></i>
                Solicitar Cotización
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PaqueteCard from '../components/PaqueteCard.vue';

const paquetes = ref([
  {
    nombre: 'Básico',
    precio: '$8,000 - $12,000',
    descripcion: 'Ideal para proyectos pequeños',
    caracteristicas: [
      'Análisis de usuarios básico',
      'Wireframes de 3-5 pantallas',
      'Diseño UI de pantallas principales',
      '2 rondas de revisiones',
      'Guía de estilos básica'
    ],
    destacado: false
  },
  {
    nombre: 'Profesional',
    precio: '$12,000 - $18,000',
    descripcion: 'Para proyectos medianos',
    caracteristicas: [
      'Investigación completa de usuarios',
      'Wireframes de 8-12 pantallas',
      'Diseño UI completo',
      'Prototipo interactivo',
      '4 rondas de revisiones',
      'Guía de estilos completa',
      'Testing de usabilidad'
    ],
    destacado: true
  },
  {
    nombre: 'Premium',
    precio: '$18,000 - $25,000',
    descripcion: 'Para proyectos complejos',
    caracteristicas: [
      'Investigación avanzada de UX',
      'Wireframes ilimitados',
      'Diseño UI completo y avanzado',
      'Múltiples prototipos interactivos',
      'Revisiones ilimitadas',
      'Sistema de diseño completo',
      'Testing A/B',
      'Consultoría continua'
    ],
    destacado: false
  }
]);

const processSteps = ref([
  {
    icon: 'bi bi-search',
    title: 'Investigación',
    description: 'Analizamos a tus usuarios y competencia para entender las necesidades'
  },
  {
    icon: 'bi bi-pencil-square',
    title: 'Wireframing',
    description: 'Creamos la estructura y flujo de navegación de tu proyecto'
  },
  {
    icon: 'bi bi-palette',
    title: 'Diseño Visual',
    description: 'Desarrollamos la identidad visual y interfaces atractivas'
  },
  {
    icon: 'bi bi-play-circle',
    title: 'Prototipado',
    description: 'Creamos prototipos interactivos para validar la experiencia'
  }
]);

const solicitarPaquete = (paquete) => {
  const mensaje = `¡Hola! Me interesa el paquete de Diseño UI/UX "${paquete.nombre}" (${paquete.precio}). Me gustaría recibir más información y una cotización personalizada.`;
  const url = `https://wa.me/528714742958?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};

const contactarWhatsApp = () => {
  const mensaje = `¡Hola! Me interesa el servicio de Diseño UI/UX. Me gustaría recibir más información y una cotización personalizada.`;
  const url = `https://wa.me/528714742958?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};
</script>

<style scoped>
.diseno-uiux-page {
  background-color: var(--primary-beige);
}

.hero-section {
  background: linear-gradient(135deg, rgba(136, 87, 226, 0.9) 0%, rgba(249, 162, 108, 0.9) 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  opacity: 0.5;
}

.service-icon-hero {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(10px);
}

.price-range {
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  display: inline-block;
}

.price-label {
  font-size: 1rem;
  opacity: 0.9;
  margin-right: 0.5rem;
}

.price-amount {
  font-size: 1.5rem;
  font-weight: bold;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.service-image {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}

.service-image img {
  transition: transform 0.5s ease;
}

.service-image:hover img {
  transform: scale(1.05);
}

.process-step {
  text-align: center;
  position: relative;
  padding: 2rem 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.process-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: var(--primary-purple);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.step-icon {
  margin: 1rem 0;
}

.step-icon i {
  font-size: 3rem;
  color: var(--primary-purple);
}

.process-step h5 {
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.process-step p {
  color: #666;
  margin: 0;
}

.cta-section {
  background: linear-gradient(135deg, var(--primary-blue) 0%, #2a4a6b 100%);
  color: white;
}

.cta-buttons .btn {
  margin: 0.5rem;
}

.breadcrumb-item a {
  color: var(--primary-coral);
}

.breadcrumb-item.active {
  color: var(--primary-blue);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .service-icon-hero {
    width: 80px;
    height: 80px;
  }
  
  .price-amount {
    font-size: 1.2rem;
  }
  
  .feature-item {
    font-size: 1rem;
  }
  
  .cta-buttons .btn {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .process-step {
    margin-bottom: 2rem;
  }
}
</style>