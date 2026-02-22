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

// --- CANVAS PARTICLE SYSTEM ---
const canvasRef = ref(null)
const coinRef = ref(null)
let ctx = null
let animationFrame = null
let coinInterval = null
const particles = []
let offscreenCoin = null

// 1. Создаем "штамп" монеты в памяти (Offscreen Rendering)
const createOffscreenCoin = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const oCtx = canvas.getContext('2d')

  const cx = 32, cy = 32, r = 28
  const grad = oCtx.createLinearGradient(0, 0, 64, 64)
  grad.addColorStop(0, '#92400e')
  grad.addColorStop(0.4, '#d97706')
  grad.addColorStop(0.6, '#fcd34d')
  grad.addColorStop(1, '#ea580c')

  oCtx.beginPath()
  oCtx.arc(cx, cy, r, 0, Math.PI * 2)
  oCtx.fillStyle = grad
  oCtx.fill()

  oCtx.lineWidth = 2
  oCtx.strokeStyle = '#fcd34d'
  oCtx.stroke()
  
  oCtx.beginPath()
  oCtx.arc(cx, cy, r - 2, 0, Math.PI * 2)
  oCtx.strokeStyle = 'rgba(120, 53, 15, 0.5)'
  oCtx.stroke()

  oCtx.font = 'bold 32px Arial, sans-serif'
  oCtx.textAlign = 'center'
  oCtx.textBaseline = 'middle'
  oCtx.shadowColor = 'rgba(120, 53, 15, 0.9)'
  oCtx.shadowOffsetY = 2
  oCtx.shadowBlur = 1
  oCtx.fillStyle = '#fef08a'
  oCtx.fillText('$', cx, cy + 2)

  return canvas
}

const resizeCanvas = () => {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

// 3. Создание частицы
const spawnCoin = () => {
  if (!coinRef.value || document.hidden) return
  const rect = coinRef.value.getBoundingClientRect()
  
  const isMobile = window.innerWidth < 640
  
  let vx
  if (isMobile) {
    vx = (Math.random() * 3.5) - 3 // Летят преимущественно влево на мобилках
  } else {
    vx = (Math.random() - 0.5) * 4 // Симметричный разлет на десктопе
  }

  particles.push({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    vx: vx, 
    vy: -(Math.random() * 4 + 3),
    size: 14 + Math.random() * 14,
    life: 1.0,
    decay: 0.004 + Math.random() * 0.006, // Чуть замедлили увядание, чтобы они жили дольше
    rotation: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.15
  })
}

// 4. Главный цикл отрисовки
const updateAndDraw = () => {
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.rotation += p.vRot
    p.life -= p.decay

    if (p.life <= 0) {
      particles.splice(i, 1)
      continue
    }

    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    
    // --- ИЗМЕНЕНИЕ: Увеличенная прозрачность (сниженная непрозрачность) ---
    const baseOpacity = 0.45 // Было 0.7, теперь 45% видимости
    ctx.globalAlpha = p.life > 0.5 ? baseOpacity : p.life * 2 * baseOpacity
    
    const scale = p.size / 64
    ctx.scale(scale, scale)
    ctx.drawImage(offscreenCoin, -32, -32)
    ctx.restore()
  }

  animationFrame = requestAnimationFrame(updateAndDraw)
}
// --- END CANVAS LOGIC ---

const toggleWidget = () => {
  if (!isExpanded.value) {
    const randomIndex = Math.floor(Math.random() * phrases.value.length)
    currentPhrase.value = phrases.value[randomIndex]
  }
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  offscreenCoin = createOffscreenCoin()
  ctx = canvasRef.value.getContext('2d', { alpha: true })
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  animationFrame = requestAnimationFrame(updateAndDraw)
  
  // --- ИЗМЕНЕНИЕ: Более спокойный ритм вылета ---
  coinInterval = setInterval(spawnCoin, 1200) // Было 400 мс, теперь 1 монета в 0.75 сек

  interval = setInterval(() => {
    if (!isExpanded.value) {
      toggleWidget()
      setTimeout(() => { 
        if (isExpanded.value) toggleWidget() 
      }, 7000)
    }
  }, 25000)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  clearInterval(interval)
  clearInterval(coinInterval)
  cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="fixed inset-0 z-[90] pointer-events-none"
  ></canvas>

  <div class="fixed bottom-6 left-4 sm:bottom-8 sm:left-8 z-[100] flex items-center select-none">
    <div 
      @click="toggleWidget"
      class="rounded-[32px] group relative flex items-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden z-10 min-h-[64px]"
      :class="[
        isExpanded 
          ? 'w-[calc(100vw-32px)] sm:w-max sm:max-w-[700px] bg-[#050b14]/90 border border-white/10 backdrop-blur-xl shadow-2xl py-2 sm:py-0 pl-1 pr-3 sm:pr-2' 
          : 'w-[64px] bg-transparent border-transparent shadow-none py-0 pl-0 pr-0'
      ]"
    >
      <div v-if="isExpanded" class="shine-effect"></div>

      <div 
        ref="coinRef"
        class="shrink-0 w-[60px] h-[60px] flex items-center justify-center relative self-start sm:self-center mt-[1px]"
      >
        <div 
          class="gold-coin relative w-[52px] h-[52px] rounded-full flex items-center justify-center transition-transform duration-700 z-10 overflow-hidden shadow-lg"
          :class="isExpanded ? 'rotate-[720deg]' : 'group-hover:scale-105'"
        >
          <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent skew-x-[-20deg] transition-transform duration-700 z-20" :class="isExpanded ? 'translate-x-[250%]' : '-translate-x-[250%]'"></div>
          <font-awesome-icon :icon="['fas', 'dollar-sign']" class="coin-symbol text-[#fef08a] text-2xl z-10 relative" />
        </div>
      </div>

      <div 
        class="flex-1 min-w-0 transition-all duration-700 delay-100 ease-out flex flex-col justify-center overflow-hidden"
        :class="isExpanded ? 'opacity-100 translate-x-0 ml-2 sm:ml-3 mr-2 sm:mr-4' : 'opacity-0 -translate-x-8 w-0 h-0 ml-0 mr-0'"
      >
        <span class="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-bold mb-0.5 opacity-80">Insight</span>
        <span class="text-xs sm:text-base font-bold text-white leading-snug whitespace-normal sm:whitespace-nowrap">
          {{ currentPhrase }}
        </span>
      </div>

      <div 
        v-if="isExpanded" 
        class="shrink-0 self-start sm:self-center mt-3 sm:mt-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
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