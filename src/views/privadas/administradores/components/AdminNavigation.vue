<template>
  <div class="nav-container">
    <div class="custom-nav">
      <button 
        class="nav-button" 
        :class="{ 'active': activeTab === 'clientes' }"
        @click="$emit('change-tab', 'clientes')"
      >
        <i class="bi bi-people me-2"></i>
        Clientes
      </button>
      <button 
        class="nav-button" 
        :class="{ 'active': activeTab === 'administradores' }"
        @click="$emit('change-tab', 'administradores')"
      >
        <i class="bi bi-shield me-2"></i>
        Administradores
      </button>
      <button 
        class="nav-button" 
        :class="{ 'active': activeTab === 'servicios' }"
        @click="$emit('change-tab', 'servicios')"
      >
        <i class="bi bi-gear me-2"></i>
        Servicios
      </button>
      <button 
        class="nav-button" 
        :class="{ 'active': activeTab === 'pagos' }"
        @click="$emit('change-tab', 'pagos')"
      >
        <i class="bi bi-credit-card me-2"></i>
        Pagos
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['change-tab'])
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.custom-nav {
  background: white;
  border-radius: 50px;
  padding: 8px;
  display: inline-flex;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--primary-coral);
}

.nav-button {
  border: none;
  background: none;
  padding: 12px 24px;
  border-radius: 50px;
  color: var(--primary-blue);
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-button.active {
  background-color: var(--primary-coral);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(233, 79, 55, 0.3);
}

.nav-button:hover:not(.active) {
  background-color: #f8f9fa;
  transform: translateY(-2px);
}

@media (max-width: 992px) {
  .custom-nav {
    flex-direction: column;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
  }

  .nav-button {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>