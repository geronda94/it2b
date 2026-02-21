<script setup>
import { ref, onMounted, computed, provide } from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/configs/theme'
import { useLangStore } from './stores/configs/lang'

// Layou
import MainLayout from './components/layout/MainLayout.vue'
import BaseModal from './components/UI/BaseModal.vue'
import MoneyWidget from './components/UI/MoneyWidget.vue'
// Modals Content
import ContactModal from './components/modals/ContactModal.vue'
import LangModal from './components/modals/LangModal.vue'
// Инициализация
// Инициализация
const themeStore = useThemeStore()
const langStore = useLangStore()

onMounted(async () => {
  themeStore.initTheme()
  await langStore.initLang()
})

// Provide translation proxy
const tProxy = computed(() => langStore.t)
provide('t', tProxy)

// --- Логика Модалки ---
const isModalOpen = ref(false)
const modalType = ref('contact')

const openModal = (type = 'contact') => {
  modalType.value = type
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Заголовок модалки
const modalTitle = computed(() => {
  if (modalType.value === 'contact') return tProxy.value?.modal?.contact_title || 'Start Project'
  if (modalType.value === 'lang') return tProxy.value?.modal?.lang_title || 'Select Language'
  return ''
})
</script>
<template>
  <MainLayout @openModal="openModal">
    <RouterView @openModal="openModal" />
    <MoneyWidget />
  </MainLayout>

  <BaseModal 
    :isOpen="isModalOpen" 
    :title="modalTitle"
    @close="closeModal"
  >
    <ContactModal 
      v-if="modalType === 'contact'" 
      @close="closeModal" 
    />

    <LangModal 
      v-if="modalType === 'lang'" 
      @close="closeModal" 
    />

  </BaseModal>
</template>