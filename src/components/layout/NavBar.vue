<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
import { useThemeStore } from '@/stores/configs/theme'
import { useLangStore } from '@/stores/configs/lang'

const themeStore = useThemeStore()
const langStore = useLangStore()
const t = inject('t')

const emit = defineEmits(['openContact', 'openModal'])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Структура меню
const menuItems = computed(() => [
  { 
    name: t.value?.nav?.solutions || 'Solutions', 
    type: 'anchor', 
    path: '#solutions' 
  },
  { 
    name: t.value?.nav?.cases || 'Cases', 
    type: 'link', 
    path: '/cases' 
  },
  { 
    name: t.value?.nav?.stack || 'Stack', 
    type: 'anchor', 
    path: '#stack' 
  }
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleLinkClick = () => {
  closeMobileMenu()
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav :class="[
    /* ДОБАВЛЕН flex и justify-between */
    'navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-4 md:px-10 border-b flex items-center justify-between',
    isScrolled || isMobileMenuOpen
      ? 'bg-[var(--bg-glass)] backdrop-blur-xl border-[var(--border-color)] shadow-sm py-2' 
      : 'bg-transparent py-6 border-transparent'
  ]">
    
    <div class="navbar-start w-auto lg:w-1/2 z-50">
      <div class="flex items-center gap-3 group cursor-pointer select-none" @click="closeMobileMenu">
        <div class="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 font-[Eurostile,sans-serif] text-2xl font-black tracking-wide text-[var(--text-primary)]">
            <router-link to="/">
              <span>IT</span>
              <span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] drop-shadow-[0_0_5px_var(--brand-glow)] mx-[1px]">2</span>
              <span>B</span>
            </router-link>
        </div>
      </div>
    </div>
    
    <div class="navbar-center hidden lg:flex">
      <ul class="flex gap-4 text-sm font-medium text-[var(--text-secondary)]">
        <li v-for="(item, index) in menuItems" :key="index">
          <a 
            :href="item.path"
            class="group relative block px-3 py-2 cursor-pointer transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            <span class="relative">
              {{ item.name }}
              <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--brand-primary)] origin-bottom-right scale-x-0 transition-transform duration-200 group-hover:origin-bottom-left group-hover:scale-x-100 group-hover:drop-shadow-[0_0_8px_var(--brand-glow)]"></span>
            </span>
          </a>
        </li>
      </ul>
    </div>
    
    <div class="navbar-end hidden lg:flex items-center justify-end gap-3 w-1/2">
      
      <button 
        class="nav-btn-icon" 
        @click="emit('openModal', 'lang')" 
      >
        <font-awesome-icon :icon="['fas', 'globe']" class="text-sm opacity-70" />
        <span>{{ langStore.lang.toUpperCase() }}</span>
      </button>

      <button 
        class="nav-btn-icon w-10 justify-center px-0" 
        @click="themeStore.toggleTheme()"
      >
        <transition name="rotate" mode="out-in">
          <font-awesome-icon v-if="themeStore.currentTheme === 'dark'" :icon="['fas', 'sun']" class="text-sm" key="sun" />
          <font-awesome-icon v-else :icon="['fas', 'moon']" class="text-sm" key="moon" />
        </transition>
      </button>

      <button 
        class="cta-button hidden md:flex ml-2" 
        @click="emit('openContact')"
      >
        <span>Start Project</span>
        <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-xs opacity-70" />
      </button>
      
    </div>

    <div class="navbar-end flex lg:hidden w-auto z-50">
      <button 
        class="burger-button"
        :class="{ 'active': isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <transition name="mobile-fade">
      <div 
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-[var(--bg-primary)] pt-24 px-6 flex flex-col h-screen overflow-y-auto"
      >
        <ul class="flex flex-col gap-6 text-2xl font-bold text-[var(--text-primary)] mb-auto">
          <li v-for="(item, index) in menuItems" :key="index" style="transition-delay: 100ms">
            <a 
              :href="item.path" 
              @click="handleLinkClick" 
              class="flex items-center justify-between group border-b border-[var(--border-color)] pb-4"
            >
              <span class="group-hover:text-[var(--brand-primary)] transition-colors">{{ item.name }}</span>
              <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-lg opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 text-[var(--brand-primary)] transition-all duration-300" />
            </a>
          </li>
        </ul>

        <div class="pb-10 flex flex-col gap-4">
            <div class="flex gap-4">
                 <button 
                    class="nav-btn-icon flex-1 h-12 justify-center text-lg bg-[var(--bg-secondary)]" 
                    @click="emit('openModal', 'lang'); handleLinkClick()" 
                >
                    <font-awesome-icon :icon="['fas', 'globe']" />
                    <span>{{ langStore.lang.toUpperCase() }}</span>
                </button>

                <button 
                    class="nav-btn-icon flex-1 h-12 justify-center text-lg bg-[var(--bg-secondary)]" 
                    @click="themeStore.toggleTheme()"
                >
                    <font-awesome-icon v-if="themeStore.currentTheme === 'dark'" :icon="['fas', 'sun']" />
                    <font-awesome-icon v-else :icon="['fas', 'moon']" />
                </button>
            </div>

            <button 
                class="cta-button w-full h-14 justify-center text-lg" 
                @click="emit('openContact'); handleLinkClick()"
            >
                <span>Start Project</span>
            </button>
        </div>
      </div>
    </transition>

  </nav>
</template>

<style scoped>
.navbar {
    min-height: auto;
}

/* --- СТИЛИ ДЛЯ КНОПОК --- */
.nav-btn-icon {
  /* Убрали bg внутри apply */
  @apply flex items-center gap-2 px-4 h-10 min-h-0 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] text-xs font-bold transition-all duration-200;
  
  /* Исправленный фон */
  background-color: color-mix(in srgb, var(--bg-secondary), transparent 50%);
}

.nav-btn-icon:hover {
  @apply border-[var(--brand-primary)] text-[var(--text-primary)] shadow-[0_0_15px_-5px_var(--brand-glow)];
  
  /* Исправленный фон при наведении */
  background-color: var(--brand-primary);
  background: color-mix(in srgb, var(--brand-primary), transparent 90%);
}

/* CTA Кнопка (Start Project) */
.cta-button {
  @apply flex items-center justify-center gap-2 px-6 h-10 min-h-0 rounded-lg text-sm font-bold text-white border-0 bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-primary)] shadow-[0_0_15px_-3px_var(--brand-glow)] hover:shadow-[0_0_25px_-5px_var(--brand-primary)] hover:scale-105 active:scale-95 transition-all duration-200;
}

/* --- CSS БУРГЕР --- */
.burger-button {
  position: relative;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
  z-index: 60;
}

.burger-button span {
  width: 100%;
  height: 2px;
  /* Цвет адаптируется под тему */
  background-color: var(--text-primary);
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

/* Анимация Бургера */
.burger-button.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.burger-button.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}
.burger-button.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* --- АНИМАЦИИ --- */
.rotate-enter-active, .rotate-leave-active { transition: all 0.3s ease; }
.rotate-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.rotate-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }

/* Мобильное меню (Fade + Slide) */
.mobile-fade-enter-active,
.mobile-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.mobile-fade-enter-from,
.mobile-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>