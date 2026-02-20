<script setup>
import { inject, computed, ref, onMounted, onUnmounted } from 'vue'

const t = inject('t')

// Отслеживание видимости
const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.1 })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

// 6 мощных B2B кейсов
const cases = computed(() => [
  {
    id: 'parser',
    tags: ['Data Mining', 'Python', 'B2B'],
    title: t.value?.cases?.parser_title || 'Автоматизация отдела закупок и продаж',
    desc: t.value?.cases?.parser_desc || 'Разработали парсер Google Maps для строительных компаний. Исключили ручной поиск подрядчиков, обеспечив отдел продаж стабильным потоком горячих лидов.',
    accent: '#3b82f6', // Blue
    metrics: [
      { label: 'Контактов/нед.', value: '10 000+' },
      { label: 'Экономия времени', value: '40+ ч' },
      { label: 'Рост базы', value: '+300%', fullWidth: true }
    ],
    scale: {
      label: 'Эффективность поиска (Ручной vs Автоматика)',
      percent: 95,
      color: 'from-blue-600 to-cyan-400'
    }
  },
  {
    id: 'custom-admin',
    tags: ['FastAPI', 'Vue 3', 'High-Load'],
    title: t.value?.cases?.admin_title || 'Кастомная CRM для Enterprise',
    desc: t.value?.cases?.admin_desc || 'Собрали высоконагруженную панель управления с нуля. Бэкенд на FastAPI выдерживает пиковые нагрузки, а реактивный интерфейс на Vue 3 позволяет работать без перезагрузки страниц.',
    accent: '#f59e0b', // Amber
    metrics: [
      { label: 'Скорость отклика', value: '<50ms' },
      { label: 'Ограничений', value: '0' },
      { label: 'Аптайм системы', value: '99.9%', fullWidth: true }
    ],
    scale: {
      label: 'Ускорение работы менеджеров',
      percent: 85,
      color: 'from-amber-600 to-yellow-400'
    }
  },
  {
    id: 'fsm-ai',
    tags: ['n8n', 'AI', 'FSM Architecture'],
    title: t.value?.cases?.ai_title || 'FSM-Ядро для ИИ-Ассистентов',
    desc: t.value?.cases?.ai_desc || 'Создали отказоустойчивое ядро на базе конечных автоматов. ИИ-боты для стоматологий и салонов красоты работают строго по бизнес-логике, без "галлюцинаций".',
    accent: '#8b5cf6', // Purple
    metrics: [
      { label: 'Контроль диалога', value: '100%' },
      { label: 'Внедрение', value: '7 дней' },
      { label: 'Снижение нагрузки на саппорт', value: '-40%', fullWidth: true }
    ],
    scale: {
      label: 'Следование бизнес-скрипту',
      percent: 100,
      color: 'from-purple-600 to-fuchsia-400'
    }
  },
  {
    id: 'erp',
    tags: ['Directus', 'API', 'Management'],
    title: t.value?.cases?.erp_title || 'Единая ERP для сети магазинов',
    desc: t.value?.cases?.erp_desc || 'Унифицировали менеджмент нескольких независимых интернет-магазинов. Собрали единую Low-Code панель управления, объединив склады, заказы и аналитику в одном окне.',
    accent: '#10b981', // Green
    metrics: [
      { label: 'Систем в одной', value: '5 в 1' },
      { label: 'Ошибок учета', value: '0%' },
      { label: 'Ускорение обработки заказов', value: 'x3 раза', fullWidth: true }
    ],
    scale: {
      label: 'Сокращение операционных издержек',
      percent: 75,
      color: 'from-emerald-600 to-green-400'
    }
  },
  {
    id: 'global-ecom',
    tags: ['E-commerce', 'Payments', 'Scaling'],
    title: t.value?.cases?.ecom_title || 'Международный E-commerce',
    desc: t.value?.cases?.ecom_desc || 'Запустили платформу электронной коммерции для работы на несколько стран. Настроили динамическую локализацию, автоматический пересчет валют и интеграцию с логистикой.',
    accent: '#ef4444', // Red
    metrics: [
      { label: 'Гео-зон', value: '5+' },
      { label: 'Валюты', value: 'Авто' },
      { label: 'Рост конверсии (за рубежом)', value: '+45%', fullWidth: true }
    ],
    scale: {
      label: 'Автоматизация расчета налогов и логистики',
      percent: 100,
      color: 'from-red-600 to-rose-400'
    }
  },
  {
    id: 'hr-automation',
    tags: ['n8n', 'HR Tech', 'Integrations'],
    title: t.value?.cases?.hr_title || 'Автоматизация HR и Команды',
    desc: t.value?.cases?.hr_desc || 'Связали мессенджеры, таск-трекеры и почту в единый конвейер. Автоматизировали скрининг резюме, онбординг новичков и выдачу корпоративных доступов.',
    accent: '#06b6d4', // Cyan
    metrics: [
      { label: 'Часов HR сэкономлено', value: '120/мес' },
      { label: 'Рутины', value: '0%' },
      { label: 'Скорость онбординга', value: '10 мин', fullWidth: true }
    ],
    scale: {
      label: 'Автоматизация внутренних процессов',
      percent: 90,
      color: 'from-cyan-600 to-teal-400'
    }
  }
])
</script>

