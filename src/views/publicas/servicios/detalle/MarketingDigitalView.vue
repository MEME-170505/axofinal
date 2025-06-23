<template>
  <div class="marketing-digital-page">
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
            <li class="breadcrumb-item active" aria-current="page">Marketing Digital</li>
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
              <i class="bi bi-megaphone display-1"></i>
            </div>
            <h1 class="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
              Marketing Digital
            </h1>
            <p class="lead mb-5 animate__animated animate__fadeIn">
              Impulsa tu negocio con estrategias digitales que generan resultados reales
            </p>
            <div class="price-range animate__animated animate__fadeInUp">
              <span class="price-label">Desde</span>
              <span class="price-amount">$8,000 - $20,000 MXN</span>
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
            <h2 class="mb-4">Estrategias de Marketing que Funcionan</h2>
            <p class="lead mb-4">
              Desarrollamos campañas de marketing digital personalizadas que conectan 
              con tu audiencia y generan conversiones reales.
            </p>
            <div class="feature-list">
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Gestión de redes sociales profesional</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Campañas publicitarias en Google y Facebook</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Content marketing y creación de contenido</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill text-success me-3"></i>
                <span>Análisis y reportes de rendimiento</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6 animate__animated animate__fadeInRight">
            <div class="service-image">
              <img 
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg" 
                alt="Marketing Digital" 
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
        <h2 class="text-center mb-5">Paquetes de Marketing Digital</h2>
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

    <!-- CTA Section -->
    <div class="cta-section py-5">
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="mb-4">¿Listo para hacer crecer tu negocio?</h2>
            <p class="mb-4">
              Comienza hoy con una estrategia de marketing digital que genere resultados reales
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
    descripcion: 'Ideal para emprendedores',
    caracteristicas: [
      'Gestión de 2 redes sociales',
      '12 publicaciones mensuales',
      'Diseño básico de contenido',
      'Reportes mensuales',
      'Soporte por email'
    ],
    destacado: false
  },
  {
    nombre: 'Profesional',
    precio: '$12,000 - $18,000',
    descripcion: 'Para negocios en crecimiento',
    caracteristicas: [
      'Gestión de 4 redes sociales',
      '20 publicaciones mensuales',
      'Diseño profesional de contenido',
      'Campañas publicitarias básicas',
      'Reportes semanales',
      'Soporte prioritario'
    ],
    destacado: true
  },
  {
    nombre: 'Empresarial',
    precio: '$18,000 - $25,000',
    descripcion: 'Solución completa',
    caracteristicas: [
      'Gestión ilimitada de redes',
      'Contenido ilimitado',
      'Campañas publicitarias avanzadas',
      'Community management',
      'Reportes personalizados',
      'Consultor dedicado'
    ],
    destacado: false
  }
]);

const solicitarPaquete = (paquete) => {
  const mensaje = `¡Hola! Me interesa el paquete de Marketing Digital "${paquete.nombre}" (${paquete.precio}). Me gustaría recibir más información y una cotización personalizada.`;
  const url = `https://wa.me/528714742958?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};

const contactarWhatsApp = () => {
  const mensaje = `¡Hola! Me interesa el servicio de Marketing Digital. Me gustaría recibir más información y una cotización personalizada.`;
  const url = `https://wa.me/528714742958?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};
</script>

<style scoped>
.marketing-digital-page {
  background-color: var(--primary-beige);
}

.hero-section {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.9) 0%, rgba(249, 162, 108, 0.9) 100%);
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
}
</style>