<template>
  <div class="admin-header">
    <div class="admin-icon">
      <i class="bi bi-shield-lock fs-1"></i>
    </div>
    <h2 class="fw-bold mb-0">Panel de Administración</h2>
    <p class="mb-0 opacity-75">Gestiona clientes, administradores, servicios y pagos</p>
  </div>
</template>

<style scoped>
.admin-header {
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  text-align: center;
}

.admin-icon {
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
}
</style>