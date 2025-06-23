<template>
  <div class="pagos-tab">
    <div class="pagos-layout">
      <!-- Sidebar de Empresas -->
      <div class="empresas-sidebar">
        <div class="sidebar-header">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="mb-0">
              <i class="bi bi-building me-2"></i>
              Empresas
            </h5>
            <span class="badge bg-light text-dark">{{ empresas.length }}</span>
          </div>
        </div>
        
        <div class="search-container mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar empresa o cliente..."
              v-model="searchEmpresa"
            >
          </div>
        </div>

        <div class="empresas-list">
          <EmpresaItem
            v-for="empresa in empresasFiltradas"
            :key="empresa.id"
            :empresa="empresa"
            :is-selected="selectedEmpresa?.id === empresa.id"
            :payments-count="getPaymentsCount(empresa.id)"
            :total-amount="getTotalAmount(empresa.id)"
            :show-actions="true"
            @select="selectEmpresa"
            @edit="editEmpresa"
            @delete="deleteEmpresa"
            @view-payments="viewEmpresaPayments"
          />
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="pagos-content">
        <div class="content-header">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h4 class="mb-1">
                <i class="bi bi-clock-history me-2"></i>
                Historial de Pagos
                <span v-if="selectedEmpresa" class="text-light opacity-75">- {{ selectedEmpresa.name }}</span>
              </h4>
              <small class="text-light opacity-75">{{ pagosFiltrados.length }} registro(s)</small>
            </div>
            <BotonPrimario
              variant="outline-light"
              icon="bi bi-plus-circle"
              @click="showCreateModal = true"
            >
              Crear Nuevo Pago
            </BotonPrimario>
          </div>
        </div>

        <!-- Filtros -->
        <div class="filters-section mb-4">
          <div class="row g-3">
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
            <div class="col-md-6">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Buscar por usuario o ID..."
                v-model="searchTerm"
              >
            </div>
          </div>
        </div>

        <!-- Tabla de Pagos -->
        <div class="payments-table-container">
          <table class="table table-hover align-middle">
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
                v-for="pago in pagosFiltrados"
                :key="pago.id"
                :pago="pago"
                :show-delete="true"
                @liquidar="handleLiquidar"
                @abonar="handleAbonar"
                @view="viewPago"
                @edit="editPago"
                @delete="deletePago"
              />
              <tr v-if="pagosFiltrados.length === 0">
                <td colspan="8" class="text-center py-4 text-muted">
                  <div class="empty-state">
                    <i class="bi bi-inbox fs-1 mb-2"></i>
                    <p class="mb-0">No hay pagos registrados</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Crear Pago (Sidebar) -->
    <CreatePaymentSidebar
      :show="showCreateModal"
      :selected-company="selectedEmpresa"
      :companies="empresas"
      :planes="planes"
      :servicios="servicios"
      @close="showCreateModal = false"
      @save="createPago"
    />

    <!-- Modal Ver Detalles -->
    <PaymentDetailModal
      v-if="showDetailModal"
      :show="showDetailModal"
      :payment="selectedPago"
      :companies="empresas"
      @close="showDetailModal = false"
      @edit="editPago"
    />

    <!-- Modal Editar Pago -->
    <PaymentEditModal
      v-if="showEditModal"
      :show="showEditModal"
      :payment="editingPago"
      :companies="empresas"
      :planes="planes"
      :servicios="servicios"
      @close="showEditModal = false"
      @save="updatePago"
    />

    <!-- Modal Editar Empresa -->
    <CompanyEditModal
      v-if="showCompanyEditModal"
      :show="showCompanyEditModal"
      :company="editingCompany"
      @close="showCompanyEditModal = false"
      @save="updateCompany"
    />

    <!-- Modal Acciones de Pago -->
    <PaymentActionModal
      v-if="showActionModal"
      :show="showActionModal"
      :payment="actionPayment"
      :action="currentAction"
      @close="showActionModal = false"
      @confirm="handlePaymentAction"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'
import EmpresaItem from '../../../../components/ui/EmpresaItem.vue'
import FilaPago from '../../../../components/ui/FilaPago.vue'
import CreatePaymentSidebar from '../../../../components/modals/CreatePaymentSidebar.vue'
import PaymentDetailModal from '../../../../components/modals/PaymentDetailModal.vue'
import PaymentEditModal from '../../../../components/modals/PaymentEditModal.vue'
import CompanyEditModal from '../../../../components/modals/CompanyEditModal.vue'
import PaymentActionModal from '../../../../components/modals/PaymentActionModal.vue'
import { useAlert } from '../../../../composables/useAlert'

