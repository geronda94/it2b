<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'

const t = inject('t')

const phrases = computed(() => [
  t.value?.widgets?.money_1 || 'Масштабируйте прибыль, а не раздувайте штат',
  t.value?.widgets?.money_2 || 'Пока конкуренты спят, ваши алгоритмы прогревают лидов',
  t.value?.widgets?.money_3 || 'Человеческий фактор стоит дорого. Код не ошибается',
  t.value?.widgets?.money_4 || 'Каждый сэкономленный час команды — это чистая прибыль',
  t.value?.widgets?.money_5 || 'Быстрый ответ = сделка. Автоматизация не заставляет клиента ждать',
  t.value?.widgets?.money_6 || 'Один внедренный скрипт окупает себя в первый же месяц',
  t.value?.widgets?.money_7 || 'Сбор данных о конкурентах — ваше легальное ценовое преимущество',
  t.value?.widgets?.money_8 || 'Рутину — серверам, стратегию и продажи — людям',
  t.value?.widgets?.money_9 || 'Системный и автоматизированный бизнес стоит в 3 раза дороже',
  t.value?.widgets?.money_10 || 'Ваш код не просит отпускных, но генерирует выручку 24/7'
])

const isExpanded = ref(false)
const currentPhrase = ref(phrases.value[0])
let interval = null
let coinInterval = null
const flyingCoins = ref([])

const createFlyingCoin = () => {
  const id = Date.now() + Math.random()
  const size = 12 + Math.random() * 12 // Чуть увеличили минимальный размер (12-24px)
  
  // УВЕЛИЧЕННЫЙ РАЗЛЕТ
  // X: Разлетаются шире, от -150px до +150px в стороны
  const tx = (Math.random() - 0.5) * 300 
  // Y: Летят значительно выше, от -120px до -300px вверх
  const ty = -(Math.random() * 180 + 120) 
  const rot = (Math.random() - 0.5) * 1000 // Сильнее крутятся
  
  // Увеличили продолжительность жизни (от 2 до 4 секунд)
  const duration = 2.0 + Math.random() * 2.0 

  flyingCoins.value.push({ id, size, tx, ty, rot, duration })

  setTimeout(() => {
    flyingCoins.value = flyingCoins.value.filter(c => c.id !== id)
  }, duration * 1000)
}

const toggleWidget = () => {
  if (!isExpanded.value) {
    const randomIndex = Math.floor(Math.random() * phrases.value.length)
    currentPhrase.value = phrases.value[randomIndex]
  }
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  interval = setInterval(() => {
    if (!isExpanded.value) {
      toggleWidget()
      setTimeout(() => { 
        if (isExpanded.value) toggleWidget() 
      }, 7000)
    }
  }, 25000)

  // Выбрасываем монетку каждые 500 мс (фонтан стал гуще)
  coinInterval = setInterval(createFlyingCoin, 500)
})

onUnmounted(() => {
  clearInterval(interval)
  clearInterval(coinInterval)
})
</script>

<template>
  <div class="fixed bottom-8 left-8 z-[100] flex items-center select-none">
    
    <div class="absolute left-[32px] top-[32px] w-0 h-0 z-0 pointer-events-none">
      <div 
        v-for="coin in flyingCoins" 
        :key="coin.id"
        class="flying-coin absolute gold-coin rounded-full flex items-center justify-center shadow-md"
        :style="{
          width: coin.size + 'px',
          height: coin.size + 'px',
          '--tx': coin.tx + 'px',
          '--ty': coin.ty + 'px',
          '--rot': coin.rot + 'deg',
          '--duration': coin.duration + 's'
        }"
      >
        <font-awesome-icon :icon="['fas', 'dollar-sign']" class="coin-symbol text-[#fef08a]" :style="{ fontSize: coin.size * 0.6 + 'px' }" />
      </div>
    </div>

    <div 
      @click="toggleWidget"
      class="h-[64px] rounded-full group relative flex items-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden z-10"
      :class="[
        isExpanded 
          ? 'max-w-[700px] bg-[#050b14]/90 border border-white/10 backdrop-blur-xl shadow-2xl pl-1 pr-2' 
          : 'max-w-[64px] bg-transparent border-transparent shadow-none'
      ]"
    >
      <div v-if="isExpanded" class="shine-effect"></div>

      <div class="shrink-0 w-[60px] h-[60px] flex items-center justify-center relative mt-[1px]">
        
        <div 
          class="gold-coin relative w-[52px] h-[52px] rounded-full flex items-center justify-center transition-transform duration-700 z-10 overflow-hidden shadow-lg"
          :class="isExpanded ? 'rotate-[720deg]' : 'group-hover:scale-105'"
        >
          <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent skew-x-[-20deg] transition-transform duration-700 z-20" :class="isExpanded ? 'translate-x-[250%]' : '-translate-x-[250%]'"></div>
          <font-awesome-icon :icon="['fas', 'dollar-sign']" class="coin-symbol text-[#fef08a] text-2xl z-10 relative" />
        </div>

      </div>

      <div 
        class="transition-all duration-700 delay-100 ease-out flex flex-col justify-center overflow-hidden"
        :class="isExpanded ? 'opacity-100 translate-x-0 w-auto ml-3 mr-4' : 'opacity-0 -translate-x-8 w-0 ml-0 mr-0'"
      >
        <span class="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-bold mb-0.5 opacity-80">Insight</span>
        <span class="text-base font-bold text-white leading-tight whitespace-nowrap">
          {{ currentPhrase }}
        </span>
      </div>

      <div 
        v-if="isExpanded" 
        class="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors mr-1"
        @click.stop="toggleWidget" 
      >
        <font-awesome-icon :icon="['fas', 'times']" class="text-sm" />
      </div>

    </div>

  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.fixed {
  animation: float 5s ease-in-out infinite;
}

.gold-coin {
  background: linear-gradient(135deg, #92400e 0%, #d97706 40%, #fcd34d 60%, #ea580c 100%);
  box-shadow: 
    inset 0 0 0 2px rgba(120, 53, 15, 0.9), 
    inset 0 0 8px rgba(0,0,0,0.6),       
    0 4px 10px rgba(0,0,0,0.4);            
  border: 1px solid #fcd34d; 
}

/* ФИЗИКА РАЗЛЕТА МОНЕТ (ДОРАБОТАННАЯ) */
.flying-coin {
  transform-origin: center;
  /* Используем ease-out, чтобы они быстро выстреливали и медленно зависали наверху */
  animation: scatter var(--duration) ease-out forwards;
  opacity: 0; 
}

@keyframes scatter {
  0% {
    transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.9; /* Быстро появляются во время рывка вверх */
  }
  75% {
    opacity: 0.8; /* Сохраняют видимость большую часть полета */
  }
  100% {
    /* Прилетают в конечную точку и растворяются только в самом конце */
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1) rotate(var(--rot));
    opacity: 0;
  }
}

.coin-symbol {
  filter: drop-shadow(0px 2px 1px rgba(120, 53, 15, 0.9)) drop-shadow(0px -1px 0px rgba(255, 255, 255, 0.5));
  opacity: 0.95;
}

.shine-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.03), 
    transparent
  );
  transform: skewX(-25deg);
  animation: shine 4s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 200%; }
}

.font-bold {
  font-family: 'Eurostile', 'Inter', sans-serif;
}
</style>