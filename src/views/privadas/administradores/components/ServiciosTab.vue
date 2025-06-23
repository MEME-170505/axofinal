<template>
  <div class="servicios-tab">
    <div class="admin-card">
      <div class="admin-card-header">
        <h4 class="mb-0">
          <i class="bi bi-gear me-2"></i>
          Gestión de Servicios y Planes
        </h4>
      </div>
      <div class="admin-card-body">
        <!-- Navigation Tabs -->
        <div class="nav-pills-container mb-4">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <button 
                class="nav-link" 
                :class="{ active: activeTab === 'planes' }"
                @click="activeTab = 'planes'"
              >
                <i class="bi bi-box-seam me-2"></i>
                Planes
              </button>
            </li>
            <li class="nav-item">
              <button 
                class="nav-link" 
                :class="{ active: activeTab === 'servicios' }"
                @click="activeTab = 'servicios'"
              >
                <i class="bi bi-tools me-2"></i>
                Servicios
              </button>
            </li>
          </ul>
        </div>

        <!-- Planes Tab -->
        <div v-if="activeTab === 'planes'">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0">Planes Disponibles</h5>
            <button class="admin-btn admin-btn-primary" @click="showPlanModal = true">
              <i class="bi bi-plus-circle me-2"></i>
              Agregar Plan
            </button>
          </div>

          <div class="row g-4">
            <div class="col-lg-4 col-md-6" v-for="plan in planes" :key="plan.id">
              <div class="service-admin-card">
                <div class="service-header">
                  <h5>{{ plan.nombre }}</h5>
                  <div class="service-price">{{ plan.precio }}</div>
                </div>
                <div class="service-details" v-html="plan.detalles"></div>
                <div class="service-actions">
                  <button class="admin-btn admin-btn-outline" @click="editPlan(plan)">
                    <i class="bi bi-pencil"></i> Editar
                  </button>
                  <button class="admin-btn admin-btn-danger" @click="deletePlan(plan)">
                    <i class="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Servicios Tab -->
        <div v-if="activeTab === 'servicios'">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0">Servicios Individuales</h5>
            <button class="admin-btn admin-btn-primary" @click="showServiceModal = true">
              <i class="bi bi-plus-circle me-2"></i>
              Agregar Servicio
            </button>
          </div>

          <div class="row g-4">
            <div class="col-lg-4 col-md-6" v-for="servicio in servicios" :key="servicio.id">
              <div class="service-admin-card">
                <div class="service-header">
                  <h5>{{ servicio.title }}</h5>
                  <div class="service-price">{{ servicio.price }}</div>
                </div>
                <div class="service-image" v-if="servicio.image">
                  <img :src="servicio.image" :alt="servicio.title" class="img-fluid rounded">
                </div>
                <p class="service-description">{{ servicio.description }}</p>
                <div class="service-actions">
                  <button class="admin-btn admin-btn-outline" @click="editService(servicio)">
                    <i class="bi bi-pencil"></i> Editar
                  </button>
                  <button class="admin-btn admin-btn-danger" @click="deleteService(servicio)">
                    <i class="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Plan Modal -->
    <PlanModal 
      v-if="showPlanModal"
      @close="showPlanModal = false"
      @save="savePlan"
    />

    <!-- Edit Plan Modal -->
    <EditPlanModal 
      v-if="showEditPlanModal"
      :show="showEditPlanModal"
      :plan="editingPlan"
      @close="showEditPlanModal = false"
      @save="updatePlan"
    />

    <!-- Service Modal -->
    <ServiceModal 
      v-if="showServiceModal"
      @close="showServiceModal = false"
      @save="saveService"
    />

    <!-- Edit Service Modal -->
    <EditServiceModal 
      v-if="showEditServiceModal"
      :show="showEditServiceModal"
      :servicio="editingService"
      @close="showEditServiceModal = false"
      @save="updateService"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PlanModal from '../../../../components/modals/PlanModal.vue'
import EditPlanModal from '../../../../components/modals/EditPlanModal.vue'
import ServiceModal from '../../../../components/modals/ServiceModal.vue'
import EditServiceModal from '../../../../components/modals/EditServiceModal.vue'

