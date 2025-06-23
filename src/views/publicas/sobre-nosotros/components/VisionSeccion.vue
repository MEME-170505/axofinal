<template>
  <div class="row align-items-center py-4 my-4 animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
    <div class="col-md-7 order-md-1 order-2">
      <div class="about-content">
        <h2 class="about-subtitle mb-3">Visión</h2>
        <p class="about-text">
          Nuestra visión es ser la empresa líder de México en venta de servicios digitales, reconocida por su calidad, innovación y compromiso con cada uno de los clientes.
        </p>
      </div>
    </div>
    <div class="col-md-5 mb-4 mb-md-0 order-md-2 order-1">
      <div class="about-image">
        <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" alt="Nuestra Visión" class="img-fluid rounded shadow" />
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