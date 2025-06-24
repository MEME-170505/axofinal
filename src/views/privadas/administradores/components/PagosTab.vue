<template>
  <!-- ===== 💰 VISTA PRINCIPAL DE GESTIÓN DE PAGOS - CENTRO DE CONTROL FINANCIERO ===== -->
  <!-- Esta es la vista MÁS IMPORTANTE para administradores - aquí se controla TODO el dinero -->
  <div class="pagos-tab">
    <div class="pagos-layout">
      
      <!-- ===== 🏢 SIDEBAR DE EMPRESAS - NAVEGACIÓN LATERAL INTELIGENTE ===== -->
      <!-- Panel que muestra TODAS las empresas y permite filtrar pagos por empresa -->
      <div class="empresas-sidebar">
        <div class="sidebar-header">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="mb-0">
              <i class="bi bi-building me-2"></i>
              Empresas Registradas
            </h5>
            <!-- 📊 Contador dinámico de empresas -->
            <span class="badge bg-light text-dark">{{ empresas.length }}</span>
          </div>
        </div>
        
        <!-- 🔍 Buscador de empresas - Filtrado en TIEMPO REAL -->
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

        <!-- 📋 Lista de empresas con información CLAVE -->
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

      <!-- ===== 💳 CONTENIDO PRINCIPAL - TABLA DE PAGOS MAESTRA ===== -->
      <div class="pagos-content">
        <!-- 🎯 Header con información contextual -->
        <div class="content-header">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h4 class="mb-1">
                <i class="bi bi-clock-history me-2"></i>
                Historial de Pagos
                <!-- 🏢 Mostrar empresa seleccionada si existe -->
                <span v-if="selectedEmpresa" class="text-light opacity-75">- {{ selectedEmpresa.name }}</span>
              </h4>
              <small class="text-light opacity-75">{{ pagosFiltrados.length }} registro(s) encontrado(s)</small>
            </div>
            <!-- ➕ Botón para crear nuevo pago -->
            <BotonPrimario
              variant="outline-light"
              icon="bi bi-plus-circle"
              @click="showCreateModal = true"
            >
              Crear Nuevo Pago
            </BotonPrimario>
          </div>
        </div>

        <!-- ===== 🔍 FILTROS DE BÚSQUEDA AVANZADA ===== -->
        <div class="filters-section mb-4">
          <div class="row g-3">
            <!-- 📊 Filtro por estado del pago -->
            <div class="col-md-3">
              <select class="form-select" v-model="filterStatus">
                <option value="">Todos los estados</option>
                <option value="Pagado">✅ Pagado</option>
                <option value="Pendiente">⏳ Pendiente</option>
                <option value="Abono">💰 Abono</option>
                <option value="Liquidado">🎯 Liquidado</option>
              </select>
            </div>
            <!-- 📅 Filtro por fecha específica -->
            <div class="col-md-3">
              <input type="date" class="form-control" v-model="filterDate">
            </div>
            <!-- 🔍 Búsqueda de texto libre -->
            <div class="col-md-6">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Buscar por usuario, ID de transacción o servicio..."
                v-model="searchTerm"
              >
            </div>
          </div>
        </div>

        <!-- ===== 📊 TABLA DE PAGOS - CORAZÓN DEL SISTEMA ===== -->
        <div class="payments-table-container">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>👤 Usuario</th>
                <th>📦 Plan/Servicio</th>
                <th>💰 Monto</th>
                <th>📊 Estado</th>
                <th>📅 Fecha</th>
                <th>🔢 ID Compra</th>
                <th>📝 Notas</th>
                <th>⚙️ Acciones</th>
              </tr>
            </thead>
            <tbody>
              <!-- 🔄 Componente reutilizable para cada fila de pago -->
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
              <!-- 📭 Estado vacío cuando no hay pagos -->
              <tr v-if="pagosFiltrados.length === 0">
                <td colspan="8" class="text-center py-4 text-muted">
                  <div class="empty-state">
                    <i class="bi bi-inbox fs-1 mb-2"></i>
                    <p class="mb-0">No se encontraron pagos con los filtros aplicados</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ===== 🎭 MODALES - INTERFACES DE INTERACCIÓN ===== -->
    
    <!-- ➕ Modal Sidebar para crear nuevo pago -->
    <CreatePaymentSidebar
      :show="showCreateModal"
      :selected-company="selectedEmpresa"
      :companies="empresas"
      :planes="planes"
      :servicios="servicios"
      @close="showCreateModal = false"
      @save="createPago"
    />

    <!-- 👁️ Modal para ver detalles completos del pago -->
    <PaymentDetailModal
      v-if="showDetailModal"
      :show="showDetailModal"
      :payment="selectedPago"
      :companies="empresas"
      @close="showDetailModal = false"
      @edit="editPago"
    />

    <!-- ✏️ Modal para editar pago existente -->
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

    <!-- 🏢 Modal para editar información de empresa -->
    <CompanyEditModal
      v-if="showCompanyEditModal"
      :show="showCompanyEditModal"
      :company="editingCompany"
      @close="showCompanyEditModal = false"
      @save="updateCompany"
    />

    <!-- 💰 Modal para acciones de pago (liquidar/abonar) -->
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
// ===== 📦 IMPORTACIONES CRÍTICAS =====
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

