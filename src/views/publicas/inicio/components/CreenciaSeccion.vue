<template>
  <section class="belief-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 mb-4 mb-lg-0">
          <img
            src="https://i.pinimg.com/736x/ac/52/ea/ac52eab99e212a99c3412b4f44b2633c.jpg"
            alt="Digital Business"
            class="img-fluid belief-image"
          />
        </div>
        <div class="col-lg-7 text-center text-lg-start">
          <h2 class="belief-title">CREEMOS TU NEGOCIO DIGITAL</h2>
          <router-link to="/servicios" class="belief-button">
            Ver Nuestros Planes <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.belief-section {
  background-color: #F6F1E6;
  padding: 5rem 0;
  position: relative;
}

.belief-title {
  color: var(--primary-blue);
  font-size: 2.5rem;
  letter-spacing: 1px;
  margin-bottom: 2rem;
}

.belief-image {
  transition: var(--transition-base);
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
}

.belief-image:hover {
  transform: scale(1.02);
}

.belief-button {
  background-color: var(--primary-coral);
  color: white;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  transition: var(--transition-base);
  display: inline-block;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 1rem 2rem;
}

.belief-button:hover {
  background-color: #d73c26;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(233, 79, 55, 0.3);
}

@media (max-width: 768px) {
  .belief-title {
    font-size: 2rem;
  }
}
</style>