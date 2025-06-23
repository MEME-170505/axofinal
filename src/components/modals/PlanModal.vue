<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0">
          <h5 class="modal-title">Crear Nuevo Plan</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre del Plan</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="formData.nombre"
                required
              >
            </div>
            
            <div class="mb-4">
              <label class="form-label">Este plan cuenta con:</label>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="diseno"
                  v-model="formData.servicios.diseno"
                >
                <label class="form-check-label" for="diseno">
                  DISEÑO UI/UX
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="web"
                  v-model="formData.servicios.web"
                >
                <label class="form-check-label" for="web">
                  PÁGINA WEB
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="correo"
                  v-model="formData.servicios.correo"
                >
                <label class="form-check-label" for="correo">
                  CORREO EMPRESARIAL
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="marketing"
                  v-model="formData.servicios.marketing"
                >
                <label class="form-check-label" for="marketing">
                  MARKETING DIGITAL (ESPECIALIZADO O AUTOMATIZADO)
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="automatizaciones"
                  v-model="formData.servicios.automatizaciones"
                >
                <label class="form-check-label" for="automatizaciones">
                  AUTOMATIZACIONES
                </label>
              </div>
            </div>

            <div class="mb-3">
              <label for="precio" class="form-label">Precio</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  type="number"
                  class="form-control"
                  id="precio"
                  v-model="formData.precio"
                  required
                >
                <span class="input-group-text">MXN</span>
              </div>
            </div>

            <div class="text-end">
              <button type="button" class="btn btn-secondary me-2" @click="closeModal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-if="show"></div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['close', 'save']);

const show = ref(true);
const formData = ref({
  nombre: '',
  servicios: {
    diseno: false,
    web: false,
    correo: false,
    marketing: false,
    automatizaciones: false
  },
  precio: ''
});

const closeModal = () => {
  show.value = false;
  emit('close');
};

const handleSubmit = () => {
  const serviciosIncluidos = Object.entries(formData.value.servicios)
    .filter(([_, value]) => value)
    .map(([key]) => {
      const nombres = {
        diseno: 'DISEÑO UI/UX',
        web: 'PÁGINA WEB',
        correo: 'CORREO EMPRESARIAL',
        marketing: 'MARKETING DIGITAL',
        automatizaciones: 'AUTOMATIZACIONES'
      };
      return nombres[key];
    });

  const planData = {
    nombre: formData.value.nombre,
    detalles: serviciosIncluidos.map(servicio => 
      `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${servicio}</li>`
    ).join('\n') + '\n<hr>',
    precio: `$${formData.value.precio} MXM`,
    subinfo: "Pago único mensual"
  };

  emit('save', planData);
  closeModal();
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.form-control:focus,
.form-check-input:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.form-check-input:checked {
  background-color: var(--primary-coral);
  border-color: var(--primary-coral);
}
</style>