<template>
  <div class="clientes-tab">
    <div class="admin-card">
      <div class="admin-card-header">
        <h4 class="mb-0">
          <i class="bi bi-people me-2"></i>
          Gestión de Clientes
        </h4>
      </div>
      <div class="admin-card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="search-container flex-grow-1 me-3">
            <input 
              type="text" 
              class="form-control search-input" 
              placeholder="Buscar clientes..."
              v-model="searchTerm"
            >
          </div>
          <button class="admin-btn admin-btn-primary" @click="showAddModal = true">
            <i class="bi bi-plus-circle me-2"></i>
            Agregar Cliente
          </button>
        </div>

        <div class="admin-table">
          <table class="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in filteredClientes" :key="cliente.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="user-avatar me-3">
                      <i class="bi bi-person-circle"></i>
                    </div>
                    <div>
                      <div class="fw-bold">{{ cliente.nombre }} {{ cliente.apellido }}</div>
                      <small class="text-muted">ID: {{ cliente.id }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.empresa }}</td>
                <td>
                  <span :class="getStatusClass(cliente.estado)">
                    {{ cliente.estado }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="admin-btn admin-btn-outline" @click="editCliente(cliente)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="admin-btn admin-btn-danger" @click="deleteCliente(cliente)">
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

    <!-- Modal para agregar/editar cliente -->
    <div class="modal fade" :class="{ show: showAddModal }" style="display: block;" v-if="showAddModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingCliente ? 'Editar' : 'Agregar' }} Cliente</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCliente">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Nombre</label>
                  <input type="text" class="form-control" v-model="clienteForm.nombre" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Apellido</label>
                  <input type="text" class="form-control" v-model="clienteForm.apellido" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="clienteForm.email" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Teléfono</label>
                  <input type="tel" class="form-control" v-model="clienteForm.telefono" required>
                </div>
                <div class="col-12">
                  <label class="form-label">Empresa</label>
                  <input type="text" class="form-control" v-model="clienteForm.empresa">
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="admin-btn admin-btn-outline" @click="closeModal">
                  Cancelar
                </button>
                <button type="submit" class="admin-btn admin-btn-primary">
                  {{ editingCliente ? 'Actualizar' : 'Guardar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showAddModal"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const showAddModal = ref(false)
const editingCliente = ref(null)

const clienteForm = ref({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  empresa: ''
})

const clientes = ref([
  {
    id: 1,
    nombre: 'Mario',
    apellido: 'González',
    email: 'mario@ejemplo.com',
    telefono: '123-456-7890',
    empresa: 'Empresa S.A.',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Ana',
    apellido: 'López',
    email: 'ana@ejemplo.com',
    telefono: '098-765-4321',
    empresa: 'Tech Solutions',
    estado: 'Inactivo'
  }
])

const filteredClientes = computed(() => {
  if (!searchTerm.value) return clientes.value
  return clientes.value.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    cliente.apellido.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const getStatusClass = (estado) => {
  return estado === 'Activo' ? 'status-badge status-active' : 'status-badge status-inactive'
}

const editCliente = (cliente) => {
  editingCliente.value = cliente
  clienteForm.value = { ...cliente }
  showAddModal.value = true
}

const deleteCliente = (cliente) => {
  if (confirm(`¿Estás seguro de eliminar a ${cliente.nombre} ${cliente.apellido}?`)) {
    const index = clientes.value.findIndex(c => c.id === cliente.id)
    if (index > -1) {
      clientes.value.splice(index, 1)
    }
  }
}

const saveCliente = () => {
  if (editingCliente.value) {
    // Actualizar cliente existente
    const index = clientes.value.findIndex(c => c.id === editingCliente.value.id)
    if (index > -1) {
      clientes.value[index] = { ...clienteForm.value, id: editingCliente.value.id }
    }
  } else {
    // Agregar nuevo cliente
    const newCliente = {
      ...clienteForm.value,
      id: Date.now(),
      estado: 'Activo'
    }
    clientes.value.push(newCliente)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingCliente.value = null
  clienteForm.value = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: ''
  }
}
</script>

<style scoped>
.user-avatar {
  font-size: 2rem;
  color: var(--primary-coral);
}

.modal {
  background: rgba(0, 0, 0, 0.5);
}

.form-control:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}
</style>