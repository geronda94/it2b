<script setup>
import { computed, inject } from 'vue'


const t = inject('t')


const techList = computed(() => [
  { name: 'Vue 3', slug: 'vuedotjs', color: '#42b883' },
  { name: 'Pinia', slug: 'pinia', color: '#FFE16B' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#38bdf8' },
  { name: 'n8n', slug: 'n8n', color: '#ea4242' },
  { name: 'Python', slug: 'python', color: '#3776AB' },
  { name: 'FastAPI', slug: 'fastapi', color: '#009688' },
  { name: 'Playwright', slug: 'googlechrome', color: '#F4CA0B' },
  { name: 'aiogram 3', slug: 'telegram', color: '#26A5E4' },
  { name: 'Directus', slug: 'directus', color: '#64f' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
  { name: 'SQLAlchemy', slug: 'sqlalchemy', color: '#D71F00' },
  { name: 'Docker', slug: 'docker', color: '#2496ed' },
  { name: 'Ubuntu', slug: 'ubuntu', color: '#E95420' },
  { name: 'Nginx', slug: 'nginx', color: '#009639' },
  { name: 'Node.js', slug: 'nodedotjs', color: '#5FA04E' }
])
</script>

<template>
  <section class="py-8 border-y border-[var(--border-color)] bg-[#050b14]/20 backdrop-blur-md relative z-10 overflow-hidden">
    
    <div class="container mx-auto px-6 mb-6 text-center">
        <h3 class="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">
          {{ t.techMarquee.label }}
        </h3>
    </div>

    <div class="relative w-full flex mask-edges">
      
      <div class="flex w-max animate-marquee py-2 items-center">
        
        <div 
          v-for="(tech, index) in [...techList, ...techList, ...techList]" 
          :key="index"
          class="flex items-center gap-3 px-8 group transition-opacity duration-500"
        >
          <div 
            class="w-6 h-6 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:scale-110"
            :style="{
              backgroundColor: tech.color,
              maskImage: `url(https://cdn.simpleicons.org/${tech.slug})`,
              WebkitMaskImage: `url(https://cdn.simpleicons.org/${tech.slug})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              filter: `drop-shadow(0 0 5px ${tech.color}40)`
            }"
          ></div>

          <span 
            class="text-sm font-bold tracking-widest font-[Eurostile,sans-serif] uppercase text-[var(--text-secondary)] group-hover:text-white transition-colors duration-300 whitespace-nowrap"
          >
            {{ tech.name }}
          </span>
        </div>

      </div>
    </div>

  </section>
</template>

<style scoped>
.mask-edges {
  /* Создает мягкое затухание по бокам полосы */
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.animate-marquee {
  /* Оптимальная скорость для компактной полосы */
  animation: marquee 40s linear infinite;
}

/* Остановка при наведении для удобства пользователя */
.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  /* Мы используем 3 повторения списка, чтобы гарантировать отсутствие пустот */
  100% { transform: translateX(-33.33%); }
}

/* Адаптивность скорости */
@media (max-width: 768px) {
  .animate-marquee {
    animation-duration: 25s;
  }
}
</style>