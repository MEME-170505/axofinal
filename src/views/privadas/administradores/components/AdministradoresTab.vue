<template>
  <div class="administradores-tab">
    <div class="admin-card">
      <div class="admin-card-header">
        <h4 class="mb-0">
          <i class="bi bi-shield me-2"></i>
          Gestión de Administradores
        </h4>
      </div>
      <div class="admin-card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="search-container flex-grow-1 me-3">
            <input 
              type="text" 
              class="form-control search-input" 
              placeholder="Buscar administradores..."
              v-model="searchTerm"
            >
          </div>
          <button class="admin-btn admin-btn-primary" @click="showAddModal = true">
            <i class="bi bi-plus-circle me-2"></i>
            Agregar Administrador
          </button>
        </div>

        <div class="admin-table">
          <table class="table">
            <thead>
              <tr>
                <th>Administrador</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Último Acceso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="admin in filteredAdmins" :key="admin.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="admin-avatar me-3">
                      <i class="bi bi-shield-check"></i>
                    </div>
                    <div>
                      <div class="fw-bold">{{ admin.nombre }} {{ admin.apellido }}</div>
                      <small class="text-muted">ID: {{ admin.id }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ admin.email }}</td>
                <td>
                  <span class="badge bg-primary">{{ admin.rol }}</span>
                </td>
                <td>{{ admin.ultimoAcceso }}</td>
                <td>
                  <span :class="getStatusClass(admin.estado)">
                    {{ admin.estado }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="admin-btn admin-btn-outline" @click="editAdmin(admin)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="admin-btn admin-btn-danger" @click="deleteAdmin(admin)" :disabled="admin.id === 1">
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

    <!-- Modal para agregar/editar administrador -->
    <div class="modal fade" :class="{ show: showAddModal }" style="display: block;" v-if="showAddModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingAdmin ? 'Editar' : 'Agregar' }} Administrador</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAdmin">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Nombre</label>
                  <input type="text" class="form-control" v-model="adminForm.nombre" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Apellido</label>
                  <input type="text" class="form-control" v-model="adminForm.apellido" required>
                </div>
                <div class="col-12">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="adminForm.email" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Rol</label>
                  <select class="form-select" v-model="adminForm.rol" required>
                    <option value="">Seleccionar rol</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderador">Moderador</option>
                  </select>
                </div>
                <div class="col-md-6" v-if="!editingAdmin">
                  <label class="form-label">Contraseña</label>
                  <input type="password" class="form-control" v-model="adminForm.password" :required="!editingAdmin">
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="admin-btn admin-btn-outline" @click="closeModal">
                  Cancelar
                </button>
                <button type="submit" class="admin-btn admin-btn-primary">
                  {{ editingAdmin ? 'Actualizar' : 'Guardar' }}
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
const editingAdmin = ref(null)

const adminForm = ref({
  nombre: '',
  apellido: '',
  email: '',
  rol: '',
  password: ''
})

const administradores = ref([
  {
    id: 1,
    nombre: 'Admin',
    apellido: 'Principal',
    email: 'admin@axoweb.com',
    rol: 'Super Admin',
    ultimoAcceso: '2024-01-15',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'Rodríguez',
    email: 'maria@axoweb.com',
    rol: 'Admin',
    ultimoAcceso: '2024-01-14',
    estado: 'Activo'
  }
])

const filteredAdmins = computed(() => {
  if (!searchTerm.value) return administradores.value
  return administradores.value.filter(admin => 
    admin.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    admin.apellido.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    admin.rol.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const getStatusClass = (estado) => {
  return estado === 'Activo' ? 'status-badge status-active' : 'status-badge status-inactive'
}

const editAdmin = (admin) => {
  editingAdmin.value = admin
  adminForm.value = { ...admin, password: '' }
  showAddModal.value = true
}

const deleteAdmin = (admin) => {
  if (admin.id === 1) {
    alert('No se puede eliminar el administrador principal')
    return
  }
  
  if (confirm(`¿Estás seguro de eliminar a ${admin.nombre} ${admin.apellido}?`)) {
    const index = administradores.value.findIndex(a => a.id === admin.id)
    if (index > -1) {
      administradores.value.splice(index, 1)
    }
  }
}

const saveAdmin = () => {
  if (editingAdmin.value) {
    // Actualizar administrador existente
    const index = administradores.value.findIndex(a => a.id === editingAdmin.value.id)
    if (index > -1) {
      administradores.value[index] = { 
        ...adminForm.value, 
        id: editingAdmin.value.id,
        ultimoAcceso: editingAdmin.value.ultimoAcceso
      }
    }
  } else {
    // Agregar nuevo administrador
    const newAdmin = {
      ...adminForm.value,
      id: Date.now(),
      ultimoAcceso: new Date().toISOString().split('T')[0],
      estado: 'Activo'
    }
    administradores.value.push(newAdmin)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingAdmin.value = null
  adminForm.value = {
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }
}
</script>

<style scoped>
.admin-avatar {
  font-size: 2rem;
  color: var(--primary-blue);
}

.modal {
  background: rgba(0, 0, 0, 0.5);
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}
</style>