// ===== 🎛️ ESTADO REACTIVO - CONTROL TOTAL DE LA INTERFAZ =====
// Variables para controlar filtros y búsquedas
const searchEmpresa = ref('')
const searchTerm = ref('')
const filterStatus = ref('')
const filterDate = ref('')
const selectedEmpresa = ref(null)

// Variables para controlar modales
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const showEditModal = ref(false)
const showCompanyEditModal = ref(false)
const showActionModal = ref(false)

// Variables para datos temporales
const selectedPago = ref(null)
const editingPago = ref(null)
const editingCompany = ref(null)
const actionPayment = ref(null)
const currentAction = ref('')

// ===== 🏢 DATOS DE EMPRESAS - BASE DE CLIENTES =====
// En una aplicación REAL, estos datos vendrían de una API
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

// ===== 📦 DATOS DE PLANES Y SERVICIOS - CATÁLOGO DE PRODUCTOS =====
const planes = ref([
  { id: 1, nombre: 'Plan Huevo', precio: 15000 },
  { id: 2, nombre: 'Plan Ajolote', precio: 25000 },
  { id: 3, nombre: 'Plan Alebrije', precio: 0 } // Personalizado
])

const servicios = ref([
  { id: 1, nombre: 'Desarrollo de E-commerce', precio: 8000 },
  { id: 2, nombre: 'Email Marketing', precio: 5000 },
  { id: 3, nombre: 'Marketing Digital', precio: 8000 },
  { id: 4, nombre: 'Diseño UI/UX', precio: 8000 },
  { id: 5, nombre: 'Automatización', precio: 8000 }
])

// ===== 💰 DATOS DE PAGOS - REGISTRO FINANCIERO COMPLETO =====
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

// ===== 🧮 COMPUTED PROPERTIES - LÓGICA REACTIVA INTELIGENTE =====
// Filtrar empresas según búsqueda en TIEMPO REAL
const empresasFiltradas = computed(() => {
  if (!searchEmpresa.value) return empresas.value
  return empresas.value.filter(empresa => 
    empresa.name.toLowerCase().includes(searchEmpresa.value.toLowerCase()) ||
    empresa.client.toLowerCase().includes(searchEmpresa.value.toLowerCase())
  )
})

