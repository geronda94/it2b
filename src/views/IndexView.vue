<script setup>
import { inject, Text } from 'vue'
import Hero from '../components/sections/Hero.vue'

import TechMarquee from '@/components/sections/TechMarquee.vue';
import BusinessSolutions from '@/components/sections/BusinessSolutions.vue';
import TechBento from '@/components/sections/TechBento.vue';
import ProcessTimeline from '@/components/sections/ProcessTimeline.vue';
import CasesMetrics from '@/components/sections/CasesMetrics.vue';
import CallBlock from '@/components/sections/CallBlock.vue';
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
    <ProcessTimeline />
    <CasesMetrics />
    <CallBlock />
  </div>
</template>