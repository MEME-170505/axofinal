<template>
  <div class="cliente-inicio animate__animated animate__fadeIn">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-coral text-white">
            <h4 class="card-title mb-0">
              <i class="bi bi-person-gear me-2"></i>
              Datos Personales
            </h4>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="saveData">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="nombre" 
                      placeholder="Nombre"
                      v-model="formData.nombre"
                      :disabled="!isEditing"
                    >
                    <label for="nombre">Nombre</label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="apellido" 
                      placeholder="Apellido"
                      v-model="formData.apellido"
                      :disabled="!isEditing"
                    >
                    <label for="apellido">Apellido</label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="tel" 
                      class="form-control" 
                      id="telefono" 
                      placeholder="Teléfono"
                      v-model="formData.telefono"
                      :disabled="!isEditing"
                    >
                    <label for="telefono">Teléfono</label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      placeholder="Correo Electrónico"
                      v-model="formData.email"
                      :disabled="!isEditing"
                    >
                    <label for="email">Correo Electrónico</label>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="empresa" 
                      placeholder="Nombre de la empresa"
                      v-model="formData.empresa"
                      :disabled="!isEditing"
                    >
                    <label for="empresa">Nombre de la empresa</label>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-center gap-3 mt-4">
                <BotonPrimario
                  v-if="!isEditing"
                  variant="outline-primary"
                  icon="bi bi-pencil"
                  @click="toggleEdit"
                >
                  Editar
                </BotonPrimario>
                
                <BotonPrimario
                  v-if="isEditing"
                  type="submit"
                  variant="primary"
                  icon="bi bi-check-lg"
                >
                  Guardar
                </BotonPrimario>
                
                <BotonPrimario
                  v-if="isEditing"
                  variant="outline-secondary"
                  icon="bi bi-x-lg"
                  @click="cancelEdit"
                >
                  Cancelar
                </BotonPrimario>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

const props = defineProps({
  usuario: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-usuario'])

const isEditing = ref(false)
const formData = reactive({ ...props.usuario })

// Watch para actualizar formData cuando cambie el usuario
watch(() => props.usuario, (newUsuario) => {
  Object.assign(formData, newUsuario)
}, { deep: true })

const toggleEdit = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  Object.assign(formData, props.usuario)
}

const saveData = () => {
  isEditing.value = false
  emit('update-usuario', { ...formData })
}
</script>

<style scoped>
.bg-coral {
  background-color: var(--primary-coral) !important;
}

.form-control:disabled {
  background-color: #f8f9fa;
  opacity: 0.8;
}

.form-control:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.card {
  border-radius: 16px;
  overflow: hidden;
}

.card-header {
  border-bottom: none;
}
</style>