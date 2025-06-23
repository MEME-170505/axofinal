<template>
  <div class="contact-info-section mt-5">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="contact-card animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
          <div class="contact-icon">
            <i class="bi bi-whatsapp"></i>
          </div>
          <h4>WhatsApp</h4>
          <p>Contáctanos directamente</p>
          <BotonPrimario
            variant="outline-primary"
            icon="bi bi-whatsapp"
            @click="contactarWhatsApp"
          >
            Enviar Mensaje
          </BotonPrimario>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="contact-card animate__animated animate__fadeInUp" style="animation-delay: 0.4s">
          <div class="contact-icon">
            <i class="bi bi-envelope"></i>
          </div>
          <h4>Email</h4>
          <p>contacto@axowebdigital.com</p>
          <BotonPrimario
            variant="outline-primary"
            icon="bi bi-envelope"
            @click="enviarEmail"
          >
            Enviar Email
          </BotonPrimario>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="contact-card animate__animated animate__fadeInUp" style="animation-delay: 0.6s">
          <div class="contact-icon">
            <i class="bi bi-clock"></i>
          </div>
          <h4>Horarios</h4>
          <p>Lun - Vie: 9:00 AM - 6:00 PM</p>
          <BotonPrimario
            variant="outline-primary"
            icon="bi bi-calendar"
            @click="agendarCita"
          >
            Agendar Cita
          </BotonPrimario>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

const contactarWhatsApp = () => {
  const numeroWhatsApp = '528714742958'
  const mensaje = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre sus servicios.')
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`
  window.open(url, '_blank')
}

const enviarEmail = () => {
  window.location.href = 'mailto:contacto@axowebdigital.com?subject=Consulta sobre servicios'
}

const agendarCita = () => {
  const numeroWhatsApp = '528714742958'
  const mensaje = encodeURIComponent('¡Hola! Me gustaría agendar una cita para discutir mis necesidades digitales. ¿Cuándo tienen disponibilidad?')
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.contact-info-section {
  margin-top: 4rem;
}

.contact-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  height: 100%;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.contact-icon {
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

.contact-card h4 {
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 1rem;
}

.contact-card p {
  color: #666;
  margin-bottom: 1.5rem;
}
</style>