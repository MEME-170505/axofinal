<template>
  <div class="row mb-5 pt-3 animate__animated animate__fadeInUp">
    <div class="col-md-5 mb-4 mb-md-0">
      <div class="about-image">
        <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" alt="Nuestra Misión" class="img-fluid rounded shadow" />
      </div>
    </div>
    <div class="col-md-7">
      <div class="about-content">
        <h2 class="about-subtitle mb-3">Misión</h2>
        <p class="about-text">
          Nuestra misión es la transformación digital de las empresas mediante soluciones creativas e innovadoras en desarrollo web, diseño de identidad visual y estrategias de marketing que generen valor y crecimiento para cada uno de nuestros clientes.
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