<template>
  <section id="cases" class="py-24 lg:py-32 relative z-10" ref="sectionRef">
    
    <div class="container mx-auto px-6 lg:px-12">
      
    <div class="max-w-3xl mx-auto text-center mb-16 md:mb-24">
        
        <h2 class="text-[var(--brand-primary)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
          {{ t?.cases?.badge || 'Флагманские внедрения' }}
        </h2>
        
        <h3 class="text-3xl md:text-5xl font-black text-white tracking-wide mb-6">
          Избранные кейсы: <br class="md:hidden" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]">
            Цифры вместо слов
          </span>
        </h3>
        
        <p class="text-[var(--text-secondary)] text-lg leading-relaxed">
          Из десятков реализованных проектов мы отобрали 6 самых показательных. Никаких красивых картинок — только сухая выжимка того, как наша архитектура сокращает издержки и приносит прибыль.
        </p>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        <div 
          v-for="(item, index) in cases" 
          :key="item.id"
          class="group relative bg-[var(--bg-secondary)]/30 backdrop-blur-md border border-[var(--border-color)] rounded-3xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
        >
          <div class="absolute top-0 left-0 w-full h-1 transition-all duration-500" :style="{ backgroundColor: item.accent, opacity: 0.5 }"></div>
          <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none" :style="{ backgroundColor: item.accent }"></div>

          <div class="mb-8 relative z-10">
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in item.tags" 
                :key="tag"
                class="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-bold text-[var(--text-secondary)]"
              >
                {{ tag }}
              </span>
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">
              {{ item.title }}
            </h3>
            
            <p class="text-[var(--text-secondary)] text-sm leading-relaxed">
              {{ item.desc }}
            </p>
          </div>

          <div class="mt-auto relative z-10">
            
            <div class="grid grid-cols-2 gap-3 mb-8">
              <div 
                v-for="metric in item.metrics" 
                :key="metric.label" 
                class="bg-white/[0.02] border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.05]"
                :class="[
                    metric.fullWidth ? 'col-span-2 flex items-center justify-between' : 'col-span-1 flex flex-col',
                ]"
                :style="`--hover-border: ${item.accent}40;`"
                onmouseover="this.style.borderColor = 'var(--hover-border)'"
                onmouseout="this.style.borderColor = 'rgba(255,255,255,0.05)'"
              >
                <span 
                  class="font-black font-[Eurostile,sans-serif] tracking-tight text-white"
                  :class="metric.fullWidth ? 'text-2xl order-2' : 'text-3xl mb-1'"
                  :style="{ textShadow: `0 0 15px ${item.accent}30` }"
                >
                  {{ metric.value }}
                </span>
                <span 
                  class="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-bold"
                  :class="metric.fullWidth ? 'order-1' : ''"
                >
                  {{ metric.label }}
                </span>
              </div>
            </div>

            <div class="w-full">
              <div class="flex justify-between items-end text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-3">
                <span class="max-w-[80%] leading-tight">{{ item.scale.label }}</span>
                <span class="text-white text-xs">{{ item.scale.percent }}%</span>
              </div>
              <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                <div 
                  class="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r transition-all duration-[1.5s] ease-out shadow-[0_0_10px_currentColor]"
                  :class="item.scale.color"
                  :style="{ width: isVisible ? `${item.scale.percent}%` : '0%', transitionDelay: `${index * 150}ms` }"
                >
                  <div class="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/70 blur-[1px]"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Дополнительные стили здесь не нужны, вся магия в Tailwind */
</style>