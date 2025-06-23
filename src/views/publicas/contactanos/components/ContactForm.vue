<template>
  <div class="card shadow-sm p-4 animate__animated animate__fadeInUp">
    <h3 class="text-center mb-4">Solicita una cotización para tu negocio</h3>
    
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input 
            type="text" 
            class="form-control" 
            id="nombre" 
            v-model="formData.nombre"
            :class="{'is-invalid': errors.nombre}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.nombre">
            {{ errors.nombre }}
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <label for="apellido" class="form-label">Apellido</label>
          <input 
            type="text" 
            class="form-control" 
            id="apellido" 
            v-model="formData.apellido"
            :class="{'is-invalid': errors.apellido}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.apellido">
            {{ errors.apellido }}
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            v-model="formData.email"
            :class="{'is-invalid': errors.email}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input 
            type="tel" 
            class="form-control" 
            id="telefono" 
            v-model="formData.telefono"
            :class="{'is-invalid': errors.telefono}"
            style="background-color: #fce7d2;"
            required
          />
          <div class="invalid-feedback" v-if="errors.telefono">
            {{ errors.telefono }}
          </div>
        </div>
      </div>
      
      <div class="mb-3">
        <label for="asunto" class="form-label">Asunto</label>
        <select 
          class="form-select" 
          id="asunto" 
          v-model="formData.asunto"
          :class="{'is-invalid': errors.asunto}"
          style="background-color: #fce7d2;"
          required
        >
          <option value="" disabled selected>Seleccione un asunto</option>
          <option value="cotizacion">Solicitar Cotización</option>
          <option value="informacion">Información General</option>
          <option value="soporte">Soporte Técnico</option>
          <option value="otro">Otro</option>
        </select>
        <div class="invalid-feedback" v-if="errors.asunto">
          {{ errors.asunto }}
        </div>
      </div>
      
      <div class="mb-4">
        <label for="mensaje" class="form-label">Mensaje</label>
        <textarea 
          class="form-control" 
          id="mensaje" 
          rows="5" 
          v-model="formData.mensaje"
          :class="{'is-invalid': errors.mensaje}"
          style="background-color: #fce7d2;"
          required
        ></textarea>
        <div class="invalid-feedback" v-if="errors.mensaje">
          {{ errors.mensaje }}
        </div>
      </div>
      
      <div class="text-center">
        <BotonPrimario
          type="submit"
          variant="primary"
          size="lg"
          icon="bi bi-send"
          :loading="isSubmitting"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
        </BotonPrimario>
      </div>
      
      <div v-if="formSubmitted" class="alert alert-success mt-4 animate__animated animate__fadeIn">
        ¡Gracias por contactarnos! Te responderemos a la brevedad.
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BotonPrimario from '../../../../components/ui/BotonPrimario.vue'

const emit = defineEmits(['submit'])

const formData = reactive({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
})

const errors = reactive({})
const isSubmitting = ref(false)
const formSubmitted = ref(false)

const validateForm = () => {
  let valid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!formData.nombre) {
    errors.nombre = 'El nombre es requerido'
    valid = false
  }

  if (!formData.apellido) {
    errors.apellido = 'El apellido es requerido'
    valid = false
  }

  if (!formData.email) {
    errors.email = 'El correo electrónico es requerido'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'El correo electrónico no es válido'
    valid = false
  }

  if (!formData.telefono) {
    errors.telefono = 'El teléfono es requerido'
    valid = false
  }

  if (!formData.asunto) {
    errors.asunto = 'Por favor seleccione un asunto'
    valid = false
  }

  if (!formData.mensaje) {
    errors.mensaje = 'El mensaje es requerido'
    valid = false
  }

  return valid
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Emit form data
    emit('submit', { ...formData })
    
    // Reset form
    Object.assign(formData, {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    })
    
    formSubmitted.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSubmitted.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  border-color: var(--primary-coral);
  box-shadow: 0 0 0 0.25rem rgba(233, 79, 55, 0.25);
}

.card {
  border: none;
  border-radius: 20px;
}
</style>