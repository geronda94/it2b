<script setup>
import { inject } from 'vue'

const t = inject('t')
const emit = defineEmits(['close'])

const handleSubmit = () => {
  // Тут будет логика отправки (Directus/Telegram)
  console.log('Form submitted')
  emit('close')
}
</script>

<template>
  <div>
    <div class="text-center mb-6">
      <div class="inline-flex items-center justify-center size-12 rounded-full bg-[var(--brand-primary)]/10 mb-4 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 shadow-[0_0_15px_var(--brand-glow)]">
         <font-awesome-icon :icon="['fas', 'network-wired']" size="lg" />
      </div>
      <p class="text-[var(--text-secondary)] text-sm">
        {{ t?.modal?.contact_desc || 'Заполните форму, и мы свяжемся в Telegram.' }}
      </p>
    </div>
    
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="group">
        <input type="text" :placeholder="t?.modal?.name_placeholder || 'Ваше имя'" 
          class="input input-bordered w-full bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:outline-none transition-all placeholder:text-[var(--text-secondary)]/50" />
      </div>
      <div class="group">
        <input type="text" :placeholder="t?.modal?.contact_placeholder || '@telegram'" 
          class="input input-bordered w-full bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:outline-none transition-all placeholder:text-[var(--text-secondary)]/50" />
      </div>
      
      <button class="btn w-full mt-2 h-12 border-0 bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-primary)] text-white font-bold hover:shadow-[0_0_20px_var(--brand-glow)] hover:scale-[1.02] active:scale-95 transition-all duration-300">
        {{ t?.modal?.btn_submit || 'Отправить заявку' }}
      </button>
    </form>
  </div>
</template>