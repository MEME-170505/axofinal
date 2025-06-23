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
              <h1 class="hero-title">Desarrollo Web Profesional</h1>
              <p class="hero-subtitle">
                Creamos sitios web modernos, responsivos y optimizados que convierten visitantes en clientes.
              </p>
              <div class="price-range">
                <span class="price-label">Precio desde:</span>
                <span class="price-amount">$8,000 - $25,000 MXN</span>
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
                src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg" 
                alt="Desarrollo Web" 
                class="img-fluid rounded-4 shadow-lg"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <SectionHeader
          title="¿Qué Incluye Nuestro Desarrollo Web?"
          subtitle="Soluciones completas para tu presencia digital"
          color="coral"
        />
        
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
    </section>

    <!-- Packages Section -->
    <section class="packages-section">
      <div class="container">
        <SectionHeader
          title="Paquetes de Desarrollo Web"
          subtitle="Elige el paquete que mejor se adapte a tus necesidades"
          color="blue"
        />
        
        <div class="row g-4">
          <div class="col-lg-4" v-for="(paquete, index) in paquetes" :key="index">
            <PaqueteCard 
              :paquete="paquete"
              @solicitar="solicitarPaquete"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <div class="container">
        <SectionHeader
          title="Nuestro Proceso de Desarrollo"
          subtitle="Metodología probada para garantizar el éxito de tu proyecto"
          color="coral"
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
            <h2 class="cta-title">¿Listo para tu Nuevo Sitio Web?</h2>
            <p class="cta-subtitle">
              Comienza tu proyecto hoy y lleva tu negocio al siguiente nivel digital
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
import PaqueteCard from '../components/PaqueteCard.vue'
import SolicitudModal from '../../../../components/modals/SolicitudModal.vue'
import { useAlert } from '../../../../composables/useAlert'

const { showSuccess } = useAlert()

const showSolicitudModal = ref(false)
const selectedItem = ref(null)

const features = ref([
  {
    icon: 'bi bi-phone',
    title: 'Diseño Responsivo',
    description: 'Tu sitio se verá perfecto en todos los dispositivos: móviles, tablets y desktop.'
  },
  {
    icon: 'bi bi-speedometer2',
    title: 'Optimización SEO',
    description: 'Configuración completa para que tu sitio aparezca en los primeros resultados de Google.'
  },
  {
    icon: 'bi bi-shield-check',
    title: 'Seguridad Avanzada',
    description: 'Certificados SSL, copias de seguridad automáticas y protección contra malware.'
  },
  {
    icon: 'bi bi-gear',
    title: 'Panel de Administración',
    description: 'Gestiona tu contenido fácilmente con un panel intuitivo y fácil de usar.'
  },
  {
    icon: 'bi bi-graph-up',
    title: 'Analytics Integrado',
    description: 'Monitorea el rendimiento de tu sitio con Google Analytics configurado.'
  },
  {
    icon: 'bi bi-headset',
    title: 'Soporte Técnico',
    description: 'Soporte continuo para mantener tu sitio funcionando perfectamente.'
  }
])

const paquetes = ref([
  {
    id: 1,
    nombre: 'Básico',
    precio: '$8,000 - $12,000',
    descripcion: 'Perfecto para pequeños negocios',
    caracteristicas: [
      'Hasta 5 páginas',
      'Diseño responsivo',
      'Formulario de contacto',
      'Optimización SEO básica',
      'Hosting por 1 año'
    ],
    popular: false
  },
  {
    id: 2,
    nombre: 'Profesional',
    precio: '$15,000 - $20,000',
    descripcion: 'Ideal para empresas en crecimiento',
    caracteristicas: [
      'Hasta 10 páginas',
      'Diseño personalizado',
      'Blog integrado',
      'SEO avanzado',
      'Integración redes sociales',
      'Panel de administración',
      'Hosting por 1 año'
    ],
    popular: true
  },
  {
    id: 3,
    nombre: 'Empresarial',
    precio: '$25,000+',
    descripcion: 'Solución completa para grandes empresas',
    caracteristicas: [
      'Páginas ilimitadas',
      'Diseño completamente personalizado',
      'E-commerce básico',
      'SEO empresarial',
      'Múltiples idiomas',
      'Integraciones avanzadas',
      'Soporte prioritario',
      'Hosting premium por 1 año'
    ],
    popular: false
  }
])

const processSteps = ref([
  {
    icon: 'bi bi-chat-dots',
    title: 'Consulta',
    description: 'Analizamos tus necesidades y objetivos de negocio'
  },
  {
    icon: 'bi bi-palette',
    title: 'Diseño',
    description: 'Creamos mockups y prototipos de tu sitio web'
  },
  {
    icon: 'bi bi-code-slash',
    title: 'Desarrollo',
    description: 'Programamos tu sitio con las mejores tecnologías'
  },
  {
    icon: 'bi bi-rocket-takeoff',
    title: 'Lanzamiento',
    description: 'Publicamos tu sitio y te capacitamos en su uso'
  }
])

const solicitarServicio = () => {
  selectedItem.value = {
    title: 'Desarrollo Web Profesional',
    price: '$8,000 - $25,000 MXN',
    description: 'Desarrollo de sitio web profesional y responsivo'
  }
  showSolicitudModal.value = true
}

const solicitarPaquete = (paquete) => {
  selectedItem.value = {
    title: `Paquete ${paquete.nombre} - Desarrollo Web`,
    price: paquete.precio + ' MXN',
    description: paquete.descripcion
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
  let mensaje = `🌐 *Solicitud de Desarrollo Web* 🌐\n\n`
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
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
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

.features-section {
  padding: 80px 0;
  background: white;
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

.packages-section {
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
  background: var(--primary-coral);
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
  color: var(--primary-coral);
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
  
  .features-section,
  .packages-section,
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