const { showSuccess, showError, showConfirm } = useAlert()

// Estados reactivos
const searchEmpresa = ref('')
const searchTerm = ref('')
const filterStatus = ref('')
const filterDate = ref('')
const selectedEmpresa = ref(null)
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const showEditModal = ref(false)
const showCompanyEditModal = ref(false)
const showActionModal = ref(false)
const selectedPago = ref(null)
const editingPago = ref(null)
const editingCompany = ref(null)
const actionPayment = ref(null)
const currentAction = ref('')

// Datos de empresas
const empresas = ref([
  {
    id: 1,
    name: 'Electrocopy',
    client: 'Juan Pérez',
    email: 'juan@electrocopy.com',
    phone: '123-456-7890',
    address: 'Av. Principal 123, Ciudad',
    industry: 'Tecnología',
    notes: 'Cliente premium con múltiples servicios'
  },
  {
    id: 2,
    name: 'DAI',
    client: 'María García',
    email: 'maria@dai.com',
    phone: '098-765-4321',
    address: 'Calle Comercio 456, Ciudad',
    industry: 'Servicios',
    notes: 'Empresa de despacho aduanal'
  },
  {
    id: 3,
    name: 'Bufin del Norte',
    client: 'Carlos López',
    email: 'carlos@bufin.com',
    phone: '555-123-4567',
    address: 'Zona Industrial 789, Ciudad',
    industry: 'Consultoría',
    notes: 'Consultora especializada en comercio exterior'
  }
])

// Datos de planes
const planes = ref([
  { id: 1, nombre: 'Plan Huevo', precio: 15000 },
  { id: 2, nombre: 'Plan Ajolote', precio: 25000 },
  { id: 3, nombre: 'Plan Alebrije', precio: 0 } // Personalizado
])

// Datos de servicios
const servicios = ref([
  { id: 1, nombre: 'Desarrollo de E-commerce', precio: 8000 },
  { id: 2, nombre: 'Email Marketing', precio: 5000 },
  { id: 3, nombre: 'Marketing Digital', precio: 8000 },
  { id: 4, nombre: 'Diseño UI/UX', precio: 8000 },
  { id: 5, nombre: 'Automatización', precio: 8000 }
])

// Datos de pagos
const pagos = ref([
  {
    id: 1,
    userName: 'Juan Pérez',
    companyId: 1,
    planName: 'Plan Ajolote',
    amount: 25000,
    status: 'Pagado',
    date: '2024-01-15',
    purchaseId: 'TXN123456789',
    notes: 'Pago realizado mediante transferencia bancaria. Cliente solicita factura.',
    services: ['Plan Ajolote']
  },
  {
    id: 2,
    userName: 'Ana López',
    companyId: 1,
    planName: 'Marketing Digital + Email Marketing',
    amount: 13000,
    status: 'Pendiente',
    date: '2024-01-19',
    purchaseId: 'TXN987654321',
    notes: 'Servicios múltiples contratados',
    services: ['Marketing Digital', 'Email Marketing']
  },
  {
    id: 3,
    userName: 'María García',
    companyId: 2,
    planName: 'Desarrollo de E-commerce',
    amount: 8000,
    status: 'Abono',
    date: '2024-01-20',
    purchaseId: 'TXN456789123',
    notes: 'Primer abono recibido',
    services: ['Desarrollo de E-commerce']
  }
])

// Computed properties
const empresasFiltradas = computed(() => {
  if (!searchEmpresa.value) return empresas.value
  return empresas.value.filter(empresa => 
    empresa.name.toLowerCase().includes(searchEmpresa.value.toLowerCase()) ||
    empresa.client.toLowerCase().includes(searchEmpresa.value.toLowerCase())
  )
})