// Filtrar pagos según MÚLTIPLES criterios simultáneos
const pagosFiltrados = computed(() => {
  let filtered = pagos.value

  // 🏢 Filtrar por empresa seleccionada
  if (selectedEmpresa.value) {
    filtered = filtered.filter(pago => pago.companyId === selectedEmpresa.value.id)
  }

  // 🔍 Filtrar por término de búsqueda
  if (searchTerm.value) {
    filtered = filtered.filter(pago => 
      pago.userName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.purchaseId.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      pago.planName.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  // 📊 Filtrar por estado
  if (filterStatus.value) {
    filtered = filtered.filter(pago => pago.status === filterStatus.value)
  }

  // 📅 Filtrar por fecha
  if (filterDate.value) {
    filtered = filtered.filter(pago => pago.date === filterDate.value)
  }

  return filtered
})

// ===== 🏢 MÉTODOS PARA GESTIÓN DE EMPRESAS =====
const selectEmpresa = (empresa) => {
  selectedEmpresa.value = empresa
  console.log(`🏢 Empresa seleccionada: ${empresa.name}`)
}

const editEmpresa = (empresa) => {
  editingCompany.value = empresa
  showCompanyEditModal.value = true
  console.log(`✏️ Editando empresa: ${empresa.name}`)
}

const deleteEmpresa = async (empresa) => {
  // 🚨 Mostrar confirmación CRÍTICA antes de eliminar
  const confirmed = await showConfirm(
    'Eliminar Empresa',
    `¿Estás ABSOLUTAMENTE SEGURO de que deseas eliminar la empresa "${empresa.name}"? Esta acción es IRREVERSIBLE y eliminará TODOS los datos asociados.`
  )
  
  if (confirmed) {
    const index = empresas.value.findIndex(e => e.id === empresa.id)
    if (index > -1) {
      empresas.value.splice(index, 1)
      // Limpiar selección si era la empresa eliminada
      if (selectedEmpresa.value?.id === empresa.id) {
        selectedEmpresa.value = null
      }
      showSuccess('Empresa eliminada', `La empresa "${empresa.name}" ha sido eliminada exitosamente`)
      console.log(`🗑️ Empresa eliminada: ${empresa.name}`)
    }
  }
}

const viewEmpresaPayments = (empresa) => {
  selectedEmpresa.value = empresa
  console.log(`👁️ Viendo pagos de: ${empresa.name}`)
}

const updateCompany = (companyData) => {
  const index = empresas.value.findIndex(e => e.id === companyData.id)
  if (index > -1) {
    empresas.value[index] = companyData
    showSuccess('Empresa actualizada', 'Los datos de la empresa han sido actualizados correctamente')
    console.log(`✅ Empresa actualizada: ${companyData.name}`)
  }
  showCompanyEditModal.value = false
  editingCompany.value = null
}

// ===== 💰 MÉTODOS PARA GESTIÓN DE PAGOS =====
// Contar pagos por empresa - ESTADÍSTICA IMPORTANTE
const getPaymentsCount = (companyId) => {
  const count = pagos.value.filter(pago => pago.companyId === companyId).length
  return count
}

// Calcular total de dinero por empresa - MÉTRICA FINANCIERA CLAVE
const getTotalAmount = (companyId) => {
  const total = pagos.value
    .filter(pago => pago.companyId === companyId)
    .reduce((total, pago) => total + pago.amount, 0)
  return total
}

const viewPago = (pago) => {
  selectedPago.value = pago
  showDetailModal.value = true
  console.log(`👁️ Viendo detalles del pago: ${pago.purchaseId}`)
}

const editPago = (pago) => {
  editingPago.value = pago
  showEditModal.value = true
  showDetailModal.value = false
  console.log(`✏️ Editando pago: ${pago.purchaseId}`)
}

const deletePago = async (pago) => {
  const confirmed = await showConfirm(
    'Eliminar Pago',
    `¿Estás seguro de que deseas eliminar el pago de ${pago.userName} por $${pago.amount.toLocaleString()}?`
  )
  
  if (confirmed) {
    const index = pagos.value.findIndex(p => p.id === pago.id)
    if (index > -1) {
      pagos.value.splice(index, 1)
      showSuccess('Pago eliminado', 'El pago ha sido eliminado exitosamente')
      console.log(`🗑️ Pago eliminado: ${pago.purchaseId}`)
    }
  }
}

// ===== 💸 ACCIONES DE PAGO CRÍTICAS =====
const handleLiquidar = (pago) => {
  actionPayment.value = pago
  currentAction.value = 'liquidar'
  showActionModal.value = true
  console.log(`💰 Iniciando liquidación de: ${pago.purchaseId}`)
}

const handleAbonar = (pago) => {
  actionPayment.value = pago
  currentAction.value = 'abonar'
  showActionModal.value = true
  console.log(`💵 Iniciando abono para: ${pago.purchaseId}`)
}

const handlePaymentAction = (actionData) => {
  const { action, payment, notes, abonoAmount } = actionData
  const index = pagos.value.findIndex(p => p.id === payment.id)
  
  if (index > -1) {
    if (action === 'liquidar') {
      pagos.value[index].status = 'Liquidado'
      pagos.value[index].notes = notes || 'Pago liquidado completamente'
      showSuccess('Pago liquidado', `El pago de $${payment.amount.toLocaleString()} ha sido marcado como liquidado`)
      console.log(`✅ Pago liquidado: ${payment.purchaseId}`)
    } else if (action === 'abonar') {
      pagos.value[index].status = 'Abono'
      pagos.value[index].notes = notes || `Abono registrado: $${abonoAmount.toLocaleString()}`
      showSuccess('Abono registrado', `Se ha registrado un abono de $${abonoAmount.toLocaleString()}`)
      console.log(`💵 Abono registrado: $${abonoAmount.toLocaleString()} para ${payment.purchaseId}`)
    }
  }
  
  // Limpiar estado del modal
  showActionModal.value = false
  actionPayment.value = null
  currentAction.value = ''
}

const createPago = (pagoData) => {
  const newPago = {
    ...pagoData,
    id: Date.now() // Generar ID único temporal
  }
  pagos.value.push(newPago)
  showCreateModal.value = false
  showSuccess('Pago creado', `Nuevo pago de $${pagoData.amount.toLocaleString()} registrado exitosamente`)
  console.log(`➕ Nuevo pago creado: ${newPago.purchaseId}`)
}

const updatePago = (pagoData) => {
  const index = pagos.value.findIndex(p => p.id === pagoData.id)
  if (index > -1) {
    pagos.value[index] = pagoData
    showSuccess('Pago actualizado', 'Los datos del pago han sido actualizados correctamente')
    console.log(`✅ Pago actualizado: ${pagoData.purchaseId}`)
  }
  showEditModal.value = false
  editingPago.value = null
}
</script>

<!-- ===== 🎨 ESTILOS ESPECÍFICOS DEL COMPONENTE ===== -->
<style scoped>
/* 🏗️ Layout principal con sidebar y contenido */
.pagos-tab {
  height: calc(100vh - 200px); /* Altura dinámica que se adapta */
}

.pagos-layout {
  display: flex;
  height: 100%;
  gap: 1rem;
}

/* 🏢 Sidebar de empresas - Panel lateral inteligente */
.empresas-sidebar {
  width: 350px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-left: 4px solid var(--primary-coral); /* Borde distintivo */
}

.sidebar-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-coral) 0%, #d73c26 100%);
  color: white;
}

.search-container {
  padding: 1rem;
  background: #f8f9fa;
}

.empresas-list {
  flex: 1;
  overflow-y: auto; /* Scroll cuando hay muchas empresas */
}

/* 💳 Contenido principal - Área de trabajo */
.pagos-content {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 4px solid var(--primary-coral); /* Borde distintivo */
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
  overflow-y: auto; /* Scroll para la tabla */
  padding: 0 1.5rem 1.5rem;
}

/* 📊 Estilos de tabla mejorados */
.table thead th {
  background: #f8f9fa;
  color: var(--primary-blue);
  border: none;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  position: sticky; /* Header fijo al hacer scroll */
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
  color: #6c757d;
}

/* 📝 Estilos de formularios mejorados */
.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

/* ===== 📱 RESPONSIVE DESIGN INTELIGENTE ===== */
@media (max-width: 1200px) {
  .pagos-layout {
    flex-direction: column; /* Stack vertical en pantallas medianas */
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