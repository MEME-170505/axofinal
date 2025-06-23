<template>
  <div class="marketing-page">
    <div class="container py-5">
      <!-- Hero Section -->
      <div class="hero-section text-center mb-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="hero-icon mb-4">
              <i class="bi bi-megaphone display-1"></i>
            </div>
            <h1 class="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
              Marketing Digital Completo
            </h1>
            <p class="lead mb-4 animate__animated animate__fadeIn">
              Impulsa tu negocio con estrategias de marketing digital que generan resultados
            </p>
            <div class="price-highlight animate__animated animate__fadeInUp">
              <span class="price-label">Desde:</span>
              <span class="price-amount">$8,000 - $20,000 MXN</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Section -->
      <div class="services-section mb-5">
        <h2 class="text-center mb-5">Servicios de Marketing Digital</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(service, index) in services" :key="index">
            <div class="service-card animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <h4>{{ service.title }}</h4>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Packages Section -->
      <div class="packages-section mb-5">
        <h2 class="text-center mb-5">Paquetes de Marketing Digital</h2>
        <div class="row g-4">
          <div class="col-lg-4" v-for="(paquete, index) in paquetes" :key="index">
            <div class="package-card" :class="{ 'popular': paquete.popular }">
              <div class="package-badge" v-if="paquete.popular">
                <span>Más Popular</span>
              </div>
              <div class="package-header">
                <h3>{{ paquete.nombre }}</h3>
                <div class="package-price">{{ paquete.precio }}</div>
                <p>{{ paquete.descripcion }}</p>
              </div>
              <div class="package-features">
                <ul>
                  <li v-for="feature in paquete.caracteristicas" :key="feature">
                    <i class="bi bi-check-circle-fill"></i>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
              <div class="package-footer">
                <button 
                  class="btn btn-primary w-100"
                  :class="{ 'btn-outline-primary': !paquete.popular }"
                  @click="solicitarPaquete(paquete)"
                >
                  Solicitar Paquete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section text-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="mb-4">¿Listo para Hacer Crecer tu Negocio?</h2>
            <p class="mb-4">
              Comienza tu estrategia de marketing digital hoy mismo
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

const services = ref([
  {
    icon: 'bi bi-facebook',
    title: 'Redes Sociales',
    description: 'Gestión profesional de Facebook, Instagram, LinkedIn y más'
  },
  {
    icon: 'bi bi-google',
    title: 'Google Ads',
    description: 'Campañas publicitarias optimizadas en Google para máximo ROI'
  },
  {
    icon: 'bi bi-camera',
    title: 'Contenido Visual',
    description: 'Creación de contenido atractivo: fotos, videos y diseños'
  },
  {
    icon: 'bi bi-graph-up',
    title: 'Analytics',
    description: 'Análisis detallado de métricas y optimización continua'
  },
  {
    icon: 'bi bi-envelope-heart',
    title: 'Email Marketing',
    description: 'Campañas de correo electrónico que convierten'
  },
  {
    icon: 'bi bi-search',
    title: 'SEO',
    description: 'Optimización para motores de búsqueda y posicionamiento'
  }
]);

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
    popular: false
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
    popular: true
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
    popular: false
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
.marketing-page {
  background-color: var(--primary-beige);
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-purple) 0%, #7c4dff 100%);
  color: white;
  padding: 80px 0;
  border-radius: 20px;
  margin-bottom: 3rem;
}

.hero-icon {
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

.price-highlight {
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

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, #7c4dff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
}

.service-card h4 {
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 1rem;
}

.service-card p {
  color: #666;
  line-height: 1.6;
}

.package-card {
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

.package-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-purple);
}

.package-card.popular {
  border-color: var(--primary-purple);
  transform: scale(1.05);
}

.package-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.package-badge {
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

.package-header {
  text-align: center;
  margin-bottom: 2rem;
}

.package-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.package-price {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-purple);
  margin-bottom: 1rem;
}

.package-header p {
  color: #666;
  margin-bottom: 0;
}

.package-features {
  flex: 1;
  margin-bottom: 2rem;
}

.package-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.package-features li {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
}

.package-features i {
  color: var(--primary-purple);
  margin-right: 0.75rem;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.package-features span {
  color: #333;
  line-height: 1.4;
}

.package-footer {
  margin-top: auto;
}

.cta-section {
  background: linear-gradient(135deg, var(--primary-blue) 0%, #2a4a6b 100%);
  color: white;
  padding: 80px 0;
  border-radius: 20px;
}

.cta-buttons .btn {
  margin: 0.5rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .hero-icon {
    width: 80px;
    height: 80px;
  }
  
  .price-amount {
    font-size: 1.2rem;
  }
  
  .package-card.popular {
    transform: none;
  }
  
  .package-card.popular:hover {
    transform: translateY(-5px);
  }
  
  .cta-buttons .btn {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style>