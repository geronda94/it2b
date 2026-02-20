<script setup>
import { ref, inject } from 'vue'

const t = inject('t')
const emit = defineEmits(['submit'])

// Состояние формы
const formData = ref({
  name: '',
  telegram: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.telegram) return

  isSubmitting.value = true
  
  // Эмуляция отправки (здесь будет твой реальный API запрос, например, в Telegram-бота)
  setTimeout(() => {
    isSubmitting.value = false
    isSuccess.value = true
    emit('submit', formData.value)
    
    // Очистка формы после успешной отправки
    setTimeout(() => {
      formData.value.name = ''
      formData.value.telegram = ''
      isSuccess.value = false
    }, 5000)
  }, 1500)
}
</script>

<template>
  <section id="contact" class="py-24 lg:py-32 relative z-10 overflow-hidden">
    
    <div class="container mx-auto px-6 lg:px-12 relative">
      
      <div class="relative max-w-6xl mx-auto rounded-[2.5rem] p-1">
        
        <div class="absolute inset-0 bg-gradient-to-r from-[var(--brand-secondary)] via-purple-600 to-[var(--brand-primary)] rounded-[2.5rem] opacity-30 blur-2xl animate-pulse-slow"></div>
        
        <div class="absolute inset-0 bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-primary)] rounded-[2.5rem] opacity-50"></div>

        <div class="relative bg-[#050b14]/90 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 overflow-hidden z-10">
          
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>

          <div class="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] text-xs font-bold mb-6 uppercase tracking-[0.2em]">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-primary)]"></span>
              </span>
              {{ t?.cta?.badge || 'Бесплатный аудит' }}
            </div>
            
            <h2 class="text-3xl md:text-5xl font-black text-white tracking-wide mb-6 leading-tight">
              {{ t?.cta?.title || 'Готовы автоматизировать бизнес?' }}
            </h2>
            
            <p class="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              {{ t?.cta?.desc || 'Оставьте заявку, и мы обсудим вашу задачу. Разберем текущие процессы, найдем точки роста и предложим архитектуру, которая сэкономит вам время и деньги.' }}
            </p>

            <div class="flex flex-col sm:flex-row items-center lg:items-start gap-6 text-sm font-bold text-[var(--text-secondary)]">
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'check-circle']" class="text-[var(--brand-primary)] text-lg" />
                <span>Ответ за 15 минут</span>
              </div>
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'check-circle']" class="text-[var(--brand-primary)] text-lg" />
                <span>NDA с первого дня</span>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-5/12 relative z-10">
            <div class="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              
              <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
                
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--brand-primary)] transition-colors">
                    <font-awesome-icon :icon="['fas', 'user']" />
                  </div>
                  <input 
                    type="text" 
                    v-model="formData.name"
                    required
                    :placeholder="t?.cta?.name_placeholder || 'Ваше Имя'"
                    class="w-full bg-[#050b14]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-[var(--text-secondary)] outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all duration-300"
                  >
                </div>

                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--brand-primary)] transition-colors">
                    <font-awesome-icon :icon="['fab', 'telegram']" class="text-lg" />
                  </div>
                  <input 
                    type="text" 
                    v-model="formData.telegram"
                    required
                    :placeholder="t?.cta?.tg_placeholder || '@username или телефон'"
                    class="w-full bg-[#050b14]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-[var(--text-secondary)] outline-none focus:border-[var(--brand-secondary)] focus:ring-1 focus:ring-[var(--brand-secondary)] transition-all duration-300"
                  >
                </div>

                <button 
                  type="submit" 
                  :disabled="isSubmitting || isSuccess"
                  class="relative w-full h-14 mt-2 flex items-center justify-center gap-3 rounded-xl text-base font-black text-white uppercase tracking-wider overflow-hidden group transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-primary)] transition-transform duration-500 group-hover:scale-110"></div>
                  
                  <div class="relative z-10 flex items-center gap-2">
                    <span v-if="!isSubmitting && !isSuccess">{{ t?.cta?.btn || 'Start Project' }}</span>
                    <span v-else-if="isSubmitting">Отправка...</span>
                    <span v-else>Заявка принята!</span>
                    
                    <font-awesome-icon 
                      v-if="!isSubmitting && !isSuccess" 
                      :icon="['fas', 'arrow-right']" 
                      class="transition-transform duration-300 group-hover:translate-x-1" 
                    />
                    <font-awesome-icon 
                      v-if="isSubmitting" 
                      :icon="['fas', 'circle-notch']" 
                      class="animate-spin" 
                    />
                    <font-awesome-icon 
                      v-if="isSuccess" 
                      :icon="['fas', 'check']" 
                    />
                  </div>
                </button>

                <p class="text-[10px] text-center text-[var(--text-secondary)] mt-2">
                  Нажимая на кнопку, вы соглашаетесь с <a href="#" class="underline hover:text-white transition-colors">политикой конфиденциальности</a>.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse-bg 6s ease-in-out infinite;
}

@keyframes pulse-bg {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
</style>