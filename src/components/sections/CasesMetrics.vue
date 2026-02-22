<script setup>
import { inject, computed, ref, onMounted, onUnmounted } from 'vue'

const t = inject('t')

// Наш хелпер для безопасного извлечения из Proxy
const getT = (key, fallback) => {
  const keys = key.split('.')
  let val = t.value
  for (const k of keys) {
    if (!val) break
    val = val[k]
  }
  return val === key ? fallback : val
}

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

const cases = computed(() => [
  {
    id: 'parser',
    tags: ['Data Mining', 'Python', 'B2B'],
    title: getT('cases_section.parser_title', 'Автоматизация отдела закупок и продаж'),
    desc: getT('cases_section.parser_desc', 'Вместо ручного поиска — полная база подрядчиков и клиентов за пару кликов. Пока конкуренты ищут контакты вручную, вы уже отправляете им персонализированные предложения.'),
    accent: '#3b82f6', 
    metrics: [
      { label: getT('cases_section.parser_metric_1_label', 'Контактов/нед.'), value: '10 000+' },
      { label: getT('cases_section.parser_metric_2_label', 'Экономия времени'), value: '40+ ч' },
      { label: getT('cases_section.parser_metric_3_label', 'Рост базы'), value: '+300%', fullWidth: true }
    ],
    scale: {
      label: getT('cases_section.parser_scale_label', 'Эффективность поиска (Ручной vs Автоматика)'),
      percent: 95,
      color: 'from-blue-600 to-cyan-400'
    }
  },
  {
    id: 'custom-admin',
    tags: ['FastAPI', 'Vue 3', 'High-Load'],
    title: getT('cases_section.admin_title', 'Пульт управления бизнесом без тормозов'),
    desc: getT('cases_section.admin_desc', 'Когда стандартные CRM становятся тесными, мы строим систему под ваши задачи. Мгновенный отклик позволяет команде работать без пауз и ожидания загрузки страниц.'),
    accent: '#f59e0b', 
    metrics: [
      { label: getT('cases_section.admin_metric_1_label', 'Скорость отклика'), value: '<50ms' },
      { label: getT('cases_section.admin_metric_2_label', 'Ограничений'), value: '0' },
      { label: getT('cases_section.admin_metric_3_label', 'Аптайм системы'), value: '99.9%', fullWidth: true }
    ],
    scale: {
      label: getT('cases_section.admin_scale_label', 'Ускорение работы менеджеров'),
      percent: 85,
      color: 'from-amber-600 to-yellow-400'
    }
  },
  {
    id: 'fsm-ai',
    tags: ['n8n', 'AI', 'FSM Architecture'],
    title: getT('cases_section.ai_title', 'ИИ-ассистент с железной логикой'),
    desc: getT('cases_section.ai_desc', 'Наши ИИ-боты не ошибаются. Они ведут клиента строго по вашему сценарию, записывают на прием и квалифицируют лидов 24/7 без участия человека.'),
    accent: '#8b5cf6', 
    metrics: [
      { label: getT('cases_section.ai_metric_1_label', 'Контроль диалога'), value: '100%' },
      { label: getT('cases_section.ai_metric_2_label', 'Внедрение'), value: '7 дней' },
      { label: getT('cases_section.ai_metric_3_label', 'Снижение нагрузки на саппорт'), value: '-40%', fullWidth: true }
    ],
    scale: {
      label: getT('cases_section.ai_scale_label', 'Следование бизнес-скрипту'),
      percent: 100,
      color: 'from-purple-600 to-fuchsia-400'
    }
  },
  {
    id: 'erp',
    tags: ['Directus', 'API', 'Management'],
    title: getT('cases_section.erp_title', 'Все магазины в одном окне'),
    desc: getT('cases_section.erp_desc', 'Заменили 5 разрозненных систем единой панелью управления. Больше никакой путаницы в остатках на складах и ручного переноса заказов из таблиц и почты.'),
    accent: '#10b981', 
    metrics: [
      { label: getT('cases_section.erp_metric_1_label', 'Систем в одной'), value: '5 в 1' },
      { label: getT('cases_section.erp_metric_2_label', 'Ошибок учета'), value: '0%' },
      { label: getT('cases_section.erp_metric_3_label', 'Ускорение обработки заказов'), value: 'x3 раза', fullWidth: true }
    ],
    scale: {
      label: getT('cases_section.erp_scale_label', 'Сокращение операционных издержек'),
      percent: 75,
      color: 'from-emerald-600 to-green-400'
    }
  },
  {
    id: 'global-ecom',
    tags: ['E-commerce', 'Payments', 'Scaling'],
    title: getT('cases_section.ecom_title', 'Выход на международный рынок'),
    desc: getT('cases_section.ecom_desc', 'Масштабировали продажи на 5+ стран. Автоматический расчет налогов, мультивалютность и полная интеграция с зарубежной логистикой "под ключ".'),
    accent: '#ef4444', 
    metrics: [
      { label: getT('cases_section.ecom_metric_1_label', 'Гео-зон'), value: '5+' },
      { label: getT('cases_section.ecom_metric_2_label', 'Валюты'), value: 'Авто' },
      { label: getT('cases_section.ecom_metric_3_label', 'Рост конверсии (за рубежом)'), value: '+45%', fullWidth: true }
    ],
    scale: {
      label: getT('cases_section.ecom_scale_label', 'Автоматизация расчета налогов и логистики'),
      percent: 100,
      color: 'from-red-600 to-rose-400'
    }
  },
  {
    id: 'hr-automation',
    tags: ['n8n', 'HR Tech', 'Integrations'],
    title: getT('cases_section.hr_title', 'HR-отдел на автопилоте'),
    desc: getT('cases_section.hr_desc', 'Система сама отбирает резюме и назначает собеседования. Мы убрали рутину, чтобы ваш HR-менеджер занимался развитием людей, а не заполнением карточек.'),
    accent: '#06b6d4', 
    metrics: [
      { label: getT('cases_section.hr_metric_1_label', 'Часов HR сэкономлено'), value: '120/мес' },
      { label: getT('cases_section.hr_metric_2_label', 'Рутины'), value: '0%' },
      { label: getT('cases_section.hr_metric_3_label', 'Скорость онбординга'), value: '10 мин', fullWidth: true }
    ],
    scale: {
      label: getT('cases_section.hr_scale_label', 'Автоматизация внутренних процессов'),
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
          {{ getT('cases_section.badge', 'Флагманские внедрения') }}
        </h2>
        
        <h3 class="text-3xl md:text-5xl font-black text-white tracking-wide mb-6">
          {{ getT('cases_section.title_start', 'Избранные кейсы:') }} <br class="md:hidden" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]">
            {{ getT('cases_section.title_end', 'Цифры вместо слов') }}
          </span>
        </h3>
        
        <p class="text-[var(--text-secondary)] text-lg leading-relaxed">
          {{ getT('cases_section.desc', 'Из десятков реализованных проектов мы отобрали 6 самых показательных. Никаких красивых картинок — только сухая выжимка того, как наша архитектура сокращает издержки и приносит прибыль.') }}
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