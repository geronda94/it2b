<script setup>
import Hero from "../components/sections/Hero.vue";

import TechMarquee from "@/components/sections/TechMarquee.vue";
import BusinessSolutions from "@/components/sections/BusinessSolutions.vue";
import TechBento from "@/components/sections/TechBento.vue";
import ProcessTimeline from "@/components/sections/ProcessTimeline.vue";
import CasesMetrics from "@/components/sections/CasesMetrics.vue";
import CallBlock from "@/components/sections/CallBlock.vue";

const emit = defineEmits(["openModal"]);
</script>

<template>
  <div>
    <Hero Hero id="hero" @openModal="emit('openModal', 'contact')" />
    <TechMarquee id="techMarquee" />
    <BusinessSolutions id="solutions" /> 
    <ProcessTimeline id="process" />
    <CasesMetrics id="cases" /> 
    <TechBento id="stack" />
    <CallBlock id="callBlock" />
  </div>
</template>
