<template>
  <section class="hero-servicios">
    <div class="hero-background">
      <div class="hero-pattern"></div>
    </div>
    <div class="container">
      <div class="row align-items-center min-vh-50">
        <div class="col-lg-6">
          <div class="hero-content animate__animated animate__fadeInLeft">
            <h1 class="hero-title">
              Servicios Digitales que 
              <span class="text-gradient">Transforman</span> 
              tu Negocio
            </h1>
            <p class="hero-subtitle">
              Desde páginas web hasta estrategias de marketing digital completas. 
              Llevamos tu empresa al siguiente nivel con soluciones tecnológicas innovadoras.
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">3+</span>
                <span class="stat-label">Proyectos</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">98%</span>
                <span class="stat-label">Satisfacción</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">24/7</span>
                <span class="stat-label">Soporte</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-visual animate__animated animate__fadeInRight">
            <div class="floating-cards">
              <div class="service-card-float card-1">
                <i class="bi bi-laptop"></i>
                <span>Desarrollo Web</span>
              </div>
              <div class="service-card-float card-2">
                <i class="bi bi-megaphone"></i>
                <span>Marketing</span>
              </div>
              <div class="service-card-float card-3">
                <i class="bi bi-robot"></i>
                <span>Automatización</span>
              </div>
              <div class="service-card-float card-4">
                <i class="bi bi-palette"></i>
                <span>Diseño UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-servicios {
  position: relative;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
  padding: 100px 0;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.hero-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, white 2px, transparent 2px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
}

.min-vh-50 {
  min-height: 50vh;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.text-gradient {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-visual {
  position: relative;
  height: 400px;
}

.floating-cards {
  position: relative;
  width: 100%;
  height: 100%;
}

.service-card-float {
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  transition: all 0.3s ease;
  animation: float 6s ease-in-out infinite;
}

.service-card-float:hover {
  transform: translateY(-10px) scale(1.05);
  background: rgba(255, 255, 255, 0.25);
}

.service-card-float i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.service-card-float span {
  font-size: 0.9rem;
  font-weight: 600;
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 10%;
  right: 20%;
  animation-delay: 1.5s;
}

.card-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 3s;
}

.card-4 {
  bottom: 20%;
  right: 10%;
  animation-delay: 4.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 1.5rem;
  }
  
  .hero-visual {
    height: 300px;
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-servicios {
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}
</style>