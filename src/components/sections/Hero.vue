<script setup>
import { inject, ref, onMounted, onBeforeUnmount } from 'vue'

const t = inject('t')
const emit = defineEmits(['openModal'])

// --- Логика Canvas ---
const canvasRef = ref(null)
let animationFrameId = null
let particles = []
let mouse = { x: -1000, y: -1000, isActive: false }

const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ffffff']

class Particle {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.x = Math.random() * w
    this.y = Math.random() * h
    
    const isLarge = Math.random() > 0.85
    this.radius = isLarge ? Math.random() * 3.5 + 2 : Math.random() * 1.5 + 0.5
    this.color = colors[Math.floor(Math.random() * colors.length)]
    
    this.baseVx = (Math.random() - 0.5) * 1.0
    this.baseVy = -Math.random() * 1.0 - 0.2
    this.vx = this.baseVx
    this.vy = this.baseVy
    
    // Новая логика: только 40% частиц реагируют на курсор
    this.isInteractive = Math.random() < 0.4 
    
    // Смещение цели (чтобы они не слипались в одну точку, а роились вокруг курсора)
    // Разброс от -150 до +150 пикселей от центра мыши
    this.offsetX = (Math.random() - 0.5) * 300
    this.offsetY = (Math.random() - 0.5) * 300
    
    this.angle = Math.random() * Math.PI * 2
    this.twinkleSpeed = Math.random() * 0.03 + 0.01
    this.baseAlpha = Math.random() * 0.4 + 0.1
  }

  update() {
    let interacting = false;

    // 1. Притяжение (только для интерактивных частиц)
    if (this.isInteractive && mouse.isActive) {
      // Расстояние до самого курсора
      const dxCenter = mouse.x - this.x
      const dyCenter = mouse.y - this.y
      const distToMouse = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
      
      // Реагируют только те, кто в радиусе 350px от мыши
      if (distToMouse < 350) {
        interacting = true;
        
        // Цель — это курсор ПЛЮС личное смещение частицы
        const targetX = mouse.x + this.offsetX
        const targetY = mouse.y + this.offsetY
        
        const dx = targetX - this.x
        const dy = targetY - this.y
        
        // Мягкая "пружинная" физика вместо агрессивного ускорения
        this.vx += dx * 0.003
        this.vy += dy * 0.003
        
        // Ограничиваем максимальную скорость, чтобы они не носились хаотично
        const maxSpeed = 2.5;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed
          this.vy = (this.vy / speed) * maxSpeed
        }
      }
    }

    // 2. Инерция и возврат к норме, если мышь далеко или частица неинтерактивна
    if (!interacting) {
      this.vx *= 0.95 // Плавное торможение
      this.vy *= 0.95
      
      // Возвращаем базовый медленный дрейф
      if (Math.abs(this.vx) < Math.abs(this.baseVx)) this.vx += (this.baseVx - this.vx) * 0.05
      if (Math.abs(this.vy) < Math.abs(this.baseVy)) this.vy += (this.baseVy - this.vy) * 0.05
    }

    // 3. Движение
    this.x += this.vx
    this.y += this.vy

    // 4. Бесконечный экран (с плавным переносом за границы)
    if (this.x < -50) this.x = this.w + 50
    if (this.x > this.w + 50) this.x = -50
    if (this.y < -50) this.y = this.h + 50
    if (this.y > this.h + 50) this.y = -50

    // 5. Мерцание
    this.angle += this.twinkleSpeed
  }

  draw(ctx) {
    const currentAlpha = this.baseAlpha + Math.sin(this.angle) * 0.5
    const safeAlpha = Math.max(0.05, Math.min(1, currentAlpha))

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.globalAlpha = safeAlpha
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  
  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    
    const particleCount = Math.min(400, Math.max(150, Math.floor(rect.width / 4)))
    particles = Array.from({ length: particleCount }, () => new Particle(rect.width, rect.height))
  }

  resize()
  window.addEventListener('resize', resize)

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(p => {
      p.update()
      p.draw(ctx)
    })
    
    animationFrameId = requestAnimationFrame(animate)
  }
  
  animate()
  canvas._cleanupResize = () => window.removeEventListener('resize', resize)
}

const handleMouseMove = (e) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.isActive = true
}

const handleMouseLeave = () => {
  mouse.isActive = false
}

onMounted(() => {
  initCanvas()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (canvasRef.value && canvasRef.value._cleanupResize) canvasRef.value._cleanupResize()
})
</script>
<template>
  <header 
    class="relative pt-32 pb-20 lg:pt-48 lg:pb-40 z-10 overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-80"
    ></canvas>

    <div class="container mx-auto px-6 relative z-10">
      
      <div class="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-40">
        
        <div class="w-full lg:w-7/12 lg:pr-20 text-center lg:text-left order-2 lg:order-1">
          
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] text-xs font-bold mb-6 uppercase tracking-[0.2em] shadow-[0_0_10px_var(--brand-glow)] animate-fade-in-up">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-primary)]"></span>
            </span>
            {{ t?.hero?.badge || 'IT to Business' }}
          </div>
          
          <h1 class="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 leading-tight tracking-tight animate-fade-in-up delay-100">
            {{ t?.hero?.title_start || 'Ускоряем бизнес' }} <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-purple-500 animate-gradient-x">
              {{ t?.hero?.title_end || 'Силой Технологий' }}
            </span>
          </h1>
          
          <p class="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed animate-fade-in-up delay-200 max-w-xl mx-auto lg:mx-0">
            {{ t?.hero?.desc || 'Мы создаем быстрые, безопасные и масштабируемые решения, превращая сложные процессы в простую автоматику.' }}
          </p>
          
          <div class="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
            <button class="btn btn-lg border-0 bg-white text-black hover:bg-cyan-50 text-base font-bold px-8 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform" @click="emit('openModal')">
              {{ t?.hero?.btn_discuss || 'Обсудить задачу' }}
            </button>
            <button class="btn btn-lg btn-outline border-[var(--text-secondary)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10">
              {{ t?.hero?.btn_cases || 'Наши кейсы' }}
            </button>
          </div>
        </div>

        <div class="w-full lg:w-5/12 relative order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in-up">
           <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-[var(--brand-secondary)]/40 to-[var(--brand-primary)]/40 blur-[90px] rounded-full animate-pulse-slow"></div>
          
           <img src="/logo/logo_main.svg" alt="IT2B Cyber Cheetah" class="relative z-10 w-full max-w-[400px] lg:max-w-full h-auto object-contain drop-shadow-[0_0_35px_var(--brand-glow)]">
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
/* Оставил только анимацию для размытого фонового пятна за логотипом, 
   всю CSS-анимацию самого логотипа удалил, как ты и просил */
.animate-pulse-slow {
  animation: pulse-bg 8s ease-in-out infinite;
}

@keyframes pulse-bg {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
}
</style>