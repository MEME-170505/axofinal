<template>
  <section class="cta-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <div class="cta-content animate__animated animate__fadeInUp">
            <h2 class="cta-title">
              ¿Listo para Transformar tu Negocio?
            </h2>
            <p class="cta-subtitle">
              Únete a más de 500 empresas que ya han digitalizado sus procesos con nosotros. 
              Comienza tu transformación digital hoy mismo.
            </p>
            
            <div class="cta-buttons">
              <BotonPrimario
                variant="primary"
                size="lg"
                icon="bi bi-whatsapp"
                @click="contactarWhatsApp"
              >
                Contactar por WhatsApp
              </BotonPrimario>
              <BotonPrimario
                variant="outline-primary"
                size="lg"
                icon="bi bi-calendar-check"
                @click="agendarCita"
              >
                Agendar Consulta Gratuita
              </BotonPrimario>
            </div>
            
            <div class="cta-features">
              <div class="feature-item">
                <i class="bi bi-shield-check"></i>
                <span>Garantía de Satisfacción</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-clock"></i>
                <span>Respuesta en 24h</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-award"></i>
                <span>Calidad Certificada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

const contactarWhatsApp = () => {
  const numeroWhatsApp = '528714742958'
  const mensaje = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios digitales. ¿Podrían brindarme más información?')
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`
  window.open(url, '_blank')
}

const agendarCita = () => {
  const numeroWhatsApp = '528714742958'
  const mensaje = encodeURIComponent('¡Hola! Me gustaría agendar una consulta gratuita para conocer cómo pueden ayudar a mi negocio. ¿Cuándo tienen disponibilidad?')
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, #2a4a6b 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="rgba(255,255,255,0.05)" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></svg>') repeat;
  opacity: 0.3;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.cta-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.cta-features {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.feature-item i {
  font-size: 1.5rem;
  color: #ffd700;
}

@media (max-width: 992px) {
  .cta-section {
    padding: 80px 0;
  }
  
  .cta-title {
    font-size: 2.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-features {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 60px 0;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-subtitle {
    font-size: 1.1rem;
  }
}
</style>