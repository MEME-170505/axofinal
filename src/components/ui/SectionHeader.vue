<template>
  <div class="section-header text-center mb-5">
    <h2 :class="titleClasses">
      <i v-if="icon" :class="icon + ' me-2'"></i>
      {{ title }}
    </h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    <div v-if="showUnderline" class="title-underline"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'coral',
    validator: (value) => ['coral', 'blue', 'dark'].includes(value)
  },
  showUnderline: {
    type: Boolean,
    default: true
  }
})

const titleClasses = computed(() => {
  const classes = ['section-title']
  
  switch (props.size) {
    case 'sm':
      classes.push('h4')
      break
    case 'md':
      classes.push('h3')
      break
    case 'lg':
      classes.push('h2')
      break
    case 'xl':
      classes.push('h1')
      break
  }
  
  classes.push(`text-${props.color}`)
  
  return classes.join(' ')
})
</script>

<style scoped>
.section-title {
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.title-underline {
  height: 3px;
  width: 100px;
  background: var(--primary-coral);
  margin: 1rem auto 2rem;
  border-radius: 2px;
}

.text-coral {
  color: var(--primary-coral) !important;
}

.text-blue {
  color: var(--primary-blue) !important;
}

.text-dark {
  color: #333 !important;
}
</style>