import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const createTranslationProxy = (messages, fallbackMessages, path = []) => {
  const currentLangTarget = messages || {}
  const fallbackLangTarget = fallbackMessages || {}

  return new Proxy(currentLangTarget, {
    get(target, prop) {
      if (typeof prop === 'symbol' || prop === '__v_isRef') return Reflect.get(target, prop)
      const newPath = [...path, prop]

      if (prop in target) {
        const value = target[prop]
        if (typeof value === 'object' && value !== null) {
          return createTranslationProxy(value, fallbackLangTarget[prop], newPath)
        }
        return value
      }

      if (prop in fallbackLangTarget) {
        const value = fallbackLangTarget[prop]
        if (typeof value === 'object' && value !== null) {
          return createTranslationProxy(undefined, value, newPath)
        }
        return value
      }

      return newPath.join('.')
    }
  })
}

const localeFiles = import.meta.glob('../../locales/*.json') 

export const useLangStore = defineStore('lang', () => {

  const availableLangs = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ua', name: 'Українська', flag: '🇺🇦' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
    { code: 'ge', name: 'ქართული', flag: '🇬🇪' },
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  // --- ЛОГИКА ОПРЕДЕЛЕНИЯ ЯЗЫКА ---
  const getInitialLang = () => {
    // 1. Проверяем сохраненный выбор пользователя
    const savedLang = localStorage.getItem('user-app-lang')
    if (savedLang) return savedLang

    // 2. Получаем язык системы устройства (например, 'ru-RU' -> 'ru')
    const systemLang = navigator.language?.split('-')[0] || 'en'

    // 3. Проверяем, поддерживаем ли мы такой язык
    const isSupported = availableLangs.some(l => l.code === systemLang)
    
    return isSupported ? systemLang : 'en'
  }

  // --- STATE ---
  const lang = ref(getInitialLang())
  const allMessages = ref({}) 
  
  // --- ACTIONS ---
  async function loadLang(langCode) {
    if (allMessages.value[langCode]) return
    const path = `../../locales/${langCode}.json`
    const loadFn = localeFiles[path]

    if (loadFn) {
      try {
        const module = await loadFn()
        allMessages.value[langCode] = module.default
      } catch (e) {
        console.error(`❌ Error loading locale: ${langCode}`, e)
        allMessages.value[langCode] = {}
      }
    }
  }

  async function setLang(newLang) {
    await loadLang(newLang)
    lang.value = newLang
    localStorage.setItem('user-app-lang', newLang)
    document.documentElement.lang = newLang
  }

  async function initLang() {
    // При инициализации всегда подгружаем 'en' для фоллбэка и текущий язык
    await Promise.all([
      loadLang(lang.value),
      loadLang('en')
    ])
    document.documentElement.lang = lang.value
  }

  const t = computed(() => {
    const current = allMessages.value[lang.value]
    const fallback = allMessages.value['en']
    if (!current && !fallback) return createTranslationProxy({}, {})
    return createTranslationProxy(current, fallback)
  })

  watch(lang, (newLang) => {
    loadLang(newLang)
  })

  return {
    lang,
    t,
    setLang,
    initLang,
    availableLangs
  }
})