<template>
  <div class="nav-container mb-4">
    <div class="custom-nav mx-auto">
      <button 
        class="nav-button" 
        :class="{ 'active': activeTab === 'inicio' }"
        @click="$emit('change-tab', 'inicio')"
      >
        <i class="bi bi-house me-2"></i>
        Inicio
      </button>
      <button 
        class="nav-button" 
        :class="{ 'active': activeTab === 'servicios' }"
        @click="$emit('change-tab', 'servicios')"
      >
        <i class="bi bi-grid me-2"></i>
        Servicios
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

@media (max-width: 768px) {
  .custom-nav {
    flex-direction: column;
    border-radius: 16px;
    width: 100%;
    max-width: 300px;
  }

  .nav-button {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>