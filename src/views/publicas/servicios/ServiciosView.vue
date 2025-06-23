<template>
  <div class="servicios-view">
    <!-- Hero Section -->
    <HeroServicios />
    
    <!-- Planes Section -->
    <PlanesSection 
      :planes="planes"
      @solicitar="handleSolicitarPlan"
    />
    
    <!-- Servicios Individuales Section -->
    <ServiciosIndividualesSection 
      :servicios="servicios"
      @solicitar="handleSolicitarServicio"
    />
    
    <!-- CTA Section -->
    <CTASection />

    <!-- Modal de Solicitud -->
    <SolicitudModal
      v-if="showSolicitudModal"
      :show="showSolicitudModal"
      :item="selectedItem"
      :type="selectedType"
      @close="showSolicitudModal = false"
      @submit="handleSolicitudSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroServicios from './components/HeroServicios.vue'
import PlanesSection from './components/PlanesSection.vue'
import ServiciosIndividualesSection from './components/ServiciosIndividualesSection.vue'
import CTASection from './components/CTASection.vue'
import SolicitudModal from '../../../components/modals/SolicitudModal.vue'
import { useAlert } from '../../../composables/useAlert'

const { showSuccess } = useAlert()

const showSolicitudModal = ref(false)
const selectedItem = ref(null)
const selectedType = ref('')

const planes = ref([
  {
    id: 1,
    nombre: "Plan Huevo",
    img: "https://i.pinimg.com/736x/42/0b/89/420b893aae646c2488bc67fb406421bc.jpg",
    detalles: [
      "Diseño UI/UX profesional",
      "5 páginas web optimizadas",
      "Correo empresarial (50 cuentas)",
      "Hosting incluido por 1 año",
      "Soporte técnico 24/7"
    ],
    precio: "min.$15,000     -     max.$20,000",
    moneda: "MXN",
    periodo: "Pago único mensual",
    popular: false,
    descripcion: "Perfecto para pequeñas empresas que inician su presencia digital"
  },
  {
    id: 2,
    nombre: "Plan Ajolote",
    img: "https://i.pinimg.com/736x/f2/7f/2f/f27f2f084c6428348baae8ccb631e75f.jpg",
    detalles: [
      "Todo lo del Plan Huevo",
      "Páginas web ilimitadas",
      "Marketing Digital especializado",
      "Automatizaciones avanzadas",
      "Analytics y reportes",
      "SEO optimización",
      "Integración redes sociales"
    ],
    
    precio: "$3,000 - $8,000 MXN",
    moneda: "MXN",
    periodo: "Pago único mensual",
    popular: true,
    descripcion: "La solución completa para empresas en crecimiento"
  },
  {
    id: 3,
    nombre: "Plan Alebrije",
    img: "https://i.pinimg.com/736x/88/4a/8e/884a8ed8ebfa49841a40ab82b1b70965.jpg",
    detalles: [
      "Desarrollo completamente personalizado",
      "Consultoría especializada",
      "Funcionalidades a medida",
      "Integración con sistemas existentes",
      "Soporte dedicado",
      "Escalabilidad empresarial"
    ],
    precio: "Cotización",
    moneda: "personalizada",
    periodo: "Según necesidades",
    popular: false,
    descripcion: "Solución empresarial totalmente personalizada"
  }
])

const servicios = ref([
  {
    id: 1,
    title: "Desarrollo de E-commerce",
    description: "Tienda en línea completa con pasarela de pagos, gestión de inventario y panel administrativo",
    price: "por asignar",
    moneda: "MXN",
    icon: "bi bi-cart-check",
    categoria: "Desarrollo",
    tiempo: "depende del proyecto",
    incluye: ["Diseño responsivo", "Pasarela de pagos", "Panel admin", "SEO básico"]
  },
  {
    id: 2,
    title: "Automatización de Procesos",
    description: "Automatiza tareas repetitivas y optimiza flujos de trabajo para mayor eficiencia",
    price: "$8,000",
    moneda: "MXN",
    icon: "bi bi-robot",
    categoria: "Automatización",
    tiempo: "depende del proyecto",
    incluye: ["Análisis de procesos", "Configuración", "Capacitación", "Soporte"]
  },
  {
    id: 3,
    title: "Email Marketing",
    description: "Campañas de correo electrónico estratégicas que convierten visitantes en clientes",
    price: "$5,000",
    moneda: "MXN",
    icon: "bi bi-envelope-heart",
    categoria: "Marketing",
    tiempo: "1-2 semanas",
    incluye: ["Estrategia", "Diseño de emails", "Automatización", "Reportes"]
  },
  {
    id: 4,
    title: "Diseño UI/UX",
    description: "Interfaces atractivas y funcionales que mejoran la experiencia del usuario",
    price: "$8,000",
    moneda: "MXN",
    icon: "bi bi-palette",
    categoria: "Diseño",
    tiempo: "depende del proyecto",
    incluye: ["Research", "Wireframes", "Prototipos", "Guía de estilo"]
  },
  {
    id: 5,
    title: "Marketing Digital",
    description: "Estrategias integrales de marketing digital para hacer crecer tu negocio",
    price: "$8,000",
    moneda: "MXN",
    icon: "bi bi-megaphone",
    categoria: "Marketing",
    tiempo: "Continuo",
    incluye: ["Estrategia", "Contenido", "Publicidad", "Analytics"]
  },
  {
    id: 6,
    title: "Consultoría Digital",
    description: "Asesoría especializada para transformar digitalmente tu empresa",
    price: "$6,000",
    moneda: "MXN",
    icon: "bi bi-lightbulb",
    categoria: "Consultoría",
    tiempo: "depende del proyecto",
    incluye: ["Auditoría", "Estrategia", "Roadmap", "Recomendaciones"]
  }
])

const handleSolicitarPlan = (plan) => {
  selectedItem.value = plan
  selectedType.value = 'plan'
  showSolicitudModal.value = true
}

const handleSolicitarServicio = (servicio) => {
  selectedItem.value = servicio
  selectedType.value = 'servicio'
  showSolicitudModal.value = true
}

const handleSolicitudSubmit = (solicitudData) => {
  // Crear mensaje para WhatsApp
  const mensaje = crearMensajeWhatsApp(solicitudData)
  
  // Enviar a WhatsApp
  enviarWhatsApp(mensaje)
  
  showSuccess(
    'Solicitud enviada',
    `Tu solicitud para ${solicitudData.itemName} ha sido enviada. Te contactaremos pronto.`
  )
  showSolicitudModal.value = false
}

const crearMensajeWhatsApp = (data) => {
  const tipo = data.type === 'plan' ? 'Plan' : 'Servicio'
  
  let mensaje = `🌟 *Nueva Solicitud de ${tipo}* 🌟\n\n`
  mensaje += `📋 *${tipo}:* ${data.itemName}\n`
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
.servicios-view {
  background-color: var(--primary-beige);
}
</style>