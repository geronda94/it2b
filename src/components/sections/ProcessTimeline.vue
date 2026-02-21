<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'

const t = inject('t')

const steps = computed(() => [
  { 
    id: 1, 
    title: t.value?.process?.step1_title || 'Аудит и Стратегия', 
    desc: t.value?.process?.step1_desc || 'Изучаем ваши бизнес-процессы "изнутри", находим точки потери денег и проектируем решение, которое окупится максимально быстро.' 
  },
  { 
    id: 2, 
    title: t.value?.process?.step2_title || 'Логика и Прототип', 
    desc: t.value?.process?.step2_desc || 'Создаем детальный план системы и визуальный макет. Вы утверждаете каркас и логику работы еще до старта основной разработки.' 
  },
  { 
    id: 3, 
    title: t.value?.process?.step3_title || 'Разработка и Тесты', 
    desc: t.value?.process?.step3_desc || 'Пишем чистый код и подключаем сервисы автоматизации. Работаем прозрачно: вы регулярно получаете доступ к готовым частям системы.' 
  },
  { 
    id: 4, 
    title: t.value?.process?.step4_title || 'Запуск и Масштабирование', 
    desc: t.value?.process?.step4_desc || 'Разворачиваем систему, обучаем ваших сотрудников и обеспечиваем мониторинг 24/7. Помогаем системе расти вместе с вашим бизнесом.' 
  }
])


const activeStep = ref(0)
const stepRefs = ref([])

const setStepRef = (el, index) => {
  if (el) {
    stepRefs.value[index] = el
  }
}

let observer = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', 
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = Number(entry.target.dataset.index)
      if (entry.isIntersecting) {
        if (index >= activeStep.value) {
            activeStep.value = index
        }
      } else {
        const bounding = entry.boundingClientRect
        if (bounding.top > 0 && activeStep.value === index) {
            activeStep.value = Math.max(0, index - 1)
        }
      }
    })
  }, options)

  stepRefs.value.forEach(el => {
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section class="relative py-24 lg:py-40 z-10 overflow-hidden" id="process">
    <div class="container mx-auto px-6 max-w-[1400px] relative">
      
      <div class="text-center mb-20">
        <h2 class="text-[var(--brand-primary)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
          {{ t?.process?.badge || 'Как мы работаем' }}
        </h2>
        <h3 class="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          {{ t?.process?.title_start || 'Прозрачный процесс' }} <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-primary)]">
            {{ t?.process?.title_end || 'от идеи до релиза' }}
          </span>
        </h3>
      </div>

      <div class="relative w-full mx-auto">
        
        <div class="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border-color)] -translate-x-1/2 rounded-full z-0"></div>
        
        <div 
          class="absolute left-[28px] md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-[var(--brand-secondary)] to-[var(--brand-primary)] -translate-x-1/2 rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_var(--brand-primary)] z-10"
          :style="{ height: activeStep === 0 ? '0%' : `${(activeStep / (steps.length - 1)) * 100}%` }"
        ></div>

        <div class="relative flex flex-col gap-12 md:gap-24">
          <div 
            v-for="(step, index) in steps" 
            :key="step.id"
            :data-index="index"
            :ref="(el) => setStepRef(el, index)"
            class="relative flex flex-col md:flex-row items-start md:items-center w-full group"
            :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
          >
            
            <div 
              class="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 z-20 transition-all duration-500 flex items-center justify-center"
              :class="index <= activeStep 
                ? 'bg-[var(--bg-primary)] border-[var(--brand-primary)] shadow-[0_0_20px_var(--brand-primary)] scale-110' 
                : 'bg-[var(--bg-secondary)] border-[var(--border-color)] scale-100'"
            >
              <div 
                class="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                :class="index <= activeStep ? 'bg-[var(--brand-secondary)]' : 'bg-transparent'"
              ></div>
            </div>

            <div class="hidden md:block w-1/2"></div>

            <div 
              class="w-full pl-[76px] md:pl-0 md:w-1/2 transition-all duration-700 z-10"
              :class="[
                /* Уменьшили отступы от центра (с pr-24 до pr-12), чтобы карточка стала визуально шире */
                index % 2 === 0 ? 'md:pr-10 lg:pr-16' : 'md:pl-10 lg:pl-16',
                index <= activeStep ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-12'
              ]"
            >
              <div class="p-8 lg:p-10 rounded-2xl bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--border-color)] hover:border-[var(--brand-primary)]/50 transition-colors duration-300 relative overflow-hidden group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-left">
                
                <div 
                  class="absolute -top-8 text-9xl font-black opacity-[0.03] select-none transition-opacity duration-300 group-hover:opacity-[0.06] pointer-events-none"
                  :class="index % 2 === 0 ? 'right-4 md:-left-8' : '-right-8'"
                >
                  0{{ step.id }}
                </div>

                <h3 class="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3 relative z-10">
                  <span class="text-[var(--brand-primary)]">0{{ step.id }}.</span> {{ step.title }}
                </h3>
                
                <p class="text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed relative z-10">
                  {{ step.desc }}
                </p>
                
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>