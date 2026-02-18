<template>
  <footer class="py-12 border-t border-[var(--border-color)] bg-[var(--bg-primary)] relative z-10 mt-auto">
    <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-2">
        <span class="text-xl font-black text-[var(--text-primary)] tracking-wide">IT<span class="text-[var(--brand-primary)]">2</span>B</span>
        <span class="text-slate-700">/</span>
        <p class="text-sm text-[var(--text-secondary)]">© 2026 Future Systems</p>
      </div>
      <div class="flex gap-6 text-[var(--text-secondary)] text-xl">
        <a href="#" class="hover:text-[var(--brand-primary)] transition-colors"><font-awesome-icon :icon="['fab', 'github']" /></a>
        <a href="#" class="hover:text-[var(--brand-primary)] transition-colors"><font-awesome-icon :icon="['fab', 'telegram']" /></a>
      </div>
    </div>
  </footer>
</template>