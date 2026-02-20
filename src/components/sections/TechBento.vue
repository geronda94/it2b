<script setup>
import { inject, computed } from 'vue'

const t = inject('t')

const bentoBlocks = computed(() => [
  {
    id: 'frontend',
    title: t.value?.bento?.front_title || 'Фронтенд: Лендинги, Платформы и SPA',
    // Оставили "Убийцу WordPress", но добавили причину: клиенты не уходят из-за загрузки.
    desc: t.value?.bento?.front_desc || 'Высококонверсионные лендинги, корпоративные сайты и сложные SPA. Убийца медленного WordPress: ваши клиенты больше не закрывают сайт из-за долгой загрузки. Премиальный дизайн и мгновенный отклик на любых устройствах для роста ваших продаж.',
    span: 'col-span-1 md:col-span-2 lg:col-span-4',
    gradient: 'from-[#42b883]/20 via-[#38bdf8]/10 to-[#FFE16B]/20',
    techs: [
        { name: 'Vue 3', slug: 'vuedotjs', color: '#42b883' },
        { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#38bdf8' },
        { name: 'Pinia', slug: 'pinia', color: '#FFE16B' },
        { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' }
    ]
  },
  {
    id: 'backend',
    title: t.value?.bento?.backend_title || 'Бэкенд и Боты',
    // Сместили фокус с просто "работы с БД" на то, что система выдержит нагрузку и не потеряет данные.
    desc: t.value?.bento?.backend_desc || 'Асинхронный Python для API, Telegram-ботов и микросервисов. Ваша система не "ляжет" при наплыве трафика, а данные клиентов будут надежно сохранены и защищены строгой валидацией.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    gradient: 'from-[#3776AB]/20 to-[#009688]/20', 
    techs: [
        { name: 'Python', slug: 'python', color: '#3776AB' },
        { name: 'FastAPI', slug: 'fastapi', color: '#009688' },
        { name: 'aiogram 3', slug: 'telegram', color: '#26A5E4' },
        { name: 'n8n', slug: 'n8n', color: '#ea4242' },
        { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
        { name: 'SQLAlchemy', slug: 'sqlalchemy', color: '#D71F00' },
        { name: 'Pydantic', slug: 'pydantic', color: '#E92063' }
    ]
  },
  {
    id: 'core',
    title: t.value?.bento?.core_title || 'Core: Ядро и Данные',
    // Добавили выгоду: экономия бюджета (не изобретаем велосипед) и удобство для ИХ менеджеров.
    desc: t.value?.bento?.core_desc || 'Основа бизнес-систем. Используем Low-Code и Headless CMS, чтобы не сжигать ваш бюджет на разработку с нуля. Сверхбыстрая сборка логики и интуитивные админ-панели для ваших менеджеров.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    gradient: 'from-[#ea4242]/20 to-[#64f]/20',
    techs: [
        { name: 'n8n', slug: 'n8n', color: '#ea4242' },
        { name: 'Directus', slug: 'directus', color: '#64f' }
    ]
  },
  {
    id: 'data',
    title: t.value?.bento?.data_title || 'Сбор Данных и Автоматизация',
    // Оставили твою конкретику (Google Карты, парсинг), но связали это с итоговой целью бизнеса — лидами и продажами.
    desc: t.value?.bento?.data_desc || 'Умные парсеры для обхода блокировок. Вытягиваем контакты с Google Карт, мониторим цены конкурентов в E-commerce, обогащаем вашу CRM и автоматизируем холодные email-рассылки для генерации лидов.',
    span: 'col-span-1 md:col-span-2 lg:col-span-3',
    gradient: 'from-[#2EAD33]/20 to-[#4285F4]/20',
    techs: [
        { name: 'Playwright', slug: 'playwright', color: '#2EAD33' },
        { name: 'Google Maps', slug: 'googlemaps', color: '#4285F4' },
        { name: 'Email Рассылки', slug: 'gmail', color: '#EA4335' },
        { name: 'E-commerce', slug: 'shopify', color: '#95BF47' }
    ]
  },
  {
    id: 'devops',
    title: t.value?.bento?.devops_title || 'DevOps',
    // Развернули короткую фразу: отказоустойчивость = бизнес не теряет деньги.
    desc: t.value?.bento?.devops_desc || 'Отказоустойчивость серверов. Стабильность системы 24/7.',
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    gradient: 'from-[#2496ed]/20 to-[#E95420]/20',
    techs: [
        { name: 'Docker', slug: 'docker', color: '#2496ed' },
        { name: 'Ubuntu', slug: 'ubuntu', color: '#E95420' },
        { name: 'Nginx', slug: 'nginx', color: '#009639' }
    ]
  }
])
</script>

<template>
  <section id="stack" class="py-24 relative z-10">
    
    <div class="container mx-auto px-6 lg:px-12">
      
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-[var(--brand-primary)] text-sm font-bold uppercase tracking-[0.2em] mb-4">Технологический Стек</h2>
        <h3 class="text-3xl md:text-5xl font-black text-white font-[Eurostile,sans-serif] tracking-wide mb-6">
          Инструменты нового <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]">Поколения</span>
        </h3>
        <p class="text-[var(--text-secondary)] text-lg leading-relaxed">
          Используем только современные и масштабируемые технологии. Никакого устаревшего легаси — только скорость и надежность.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div 
          v-for="block in bentoBlocks" 
          :key="block.id"
          :class="[
            'group relative bg-[var(--bg-secondary)]/40 backdrop-blur-md border border-[var(--border-color)] rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-1',
            block.span
          ]"
        >
          <div 
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br pointer-events-none blur-3xl"
            :class="block.gradient"
          ></div>
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-500 group-hover:border-[var(--brand-primary)]/20 pointer-events-none"></div>

          <div class="relative z-10 mb-8">
            <h4 class="text-2xl font-bold text-white mb-3 group-hover:text-[var(--text-accent)] transition-colors duration-300 leading-tight">
              {{ block.title }}
            </h4>
            <p class="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed group-hover:text-[var(--text-primary)] transition-colors duration-300">
              {{ block.desc }}
            </p>
          </div>

          <div class="relative z-10 flex flex-wrap items-center gap-3 mt-auto">
            
            <div 
              v-for="tech in block.techs" 
              :key="tech.name"
              class="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#050b14]/50 border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-[#050b14]/80 cursor-default"
              :title="tech.name"
            >
              <div :style="{ filter: `drop-shadow(0 0 5px ${tech.color}60)` }">
                <div 
                  class="w-5 h-5 transition-colors duration-300"
                  :style="{
                    backgroundColor: tech.color,
                    maskImage: `url(https://cdn.simpleicons.org/${tech.slug})`,
                    WebkitMaskImage: `url(https://cdn.simpleicons.org/${tech.slug})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center'
                  }"
                ></div>
              </div>
              <span class="text-xs font-bold text-[var(--text-secondary)] group-hover/tech:text-white transition-colors">
                {{ tech.name }}
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
</style>