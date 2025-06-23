<template>
  <div class="admin-container">
    <div class="container py-5 animate__animated animate__fadeIn">
      <!-- Admin Header -->
      <AdminHeader />

      <!-- Navigation Tabs -->
      <AdminNavigation 
        :activeTab="activeTab"
        @change-tab="activeTab = $event"
      />

      <!-- Tab Content -->
      <div class="tab-content">
        <ClientesTab v-if="activeTab === 'clientes'" key="clientes-tab" />
        <AdministradoresTab v-if="activeTab === 'administradores'" key="administradores-tab" />
        <ServiciosTab v-if="activeTab === 'servicios'" key="servicios-tab" />
        <PagosTab v-if="activeTab === 'pagos'" key="pagos-tab" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AdminHeader from './components/AdminHeader.vue';
import AdminNavigation from './components/AdminNavigation.vue';
import ClientesTab from './components/ClientesTab.vue';
import AdministradoresTab from './components/AdministradoresTab.vue';
import ServiciosTab from './components/ServiciosTab.vue';
import PagosTab from './components/PagosTab.vue';

const activeTab = ref('clientes');
</script>

<style>
@import '../../../assets/estiloadmin.css';
</style>