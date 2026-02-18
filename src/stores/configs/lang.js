import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// 1. Хелпер для Proxy (вынесен наружу, чтобы не засорять стор)
// Эта функция ищет перевод в текущем языке, а если нет — в английском
const createTranslationProxy = (messages, fallbackMessages, path = []) => {
  const currentLangTarget = messages || {}
  const fallbackLangTarget = fallbackMessages || {}

  return new Proxy(currentLangTarget, {
    get(target, prop) {
      // Технические проверки Vue
      if (typeof prop === 'symbol' || prop === '__v_isRef') return Reflect.get(target, prop)

      const newPath = [...path, prop]

      // 1. Ищем в текущем языке
      if (prop in target) {
        const value = target[prop]
        if (typeof value === 'object' && value !== null) {
          return createTranslationProxy(value, fallbackLangTarget[prop], newPath)
        }
        return value
      }

      // 2. Ищем в английском (fallback)
      if (prop in fallbackLangTarget) {
        const value = fallbackLangTarget[prop]
        if (typeof value === 'object' && value !== null) {
          return createTranslationProxy(undefined, value, newPath)
        }
        return value
      }

      // 3. Если нигде нет — возвращаем путь ключа (например "header.title")
      return newPath.join('.')
    }
  })
}

// 2. Импорт всех JSON файлов из папки locales
// Важно: путь относительный от этого файла. Если стор в /src/stores, а локали в /src/locales
const localeFiles = import.meta.glob('../../locales/*.json') 

export const useLangStore = defineStore('lang', () => {

  const availableLangs = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ua', name: 'Українська', flag: '🇺🇦' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' }, // Пример на будущее
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }, // Пример на будущее
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' }, // Пример на будущее
    { code: 'ge', name: 'ქართული', flag: '🇬🇪' }, // Пример на будущее
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' }, // Пример на будущее
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }, // Пример на будущее
    { code: 'es', name: 'Español', flag: '🇪🇸' }  // Пример на будущее
  ]
  // --- STATE ---
  const lang = ref(localStorage.getItem('user-app-lang') || 'ru')
  const allMessages = ref({}) // Кэш загруженных переводов
  
  // --- ACTIONS ---
  async function loadLang(langCode) {
    // Если уже загружено — выходим
    if (allMessages.value[langCode]) return

    // Ищем файл в списке импортов
    const path = `../../locales/${langCode}.json`
    const loadFn = localeFiles[path]

    if (loadFn) {
      try {
        const module = await loadFn()
        allMessages.value[langCode] = module.default
        console.log(`✅ Loaded locale: ${langCode}`)
      } catch (e) {
        console.error(`❌ Error loading locale: ${langCode}`, e)
        allMessages.value[langCode] = {}
      }
    } else {
      console.warn(`⚠️ Locale file not found: ${langCode}`)
      allMessages.value[langCode] = {}
    }
  }

  // Смена языка
  async function setLang(newLang) {
    await loadLang(newLang)
    lang.value = newLang
    localStorage.setItem('user-app-lang', newLang)
    document.documentElement.lang = newLang
  }

  // Инициализация (вызовем в App.vue)
  async function initLang() {
    // Грузим текущий язык + английский (для фоллбэка)
    await Promise.all([
      loadLang(lang.value),
      loadLang('en')
    ])
    document.documentElement.lang = lang.value
  }

  // --- GETTERS ---
  // Тот самый Computed Proxy, который мы отдадим в App.vue
  const t = computed(() => {
    const current = allMessages.value[lang.value]
    const fallback = allMessages.value['en']
    
    // Если данные еще не загрузились, возвращаем пустой прокси
    if (!current && !fallback) return createTranslationProxy({}, {})
    
    return createTranslationProxy(current, fallback)
  })

  // Следим за изменением языка, чтобы подгружать файлы на лету
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