<script setup>
import { inject } from 'vue'

// Получаем объект переводов
const t = inject('t')

// Определяем событие, которое будем отправлять родителю при клике на кнопку
const emit = defineEmits(['openModal'])
</script>

<template>
  <header class="relative pt-32 pb-20 lg:pt-48 lg:pb-40 z-10">
    <div class="container mx-auto px-6">
      
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
           <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-[var(--brand-secondary)]/40 to-[var(--brand-primary)]/40 blur-[90px] rounded-full"></div>
          
          <img src="/logo/logo_main.svg" alt="IT2B Cyber Cheetah" class="relative z-10 w-full max-w-[400px] lg:max-w-full h-auto object-contain drop-shadow-[0_0_35px_var(--brand-glow)] hover:scale-105 transition-transform duration-700">
        </div>

      </div>
    </div>
  </header>
</template>