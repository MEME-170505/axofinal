<template>
  <div class="pagos-tab">
    <div class="admin-card">
      <div class="admin-card-header">
        <h4 class="mb-0">
          <i class="bi bi-credit-card me-2"></i>
          Gestión de Pagos
        </h4>
      </div>
      <div class="admin-card-body">
        <!-- Filtros y búsqueda -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="search-container">
              <input 
                type="text" 
                class="form-control search-input" 
                placeholder="Buscar por cliente o ID..."
                v-model="searchTerm"
              >
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="filterStatus">
              <option value="">Todos los estados</option>
              <option value="Pagado">Pagado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Abono">Abono</option>
              <option value="Liquidado">Liquidado</option>
            </select>
          </div>
          <div class="col-md-3">
            <input type="date" class="form-control" v-model="filterDate">
          </div>
          <div class="col-md-2">
            <button class="admin-btn admin-btn-primary w-100" @click="showCreateModal = true">
              <i class="bi bi-plus-circle me-2"></i>
              Nuevo Pago
            </button>
          </div>
        </div>

        <!-- Estadísticas rápidas -->
        <div class="row mb-4">
          <div class="col-md-3">
            <div class="stat-card stat-success">
              <div class="stat-icon">
                <i class="bi bi-check-circle"></i>
              </div>
              <div class="stat-info">
                <h3>${{ totalPagado.toLocaleString() }}</h3>
                <p>Total Pagado</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-warning">
              <div class="stat-icon">
                <i class="bi bi-clock"></i>
              </div>
              <div class="stat-info">
                <h3>${{ totalPendiente.toLocaleString() }}</h3>
                <p>Total Pendiente</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-info">
              <div class="stat-icon">
                <i class="bi bi-receipt"></i>
              </div>
              <div class="stat-info">
                <h3>{{ totalPagos }}</h3>
                <p>Total Pagos</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-primary">
              <div class="stat-icon">
                <i class="bi bi-calendar-month"></i>
              </div>
              <div class="stat-info">
                <h3>{{ pagosEsteMes }}</h3>
                <p>Este Mes</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de pagos -->
        <div class="admin-table">
          <table class="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Plan/Servicio</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>ID Compra</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pago in filteredPagos" :key="pago.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="user-avatar me-3">
                      <i class="bi bi-person-circle"></i>
                    </div>
                    <div>
                      <div class="fw-bold">{{ pago.cliente }}</div>
                      <small class="text-muted">{{ pago.empresa }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="fw-bold">{{ pago.plan }}</div>
                  <small class="text-muted">{{ pago.descripcion }}</small>
                </td>
                <td>
                  <span class="fw-bold text-success">${{ pago.monto.toLocaleString() }}</span>
                </td>
                <td>
                  <span :class="getStatusClass(pago.estado)">
                    {{ pago.estado }}
                  </span>
                </td>
                <td>{{ formatDate(pago.fecha) }}</td>
                <td>
                  <code class="text-muted">{{ pago.idCompra }}</code>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="admin-btn admin-btn-outline" @click="viewPago(pago)" title="Ver detalles">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="admin-btn admin-btn-outline" @click="editPago(pago)" title="Editar">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="admin-btn admin-btn-danger" @click="deletePago(pago)" title="Eliminar">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para crear pago -->
    <CreatePaymentModal
      v-if="showCreateModal"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @save="createPago"
    />

    <!-- Modal para ver detalles -->
    <PaymentDetailModal
      v-if="showDetailModal"
      :show="showDetailModal"
      :payment="selectedPago"
      @close="showDetailModal = false"
      @edit="editPago"
    />

    <!-- Modal para editar pago -->
    <PaymentEditModal
      v-if="showEditModal"
      :show="showEditModal"
      :payment="editingPago"
      @close="showEditModal = false"
      @save="updatePago"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CreatePaymentModal from '../../../../components/modals/CreatePaymentModal.vue'
import PaymentDetailModal from '../../../../components/modals/PaymentDetailModal.vue'
import PaymentEditModal from '../../../../components/modals/PaymentEditModal.vue'

const searchTerm = ref('')
const filterStatus = ref('')
const filterDate = ref('')
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const showEditModal = ref(false)
const selectedPago = ref(null)
const editingPago = ref(null)

const pagos = ref([
  {
    id: 1,
    cliente: 'Mario González',
    empresa: 'Empresa S.A.',
    plan: 'Plan Ajolote',
    descripcion: 'Plan completo con marketing',
    monto: 25000,
    estado: 'Pagado',
    fecha: '2024-01-15',
    idCompra: 'TXN001234567'
  },
  {
    id: 2,
    cliente: 'Ana López',
    empresa: 'Tech Solutions',
    plan: 'Desarrollo Web',
    descripcion: 'Sitio web corporativo',
    monto: 15000,
    estado: 'Pendiente',
    fecha: '2024-01-14',
    idCompra: 'TXN001234568'
  },
  {
    id: 3,
    cliente: 'Carlos Ruiz',
    empresa: 'Innovate Corp',
    plan: 'Email Marketing',
    descripcion: 'Campaña de email marketing',
    monto: 8000,
    estado: 'Abono',
    fecha: '2024-01-13',
    idCompra: 'TXN001234569'
  }
])

const filteredPagos = computed(() => {
  let filtered = pagos.value

  if (searchTerm.value) {
    filtered = filtered.filter(pago => 
      pago.cliente.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.empresa.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.idCompra.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(pago => pago.estado === filterStatus.value)
  }

  if (filterDate.value) {
    filtered = filtered.filter(pago => pago.fecha === filterDate.value)
  }

  return filtered
})

const totalPagado = computed(() => {
  return pagos.value
    .filter(pago => pago.estado === 'Pagado' || pago.estado === 'Liquidado')
    .reduce((total, pago) => total + pago.monto, 0)
})

const totalPendiente = computed(() => {
  return pagos.value
    .filter(pago => pago.estado === 'Pendiente' || pago.estado === 'Abono')
    .reduce((total, pago) => total + pago.monto, 0)
})

const totalPagos = computed(() => pagos.value.length)

const pagosEsteMes = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return pagos.value.filter(pago => {
    const pagoDate = new Date(pago.fecha)
    return pagoDate.getMonth() === currentMonth && pagoDate.getFullYear() === currentYear
  }).length
})

