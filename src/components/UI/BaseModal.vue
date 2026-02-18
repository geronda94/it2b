<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  title: String
})

const emit = defineEmits(['close'])

// Закрытие по Escape
const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen) emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div class="w-full max-w-md animate-zoom-in relative">
          
          <div class="relative bg-[var(--bg-secondary)] border border-[var(--border-hover)] rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--brand-primary)] to-[var(--brand-secondary)] z-20"></div>
            
            <button 
              @click="emit('close')" 
              class="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <font-awesome-icon :icon="['fas', 'xmark']" class="text-xl" />
            </button>
            
            <div class="p-8 pt-14 overflow-y-auto">
              
              <div v-if="title" class="text-center mb-6 pr-8 pl-8">
                <h3 class="text-2xl font-bold text-[var(--text-primary)] leading-tight">{{ title }}</h3>
              </div>
              
              <div class="text-[var(--text-primary)]">
                <slot />
              </div>
            </div>

            <div v-if="$slots.footer" class="p-6 pt-0 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
               <slot name="footer" />
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Анимации для Transition (Fade фона) */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>