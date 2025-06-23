<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1" style="display: block;" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0">
          <h5 class="modal-title">Crear Nuevo Servicio</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="title" class="form-label">Nombre del Servicio</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="formData.title"
                required
              >
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Descripción</label>
              <textarea
                class="form-control"
                id="description"
                v-model="formData.description"
                rows="3"
                required
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="image" class="form-label">Imagen del Servicio</label>
              <div class="image-upload-container">
                <div 
                  class="image-preview"
                  :style="{ backgroundImage: previewImage ? `url(${previewImage})` : 'none' }"
                >
                  <div v-if="!previewImage" class="upload-placeholder">
                    <i class="bi bi-cloud-upload fs-2"></i>
                    <p class="mb-0 mt-2">Click para subir imagen</p>
                  </div>
                  <img v-if="previewImage" :src="previewImage" alt="Preview" style="display: none;">
                </div>
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  @change="handleImageChange"
                  accept="image/*"
                  required
                >
              </div>
            </div>

            <div class="mb-3">
              <label for="price" class="form-label">Precio</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  v-model="formData.price"
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
const previewImage = ref(null);
const formData = ref({
  title: '',
  description: '',
  price: '',
  image: null
});

const closeModal = () => {
  show.value = false;
  emit('close');
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  const serviceData = {
    title: formData.value.title,
    description: formData.value.description,
    price: `$${formData.value.price} MXM`,
    image: previewImage.value
  };
  
  emit('save', serviceData);
  closeModal();
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.image-upload-container {
  text-align: center;
}

.image-preview {
  width: 100%;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-placeholder {
  color: #999;
}

input[type="file"] {
  display: none;
}
</style>