const pagosFiltrados = computed(() => {
  let filtered = pagos.value

  // Filtrar por empresa seleccionada
  if (selectedEmpresa.value) {
    filtered = filtered.filter(pago => pago.companyId === selectedEmpresa.value.id)
  }

  // Filtrar por término de búsqueda
  if (searchTerm.value) {
    filtered = filtered.filter(pago => 
      pago.userName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.purchaseId.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.planName.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  // Filtrar por estado
  if (filterStatus.value) {
    filtered = filtered.filter(pago => pago.status === filterStatus.value)
  }

  // Filtrar por fecha
  if (filterDate.value) {
    filtered = filtered.filter(pago => pago.date === filterDate.value)
  }

  return filtered
})

// Métodos para empresas
const selectEmpresa = (empresa) => {
  selectedEmpresa.value = empresa
}

const editEmpresa = (empresa) => {
  editingCompany.value = empresa
  showCompanyEditModal.value = true
}

const deleteEmpresa = async (empresa) => {
  const confirmed = await showConfirm(
    'Eliminar Empresa',
    `¿Estás seguro de que deseas eliminar la empresa "${empresa.name}"? Esta acción no se puede deshacer.`
  )
  
  if (confirmed) {
    const index = empresas.value.findIndex(e => e.id === empresa.id)
    if (index > -1) {
      empresas.value.splice(index, 1)
      if (selectedEmpresa.value?.id === empresa.id) {
        selectedEmpresa.value = null
      }
      showSuccess('Empresa eliminada', 'La empresa ha sido eliminada exitosamente')
    }
  }
}

const viewEmpresaPayments = (empresa) => {
  selectedEmpresa.value = empresa
}

const updateCompany = (companyData) => {
  const index = empresas.value.findIndex(e => e.id === companyData.id)
  if (index > -1) {
    empresas.value[index] = companyData
    showSuccess('Empresa actualizada', 'Los datos de la empresa han sido actualizados')
  }
  showCompanyEditModal.value = false
  editingCompany.value = null
}

// Métodos para pagos
const getPaymentsCount = (companyId) => {
  return pagos.value.filter(pago => pago.companyId === companyId).length
}

const getTotalAmount = (companyId) => {
  return pagos.value
    .filter(pago => pago.companyId === companyId)
    .reduce((total, pago) => total + pago.amount, 0)
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

const deletePago = async (pago) => {
  const confirmed = await showConfirm(
    'Eliminar Pago',
    `¿Estás seguro de que deseas eliminar el pago de ${pago.userName}?`
  )
  
  if (confirmed) {
    const index = pagos.value.findIndex(p => p.id === pago.id)
    if (index > -1) {
      pagos.value.splice(index, 1)
      showSuccess('Pago eliminado', 'El pago ha sido eliminado exitosamente')
    }
  }
}

const handleLiquidar = (pago) => {
  actionPayment.value = pago
  currentAction.value = 'liquidar'
  showActionModal.value = true
}

const handleAbonar = (pago) => {
  actionPayment.value = pago
  currentAction.value = 'abonar'
  showActionModal.value = true
}

const handlePaymentAction = (actionData) => {
  const { action, payment, notes, abonoAmount } = actionData
  const index = pagos.value.findIndex(p => p.id === payment.id)
  
  if (index > -1) {
    if (action === 'liquidar') {
      pagos.value[index].status = 'Liquidado'
      pagos.value[index].notes = notes || 'Pago liquidado completamente'
      showSuccess('Pago liquidado', 'El pago ha sido marcado como liquidado')
    } else if (action === 'abonar') {
      pagos.value[index].status = 'Abono'
      pagos.value[index].notes = notes || `Abono registrado: $${abonoAmount.toLocaleString()}`
      showSuccess('Abono registrado', `Se ha registrado un abono de $${abonoAmount.toLocaleString()}`)
    }
  }
  
  showActionModal.value = false
  actionPayment.value = null
  currentAction.value = ''
}

const createPago = (pagoData) => {
  const newPago = {
    ...pagoData,
    id: Date.now()
  }
  pagos.value.push(newPago)
  showCreateModal.value = false
  showSuccess('Pago creado', 'El nuevo pago ha sido registrado exitosamente')
}

const updatePago = (pagoData) => {
  const index = pagos.value.findIndex(p => p.id === pagoData.id)
  if (index > -1) {
    pagos.value[index] = pagoData
    showSuccess('Pago actualizado', 'Los datos del pago han sido actualizados')
  }
  showEditModal.value = false
  editingPago.value = null
}
</script>

<style scoped>
.pagos-tab {
  height: calc(100vh - 200px);
}

.pagos-layout {
  display: flex;
  height: 100%;
  gap: 1rem;
}

.empresas-sidebar {
  width: 350px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

.search-container {
  padding: 1rem;
}

.empresas-list {
  flex: 1;
  overflow-y: auto;
}

.pagos-content {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

.filters-section {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.payments-table-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.5rem 1.5rem;
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

.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

@media (max-width: 1200px) {
  .pagos-layout {
    flex-direction: column;
    height: auto;
  }
  
  .empresas-sidebar {
    width: 100%;
    height: 300px;
  }
  
  .pagos-content {
    height: 600px;
  }
}

@media (max-width: 768px) {
  .empresas-sidebar {
    height: 250px;
  }
  
  .pagos-content {
    height: 500px;
  }
  
  .content-header {
    padding: 1rem;
  }
  
  .filters-section {
    padding: 1rem;
  }
  
  .payments-table-container {
    padding: 0 1rem 1rem;
  }
}
</style>