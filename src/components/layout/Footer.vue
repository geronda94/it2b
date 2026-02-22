<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-0 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-md py-8">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="flex items-center gap-4">
          <router-link to="/" class="flex items-center gap-3 group cursor-pointer select-none">
            <div class="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 font-[Eurostile,sans-serif] text-2xl font-black tracking-wide text-[var(--text-primary)]">
                <span>IT</span>
                <span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] drop-shadow-[0_0_5px_var(--brand-glow)] mx-[1px]">2</span>
                <span>B</span>
            </div>
          </router-link>
          
          <span class="hidden md:inline-block text-[var(--border-color)]">|</span>
          <span class="text-[var(--text-secondary)] text-sm font-bold tracking-widest font-[Eurostile,sans-serif]">
            © {{ currentYear }}
          </span>
        </div>

        <a 
          href="mailto:agency@it2b.top" 
          class="group flex items-center gap-3 text-[var(--text-secondary)] hover:text-white transition-colors duration-300"
        >
          <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)]/10 transition-all duration-300 shadow-[0_0_0_transparent] group-hover:shadow-[0_0_15px_-3px_var(--brand-glow)]">
            <font-awesome-icon :icon="['fas', 'envelope']" class="text-[var(--brand-primary)] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span class="font-bold tracking-wider text-sm">agency@it2b.top</span>
        </a>

      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Дополнительные стили не требуются */
</style>