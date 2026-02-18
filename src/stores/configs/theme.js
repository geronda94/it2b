import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 1. Состояние (State) - берем из localStorage или ставим 'dark' по умолчанию
  const currentTheme = ref(localStorage.getItem('user-theme') || 'dark')

  // 2. Действие (Action) - Применить тему к HTML
  const applyTheme = (theme) => {
    // FlyonUI смотрит на атрибут data-theme у тега html или body
    document.documentElement.setAttribute('data-theme', theme)
    // Сохраняем выбор пользователя
    localStorage.setItem('user-theme', theme)
    currentTheme.value = theme
  }

  // 3. Действие - Переключить (Toggle)
  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
    applyTheme(newTheme)
  }

  // 4. Инициализация при загрузке сайта
  const initTheme = () => {
    applyTheme(currentTheme.value)
  }

  return { currentTheme, toggleTheme, initTheme }
})