const getStatusClass = (estado) => {
  const baseClasses = 'status-badge'
  switch (estado) {
    case 'Pagado':
    case 'Liquidado':
      return `${baseClasses} status-active`
    case 'Pendiente':
      return `${baseClasses} status-inactive`
    case 'Abono':
      return `${baseClasses} status-pending`
    default:
      return baseClasses
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX')
}

const viewPago = (pago) => {
  selectedPago.value = pago
  showDetailModal.value = true
}

const editPago = (pago) => {
  editingPago.value = pago
  showEditModal.value = true
  showDetailModal.value = false
}

const deletePago = (pago) => {
  if (confirm(`¿Estás seguro de eliminar el pago de ${pago.cliente}?`)) {
    const index = pagos.value.findIndex(p => p.id === pago.id)
    if (index > -1) {
      pagos.value.splice(index, 1)
    }
  }
}

const createPago = (pagoData) => {
  const newPago = {
    ...pagoData,
    id: Date.now()
  }
  pagos.value.push(newPago)
  showCreateModal.value = false
}

const updatePago = (pagoData) => {
  const index = pagos.value.findIndex(p => p.id === pagoData.id)
  if (index > -1) {
    pagos.value[index] = pagoData
  }
  showEditModal.value = false
  editingPago.value = null
}
</script>

<style scoped>
.user-avatar {
  font-size: 2rem;
  color: var(--primary-coral);
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-success { border-left-color: #28a745; }
.stat-warning { border-left-color: #ffc107; }
.stat-info { border-left-color: #17a2b8; }
.stat-primary { border-left-color: var(--primary-coral); }

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-success .stat-icon { background: #28a745; }
.stat-warning .stat-icon { background: #ffc107; }
.stat-info .stat-icon { background: #17a2b8; }
.stat-primary .stat-icon { background: var(--primary-coral); }

.stat-info h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
}

.stat-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}
</style>