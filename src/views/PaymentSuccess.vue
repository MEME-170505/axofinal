<template>
  <div class="success-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-lg-8 col-md-10">
          <div class="success-card animate__animated animate__fadeIn">
            <div class="success-content text-center">
<!-- Animación de éxito -->
              <div class="success-animation mb-4">
                <div class="checkmark-container">
                  <div class="checkmark animate__animated animate__bounceIn animate__delay-1s">
                    <i class="bi bi-check-lg"></i>
                  </div>
                  <div class="success-circle"></div>
                </div>
              </div>

<!-- Mensaje de éxito -->
               <div class="success-text mb-4">
                <h1 class="success-title animate__animated animate__fadeInUp animate__delay-2s">
                  ¡Pago Exitoso!
                </h1>
                <p class="success-description animate__animated animate__fadeInUp animate__delay-2s">
                  Tu pago ha sido procesado correctamente. Recibirás un correo de confirmación en breve.
                </p>
              </div>

<!-- Detalles del pago -->
               <div class="payment-details animate__animated animate__fadeInUp animate__delay-3s">
                <div class="detail-card">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="detail-item">
                        <i class="bi bi-credit-card detail-icon"></i>
                        <div>
                          <span class="detail-label">Método de Pago</span>
                          <span class="detail-value">Mercado Pago</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="detail-item">
                        <i class="bi bi-calendar-check detail-icon"></i>
                        <div>
                          <span class="detail-label">Fecha</span>
                          <span class="detail-value">{{ currentDate }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="detail-item">
                        <i class="bi bi-hash detail-icon"></i>
                        <div>
                          <span class="detail-label">ID de Transacción</span>
                          <span class="detail-value">{{ transactionId }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="detail-item">
                        <i class="bi bi-currency-dollar detail-icon"></i>
                        <div>
                          <span class="detail-label">Monto</span>
                          <span class="detail-value">$15,000 MXN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->

              <div class="action-buttons animate__animated animate__fadeInUp animate__delay-4s">
                <router-link to="/" class="btn btn-outline-primary btn-lg">
                  <i class="bi bi-house-door me-2"></i>
                  Volver al Inicio
                </router-link>
              </div>

              <!-- Next Steps -->

              <div class="next-steps animate__animated animate__fadeInUp animate__delay-5s">
                <h5 class="mb-3">¿Qué sigue?</h5>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="step-card">
                      <div class="step-number">1</div>
                      <i class="bi bi-envelope-check step-icon"></i>
                      <h6>Confirmación</h6>
                      <p>Confirmaremos tu pago en breve</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="step-card">
                      <div class="step-number">2</div>
                      <i class="bi bi-people step-icon"></i>
                      <h6>Contacto</h6>
                      <p>Nuestro equipo se pondrá en contacto contigo</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="step-card">
                      <div class="step-number">3</div>
                      <i class="bi bi-rocket-takeoff step-icon"></i>
                      <h6>Inicio</h6>
                      <p>Comenzaremos a trabajar en tu proyecto</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Support -->
              <div class="support-section animate__animated animate__fadeInUp animate__delay-6s">
                <p class="support-text">
                  ¿Tienes alguna pregunta? 
                  <router-link to="/contactanos" class="support-link">Contáctanos</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Animación de confeti -->
     <div class="confetti-container">
      <div class="confetti" v-for="n in 50" :key="n" :style="getConfettiStyle(n)"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentDate = ref('');
const transactionId = ref('');

onMounted(() => {
  // Establecer la fecha actual
  const now = new Date();
  currentDate.value = now.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate random transaction ID
  transactionId.value = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // iniciar la animación de confeti
  setTimeout(() => {
    startConfetti();
  }, 1000);
});

const getConfettiStyle = (index) => {
  return {
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 3 + 's',
    backgroundColor: getRandomColor(),
    animationDuration: (Math.random() * 3 + 2) + 's'
  };
};

const getRandomColor = () => {
  const colors = ['#e94f37', '#f9a26c', '#1d3557', '#8857e2', '#0dcaf0', '#ffc107'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const startConfetti = () => {
  const confettiElements = document.querySelectorAll('.confetti');
  confettiElements.forEach((confetti, index) => {
    confetti.style.animationPlayState = 'running';
  });
};

const downloadReceipt = () => {
  // Simulate receipt download
  const receiptData = {
    transactionId: transactionId.value,
    date: currentDate.value,
    amount: '$15,000 MXN',
    service: 'Plan Ajolote - AxoWeb Digital'
  };
  
  console.log('Descargando recibo:', receiptData);
  

  // se genera el recibo(si lo ponemos)
  alert('Recibo descargado exitosamente');
};
</script>

<style scoped>
.success-page {
  background: linear-gradient(135deg, #f6f1e6 0%, #e8f5e8 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.success-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 3px solid #28a745;
  position: relative;
}

.success-animation {
  position: relative;
  display: inline-block;
}

.checkmark-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
}

.success-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border: 4px solid #28a745;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.success-title {
  font-size: 3rem;
  font-weight: bold;
  color: #1d3557;
  margin-bottom: 1rem;
}

.success-description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0;
}

.payment-details {
  margin: 2rem 0;
}

.detail-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
  border: 2px solid #e9ecef;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.detail-icon {
  font-size: 1.5rem;
  color: #28a745;
  min-width: 30px;
}

.detail-label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.detail-value {
  display: block;
  font-size: 1.1rem;
  color: #1d3557;
  font-weight: 600;
}

.success-actions {
  margin: 2rem 0;
}

.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #218838;
  border-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
}

.btn-outline-primary {
  border-color: #28a745;
  color: #28a745;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #28a745;
  border-color: #28a745;
  transform: translateY(-2px);
}

.next-steps h5 {
  color: #1d3557;
  font-weight: 600;
  margin-top: 2rem;
}

.step-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.1);
  border-color: #28a745;
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: #28a745;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.step-icon {
  font-size: 2rem;
  color: #28a745;
  margin: 1rem 0 0.5rem;
}

.step-card h6 {
  color: #1d3557;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.support-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e9ecef;
}

.support-text {
  color: #666;
  margin: 0;
}

.support-link {
  color: #28a745;
  text-decoration: none;
  font-weight: 600;
}

.support-link:hover {
  color: #218838;
  text-decoration: underline;
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #28a745;
  animation: confetti-fall 3s linear infinite;
  animation-play-state: paused;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.success-card {
  z-index: 2;
  position: relative;
}

@media (max-width: 768px) {
  .success-card {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .success-title {
    font-size: 2.5rem;
  }
  
  .success-actions .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .success-actions .me-3 {
    margin-right: 0 !important;
  }
  
  .detail-card {
    padding: 1.5rem;
  }
  
  .checkmark-container {
    width: 100px;
    height: 100px;
  }
  
  .checkmark {
    width: 70px;
    height: 70px;
    font-size: 2rem;
  }
  
  .success-circle {
    width: 100px;
    height: 100px;
  }
}
</style>