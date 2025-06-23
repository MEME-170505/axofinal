<template>
  <div class="ecommerce-page">
    <div class="container py-5">
      <!-- Hero Section -->
      <div class="hero-section text-center mb-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="hero-icon mb-4">
              <i class="bi bi-cart-check display-1"></i>
            </div>
            <h1 class="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
              Desarrollo de E-commerce
            </h1>
            <p class="lead mb-4 animate__animated animate__fadeIn">
              Crea tu tienda en línea profesional y comienza a vender en internet
            </p>
            <div class="price-highlight animate__animated animate__fadeInUp">
              <span class="price-label">Precio especial:</span>
              <span class="price-amount">$8,000 - $15,000 MXN</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="features-section mb-5">
        <h2 class="text-center mb-5">¿Qué Incluye tu E-commerce?</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(feature, index) in features" :key="index">
            <div class="feature-card animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="feature-icon">
                <i :class="feature.icon"></i>
              </div>
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Packages Section -->
      <div class="packages-section mb-5">
        <h2 class="text-center mb-5">Paquetes de E-commerce</h2>
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
            <h2 class="mb-4">¿Listo para tu Tienda en Línea?</h2>
            <p class="mb-4">
              Comienza a vender en línea hoy mismo con una tienda profesional
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

const features = ref([
  {
    icon: 'bi bi-cart-plus',
    title: 'Carrito de Compras',
    description: 'Sistema completo de carrito con cálculo automático de totales'
  },
  {
    icon: 'bi bi-credit-card',
    title: 'Pasarela de Pagos',
    description: 'Integración con PayPal, Stripe y pagos con tarjeta'
  },
  {
    icon: 'bi bi-box-seam',
    title: 'Gestión de Inventario',
    description: 'Control completo de productos, stock y categorías'
  },
  {
    icon: 'bi bi-truck',
    title: 'Envíos',
    description: 'Cálculo automático de costos de envío por zona'
  },
  {
    icon: 'bi bi-phone',
    title: 'Diseño Responsivo',
    description: 'Optimizado para móviles, tablets y desktop'
  },
  {
    icon: 'bi bi-shield-check',
    title: 'Seguridad SSL',
    description: 'Certificado de seguridad para proteger las transacciones'
  }
]);

const paquetes = ref([
  {
    nombre: 'Básico',
    precio: '$8,000 - $10,000',
    descripcion: 'Perfecto para empezar',
    caracteristicas: [
      'Hasta 50 productos',
      'Diseño responsivo',
      'Carrito de compras',
      'Pasarela de pagos básica',
      'Panel de administración',
      'Hosting por 1 año'
    ],
    popular: false
  },
  {
    nombre: 'Profesional',
    precio: '$10,000 - $12,000',
    descripcion: 'Para negocios en crecimiento',
    caracteristicas: [
      'Hasta 200 productos',
      'Diseño personalizado',
      'Múltiples pasarelas de pago',
      'Sistema de cupones',
      'Gestión de inventario avanzada',
      'SEO optimizado',
      'Hosting premium por 1 año'
    ],
    popular: true
  },
  {
    nombre: 'Empresarial',
    precio: '$12,000 - $15,000',
    descripcion: 'Solución completa',
    caracteristicas: [
      'Productos ilimitados',
      'Diseño completamente personalizado',
      'Integración con sistemas externos',
      'Multi-idioma y multi-moneda',
      'Reportes avanzados',
      'Soporte prioritario',
      'Hosting empresarial por 1 año'
    ],
    popular: false
  }
]);

const solicitarPaquete = (paquete) => {
  const mensaje = `¡Hola! Me interesa el paquete de E-commerce "${paquete.nombre}" (${paquete.precio}). Me gustaría recibir más información y una cotización personalizada.`;
  const url = `https://wa.me/528714742958?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};

const contactarWhatsApp = () => {
  const mensaje = `¡Hola! Me interesa el desarrollo de una tienda en línea (E-commerce). Me gustaría recibir más información y una cotización personalizada.`;
  const url = `https://wa.me/528714742958?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};
</script>

<style scoped>
.ecommerce-page {
  background-color: var(--primary-beige);
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
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

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.feature-icon {
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

.feature-card h4 {
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-card p {
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
  border-color: var(--primary-coral);
}

.package-card.popular {
  border-color: var(--primary-coral);
  transform: scale(1.05);
}

.package-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.package-badge {
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
  color: var(--primary-coral);
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
  color: var(--primary-coral);
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