<script setup>
import { ref, inject, computed, onMounted, onBeforeUnmount } from 'vue'

const t = inject('t')
const techList = computed(() => [
  // --- Фронтенд ---
  { id: 'vue', name: 'Vue 3', slug: 'vuedotjs', color: '#42b883', desc: t.value?.tech?.vue || 'Современный фреймворк для создания высокопроизводительных динамических интерфейсов.' },
  { id: 'pinia', name: 'Pinia', slug: 'pinia', color: '#FFE16B', desc: t.value?.tech?.pinia || 'Интуитивно понятное, типобезопасное и гибкое хранилище состояний для Vue.' },
  { id: 'tailwind', name: 'Tailwind CSS', slug: 'tailwindcss', color: '#38bdf8', desc: t.value?.tech?.tailwind || 'Utility-first CSS фреймворк для быстрой и гибкой стилизации.' },
  
  // --- Автоматизация и Low-Code ---
  { id: 'n8n', name: 'n8n', slug: 'n8n', color: '#ea4242', desc: t.value?.tech?.n8n || 'Мощный инструмент визуального программирования и автоматизации процессов.' },

  // --- Бэкенд на Python ---
  { id: 'python', name: 'Python', slug: 'python', color: '#3776AB', desc: t.value?.tech?.python || 'Мощный и универсальный язык программирования для бэкенда и скриптов.' },
  { id: 'fastapi', name: 'FastAPI', slug: 'fastapi', color: '#009688', desc: t.value?.tech?.fastapi || 'Современный высокопроизводительный веб-фреймворк для создания API.' },
  { id: 'aiohttp', name: 'aiohttp', slug: 'python', color: '#2C5BB4', desc: t.value?.tech?.aiohttp || 'Асинхронный HTTP-клиент и сервер, идеален для высоконагруженных сетевых задач.' },
  { id: 'playwright', name: 'Playwright', slug: 'googlechrome', color: '#F4CA0B', desc: t.value?.tech?.playwright || 'Надежный инструмент для автоматизации браузеров и парсинга данных.' },
  { id: 'aiogram', name: 'aiogram 3', slug: 'telegram', color: '#26A5E4', desc: t.value?.tech?.aiogram || 'Современный асинхронный фреймворк для создания сложных Telegram-ботов.' },
  
  // --- Данные и ORM ---
  { id: 'directus', name: 'Directus', slug: 'directus', color: '#64f', desc: t.value?.tech?.directus || 'Headless CMS и Backend-as-a-Service для управления базами данных SQL.' },
  { id: 'postgres', name: 'PostgreSQL', slug: 'postgresql', color: '#336791', desc: t.value?.tech?.postgres || 'Самая продвинутая и надежная объектно-реляционная база данных.' },
  { id: 'sqlalchemy', name: 'SQLAlchemy', slug: 'sqlalchemy', color: '#D71F00', desc: t.value?.tech?.sqlalchemy || 'Мощный инструмент SQL и объектно-реляционного отображения (ORM) для Python.' },
  { id: 'pydantic', name: 'Pydantic', slug: 'pydantic', color: '#E92063', desc: t.value?.tech?.pydantic || 'Строгая валидация данных и управление настройками с использованием типов Python.' },

  // --- Инфраструктура ---
  { id: 'docker', name: 'Docker', slug: 'docker', color: '#2496ed', desc: t.value?.tech?.docker || 'Контейнеризация приложений для надежного и быстрого развертывания.' },
  { id: 'ubuntu', name: 'Ubuntu', slug: 'ubuntu', color: '#E95420', desc: t.value?.tech?.ubuntu || 'Стабильная операционная система на базе Linux для серверной инфраструктуры.' },
  { id: 'nginx', name: 'Nginx', slug: 'nginx', color: '#009639', desc: t.value?.tech?.nginx || 'Высокопроизводительный веб-сервер, балансировщик нагрузки и обратный прокси.' },
  
  // Оставим Node.js, так как он часто нужен для фронтенд-инфраструктуры (сборка, n8n и т.д.)
  { id: 'node', name: 'Node.js', slug: 'nodedotjs', color: '#5FA04E', desc: t.value?.tech?.node || 'Среда выполнения JavaScript для создания масштабируемых серверных приложений.' }
])
const activeTech = ref(techList.value[0])

// --- Логика авто-фокуса по центру ---
const marqueeContainer = ref(null)
const isUserHovering = ref(false)
let animationFrameId = null
let hoverTimeout = null
let lastCheckTime = 0