const activeTab = ref('planes')
const showPlanModal = ref(false)
const showEditPlanModal = ref(false)
const showServiceModal = ref(false)
const showEditServiceModal = ref(false)
const editingPlan = ref(null)
const editingService = ref(null)

const planes = ref([
  {
    id: 1,
    nombre: "Plan Huevo",
    detalles: `
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>DISEÑO UI/UX</li>
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>PÁGINA WEB</li>
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>CORREO EMPRESARIAL</li>
      <hr>
    `,
    precio: "$15,000 MXN",
    subinfo: "Pago único mensual"
  },
  {
    id: 2,
    nombre: "Plan Ajolote",
    detalles: `
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>DISEÑO UI/UX</li>
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>PÁGINA WEB</li>
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>CORREO EMPRESARIAL</li>
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>MARKETING DIGITAL</li>
      <li><i class="bi bi-check-circle-fill text-success me-2"></i>AUTOMATIZACIONES</li>
      <hr>
    `,
    precio: "$25,000 MXN",
    subinfo: "Pago único mensual"
  }
])

const servicios = ref([
  {
    id: 1,
    title: "Desarrollo de E-commerce",
    description: "Tienda en línea completa con pasarela de pagos",
    price: "$8,000 - $15,000 MXN",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg"
  },
  {
    id: 2,
    title: "Email Marketing",
    description: "Campañas de correo electrónico estratégicas",
    price: "$3,000 - $8,000 MXN",
    image: "https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg"
  }
])

const editPlan = (plan) => {
  editingPlan.value = plan
  showEditPlanModal.value = true
}

const deletePlan = (plan) => {
  if (confirm(`¿Estás seguro de eliminar el plan "${plan.nombre}"?`)) {
    const index = planes.value.findIndex(p => p.id === plan.id)
    if (index > -1) {
      planes.value.splice(index, 1)
    }
  }
}

const editService = (servicio) => {
  editingService.value = servicio
  showEditServiceModal.value = true
}

const deleteService = (servicio) => {
  if (confirm(`¿Estás seguro de eliminar el servicio "${servicio.title}"?`)) {
    const index = servicios.value.findIndex(s => s.id === servicio.id)
    if (index > -1) {
      servicios.value.splice(index, 1)
    }
  }
}

const savePlan = (planData) => {
  const newPlan = {
    ...planData,
    id: Date.now()
  }
  planes.value.push(newPlan)
}

const updatePlan = (planData) => {
  const index = planes.value.findIndex(p => p.id === planData.id)
  if (index > -1) {
    planes.value[index] = planData
  }
  showEditPlanModal.value = false
  editingPlan.value = null
}

const saveService = (serviceData) => {
  const newService = {
    ...serviceData,
    id: Date.now()
  }
  servicios.value.push(newService)
}

const updateService = (serviceData) => {
  const index = servicios.value.findIndex(s => s.id === serviceData.id)
  if (index > -1) {
    servicios.value[index] = serviceData
  }
  showEditServiceModal.value = false
  editingService.value = null
}
</script>

<style scoped>
.nav-pills-container {
  border-bottom: 2px solid #e9ecef;
}

.nav-pills .nav-link {
  color: var(--primary-blue);
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-pills .nav-link.active {
  background-color: var(--primary-coral);
  color: white;
}

.service-admin-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-admin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-coral);
}

.service-header {
  margin-bottom: 1rem;
}

.service-header h5 {
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.service-price {
  color: var(--primary-coral);
  font-weight: 600;
  font-size: 1.1rem;
}

.service-details {
  flex: 1;
  margin-bottom: 1rem;
}

.service-details ul {
  list-style: none;
  padding: 0;
}

.service-image {
  margin-bottom: 1rem;
}

.service-image img {
  max-height: 150px;
  width: 100%;
  object-fit: cover;
}

.service-description {
  color: #666;
  margin-bottom: 1rem;
  flex: 1;
}

.service-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.service-actions .admin-btn {
  flex: 1;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}
</style>