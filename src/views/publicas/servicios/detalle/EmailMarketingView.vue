<template>
  <div class="servicio-detalle-view">
    <!-- Hero Section -->
    <section class="hero-detalle">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content animate__animated animate__fadeInLeft">
              <div class="breadcrumb-nav mb-3">
                <router-link to="/servicios" class="breadcrumb-link">
                  <i class="bi bi-arrow-left me-2"></i>Volver a Servicios
                </router-link>
              </div>
              <h1 class="hero-title">Email Marketing Estratégico</h1>
              <p class="hero-subtitle">
                Campañas de correo electrónico que convierten suscriptores en clientes fieles.
              </p>
              <div class="price-range">
                <span class="price-label">Precio desde:</span>
                <span class="price-amount">$3,000 - $8,000 MXN</span>
              </div>
              <BotonPrimario
                variant="primary"
                size="lg"
                icon="bi bi-whatsapp"
                @click="solicitarServicio"
              >
                Solicitar Cotización
              </BotonPrimario>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-visual animate__animated animate__fadeInRight">
              <img 
                src="https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg" 
                alt="Email Marketing" 
                class="img-fluid rounded-4 shadow-lg"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <div class="container">
        <SectionHeader
          title="¿Por Qué Email Marketing?"
          subtitle="La herramienta más efectiva para mantener contacto con tus clientes"
          color="purple"
        />
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="(benefit, index) in benefits" :key="index">
            <div class="benefit-card animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="benefit-icon">
                <i :class="benefit.icon"></i>
              </div>
              <h4>{{ benefit.title }}</h4>
              <p>{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <SectionHeader
          title="Nuestros Servicios de Email Marketing"
          subtitle="Soluciones completas para cada necesidad"
          color="coral"
        />
        
        <div class="row g-4">
          <div class="col-lg-4" v-for="(servicio, index) in servicios" :key="index">
            <ServicioEmailCard 
              :servicio="servicio"
              @solicitar="solicitarServicioEspecifico"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <div class="container">
        <SectionHeader
          title="Nuestro Proceso de Email Marketing"
          subtitle="Metodología probada para maximizar tus conversiones"
          color="blue"
        />
        
        <div class="process-timeline">
          <div class="row">
            <div class="col-md-6 col-lg-3" v-for="(step, index) in processSteps" :key="index">
              <div class="process-step animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.2}s` }">
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
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="cta-title">¿Listo para Aumentar tus Ventas?</h2>
            <p class="cta-subtitle">
              Comienza tu estrategia de email marketing hoy y ve resultados inmediatos
            </p>
            <div class="cta-buttons">
              <BotonPrimario
                variant="primary"
                size="lg"
                icon="bi bi-whatsapp"
                @click="solicitarServicio"
              >
                Contactar por WhatsApp
              </BotonPrimario>
              <BotonPrimario
                variant="outline-primary"
                size="lg"
                icon="bi bi-telephone"
                @click="llamarDirecto"
              >
                Llamar Ahora
              </BotonPrimario>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de Solicitud -->
    <SolicitudModal
      v-if="showSolicitudModal"
      :show="showSolicitudModal"
      :item="selectedItem"
      type="servicio"
      @close="showSolicitudModal = false"
      @submit="handleSolicitudSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '../../../../components/ui/SectionHeader.vue'
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'
import ServicioEmailCard from '../components/ServicioEmailCard.vue'
import SolicitudModal from '../../../../components/modals/SolicitudModal.vue'
import { useAlert } from '../../../../composables/useAlert'

const { showSuccess } = useAlert()

const showSolicitudModal = ref(false)
const selectedItem = ref(null)

const benefits = ref([
  {
    icon: 'bi bi-graph-up-arrow',
    title: 'ROI Alto',
    description: 'Hasta 4200% de retorno de inversión promedio'
  },
  {
    icon: 'bi bi-people',
    title: 'Alcance Directo',
    description: 'Llega directamente a la bandeja de entrada'
  },
  {
    icon: 'bi bi-target',
    title: 'Segmentación',
    description: 'Mensajes personalizados para cada audiencia'
  },
  {
    icon: 'bi bi-bar-chart',
    title: 'Métricas Claras',
    description: 'Resultados medibles y reportes detallados'
  }
])

const servicios = ref([
  {
    id: 1,
    nombre: 'Básico',
    precio: '$3,000 - $5,000',
    descripcion: 'Perfecto para empezar',
    caracteristicas: [
      'Hasta 1,000 contactos',
      '4 campañas mensuales',
      'Plantillas básicas',
      'Reportes básicos',
      'Soporte por email'
    ],
    popular: false
  },
  {
    id: 2,
    nombre: 'Profesional',
    precio: '$5,000 - $8,000',
    descripcion: 'Para empresas en crecimiento',
    caracteristicas: [
      'Hasta 5,000 contactos',
      '8 campañas mensuales',
      'Plantillas personalizadas',
      'Automatizaciones',
      'Segmentación avanzada',
      'Reportes detallados',
      'Soporte prioritario'
    ],
    popular: true
  },
  {
    id: 3,
    nombre: 'Empresarial',
    precio: 'Cotización',
    descripción: 'Solución completa',
    caracteristicas: [
      'Contactos ilimitados',
      'Campañas ilimitadas',
      'Diseño completamente personalizado',
      'Automatizaciones avanzadas',
      'Integración con CRM',
      'A/B Testing',
      'Consultor dedicado'
    ],
    popular: false
  }
])

const processSteps = ref([
  {
    icon: 'bi bi-bullseye',
    title: 'Estrategia',
    description: 'Definimos objetivos y audiencia objetivo'
  },
  {
    icon: 'bi bi-palette',
    title: 'Diseño',
    description: 'Creamos plantillas atractivas y efectivas'
  },
  {
    icon: 'bi bi-send',
    title: 'Ejecución',
    description: 'Enviamos campañas optimizadas'
  },
  {
    icon: 'bi bi-graph-up',
    title: 'Optimización',
    description: 'Analizamos y mejoramos resultados'
  }
])

const solicitarServicio = () => {
  selectedItem.value = {
    title: 'Email Marketing Estratégico',
    price: '$3,000 - $8,000 MXN',
    description: 'Campañas de email marketing profesionales'
  }
  showSolicitudModal.value = true
}

const solicitarServicioEspecifico = (servicio) => {
  selectedItem.value = {
    title: `Email Marketing ${servicio.nombre}`,
    price: servicio.precio + ' MXN',
    description: servicio.descripcion
  }
  showSolicitudModal.value = true
}

const llamarDirecto = () => {
  window.location.href = 'tel:+528714742958'
}

const handleSolicitudSubmit = (solicitudData) => {
  const mensaje = crearMensajeWhatsApp(solicitudData)
  enviarWhatsApp(mensaje)
  
  showSuccess(
    'Solicitud enviada',
    'Tu solicitud ha sido enviada. Te contactaremos pronto.'
  )
  showSolicitudModal.value = false
}

const crearMensajeWhatsApp = (data) => {
  let mensaje = `📧 *Solicitud de Email Marketing* 📧\n\n`
  mensaje += `📋 *Servicio:* ${data.itemName}\n`
  mensaje += `💰 *Precio:* ${data.itemPrice}\n\n`
  mensaje += `👤 *Datos del Cliente:*\n`
  mensaje += `• Nombre: ${data.nombre} ${data.apellido}\n`
  mensaje += `• Email: ${data.email}\n`
  mensaje += `• Teléfono: ${data.telefono}\n`
  
  if (data.empresa) {
    mensaje += `• Empresa: ${data.empresa}\n`
  }
  
  if (data.mensaje) {
    mensaje += `\n💬 *Mensaje adicional:*\n${data.mensaje}\n`
  }
  
  mensaje += `\n📅 *Fecha:* ${new Date().toLocaleDateString('es-MX')}`
  
  return mensaje
}

const enviarWhatsApp = (mensaje) => {
  const numeroWhatsApp = '528714742958'
  const mensajeCodificado = encodeURIComponent(mensaje)
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`
  
  window.open(url, '_blank')
}
</script>

<style scoped>
.servicio-detalle-view {
  background-color: var(--primary-beige);
}

.hero-detalle {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary-purple) 0%, #7c4dff 100%);
  color: white;
}

.breadcrumb-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.breadcrumb-link:hover {
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.price-range {
  margin-bottom: 2rem;
}

.price-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.price-amount {
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
}

.benefits-section {
  padding: 80px 0;
  background: white;
}

.benefit-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  height: 100%;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.benefit-icon {
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

.benefit-card h4 {
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 1rem;
}

.benefit-card p {
  color: #666;
  line-height: 1.6;
}

.services-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.process-section {
  padding: 80px 0;
  background: white;
}

.process-step {
  text-align: center;
  position: relative;
  padding: 2rem 1rem;
}

.step-number {
  position: absolute;
  top: 0;
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
  margin: 2rem 0 1rem;
}

.step-icon i {
  font-size: 3rem;
  color: var(--primary-blue);
}

.process-step h5 {
  color: var(--primary-purple);
  margin-bottom: 1rem;
  font-weight: 600;
}

.process-step p {
  color: #666;
}

.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, #2a4a6b 100%);
  color: white;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .price-amount {
    font-size: 1.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .hero-detalle {
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .benefits-section,
  .services-section,
  .process-section {
    padding: 60px 0;
  }
  
  .cta-section {
    padding: 60px 0;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>