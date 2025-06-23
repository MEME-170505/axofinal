<template>
  <div class="row py-4 my-4 animate__animated animate__fadeInUp" style="animation-delay: 0.4s">
    <div class="col-md-5 mb-4 mb-md-0">
      <div class="about-image">
        <img src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg" alt="Nuestra Filosofía" class="img-fluid rounded shadow" />
      </div>
    </div>
    <div class="col-md-7">
      <div class="about-content">
        <h2 class="about-subtitle mb-3">Filosofía</h2>
        <p class="about-text">
          En Axo Web digital creemos que las tecnologías de hoy en día deben estar al alcance de cada una de las empresas que hay hoy en día y a su vez ser funcionales. Nuestro enfoque se basa en la creatividad, en el trabajo colaborativo y mejora continua.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-subtitle {
  color: #1D3557;
  font-weight: 600;
  font-size: 1.75rem;
}

.about-content {
  padding: 20px;
}

.about-text {
  color: #1D3557;
  font-size: 1.1rem;
  line-height: 1.6;
}

.about-image {
  transition: transform 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.about-image:hover {
  transform: scale(1.02);
}

.about-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .about-image {
    margin-bottom: 1.5rem;
  }
  
  .about-content {
    padding: 0;
  }
}
</style>