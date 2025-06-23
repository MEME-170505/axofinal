<template>
  <div class="valores-section py-4 my-4 animate__animated animate__fadeInUp" style="animation-delay: 0.6s">
    <h2 class="about-subtitle text-center mb-4">Nuestros Valores</h2>
    <div class="row g-4">
      <div class="col-md-4 col-sm-6" v-for="(valor, index) in valores" :key="index">
        <div class="valor-card animate__animated animate__fadeInUp" :style="{ animationDelay: `${0.8 + index * 0.1}s` }">
          <div class="valor-icon">
            <i :class="valor.icon"></i>
          </div>
          <h3>{{ valor.titulo }}</h3>
          <p>{{ valor.descripcion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const valores = ref([
  {
    icon: 'bi bi-lightbulb',
    titulo: 'Innovación',
    descripcion: 'Nos adaptamos al cambio y buscamos soluciones creativas.'
  },
  {
    icon: 'bi bi-check2-circle',
    titulo: 'Compromiso',
    descripcion: 'Cumplimos con cada proyecto como si fuera propio.'
  },
  {
    icon: 'bi bi-award',
    titulo: 'Calidad',
    descripcion: 'Nos enfocamos en ofrecer resultados profesionales y duraderos.'
  },
  {
    icon: 'bi bi-heart',
    titulo: 'Empatía',
    descripcion: 'Entendemos las necesidades del cliente para brindar soluciones personalizadas.'
  },
  {
    icon: 'bi bi-people',
    titulo: 'Colaboración',
    descripcion: 'Trabajamos en equipo con comunicación y respeto.'
  }
])
</script>

<style scoped>
.valores-section {
  background-color: #FFFFFF;
  border-radius: 15px;
  padding: 2rem;
  margin-top: 3rem;
}

.about-subtitle {
  color: #1D3557;
  font-weight: 600;
  font-size: 1.75rem;
}

.valor-card {
  background-color: #FFFFFF;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #F9E4CF;
}

.valor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.valor-icon {
  width: 60px;
  height: 60px;
  background-color: #E94F37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.valor-icon i {
  font-size: 1.75rem;
  color: #FFFFFF;
}

.valor-card h3 {
  color: #1D3557;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.valor-card p {
  color: #1D3557;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .valor-card {
    margin-bottom: 1.5rem;
  }
}
</style>