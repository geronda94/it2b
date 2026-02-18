<script setup>
import { useLangStore } from '@/stores/configs/lang'

const langStore = useLangStore()
const emit = defineEmits(['close'])

const selectLang = (code) => {
  langStore.setLang(code)
  emit('close')
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
     <button 
       v-for="l in langStore.availableLangs" 
       :key="l.code"
       @click="selectLang(l.code)"
       class="group relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 min-h-[110px]"
       :class="[
          langStore.lang === l.code 
            ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)] shadow-[0_0_15px_-5px_var(--brand-glow)]' 
            : 'bg-[var(--bg-primary)] border-[var(--border-color)] hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary)]/5 hover:-translate-y-1'
       ]"
     >
       <transition name="scale">
         <div 
            v-if="langStore.lang === l.code" 
            class="absolute top-2 right-2 text-[var(--brand-primary)] drop-shadow-[0_0_5px_var(--brand-primary)]"
         >
            <font-awesome-icon :icon="['fas', 'check']" class="text-sm" />
         </div>
       </transition>

       <span class="text-3xl mb-2 filter drop-shadow-md transition-transform group-hover:scale-110 duration-300">
         {{ l.flag }}
       </span>
       
       <span class="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--text-accent)] transition-colors">
         {{ l.name }}
       </span>
     </button>
  </div>
</template>

<style scoped>
/* Анимация появления галочки (зум) */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>