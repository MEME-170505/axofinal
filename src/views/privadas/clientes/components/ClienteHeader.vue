<template>
  <div class="cliente-header text-center mb-5">
    <div class="user-icon mb-3 animate__animated animate__bounceIn">
      <i class="bi bi-people-fill fs-1"></i>
    </div>
    <h2 class="fw-bold animate__animated animate__fadeInUp">
      {{ usuario.nombre }} {{ usuario.apellido }}
    </h2>
    <p class="text-muted animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
      {{ usuario.empresa }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  usuario: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.cliente-header {
  padding: 2rem 0;
}

.user-icon {
  width: 80px;
  height: 80px;
  background-color: var(--primary-coral);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: white;
  box-shadow: 0 8px 25px rgba(233, 79, 55, 0.3);
}

.cliente-header h2 {
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.cliente-header p {
  font-size: 1.1rem;
}
</style>