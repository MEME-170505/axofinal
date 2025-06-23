<template>
  <div 
    class="empresa-item"
    :class="{ 'active': isSelected }"
    @click="handleSelect"
  >
    <div class="empresa-content">
      <div class="empresa-avatar">
        <i class="bi bi-building-fill"></i>
      </div>
      <div class="empresa-info">
        <div class="empresa-name">{{ empresa.name }}</div>
        <div class="empresa-client">
          <i class="bi bi-person-circle me-1"></i>
          {{ empresa.client }}
        </div>
        <div class="empresa-stats">
          <span class="stat-item">
            <i class="bi bi-credit-card me-1"></i>
            {{ paymentsCount }} pagos
          </span>
          <span class="stat-item ms-2">
            <i class="bi bi-currency-dollar me-1"></i>
            ${{ totalAmount.toLocaleString() }}
          </span>
        </div>
      </div>
      <div class="empresa-status">
        <div class="status-indicator" :class="statusClass"></div>
        <div class="empresa-actions" v-if="showActions" @click.stop>
          <div class="dropdown">
            <button 
              class="btn btn-sm btn-outline-secondary dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-three-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" @click="handleEdit">
                  <i class="bi bi-pencil me-2"></i>Editar
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="handleViewPayments">
                  <i class="bi bi-credit-card me-2"></i>Ver Pagos
                </button>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button class="dropdown-item text-danger" @click="handleDelete">
                  <i class="bi bi-trash me-2"></i>Eliminar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  empresa: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  paymentsCount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  showActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'edit', 'delete', 'view-payments'])

const statusClass = computed(() => {
  // Determinar estado basado en pagos o actividad
  if (props.paymentsCount > 0) {
    return 'active'
  }
  return 'inactive'
})

const handleSelect = () => {
  emit('select', props.empresa)
}

const handleEdit = () => {
  emit('edit', props.empresa)
}

const handleDelete = () => {
  emit('delete', props.empresa)
}

const handleViewPayments = () => {
  emit('view-payments', props.empresa)
}
</script>

<style scoped>
.empresa-item {
  padding: 0;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.empresa-item:hover {
  background-color: #f8f9fa;
}

.empresa-item.active {
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

.empresa-content {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  gap: 1rem;
}

.empresa-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-blue);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.empresa-item.active .empresa-avatar {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.empresa-info {
  flex: 1;
  min-width: 0;
}

.empresa-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empresa-client {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.empresa-stats {
  font-size: 0.75rem;
  opacity: 0.7;
  display: flex;
  flex-wrap: wrap;
}

.stat-item {
  white-space: nowrap;
}

.empresa-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator.active {
  background: #28a745;
}

.status-indicator.inactive {
  background: #6c757d;
}

.empresa-actions {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.empresa-item:hover .empresa-actions {
  opacity: 1;
}

.empresa-item.active .empresa-actions {
  opacity: 1;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.dropdown-item:hover {
  background-color: var(--primary-beige);
}

@media (max-width: 768px) {
  .empresa-content {
    padding: 1rem;
  }
  
  .empresa-avatar {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .empresa-stats {
    flex-direction: column;
  }
  
  .stat-item {
    margin-bottom: 0.25rem;
  }
}
</style>