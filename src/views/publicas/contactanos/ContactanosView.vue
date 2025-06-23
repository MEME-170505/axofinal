<template>
  <div class="contact-page">
    <div class="container py-5">
      <SectionHeader
        title="Contáctanos"
        subtitle="Solicita una cotización personalizada para tu negocio"
        icon="bi bi-envelope"
        color="coral"
        size="xl"
      />
      
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <ContactForm @submit="handleFormSubmit" />
        </div>
      </div>
      
      <!-- Información de Contacto -->
      <ContactInfo />
    </div>
  </div>
</template>

<script setup>
import SectionHeader from '../../../components/ui/SectionHeader.vue'
import ContactForm from './components/ContactForm.vue'
import ContactInfo from './components/ContactInfo.vue'
import { useAlert } from '../../../composables/useAlert'

const { showSuccess } = useAlert()

const handleFormSubmit = (formData) => {
  // Crear mensaje para WhatsApp
  const mensaje = crearMensajeContacto(formData)
  
  // Enviar a WhatsApp
  enviarWhatsApp(mensaje)
  
  showSuccess(
    'Mensaje enviado',
    'Tu mensaje ha sido enviado. Te contactaremos pronto.'
  )
}

const crearMensajeContacto = (data) => {
  let mensaje = `📞 *Nuevo Contacto desde la Web* 📞\n\n`
  mensaje += `👤 *Datos del Cliente:*\n`
  mensaje += `• Nombre: ${data.nombre} ${data.apellido}\n`
  mensaje += `• Email: ${data.email}\n`
  mensaje += `• Teléfono: ${data.telefono}\n`
  mensaje += `• Asunto: ${data.asunto}\n\n`
  mensaje += `💬 *Mensaje:*\n${data.mensaje}\n\n`
  mensaje += `📅 *Fecha:* ${new Date().toLocaleDateString('es-MX')}`
  
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
.contact-page {
  background-color: var(--primary-beige);
  min-height: 100vh;
}
</style>