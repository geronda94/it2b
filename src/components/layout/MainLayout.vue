<script setup>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
// Мы пробрасываем событие открытия модалки от Navbar к родителю (App.vue)
const emit = defineEmits(['openModal'])
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--brand-primary)] selection:text-white overflow-x-hidden">
    
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)]"></div>
      <div class="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[var(--brand-secondary)] opacity-20 rounded-full blur-[120px]"></div>
      <div class="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-[var(--brand-primary)] opacity-10 rounded-full blur-[100px]"></div>
    </div>

    <NavBar @openContact="emit('openModal', 'contact')" @openModal="(type) => emit('openModal', type)" />

    <main class="flex-grow flex flex-col relative z-10">
      <slot />
    </main>

    <Footer />
    
  </div>
</template>