// Функция проверки, какой элемент ближе к центру экрана
const checkCenterItem = (timestamp) => {
  // Ограничиваем проверки до 1 раза в 100мс для производительности
  if (timestamp - lastCheckTime > 100 && !isUserHovering.value && marqueeContainer.value) {
    lastCheckTime = timestamp
    
    const items = marqueeContainer.value.querySelectorAll('.tech-item')
    const screenCenter = window.innerWidth / 2
    let closestItem = null
    let minDistance = Infinity

    items.forEach(item => {
      const rect = item.getBoundingClientRect()
      // Центр конкретной иконки по оси X
      const itemCenter = rect.left + (rect.width / 2)
      // Расстояние от центра иконки до центра экрана
      const distance = Math.abs(screenCenter - itemCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestItem = item
      }
    })

    // Если нашли ближайший элемент, обновляем активную технологию
    if (closestItem) {
      const id = closestItem.getAttribute('data-id')
      if (activeTech.value.id !== id) {
        activeTech.value = techList.value.find(t => t.id === id) || activeTech.value
      }
    }
  }

  animationFrameId = requestAnimationFrame(checkCenterItem)
}

// Управление фокусом при наведении
const handleMouseEnter = (tech) => {
  clearTimeout(hoverTimeout)
  isUserHovering.value = true
  activeTech.value = tech
}

const handleMouseLeave = () => {
  // Ждем полсекунды перед тем, как вернуть авто-фокус, чтобы не было резких скачков
  hoverTimeout = setTimeout(() => {
    isUserHovering.value = false
  }, 500)
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(checkCenterItem)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  clearTimeout(hoverTimeout)
})
</script>

<template>
  <section class="py-12 border-y border-[var(--border-color)] bg-[#050b14]/30 backdrop-blur-md relative z-10">
    
    <div class="container mx-auto px-6 mb-8 text-center">
        <h3 class="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-[0.2em]">Инструменты, которым мы доверяем</h3>
    </div>

    <div class="relative w-full overflow-hidden flex mask-edges" ref="marqueeContainer">
      
      <div class="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
        
        <div 
          v-for="(tech, index) in [...techList, ...techList]" 
          :key="index"
          :data-id="tech.id"
          @mouseenter="handleMouseEnter(tech)"
          @mouseleave="handleMouseLeave"
          class="tech-item flex items-center gap-4 px-12 cursor-pointer transition-all duration-300 group"
          :class="activeTech.id === tech.id ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'"
        >
          <div :style="{ filter: activeTech.id === tech.id ? `drop-shadow(0 0 8px ${tech.color}80)` : 'none' }">
            <div 
              class="w-10 h-10 transition-colors duration-300"
              :style="{
                backgroundColor: activeTech.id === tech.id ? tech.color : 'var(--text-secondary)',
                maskImage: `url(https://cdn.simpleicons.org/${tech.slug})`,
                WebkitMaskImage: `url(https://cdn.simpleicons.org/${tech.slug})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }"
            ></div>
          </div>

          <span 
            class="text-2xl font-black tracking-wide font-[Eurostile,sans-serif] transition-colors duration-300 whitespace-nowrap"
            :style="{ color: activeTech.id === tech.id ? 'white' : 'var(--text-secondary)' }"
          >
            {{ tech.name }}
          </span>
        </div>

      </div>
    </div>

    <div class="container mx-auto px-6 mt-8 flex justify-center">
      <div class="relative w-full max-w-4xl min-h-[120px] flex items-center p-6 md:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm transition-all duration-500 overflow-hidden"
           :style="{ boxShadow: `0 0 30px -10px ${activeTech.color}40`, borderColor: `${activeTech.color}40` }">
        
        <transition name="fade-slide" mode="out-in">
          <div :key="activeTech.id" class="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8 w-full">
            
            <div class="shrink-0 flex items-center justify-center mt-1" :style="{ filter: `drop-shadow(0 0 15px ${activeTech.color}80)` }">
              <div 
                class="w-14 h-14 md:w-16 md:h-16 transition-colors duration-300"
                :style="{
                  backgroundColor: activeTech.color,
                  maskImage: `url(https://cdn.simpleicons.org/${activeTech.slug})`,
                  WebkitMaskImage: `url(https://cdn.simpleicons.org/${activeTech.slug})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center'
                }"
              ></div>
            </div>

            <div class="flex-1">
              <h4 class="text-2xl font-bold mb-2 transition-colors duration-300" :style="{ color: activeTech.color }">
                {{ activeTech.name }}
              </h4>
              <p class="text-[var(--text-primary)] text-sm md:text-base leading-relaxed opacity-90 max-w-2xl">
                {{ activeTech.desc }}
              </p>
            </div>

          </div>
        </transition>

      </div>
    </div>

  </section>
</template>

<style scoped>
.mask-edges {
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

/* Базовая скорость (для мобильных телефонов) - делаем быстрее */
.animate-marquee {
  animation: marquee 55s linear infinite;
}

/* Планшеты (от 768px) */
@media (min-width: 768px) {
  .animate-marquee {
    animation-duration: 70s;
  }
}

/* Десктопы (от 1024px) - твои оптимальные 80s */
@media (min-width: 1024px) {
  .animate-marquee {
    animation-duration: 80s;
  }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px); /* Изменили анимацию на горизонтальное скольжение */
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>