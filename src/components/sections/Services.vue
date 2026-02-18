<script setup>
import { inject, computed } from 'vue'

const t = inject('t')

// Используем computed, чтобы при смене языка массив обновлялся
const services = computed(() => [
  { 
    title: t.value?.services?.n8n_title || 'Автоматизация n8n', 
    text: t.value?.services?.n8n_text || 'Интеграция API и создание автономных бизнес-процессов.', 
    // Имя иконки FontAwesome (без fas fa-)
    icon: 'network-wired' 
  },
  { 
    title: t.value?.services?.directus_title || 'Directus & Headless', 
    text: t.value?.services?.directus_text || 'Архитектура данных и админ-панели нового поколения.', 
    icon: 'database' 
  },
  { 
    title: t.value?.services?.consulting_title || 'IT-Консалтинг', 
    text: t.value?.services?.consulting_text || 'Технический аудит и цифровая трансформация бизнеса.', 
    icon: 'laptop-code' 
  }
])
</script>

<template>
  <section class="py-24 relative z-10">
    <div class="container mx-auto px-6">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div class="max-w-xl">
          <h2 class="text-3xl font-bold text-[var(--text-primary)] mb-4">
            {{ t?.services?.main_title || 'Технологический Стек' }}
          </h2>
          <p class="text-[var(--text-secondary)]">
            {{ t?.services?.main_desc || 'Используем современные инструменты для создания отказоустойчивых систем.' }}
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(service, index) in services" :key="index" 
             class="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-[var(--brand-primary)]/50 transition-all duration-500">
          
          <div class="relative h-full bg-[var(--bg-primary)] rounded-xl p-8 border border-[var(--border-color)] group-hover:border-transparent transition-all">
            
            <div class="size-14 bg-gradient-to-br from-[var(--brand-secondary)]/20 to-[var(--brand-primary)]/20 text-[var(--brand-primary)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--brand-glow)] transition-all duration-300">
              <font-awesome-icon :icon="['fas', service.icon]" class="text-2xl" />
            </div>
            
            <h3 class="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--text-accent)] transition-colors">
              {{ service.title }}
            </h3>
            <p class="text-[var(--text-secondary)] leading-relaxed text-sm">
              {{ service.text }}
            </p>

            <div class="absolute top-4 right-4 size-2 rounded-full bg-white/10 group-hover:bg-[var(--brand-primary)] transition-colors"></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>