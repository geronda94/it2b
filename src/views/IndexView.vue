<script setup>
import { inject } from 'vue'
import Hero from '../components/sections/Hero.vue'
import Services from '../components/sections/Services.vue'
// Hero и Services мы создавали на предыдущем этапе.
// Убедись, что они лежат в src/components/sections/

const emit = defineEmits(['openModal'])
</script>

<template>
  <div>
    <Hero @openModal="emit('openModal', 'contact')" />
    <Services />
  </div>
</template>