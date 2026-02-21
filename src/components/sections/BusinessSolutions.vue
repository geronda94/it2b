<script setup>
import { inject, computed } from 'vue'

const t = inject('t')

const solutions = computed(() => [
  {
    id: 'ai-agents',
    icon: ['fas', 'robot'],
    color: '#06b6d4',
    title: t.value?.solutions?.ai_title || 'ИИ-сотрудники 24/7',
    desc: t.value?.solutions?.ai_desc || 'Ваш менеджер, который никогда не спит. Записывает клиентов, отвечает на вопросы в WhatsApp и квалифицирует лидов, пока вы отдыхаете'
  },
  {
    id: 'b2b-machine',
    icon: ['fas', 'bullseye'],
    color: '#3b82f6',
    title: t.value?.solutions?.b2b_title || 'Маркетинг на Автопилоте',
    desc: t.value?.solutions?.b2b_desc || 'Забудьте о холодном поиске вручную. Система сама соберет базу вашей ЦА и отправит им персонализированные предложения через Email, WhatsApp или Telegram'
  },
  {
    id: 'data-mining',
    icon: ['fas', 'magnifying-glass-chart'],
    color: '#8b5cf6',
    title: t.value?.solutions?.data_title || 'Мониторинг конкурентов',
    desc: t.value?.solutions?.data_desc || 'Узнавайте об изменении цен и ассортимента конкурентов в реальном времени. Принимайте решения на основе цифр, а не интуиции'
  },
  {
    id: 'web-platforms',
    icon: ['fas', 'laptop-code'],
    color: '#10b981',
    title: t.value?.solutions?.web_title || 'Сверхбыстрые сайты',
    // Слегка докрутили: сместили акцент с Vue.js на удержание клиентов
    desc: t.value?.solutions?.web_desc || 'Сайты, которые открываются мгновенно. Ваши клиенты больше не уйдут к конкурентам из-за долгой загрузки страницы'
  },
  {
    id: 'custom-erp',
    icon: ['fas', 'table-columns'],
    color: '#f59e0b',
    title: t.value?.solutions?.erp_title || 'Управляйте процессами эффективно',
    desc: t.value?.solutions?.erp_desc || 'Свяжем ваш склад, сайт и отдел продаж. Больше никакой путаницы в Excel — вся аналитика бизнеса перед вашими глазами'
  },
  {
    id: 'high-load',
    icon: ['fas', 'microchip'],
    color: '#ef4444',
    title: t.value?.solutions?.api_title || 'Ваш сайт не ляжет в пик продаж',
    // Докрутили: "не упадет в сезон" — это то, чего реально боится бизнес
    desc: t.value?.solutions?.api_desc || 'Проектируем архитектуру, которая выдержит тысячи заказов одновременно. Гарантируем стабильную работу в сезон распродаж или при резком росте трафика'
  }
])
</script>

<template>
  <section id="solutions" class="py-24 relative z-10">
    
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--brand-primary)]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

    <div class="container mx-auto px-6 lg:px-12">
      
      <div class="max-w-3xl mx-auto text-center mb-16 md:mb-24">
        <h2 class="text-[var(--brand-primary)] text-sm font-bold uppercase tracking-[0.2em] mb-4">Наши Решения</h2>
        <h3 class="text-3xl md:text-5xl font-black text-white font-[Eurostile,sans-serif] tracking-wide mb-6">
          От хаоса <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]">к системе</span>
        </h3>
        <p class="text-[var(--text-secondary)] text-lg leading-relaxed">
          Оптимизируем ваши бизнес-процессы: убираем рутину и создаем автоматизированные конвейеры, которые экономят бюджет и приносят прибыль.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        <div 
          v-for="item in solutions" 
          :key="item.id"
          class="group relative h-full bg-[var(--bg-secondary)]/40 backdrop-blur-sm border border-[var(--border-color)] rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden"
        >
          <div class="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 group-hover:border-[var(--brand-primary)]/30 pointer-events-none"></div>
          <div class="absolute -inset-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none" :style="{ backgroundColor: item.color }"></div>

          <div class="relative z-10 flex items-center gap-4 mb-5">
            <div class="relative w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-[#050b14] border border-[var(--border-color)] transition-all duration-500 group-hover:border-transparent group-hover:scale-110"
                 :style="{ boxShadow: `0 0 0px ${item.color}00` }">
              <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl" :style="{ backgroundColor: item.color }"></div>
              <font-awesome-icon 
                :icon="item.icon" 
                class="text-2xl transition-all duration-500"
                :style="{ color: item.color }"
                :class="'group-hover:drop-shadow-[0_0_8px_' + item.color + '80]'"
              />
            </div>

            <h4 class="text-xl font-bold text-white group-hover:text-[var(--text-accent)] transition-colors duration-300 leading-tight">
              {{ item.title }}
            </h4>
          </div>

          <div class="relative z-10">
            <p class="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base group-hover:text-[var(--text-primary)] transition-colors duration-300">
              {{ item.desc }}
            </p>
          </div>
          
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
</style>