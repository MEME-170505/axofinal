<template>
  <div class="error-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-lg-8 col-md-10">
          <div class="error-card animate__animated animate__fadeIn">
            <div class="error-content text-center">
              <!-- Logo with Error Expression -->
              <div class="error-logo-container mb-4">
                <div class="logo-wrapper">
                  <img
                    src="https://i.pinimg.com/736x/12/46/ff/1246ff1305430b54572fd2a100488c88.jpg"
                    alt="AxoWeb Logo"
                    class="error-logo"
                  />
                </div>
              </div>

              <!-- Error Message -->
              <div class="error-text mb-4">
                <h1 class="error-title">Error</h1>
                <h2 class="error-number">404</h2>
                <p class="error-description">
                  ¡Oops! La página que buscas no existe o ha sido movida.
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="error-actions">
                <router-link to="/" class="btn btn-primary btn-lg me-3 animate__animated animate__pulse animate__infinite">
                  <i class="bi bi-house-door me-2"></i>
                  Volver al Inicio
                </router-link>
                <router-link to="/contactanos" class="btn btn-outline-primary btn-lg">
                  <i class="bi bi-envelope me-2"></i>
                  Contactar Soporte
                </router-link>
              </div>

              <!-- Helpful Links -->
              <div class="helpful-links mt-5">
                <h5 class="mb-3">¿Qué puedes hacer?</h5>
                <div class="row g-3">
                  <div class="col-md-4">
                    <router-link to="/servicios" class="help-link">
                      <i class="bi bi-gear-fill"></i>
                      <span>Ver Servicios</span>
                    </router-link>
                  </div>
                  <div class="col-md-4">
                    <router-link to="/sobre-nosotros" class="help-link">
                      <i class="bi bi-info-circle-fill"></i>
                      <span>Sobre Nosotros</span>
                    </router-link>
                  </div>
                  <div class="col-md-4">
                    <router-link to="/contactanos" class="help-link">
                      <i class="bi bi-telephone-fill"></i>
                      <span>Contacto</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Elements -->
    <div class="floating-elements">
      <div class="floating-element element-1">
        <i class="bi bi-code-slash"></i>
      </div>
      <div class="floating-element element-2">
        <i class="bi bi-bug"></i>
      </div>
      <div class="floating-element element-3">
        <i class="bi bi-question-circle"></i>
      </div>
      <div class="floating-element element-4">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Add some interactive animations
  const elements = document.querySelectorAll('.floating-element');
  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });
});
</script>

<style scoped>
.error-page {
  background: linear-gradient(135deg, #f6f1e6 0%, #fce7d2 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.error-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 3px solid #e94f37;
  position: relative;
}

.error-logo-container {
  position: relative;
  display: inline-block;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
}

.error-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e94f37;
}

.error-expression {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(233, 79, 55, 0.9);
  border-radius: 50%;
  color: white;
}

.error-eyes {
  display: flex;
  gap: 15px;
  margin-bottom: 5px;
}

.eye {
  font-size: 1.5rem;
  font-weight: bold;
  animation: blink 2s infinite;
}

.error-mouth {
  font-size: 1.2rem;
  font-weight: bold;
  transform: rotate(90deg);
}

@keyframes blink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.3; }
}

.error-title {
  font-size: 3rem;
  font-weight: bold;
  color: #1d3557;
  margin: 0;
  display: inline-block;
  margin-right: 1rem;
}

.error-number {
  font-size: 3rem;
  font-weight: bold;
  color: #e94f37;
  margin: 0;
  display: inline-block;
}

.error-description {
  font-size: 1.2rem;
  color: #666;
  margin-top: 1rem;
  margin-bottom: 0;
}

.error-actions {
  margin: 2rem 0;
}

.btn-primary {
  background-color: #e94f37;
  border-color: #e94f37;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #d73c26;
  border-color: #d73c26;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(233, 79, 55, 0.3);
}

.btn-outline-primary {
  border-color: #e94f37;
  color: #e94f37;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #e94f37;
  border-color: #e94f37;
  transform: translateY(-2px);
}

.helpful-links h5 {
  color: #1d3557;
  font-weight: 600;
}

.help-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  text-decoration: none;
  color: #1d3557;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.help-link:hover {
  background: #e94f37;
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(233, 79, 55, 0.2);
  border-color: #e94f37;
}

.help-link i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.help-link span {
  font-weight: 600;
  font-size: 0.9rem;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  color: rgba(233, 79, 55, 0.2);
  animation: float 6s ease-in-out infinite;
}

.element-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.element-3 {
  bottom: 30%;
  left: 5%;
  animation-delay: 2s;
}

.element-4 {
  bottom: 15%;
  right: 10%;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.error-card {
  z-index: 2;
  position: relative;
}

@media (max-width: 768px) {
  .error-card {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .error-title,
  .error-number {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .error-actions .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .error-actions .me-3 {
    margin-right: 0 !important;
  }
  
  .floating-element {
    font-size: 1.5rem;
  }
}
</style>