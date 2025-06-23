<template>
  <div class="tabla-pagos">
    <div class="table-header mb-3" v-if="showHeader">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">
            <i class="bi bi-clock-history me-2"></i>
            {{ title }}
          </h5>
          <small class="text-muted">{{ pagos.length }} registro(s)</small>
        </div>
        <div class="table-actions">
          <BotonPrimario
            v-if="showCreateButton"
            variant="primary"
            icon="bi bi-plus-circle"
            @click="handleCreate"
          >
            Crear Nuevo Pago
          </BotonPrimario>
        </div>
      </div>
    </div>

    <div class="table-container">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Usuario</th>
              <th>Plan/Servicio</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>ID Compra</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <FilaPago
              v-for="pago in pagos"
              :key="pago.id"
              :pago="pago"
              :show-delete="showDeleteButton"
              @view="handleView"
              @edit="handleEdit"
              @delete="handleDelete"
            />
            <tr v-if="pagos.length === 0">
              <td colspan="8" class="text-center py-4 text-muted">
                <div class="empty-state">
                  <i class="bi bi-inbox fs-1 mb-2"></i>
                  <p class="mb-0">{{ emptyMessage }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="table-footer mt-3" v-if="showPagination && pagos.length > 0">
      <nav>
        <ul class="pagination pagination-sm justify-content-center">
          <li class="page-item">
            <button class="page-link" @click="previousPage" :disabled="currentPage === 1">
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>
          <li 
            v-for="page in totalPages" 
            :key="page"
            class="page-item"
            :class="{ 'active': page === currentPage }"
          >
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FilaPago from './FilaPago.vue'
import BotonPrimario from './BotonPrimario.vue'

const props = defineProps({
  pagos: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Historial de Pagos'
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showCreateButton: {
    type: Boolean,
    default: false
  },
  showDeleteButton: {
    type: Boolean,
    default: false
  },
  showPagination: {
    type: Boolean,
    default: false
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  emptyMessage: {
    type: String,
    default: 'No hay pagos registrados'
  }
})

const emit = defineEmits(['create', 'view', 'edit', 'delete', 'page-change'])

const totalPages = computed(() => {
  return Math.ceil(props.pagos.length / props.itemsPerPage)
})

const handleCreate = () => {
  emit('create')
}

const handleView = (pago) => {
  emit('view', pago)
}

const handleEdit = (pago) => {
  emit('edit', pago)
}

const handleDelete = (pago) => {
  emit('delete', pago)
}

const goToPage = (page) => {
  emit('page-change', page)
}

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('page-change', props.currentPage + 1)
  }
}
</script>

<style scoped>
.tabla-pagos {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.table-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

.table-container {
  max-height: 600px;
  overflow-y: auto;
}

.table thead th {
  background: #f8f9fa;
  color: var(--primary-blue);
  border: none;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.table tbody td {
  padding: 1rem;
  border-color: #f1f3f4;
  vertical-align: middle;
}

.empty-state {
  padding: 2rem;
}

.table-footer {
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.pagination {
  margin: 0;
}

.page-link {
  border: none;
  color: var(--primary-blue);
}

.page-link:hover {
  background-color: var(--primary-beige);
  color: var(--primary-coral);
}

.page-item.active .page-link {
  background-color: var(--primary-coral);
  border-color: var(--primary-coral);
}
</style>