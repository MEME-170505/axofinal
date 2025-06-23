<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            <i class="bi bi-building me-2"></i>
            Editar Empresa
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre de la Empresa</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="formData.name"
                required
              >
            </div>

            <div class="mb-3">
              <label for="client" class="form-label">Cliente Principal</label>
              <input
                type="text"
                class="form-control"
                id="client"
                v-model="formData.client"
                required
              >
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                placeholder="contacto@empresa.com"
              >
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">Teléfono</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                v-model="formData.phone"
                placeholder="555-123-4567"
              >
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">Dirección</label>
              <textarea
                class="form-control"
                id="address"
                rows="2"
                v-model="formData.address"
                placeholder="Dirección completa de la empresa"
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="industry" class="form-label">Industria</label>
              <select class="form-select" id="industry" v-model="formData.industry">
                <option value="">Seleccionar industria</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Comercio">Comercio</option>
                <option value="Servicios">Servicios</option>
                <option value="Manufactura">Manufactura</option>
                <option value="Salud">Salud</option>
                <option value="Educación">Educación</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="notes" class="form-label">Notas</label>
              <textarea
                class="form-control"
                id="notes"
                rows="3"
                v-model="formData.notes"
                placeholder="Notas adicionales sobre la empresa..."
              ></textarea>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <BotonPrimario
                type="button"
                variant="outline-secondary"
                @click="$emit('close')"
              >
                Cancelar
              </BotonPrimario>
              <BotonPrimario
                type="submit"
                variant="primary"
                icon="bi bi-check-lg"
              >
                Guardar Cambios
              </BotonPrimario>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, watch } from 'vue'
import BotonPrimario from '../ui/BotonPrimario.vue'

const props = defineProps({
  show: Boolean,
  company: Object
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  id: null,
  name: '',
  client: '',
  email: '',
  phone: '',
  address: '',
  industry: '',
  notes: ''
})

// Watch para cargar datos de la empresa cuando se abre el modal
watch(() => props.company, (newCompany) => {
  if (newCompany) {
    formData.value = {
      id: newCompany.id,
      name: newCompany.name || '',
      client: newCompany.client || '',
      email: newCompany.email || '',
      phone: newCompany.phone || '',
      address: newCompany.address || '',
      industry: newCompany.industry || '',
      notes: newCompany.notes || ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('save', { ...formData.value })
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.form-label {
  font-weight: 600;
  color: var(--primary-blue);
}
</style>