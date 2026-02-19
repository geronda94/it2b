<script setup>
import { inject, Text } from 'vue'
import Hero from '../components/sections/Hero.vue'
import Services from '../components/sections/Services.vue'
import TechMarquee from '@/components/sections/TechMarquee.vue';
import BusinessSolutions from '@/components/sections/BusinessSolutions.vue';
import TechBento from '@/components/sections/TechBento.vue';
// Hero и Services мы создавали на предыдущем этапе.
// Убедись, что они лежат в src/components/sections/

const emit = defineEmits(['openModal'])
</script>

<template>
  <div>
    <Hero @openModal="emit('openModal', 'contact')" />
    <TechMarquee/>
    <BusinessSolutions />
    <TechBento />
    <!-- <Services /> -->
  </div>
</template>