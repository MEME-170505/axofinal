<template>
  <section class="projects-section">
    <div class="container">
      <div class="text-center">
        <h2 class="section-title">Nuestros proyectos con empresas</h2>
        <div class="title-underline"></div>
      </div>
      <div class="row justify-content-center">
        <div
          class="col-md-4 col-sm-6 mb-4"
          v-for="(client, index) in clients"
          :key="index"
        >
          <div class="project-card animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="project-card-inner">
              <div class="project-card-front">
                <img
                  :src="client.logo"
                  :alt="client.name"
                  class="project-logo"
                />
              </div>
              <div class="project-card-back">
                <h5>{{ client.name }}</h5>
                <p>{{ client.description }}</p>
                <a :href="client.link" target="_blank" class="project-link">
                  Visitar sitio <i class="bi bi-box-arrow-up-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const clients = ref([
  {
    name: 'Bufin del Norte',
    logo: 'https://i.pinimg.com/736x/13/fb/65/13fb65def9e21e143aff6967029fd394.jpg',
    description: 'Consultora en comercio exterior y auditoría aduanera.',
    link: 'https://bufindelnorte.com.mx',
  },
  {
    name: 'Electrocopy',
    logo: 'https://i.pinimg.com/736x/5a/33/af/5a33afa816f0be382c805982569c0cd8.jpg',
    description: 'Electrónica para facilitar importaciones y exportaciones.',
    link: 'https://massbyte.mx',
  },
  {
    name: 'DAI',
    logo: 'https://i.pinimg.com/736x/33/f7/57/33f7578274c53bf6980a46b7a7e5c816.jpg',
    description: 'Despacho aduanal para facilitar importaciones y exportaciones.',
    link: 'https://dai.mx',
  },
])
</script>

<style scoped>
.projects-section {
  background-color: #F6F1E6;
  padding: 5rem 0;
}

.section-title {
  color: var(--primary-coral);
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.title-underline {
  height: 3px;
  width: 100px;
  background: var(--primary-coral);
  margin: 1rem auto 3rem;
}

.project-card {
  background-color: transparent;
  width: 100%;
  height: 300px;
  perspective: 1000px;
}

.project-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.project-card:hover .project-card-inner {
  transform: rotateY(180deg);
}

.project-card-front,
.project-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
}

.project-card-front {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.project-card-back {
  background: var(--primary-blue);
  color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.project-logo {
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
}

.project-link {
  background-color: white;
  color: var(--primary-blue);
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  transition: var(--transition-base);
  font-weight: 600;
}

.project-link:hover {
  background-color: var(--primary-coral);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}
</style>