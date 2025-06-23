<template>
  <section class="hero-section">
    <div class="container-fluid px-5">
      <div class="row justify-content-center">
        <div class="col-lg-10 text-center animate__animated animate__fadeInLeft">
          <div class="logo-container">
            <img
              src="https://i.pinimg.com/736x/88/4a/8e/884a8ed8ebfa49841a40ab82b1b70965.jpg"
              alt="AxoWeb Logo"
              class="img-fluid hero-logo"
            />
            <p class="mt-2 text-muted">Asociados con Bufin Del Norte</p>
            <hr class="divider" />

            <div class="hero-banner blur-blush">
              <h2 class="text-white mb-0">
                Apoyamos a crear tu negocio digital y a impulsar su crecimiento
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: 80px 0;
  background-color: #FECFA5;
}

.hero-logo {
  transition: var(--transition-base);
  box-shadow: var(--shadow-sm);
  max-width: 250px;
  border-radius: 50%;
}

.hero-logo:hover {
  transform: scale(1.05);
}

.hero-banner {
  background: linear-gradient(135deg, rgba(233, 79, 55, 0.9) 0%, rgba(249, 162, 108, 0.9) 100%);
  color: white;
  border-radius: 15px;
  padding: 90px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.blur-blush {
  backdrop-filter: blur(10px);
}

.divider {
  height: 3px;
  background: linear-gradient(to right, transparent, var(--primary-coral), transparent);
  border: none;
  margin: 2rem auto;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .hero-banner {
    padding: 40px 20px;
  }
  
  .hero-banner h2 {
    font-size: 1.5rem;
  }
}
</style>