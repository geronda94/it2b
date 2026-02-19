<template>
  <div class="min-h-screen bg-[#03080f] text-[#7a93b4] font-sans overflow-x-hidden">

    <!-- scanline texture -->
    <div class="fixed inset-0 pointer-events-none z-0"
         style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)">
    </div>

    <!-- ═══════════════════════════════════════
         NAV
    ═══════════════════════════════════════ -->
    <nav
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#03080f]/90 backdrop-blur-xl border-b border-white/[0.07] py-3' : 'py-5'
      ]"
    >
      <div class="max-w-[1200px] mx-auto px-12 flex items-center justify-between gap-5">

        <a href="#" class="font-['Rajdhani'] text-[22px] font-bold text-[#eaf3ff] tracking-wide no-underline">
          IT<span class="text-[#00d4e8]">2</span>B
        </a>

        <ul class="hidden lg:flex items-center gap-7 list-none">
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href"
               class="font-mono text-[11px] tracking-[.12em] uppercase text-[#3a5068] hover:text-[#00d4e8] transition-colors no-underline">
              {{ link.label }}
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-3">
          <div class="hidden lg:flex items-center px-3 py-1.5 border border-white/[0.04] rounded text-[11px] font-mono tracking-wide text-[#3a5068]">
            SYS {{ clock }}
          </div>
          <a href="#cta"
             class="hidden lg:inline-flex items-center gap-2 px-7 py-3 bg-[#00d4e8] text-[#03080f] font-mono text-[12px] tracking-[.1em] uppercase font-bold rounded-md hover:shadow-[0_0_32px_rgba(0,212,232,0.5)] hover:-translate-y-px transition-all no-underline">
            Start Project
          </a>
          <!-- hamburger -->
          <button class="lg:hidden flex flex-col gap-[5px] p-1 cursor-pointer bg-transparent border-none"
                  @click="mobileOpen = !mobileOpen">
            <span class="block w-[22px] h-[1.5px] bg-[#7a93b4] transition-all"></span>
            <span class="block w-[22px] h-[1.5px] bg-[#7a93b4] transition-all"></span>
            <span class="block w-[22px] h-[1.5px] bg-[#7a93b4] transition-all"></span>
          </button>
        </div>

      </div>

      <!-- mobile menu -->
      <div v-if="mobileOpen"
           class="lg:hidden bg-[#0a121e] border-t border-white/[0.07] px-6 py-4 flex flex-col gap-4">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
           class="font-mono text-[12px] tracking-[.12em] uppercase text-[#7a93b4] hover:text-[#00d4e8] transition-colors no-underline"
           @click="mobileOpen = false">
          {{ link.label }}
        </a>
        <a href="#cta"
           class="inline-flex items-center justify-center px-6 py-3 bg-[#00d4e8] text-[#03080f] font-mono text-[12px] tracking-[.1em] uppercase font-bold rounded-md no-underline"
           @click="mobileOpen = false">
          Start Project
        </a>
      </div>
    </nav>

    <!-- ═══════════════════════════════════════
         HERO
    ═══════════════════════════════════════ -->
    <section class="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">

      <!-- grid lines -->
      <div class="absolute inset-0 pointer-events-none"
           style="background-image: linear-gradient(rgba(0,212,232,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,232,.04) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 90% 90% at 55% 50%, black 20%, transparent)">
      </div>

      <!-- scan line -->
      <div class="absolute left-0 right-0 h-px pointer-events-none hero-scan"
           style="background: linear-gradient(90deg, transparent, rgba(0,212,232,.3), transparent)">
      </div>

      <!-- coords -->
      <div class="absolute top-28 left-12 font-mono text-[9px] text-[#00d4e8]/20 tracking-widest hidden lg:block">
        X:0000 Y:0000 / SYS.ONLINE
      </div>
      <div class="absolute bottom-20 right-12 font-mono text-[9px] text-[#00d4e8]/20 tracking-widest hidden lg:block">
        CLUSTER:PROD / NODES:12 / UPTIME:99.9%
      </div>

      <div class="max-w-[1200px] mx-auto px-12 relative z-10 w-full">
        <div class="grid lg:grid-cols-2 items-center gap-16">

          <!-- Left -->
          <div>
            <!-- status badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6
                        bg-[#00e887]/[0.06] border border-[#00e887]/20 rounded
                        font-mono text-[11px] tracking-[.12em] uppercase text-[#00e887]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#00e887] shadow-[0_0_10px_#00e887] animate-pulse"></span>
              SYSTEM ONLINE — IT2B v4.2.1
            </div>

            <h1 class="font-['Rajdhani'] text-[clamp(36px,5.5vw,68px)] font-bold leading-[1.05] text-[#eaf3ff] mb-3 tracking-[.01em]">
              Технологическая<br>
              основа для<br>
              <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">масштабирования</span>
            </h1>

            <!-- KPI highlight -->
            <div class="inline-flex items-center gap-3 px-4 py-2.5 my-4
                        bg-[#00d4e8]/[0.05] border border-[#00d4e8]/20 rounded-md">
              <span class="font-mono text-[22px] font-bold text-[#00d4e8]">20+</span>
              <span class="text-[13px] font-light text-[#7a93b4] leading-snug">
                освобождённых часов<br>в неделю для вашей команды
              </span>
            </div>

            <p class="text-[16px] font-light leading-[1.75] text-[#7a93b4] mb-8 max-w-[480px]">
              Начните с лендинга — вырастите в корпоративную экосистему.
              Мы не пишем «скрипты» — мы строим фундамент, на котором держится бизнес.
            </p>

            <div class="flex flex-wrap gap-3">
              <a href="#cta"
                 class="inline-flex items-center gap-2 px-7 py-3 bg-[#00d4e8] text-[#03080f] font-mono text-[12px] tracking-[.1em] uppercase font-bold rounded-md hover:shadow-[0_0_32px_rgba(0,212,232,0.5)] hover:-translate-y-px transition-all no-underline">
                Запросить аудит <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
              <a href="#cases"
                 class="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/[0.15] text-[#eaf3ff] font-mono text-[12px] tracking-[.1em] uppercase rounded-md hover:border-[#00d4e8] hover:text-[#00d4e8] transition-all no-underline">
                Смотреть кейсы
              </a>
            </div>

            <!-- metrics bar -->
            <div class="flex mt-12 border border-white/[0.07] rounded-[10px] overflow-hidden">
              <div v-for="(m, i) in heroMetrics" :key="i"
                   class="flex-1 px-5 py-4 border-r border-white/[0.07] last:border-r-0">
                <div class="font-mono text-[22px] font-bold text-[#00d4e8] leading-none">{{ m.val }}</div>
                <div class="text-[11px] text-[#3a5068] mt-1 font-light">{{ m.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right: Dashboard mockup -->
          <div class="relative">
            <div class="bg-[#0a121e] border border-[#00d4e8]/18 rounded-xl overflow-hidden
                        shadow-[0_0_80px_rgba(0,212,232,.08),0_40px_80px_rgba(0,0,0,.6)]
                        animate-[floatY_7s_ease-in-out_infinite]">

              <!-- topbar -->
              <div class="h-8 bg-[#060d16] border-b border-white/[0.07] flex items-center px-3.5 gap-1.5">
                <span class="w-[7px] h-[7px] rounded-full bg-[#ff3b5c]"></span>
                <span class="w-[7px] h-[7px] rounded-full bg-[#f59e0b]"></span>
                <span class="w-[7px] h-[7px] rounded-full bg-[#00e887]"></span>
                <span class="ml-2 font-mono text-[10px] text-[#3a5068] tracking-widest">IT2B.CONTROL_PANEL — LIVE</span>
                <span class="ml-auto font-mono text-[9px] text-[#00e887] tracking-widest">● ONLINE</span>
              </div>

              <div class="p-4 flex flex-col gap-3">
                <!-- kpi row -->
                <div class="grid grid-cols-3 gap-2.5">
                  <div v-for="kpi in dashKpis" :key="kpi.label"
                       class="bg-[#060d16] border border-white/[0.07] rounded-lg p-3">
                    <div class="font-mono text-[9px] text-[#3a5068] tracking-widest uppercase">{{ kpi.label }}</div>
                    <div class="font-mono text-[18px] font-bold text-[#eaf3ff] my-1 leading-none">{{ kpi.val }}</div>
                    <div :class="['text-[10px] font-light', kpi.up ? 'text-[#00e887]' : 'text-[#ff3b5c]']">
                      {{ kpi.delta }}
                    </div>
                  </div>
                </div>

                <!-- chart -->
                <div class="bg-[#060d16] border border-white/[0.07] rounded-lg p-3">
                  <div class="font-mono text-[9px] text-[#3a5068] tracking-widest mb-3">Revenue · 30 days</div>
                  <div class="flex items-end gap-[3px] h-[52px]">
                    <div v-for="(h, i) in chartBars" :key="i"
                         :class="['flex-1 rounded-t-[2px] min-h-[6px] relative overflow-hidden',
                                  h > 75 ? 'bg-[rgba(0,212,232,.5)]' : 'bg-[rgba(0,212,232,.2)]']"
                         :style="`height: ${h}%`">
                      <div class="absolute top-0 left-0 right-0 h-2/5 bg-[rgba(0,212,232,.4)]"></div>
                    </div>
                  </div>
                </div>

                <!-- flow -->
                <div class="bg-[#060d16] border border-white/[0.07] rounded-lg p-3">
                  <div class="font-mono text-[9px] text-[#3a5068] tracking-widest mb-2">n8n · order-processing</div>
                  <div class="flex items-center gap-1.5 overflow-hidden">
                    <div v-for="(node, i) in flowNodes" :key="i" class="flex items-center gap-1.5">
                      <div :class="['flex-shrink-0 bg-[#0d1626] rounded-md px-2 py-1.5 font-mono text-[8px] text-center',
                                    node.active ? 'border border-[#00d4e8] text-[#00d4e8]' : 'border border-white/[0.07] text-[#3a5068]']">
                        <div class="text-[12px]">{{ node.ico }}</div>
                        <div>{{ node.label }}</div>
                      </div>
                      <span v-if="i < flowNodes.length - 1" class="text-[#00d4e8]/40 text-[10px] flex-shrink-0">→</span>
                    </div>
                  </div>
                </div>

                <!-- terminal -->
                <div class="bg-black/50 border border-white/[0.07] rounded-lg p-2.5 font-mono text-[10px] leading-[1.7] text-[#3a5068]">
                  <span class="text-[#00e887]">✓</span> [14:32:01] Lead#4821 captured — score:92/HOT<br>
                  <span class="text-[#00d4e8]">→</span> [14:32:02] CRM record + TG notify in 2.1s<br>
                  <span class="text-[#00e887]">✓</span> [14:32:04] Webhook: order.completed<br>
                  <span class="text-[#f59e0b]">⚠</span> [14:32:08] Retry queue: 0 — all clear
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         TRUST BAR
    ═══════════════════════════════════════ -->
    <div class="py-10 border-t border-b border-white/[0.07]">
      <p class="text-center font-mono text-[10px] tracking-[.15em] uppercase text-[#3a5068] mb-6">
        // Tech stack · Production-grade · Battle-tested
      </p>
      <div class="relative overflow-hidden">
        <!-- fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
             style="background: linear-gradient(90deg, #03080f, transparent)"></div>
        <div class="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
             style="background: linear-gradient(-90deg, #03080f, transparent)"></div>

        <div class="flex w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
          <template v-for="_ in 2" :key="_">
            <div v-for="tech in techStack" :key="tech.name + _"
                 class="flex items-center gap-2.5 px-8 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <i :class="[tech.icon, 'text-[18px] text-[#00d4e8]']"></i>
              <span class="font-mono text-[13px] tracking-[.08em] text-[#7a93b4]">{{ tech.name }}</span>
            </div>
            <div class="w-px h-4 bg-white/[0.07] flex-shrink-0 self-center mx-1"></div>
          </template>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         SEGMENT
    ═══════════════════════════════════════ -->
    <section class="py-24" id="segment" v-intersect="onReveal">
      <div class="max-w-[1200px] mx-auto px-12">

        <p class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.15em] uppercase text-[#00d4e8] mb-4">
          <span class="opacity-50">//</span> Target audience
        </p>
        <h2 class="font-['Rajdhani'] text-[clamp(28px,4vw,50px)] font-bold leading-[1.08] text-[#eaf3ff] mb-4 tracking-[.01em]">
          Найдите себя<br>
          в <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">одном из трёх</span>
        </h2>
        <p class="text-[15px] font-light text-[#7a93b4] leading-[1.75] max-w-[520px] mb-12">
          Разный масштаб — разная боль. Но решение одно: инфраструктура, которая справляется с ростом.
        </p>

        <div class="grid lg:grid-cols-3 border border-white/[0.07] rounded-[10px] overflow-hidden">
          <div v-for="(seg, i) in segments" :key="i"
               class="bg-[#0a121e] p-9 relative overflow-hidden transition-colors duration-300 hover:bg-[#0d1626]
                      border-b lg:border-b-0 lg:border-r border-white/[0.07] last:border-0">
            <!-- left accent strip -->
            <div class="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 hover:opacity-100 transition-opacity duration-300"
                 style="background: linear-gradient(180deg, transparent, #00d4e8, transparent)"></div>

            <div class="font-mono text-[10px] text-[#3a5068] tracking-[.15em] mb-4">// 0{{ i+1 }} · SEGMENT</div>

            <!-- abstract SVG visual -->
            <div class="w-full h-20 mb-5" v-html="seg.svg"></div>

            <p class="font-mono text-[10px] tracking-[.15em] uppercase text-[#00d4e8] mb-2.5">{{ seg.audience }}</p>
            <h3 class="font-['Rajdhani'] text-[20px] font-bold text-[#eaf3ff] mb-3 leading-[1.25]">{{ seg.title }}</h3>
            <p class="text-[14px] font-light leading-[1.7] text-[#7a93b4]">{{ seg.desc }}</p>
            <div class="mt-4 p-3 bg-[#060d16] border-l-2 border-[#00d4e8]/30 rounded-r-md
                        font-mono text-[11px] text-[#3a5068] leading-[1.6] tracking-[.02em] italic">
              {{ seg.quote }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px mx-12" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)"></div>

    <!-- ═══════════════════════════════════════
         SOLUTIONS
    ═══════════════════════════════════════ -->
    <section class="py-24" id="solutions">
      <div class="max-w-[1200px] mx-auto px-12">

        <p class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.15em] uppercase text-[#00d4e8] mb-4">
          <span class="opacity-50">//</span> Solutions · v4.2
        </p>
        <h2 class="font-['Rajdhani'] text-[clamp(28px,4vw,50px)] font-bold leading-[1.08] text-[#eaf3ff] mb-4 tracking-[.01em]">
          Не скрипты —<br>
          <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">фундамент бизнеса</span>
        </h2>
        <p class="text-[15px] font-light text-[#7a93b4] leading-[1.75] max-w-[520px] mb-12">
          Каждое решение — актив, который работает 24/7. Не разовая задача, а инфраструктура.
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 border border-white/[0.07] rounded-[10px] overflow-hidden">
          <div v-for="(sol, i) in solutions" :key="i"
               class="bg-[#0a121e] p-8 relative overflow-hidden transition-all duration-300
                      hover:bg-[#0d1626] hover:shadow-[inset_0_0_40px_rgba(0,212,232,.03)]
                      border-b sm:border-r border-white/[0.07]
                      [&:nth-child(2n)]:sm:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0
                      last:border-b-0 flex flex-col">

            <!-- corner bracket on hover -->
            <div class="absolute top-0 right-0 w-7 h-7 opacity-0 hover:opacity-100 transition-opacity duration-300
                        border-t border-r border-[#00d4e8]/18"></div>

            <div class="font-mono text-[10px] text-[#3a5068] tracking-[.15em] mb-4">// SOL_0{{ i+1 }}</div>

            <!-- icon -->
            <div class="w-12 h-12 mb-5 bg-[#060d16] border border-white/[0.07] rounded-lg
                        flex items-center justify-center transition-all duration-300 hover:border-[#00d4e8]/18">
              <i :class="[sol.icon, 'text-[20px] text-[#00d4e8]']"></i>
            </div>

            <h3 class="font-['Rajdhani'] text-[18px] font-bold text-[#eaf3ff] mb-1.5 leading-[1.2]">{{ sol.title }}</h3>
            <p class="font-mono text-[10px] text-[#00d4e8] tracking-[.08em] mb-3">{{ sol.tagline }}</p>
            <p class="text-[13px] font-light leading-[1.7] text-[#7a93b4] flex-1">{{ sol.desc }}</p>

            <div class="mt-5 inline-flex items-center gap-1.5
                        font-mono text-[9px] tracking-[.12em] uppercase
                        px-2.5 py-1 bg-[#060d16] border border-white/[0.07] rounded text-[#3a5068] w-fit">
              <i class="fa-solid fa-play text-[7px] text-[#00d4e8]"></i>
              {{ sol.tag }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px mx-12" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)"></div>

    <!-- ═══════════════════════════════════════
         WHY NOT WORDPRESS
    ═══════════════════════════════════════ -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] pointer-events-none"
           style="background: radial-gradient(ellipse, rgba(0,212,232,.07), transparent 70%); filter: blur(40px)"></div>
      <div class="max-w-[1200px] mx-auto px-12 relative z-10">

        <p class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.15em] uppercase text-[#00d4e8] mb-4">
          <span class="opacity-50">//</span> Architecture · Scalability
        </p>
        <h2 class="font-['Rajdhani'] text-[clamp(28px,4vw,50px)] font-bold leading-[1.08] text-[#eaf3ff] mb-4 tracking-[.01em]">
          WordPress — это тупик.<br>
          <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">Наш стек — это актив.</span>
        </h2>
        <p class="text-[15px] font-light text-[#7a93b4] leading-[1.75] max-w-[520px] mb-12">
          Через год бизнес вырастет. Вопрос: ваша платформа вырастет вместе с ним?
        </p>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- BAD -->
          <div class="bg-[#0a121e] border border-[#ff3b5c]/12 rounded-[10px] p-9">
            <p class="font-mono text-[10px] tracking-[.15em] uppercase text-[#ff3b5c] flex items-center gap-2 mb-4">
              <i class="fa-solid fa-xmark"></i> TIGHTER_STACK · DEAD END
            </p>
            <h3 class="font-['Rajdhani'] text-[22px] font-bold text-[#eaf3ff] mb-6 leading-[1.2]">WordPress / Конструктор</h3>
            <ul class="space-y-3.5 list-none">
              <li v-for="item in wpCons" :key="item"
                  class="flex items-start gap-3 text-[14px] font-light leading-[1.6] text-[#7a93b4]">
                <i class="fa-solid fa-circle-xmark text-[#ff3b5c] text-[16px] flex-shrink-0 mt-0.5"></i>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- GOOD -->
          <div class="bg-[#0a121e] border border-[#00d4e8]/18 rounded-[10px] p-9 relative overflow-hidden">
            <!-- top edge glow -->
            <div class="absolute top-0 left-[10%] right-[10%] h-px"
                 style="background: linear-gradient(90deg, transparent, #00d4e8, transparent)"></div>

            <p class="font-mono text-[10px] tracking-[.15em] uppercase text-[#00d4e8] flex items-center gap-2 mb-4">
              <i class="fa-solid fa-check"></i> IT2B_STACK · SCALABLE
            </p>
            <h3 class="font-['Rajdhani'] text-[22px] font-bold text-[#eaf3ff] mb-6 leading-[1.2]">Vue 3 + Directus + n8n</h3>
            <ul class="space-y-3.5 list-none mb-7">
              <li v-for="item in it2bPros" :key="item"
                  class="flex items-start gap-3 text-[14px] font-light leading-[1.6] text-[#7a93b4]">
                <i class="fa-solid fa-circle-check text-[#00e887] text-[16px] flex-shrink-0 mt-0.5"></i>
                {{ item }}
              </li>
            </ul>

            <!-- Growth path -->
            <div class="p-5 bg-[#060d16] border border-white/[0.07] rounded-lg">
              <p class="font-mono text-[9px] tracking-[.12em] uppercase text-[#3a5068] mb-4">// Growth path · Your roadmap</p>
              <div class="space-y-0">
                <div v-for="(step, i) in growthPath" :key="i" class="flex items-start gap-3">
                  <div class="flex flex-col items-center">
                    <div class="w-2 h-2 rounded-full mt-1 flex-shrink-0" :style="`background: ${step.color}`"></div>
                    <div v-if="i < growthPath.length - 1" class="w-px flex-1 min-h-[20px] mt-1" :style="`background: linear-gradient(${step.color}, ${growthPath[i+1].color})`"></div>
                  </div>
                  <p class="text-[13px] font-light text-[#7a93b4] pb-3 leading-[1.5]">
                    <strong class="text-[#eaf3ff] font-medium">{{ step.time }}</strong> — {{ step.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px mx-12" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)"></div>

    <!-- ═══════════════════════════════════════
         TECH STACK BENTO
    ═══════════════════════════════════════ -->
    <section class="py-24" id="stack">
      <div class="max-w-[1200px] mx-auto px-12">
        <p class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.15em] uppercase text-[#00d4e8] mb-4">
          <span class="opacity-50">//</span> Tech stack · Production
        </p>
        <h2 class="font-['Rajdhani'] text-[clamp(28px,4vw,50px)] font-bold leading-[1.08] text-[#eaf3ff] mb-12 tracking-[.01em]">
          Инструменты,<br>
          <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">которые не подводят</span>
        </h2>

        <!-- Bento grid -->
        <div class="grid grid-cols-6 gap-[2px] border border-white/[0.07] rounded-[10px] overflow-hidden">

          <!-- CORE — spans 3 cols / 2 rows -->
          <div class="col-span-6 lg:col-span-3 lg:row-span-2 bg-[#0d1626] p-6 relative overflow-hidden hover:bg-[#0f1a30] transition-colors">
            <div class="inline-flex items-center gap-2 font-mono text-[10px] tracking-[.12em] uppercase
                        text-[#00d4e8] bg-[#00d4e8]/[0.06] border border-[#00d4e8]/20 rounded px-2.5 py-1 mb-4">
              <span class="w-[5px] h-[5px] rounded-full bg-[#00d4e8] shadow-[0_0_6px_#00d4e8] animate-pulse"></span>
              CORE INFRASTRUCTURE
            </div>
            <h3 class="font-['Rajdhani'] text-[24px] font-bold text-[#eaf3ff] mb-2.5 leading-[1.15]">
              Основа<br>
              <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">автоматизации</span>
            </h3>
            <p class="text-[12px] font-light text-[#7a93b4] leading-[1.65] mb-6">
              n8n и Directus — ядро. Автоматизация потоков данных в связке с headless CMS. Сложные бизнес-процессы без вендор-локина.
            </p>
            <div class="flex gap-2.5 mt-auto">
              <div class="flex items-center gap-2.5 flex-1 bg-[#060d16] border border-white/[0.07] rounded-lg px-3.5 py-2.5">
                <i class="fa-solid fa-gears text-[18px] text-[#00d4e8]"></i>
                <div>
                  <div class="font-['Rajdhani'] text-[14px] font-bold text-[#eaf3ff]">n8n</div>
                  <div class="text-[10px] text-[#3a5068] font-light">Flow automation</div>
                </div>
              </div>
              <div class="flex items-center gap-2.5 flex-1 bg-[#060d16] border border-white/[0.07] rounded-lg px-3.5 py-2.5">
                <i class="fa-solid fa-database text-[18px] text-[#00d4e8]"></i>
                <div>
                  <div class="font-['Rajdhani'] text-[14px] font-bold text-[#eaf3ff]">Directus</div>
                  <div class="text-[10px] text-[#3a5068] font-light">Headless CMS</div>
                </div>
              </div>
            </div>
          </div>

          <!-- FRONTEND -->
          <div class="col-span-6 lg:col-span-3 bg-[#0a121e] p-6 hover:bg-[#0d1626] transition-colors border-l-0 lg:border-l-[2px] border-white/[0.04]">
            <p class="font-mono text-[9px] tracking-[.15em] uppercase text-[#3a5068] mb-3">// Frontend</p>
            <h4 class="font-['Rajdhani'] text-[18px] font-bold text-[#eaf3ff] mb-2">Быстрые интерфейсы</h4>
            <p class="text-[12px] font-light text-[#7a93b4] leading-[1.65] mb-4">SSR, SSG, SPA. Lighthouse 95+ без настройки.</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="chip in feChips" :key="chip.label"
                    class="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded
                           border border-white/[0.07] bg-[#060d16] text-[#7a93b4] hover:border-[#00d4e8]/18 hover:text-[#00d4e8] transition-all cursor-default">
                <span class="w-[5px] h-[5px] rounded-full flex-shrink-0" :style="`background: ${chip.color}`"></span>
                {{ chip.label }}
              </span>
            </div>
          </div>

          <!-- DEVOPS -->
          <div class="col-span-3 lg:col-span-2 bg-[#0a121e] p-6 hover:bg-[#0d1626] transition-colors">
            <p class="font-mono text-[9px] tracking-[.15em] uppercase text-[#3a5068] mb-3">// DevOps</p>
            <h4 class="font-['Rajdhani'] text-[18px] font-bold text-[#eaf3ff] mb-2">Инфраструктура</h4>
            <p class="text-[12px] font-light text-[#7a93b4] leading-[1.65] mb-4">CI/CD без стресса.</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="chip in opsChips" :key="chip.label"
                    class="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded
                           border border-white/[0.07] bg-[#060d16] text-[#7a93b4] hover:border-[#00d4e8]/18 hover:text-[#00d4e8] transition-all cursor-default">
                <span class="w-[5px] h-[5px] rounded-full flex-shrink-0" :style="`background: ${chip.color}`"></span>
                {{ chip.label }}
              </span>
            </div>
          </div>

          <!-- DB -->
          <div class="col-span-3 lg:col-span-1 bg-[#0a121e] p-6 hover:bg-[#0d1626] transition-colors flex flex-col justify-between">
            <p class="font-mono text-[9px] tracking-[.15em] uppercase text-[#3a5068] mb-2">// DB</p>
            <div>
              <div class="font-mono text-[32px] font-bold text-[#00d4e8] leading-none mt-2 mb-1">99.9%</div>
              <div class="font-mono text-[9px] tracking-[.08em] text-[#3a5068]">UPTIME SLA</div>
            </div>
            <div class="flex gap-1.5 mt-4">
              <span class="inline-flex items-center gap-1 font-mono text-[9px] px-2 py-1 rounded border border-white/[0.07] bg-[#060d16] text-[#7a93b4]">
                <span class="w-[5px] h-[5px] rounded-full bg-[#336791]"></span>PG
              </span>
              <span class="inline-flex items-center gap-1 font-mono text-[9px] px-2 py-1 rounded border border-white/[0.07] bg-[#060d16] text-[#7a93b4]">
                <span class="w-[5px] h-[5px] rounded-full bg-[#dc382d]"></span>Redis
              </span>
            </div>
          </div>

          <!-- INTEGRATIONS -->
          <div class="col-span-6 lg:col-span-2 bg-[#0a121e] p-6 hover:bg-[#0d1626] transition-colors">
            <p class="font-mono text-[9px] tracking-[.15em] uppercase text-[#3a5068] mb-3">// Integrations</p>
            <h4 class="font-['Rajdhani'] text-[16px] font-bold text-[#eaf3ff] mb-3">Подключим всё</h4>
            <div class="grid grid-cols-4 gap-1.5">
              <div v-for="int in integrations" :key="int.label"
                   class="aspect-square flex flex-col items-center justify-center gap-1
                          bg-[#060d16] border border-white/[0.07] rounded-md text-[14px]
                          hover:border-[#00d4e8]/18 hover:scale-105 transition-all cursor-default">
                {{ int.ico }}
                <span class="font-mono text-[7px] tracking-wide text-[#3a5068] uppercase">{{ int.label }}</span>
              </div>
            </div>
          </div>

          <!-- PERFORMANCE -->
          <div class="col-span-3 lg:col-span-1 bg-[#0a121e] p-6 hover:bg-[#0d1626] transition-colors flex flex-col justify-center">
            <p class="font-mono text-[9px] tracking-[.15em] uppercase text-[#3a5068] mb-4">// Performance</p>
            <div v-for="bar in perfBars" :key="bar.label" class="flex items-center gap-2 mb-2.5 last:mb-0">
              <span class="font-mono text-[9px] text-[#3a5068] w-14 flex-shrink-0 tracking-[.05em]">{{ bar.label }}</span>
              <div class="flex-1 h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                <div class="h-full rounded-full" :style="`width:${bar.val}%; background: linear-gradient(90deg, #00d4e8, #4d9fff)`"></div>
              </div>
              <span class="font-mono text-[10px] text-[#00d4e8] font-bold w-7 text-right">{{ bar.val }}</span>
            </div>
          </div>

          <!-- API -->
          <div class="col-span-6 lg:col-span-3 bg-[#0a121e] p-6 hover:bg-[#0d1626] transition-colors">
            <div class="flex gap-5 items-start flex-col lg:flex-row">
              <div class="flex-1">
                <p class="font-mono text-[9px] tracking-[.15em] uppercase text-[#3a5068] mb-3">// API Layer</p>
                <h4 class="font-['Rajdhani'] text-[18px] font-bold text-[#eaf3ff] mb-2">REST & Webhooks</h4>
                <p class="text-[12px] font-light text-[#7a93b4] leading-[1.65] mb-4">Единый шлюз. Rate-limiting и авторизация из коробки.</p>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="c in ['REST','Webhooks','OAuth 2','JWT']" :key="c"
                        class="font-mono text-[10px] px-2.5 py-1 rounded border border-white/[0.07] bg-[#060d16] text-[#7a93b4] hover:border-[#00d4e8]/18 hover:text-[#00d4e8] transition-all cursor-default">
                    {{ c }}
                  </span>
                </div>
              </div>
              <div class="flex-1 w-full bg-[#060d16] border border-white/[0.07] rounded-lg p-3.5 font-mono text-[10px] leading-[1.75] text-[#3a5068] relative">
                <div class="flex gap-1 absolute top-2 right-2.5">
                  <i class="w-[7px] h-[7px] rounded-full bg-[#ff3b5c]"></i>
                  <i class="w-[7px] h-[7px] rounded-full bg-[#f59e0b]"></i>
                  <i class="w-[7px] h-[7px] rounded-full bg-[#00e887]"></i>
                </div>
                <span class="text-[#00d4e8]">POST</span> /api/webhook<br>
                {<br>
                &nbsp;&nbsp;<span class="text-[#00e887]">"event"</span>: <span class="text-[#00e887]">"lead.hot"</span>,<br>
                &nbsp;&nbsp;<span class="text-[#00e887]">"score"</span>: <span class="text-[#f59e0b]">92</span><br>
                }<br><br>
                <span class="text-[#00e887]">✓ 200 · n8n flow: ok · 2.1ms</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <div class="h-px mx-12" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)"></div>

    <!-- ═══════════════════════════════════════
         PROCESS
    ═══════════════════════════════════════ -->
    <section class="py-24" id="process">
      <div class="max-w-[1200px] mx-auto px-12">
        <p class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.15em] uppercase text-[#00d4e8] mb-4">
          <span class="opacity-50">//</span> Process · 4 stages
        </p>
        <h2 class="font-['Rajdhani'] text-[clamp(28px,4vw,50px)] font-bold leading-[1.08] text-[#eaf3ff] mb-4 tracking-[.01em]">
          От хаоса к системе<br>
          <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">за 4 шага</span>
        </h2>
        <p class="text-[15px] font-light text-[#7a93b4] leading-[1.75] max-w-[520px] mb-12">
          Чёткие сроки, артефакты на каждом этапе, ваше согласование перед движением вперёд.
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 border border-white/[0.07] rounded-[10px] overflow-hidden relative">
          <!-- progress bar across top -->
          <div class="absolute top-0 left-0 w-1/2 h-[2px] z-10"
               style="background: linear-gradient(90deg, #00d4e8, #4d9fff)"></div>

          <div v-for="(step, i) in processSteps" :key="i"
               :class="['p-7 relative overflow-hidden transition-colors duration-300 hover:bg-[#0d1626]',
                        step.active ? 'bg-[#0d1626]' : 'bg-[#0a121e]',
                        'border-b sm:border-r border-white/[0.07] last:border-b-0 lg:last:border-r-0']">

            <!-- active top bar -->
            <div v-if="step.active" class="absolute top-0 left-0 right-0 h-[2px]"
                 style="background: linear-gradient(90deg, #00d4e8, #4d9fff)"></div>

            <div class="flex items-center gap-2 font-mono text-[10px] text-[#3a5068] tracking-[.15em] mb-4">
              <div :class="['w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-mono transition-all',
                            step.active
                              ? 'bg-[#00d4e8] text-[#03080f] border border-[#00d4e8]'
                              : 'bg-[#060d16] border border-white/[0.07] text-[#3a5068]']">
                {{ i + 1 }}
              </div>
              STAGE_0{{ i + 1 }}{{ step.active ? ' · CURRENT' : '' }}
            </div>

            <div class="mb-4">
              <i :class="[step.icon, 'text-[28px]', step.active ? 'text-[#00d4e8]' : 'text-[#3a5068]']"></i>
            </div>

            <h3 class="font-['Rajdhani'] text-[18px] font-bold text-[#eaf3ff] mb-2">{{ step.title }}</h3>
            <p class="text-[12px] font-light leading-[1.7] text-[#7a93b4] mb-4">{{ step.desc }}</p>

            <ul class="space-y-1.5 list-none mb-4">
              <li v-for="item in step.items" :key="item"
                  :class="['flex items-center gap-1.5 font-mono text-[11px] tracking-[.04em]',
                           step.active ? 'text-[#7a93b4]' : 'text-[#3a5068]']">
                <span class="text-[#00d4e8] text-[9px]">></span>{{ item }}
              </li>
            </ul>

            <span :class="['font-mono text-[10px] tracking-[.1em] px-2.5 py-1 rounded',
                           step.active
                             ? 'text-[#00d4e8] bg-[#00d4e8]/[0.08] border border-[#00d4e8]/20'
                             : 'text-[#3a5068] bg-[#060d16] border border-white/[0.07]']">
              ⏱ {{ step.duration }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px mx-12" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)"></div>

    <!-- ═══════════════════════════════════════
         CASES SLIDER
    ═══════════════════════════════════════ -->
    <section class="py-24" id="cases">
      <div class="max-w-[1200px] mx-auto px-12">

        <div class="flex items-end justify-between gap-5 flex-wrap mb-10">
          <div>
            <p class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.15em] uppercase text-[#00d4e8] mb-4">
              <span class="opacity-50">//</span> Case studies
            </p>
            <h2 class="font-['Rajdhani'] text-[clamp(28px,4vw,50px)] font-bold leading-[1.08] text-[#eaf3ff] tracking-[.01em]">
              Цифры,<br>
              <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">которые не врут</span>
            </h2>
          </div>
          <div class="flex gap-2">
            <button @click="prevSlide"
                    class="w-10 h-10 rounded-md border border-white/[0.07] bg-[#0a121e] text-[#7a93b4] font-mono text-[16px]
                           flex items-center justify-center hover:border-[#00d4e8]/18 hover:text-[#00d4e8] transition-all cursor-pointer">
              ←
            </button>
            <button @click="nextSlide"
                    class="w-10 h-10 rounded-md border border-white/[0.07] bg-[#0a121e] text-[#7a93b4] font-mono text-[16px]
                           flex items-center justify-center hover:border-[#00d4e8]/18 hover:text-[#00d4e8] transition-all cursor-pointer">
              →
            </button>
          </div>
        </div>

        <div class="overflow-hidden cursor-grab active:cursor-grabbing" ref="sliderEl"
             @mousedown="dragStart" @mouseup="dragEnd" @mouseleave="dragCancel"
             @touchstart="touchStart" @touchend="touchEnd">
          <div class="flex gap-[2px] transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
               :style="`transform: translateX(-${currentSlide * slideWidth}px)`">

            <div v-for="(c, i) in cases" :key="i"
                 class="flex-shrink-0 w-[calc(50%-1px)] sm:w-[calc(50%-1px)] bg-[#0a121e] border border-white/[0.07] rounded-[10px] overflow-hidden flex flex-col
                        hover:border-[#00d4e8]/18 hover:-translate-y-1 transition-all duration-300
                        max-sm:w-full">

              <!-- screen -->
              <div class="h-[200px] relative bg-[#060d16] border-b border-white/[0.07] overflow-hidden">
                <div class="absolute top-0 left-0 right-0 h-7 bg-black/60 flex items-center gap-1.5 px-3 z-10 border-b border-white/[0.05]">
                  <span class="w-[7px] h-[7px] rounded-full bg-[#ff3b5c]"></span>
                  <span class="w-[7px] h-[7px] rounded-full bg-[#f59e0b]"></span>
                  <span class="w-[7px] h-[7px] rounded-full bg-[#00e887]"></span>
                  <span class="ml-2 font-mono text-[9px] text-[#3a5068] tracking-widest">{{ c.url }}</span>
                </div>
                <div class="absolute top-7 left-0 right-0 bottom-0 p-3" v-html="c.mockup"></div>
                <div class="absolute bottom-0 left-0 right-0 h-14 z-10 pointer-events-none"
                     style="background: linear-gradient(to top, #060d16, transparent)"></div>
              </div>

              <!-- body -->
              <div class="p-5 flex flex-col flex-1">
                <div class="flex flex-wrap gap-1.5 mb-3">
                  <span v-for="tag in c.tags" :key="tag.label"
                        :class="['font-mono text-[9px] tracking-[.12em] uppercase px-2 py-1 rounded border',
                                 tag.type === 'c' ? 'bg-[#00d4e8]/[0.06] border-[#00d4e8]/20 text-[#00d4e8]'
                                 : tag.type === 'b' ? 'bg-[#1a56db]/[0.08] border-[#1a56db]/30 text-[#5d9dff]'
                                 : tag.type === 'g' ? 'bg-[#00e887]/[0.06] border-[#00e887]/20 text-[#00e887]'
                                 : 'bg-[#8b5cf6]/[0.06] border-[#8b5cf6]/20 text-[#b57aff]']">
                    {{ tag.label }}
                  </span>
                </div>
                <h3 class="font-['Rajdhani'] text-[17px] font-bold text-[#eaf3ff] mb-1.5 leading-[1.2]">{{ c.title }}</h3>
                <p class="text-[12px] font-light text-[#7a93b4] leading-[1.65] flex-1">{{ c.desc }}</p>
                <div class="flex mt-4 pt-3.5 border-t border-white/[0.05]">
                  <div v-for="(m, mi) in c.metrics" :key="mi"
                       class="flex-1 text-center border-r border-white/[0.05] last:border-r-0">
                    <div class="font-mono text-[17px] font-bold text-[#00d4e8] leading-none">{{ m.val }}</div>
                    <div class="font-mono text-[8px] tracking-[.06em] text-[#3a5068] mt-1">{{ m.label }}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- dots -->
        <div class="flex justify-center gap-1.5 mt-6">
          <button v-for="(_, i) in cases" :key="i"
                  @click="goToSlide(i)"
                  :class="['h-[6px] rounded-full transition-all duration-300 cursor-pointer border-none',
                           currentSlide === i ? 'w-5 bg-[#00d4e8] shadow-[0_0_8px_#00d4e8]' : 'w-[6px] bg-white/[0.14]']">
          </button>
        </div>

      </div>
    </section>

    <div class="h-px mx-12" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)"></div>

    <!-- ═══════════════════════════════════════
         CTA
    ═══════════════════════════════════════ -->
    <section class="py-20 relative overflow-hidden" id="cta">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] pointer-events-none"
           style="background: radial-gradient(ellipse, rgba(0,212,232,.07), transparent 70%); filter: blur(40px)"></div>
      <div class="max-w-[1200px] mx-auto px-12 relative z-10">
        <div class="bg-[#0a121e] border border-[#00d4e8]/18 rounded-2xl p-16 text-center relative overflow-hidden">

          <!-- top glow line -->
          <div class="absolute top-0 left-[15%] right-[15%] h-px"
               style="background: linear-gradient(90deg, transparent, #00d4e8, transparent)"></div>

          <!-- grid texture -->
          <div class="absolute inset-0 pointer-events-none rounded-2xl"
               style="background-image: linear-gradient(rgba(0,212,232,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,232,.025) 1px, transparent 1px); background-size:40px 40px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)">
          </div>

          <div class="relative z-10">
            <p class="inline-flex items-center gap-2 font-mono text-[11px] tracking-[.15em] uppercase text-[#00d4e8] mb-5">
              <span class="w-1.5 h-1.5 rounded-full bg-[#00d4e8] shadow-[0_0_10px_#00d4e8] animate-pulse"></span>
              Free audit · No obligations
            </p>

            <h2 class="font-['Rajdhani'] text-[clamp(30px,5vw,56px)] font-bold leading-[1.08] text-[#eaf3ff] mb-4 tracking-[.01em]">
              Готовы построить систему,<br>
              <span class="bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] bg-clip-text text-transparent">которая масштабируется?</span>
            </h2>
            <p class="text-[15px] font-light text-[#7a93b4] leading-[1.75] mb-11 max-w-[540px] mx-auto">
              Запишитесь на бесплатный аудит процессов. За 30 минут покажем, где вы теряете деньги и время — и дадим конкретный план.
            </p>

            <form class="flex flex-col gap-3 max-w-[500px] mx-auto mb-7" @submit.prevent="handleSubmit">
              <div class="grid sm:grid-cols-2 gap-3">
                <input v-model="form.name" type="text" placeholder="// Ваше имя" required
                       class="w-full px-4 py-3.5 bg-[#060d16] border border-white/[0.07] rounded-md
                              font-mono text-[12px] tracking-[.05em] text-[#eaf3ff] placeholder-[#3a5068]
                              outline-none focus:border-[#00d4e8]/40 focus:shadow-[0_0_0_3px_rgba(0,212,232,.08)]
                              transition-all">
                <input v-model="form.telegram" type="text" placeholder="// Telegram (@username)" required
                       class="w-full px-4 py-3.5 bg-[#060d16] border border-white/[0.07] rounded-md
                              font-mono text-[12px] tracking-[.05em] text-[#eaf3ff] placeholder-[#3a5068]
                              outline-none focus:border-[#00d4e8]/40 focus:shadow-[0_0_0_3px_rgba(0,212,232,.08)]
                              transition-all">
              </div>
              <input v-model="form.task" type="text" placeholder="// Опишите задачу (необязательно)"
                     class="w-full px-4 py-3.5 bg-[#060d16] border border-white/[0.07] rounded-md
                            font-mono text-[12px] tracking-[.05em] text-[#eaf3ff] placeholder-[#3a5068]
                            outline-none focus:border-[#00d4e8]/40 focus:shadow-[0_0_0_3px_rgba(0,212,232,.08)]
                            transition-all">
              <button type="submit"
                      :class="['w-full py-4 rounded-md font-mono text-[12px] tracking-[.15em] uppercase font-bold cursor-pointer border-none transition-all',
                               formSent
                                 ? 'bg-[#00e887] text-[#03080f]'
                                 : 'bg-[#00d4e8] text-[#03080f] hover:shadow-[0_0_40px_rgba(0,212,232,.5)] hover:-translate-y-px']">
                {{ formSent ? '✓ ЗАЯВКА ПРИНЯТА · ОТВЕТИМ В ТЕЧЕНИЕ 48Ч' : 'ЗАПРОСИТЬ БЕСПЛАТНЫЙ АУДИТ →' }}
              </button>
            </form>

            <p class="font-mono text-[10px] text-[#3a5068] tracking-[.08em] mb-9">
              // GDPR_COMPLIANT · NO_SPAM · RESPONSE &lt; 48H
            </p>

            <!-- trust stats -->
            <div class="flex border border-white/[0.07] rounded-[10px] overflow-hidden max-w-lg mx-auto">
              <div v-for="(t, i) in trustStats" :key="i"
                   class="flex-1 py-4 text-center border-r border-white/[0.07] last:border-r-0">
                <div class="font-mono text-[20px] font-bold text-[#00d4e8] leading-none">{{ t.val }}</div>
                <div class="font-mono text-[9px] tracking-[.08em] text-[#3a5068] mt-1">{{ t.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════ -->
    <footer class="py-8 border-t border-white/[0.07]">
      <div class="max-w-[1200px] mx-auto px-12 flex items-center justify-between gap-5 flex-wrap">
        <a href="#" class="font-['Rajdhani'] text-[20px] font-bold text-[#eaf3ff] no-underline">
          IT<span class="text-[#00d4e8]">2</span>B
        </a>
        <p class="font-mono text-[10px] text-[#3a5068] tracking-[.1em]">
          // © 2026 FUTURE SYSTEMS · ALL RIGHTS RESERVED
        </p>
        <div class="flex gap-2.5">
          <a v-for="link in footerLinks" :key="link.icon" :href="link.href" :title="link.title"
             class="w-[34px] h-[34px] rounded-md border border-white/[0.07] bg-[#0a121e]
                    flex items-center justify-center no-underline text-[#7a93b4] text-[14px]
                    hover:border-[#00d4e8]/18 hover:text-[#00d4e8] transition-all">
            <i :class="link.icon"></i>
          </a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// ── Clock ──
const clock = ref('--:--:--')
let clockInterval = null
function updateClock() {
  const n = new Date()
  const p = v => String(v).padStart(2, '0')
  clock.value = `${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`
}

// ── Nav scroll ──
const scrolled = ref(false)
const mobileOpen = ref(false)
function handleScroll() { scrolled.value = window.scrollY > 40 }

onMounted(() => {
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  clearInterval(clockInterval)
  window.removeEventListener('scroll', handleScroll)
})

// ── Nav data ──
const navLinks = [
  { href: '#segment',  label: 'Аудитория' },
  { href: '#solutions', label: 'Решения' },
  { href: '#stack',    label: 'Стек' },
  { href: '#cases',    label: 'Кейсы' },
]

// ── Hero data ──
const heroMetrics = [
  { val: '30+',   label: 'Проектов' },
  { val: '×10',   label: 'vs WordPress' },
  { val: '99.9%', label: 'Uptime SLA' },
  { val: 'Free',  label: 'Первый аудит' },
]

const dashKpis = [
  { label: 'Revenue/day', val: '₽2.4M', delta: '↑ +18% vs 7d', up: true },
  { label: 'Automated',   val: '847',   delta: '↑ 70.3% share', up: true },
  { label: 'ROI',         val: '340%',  delta: '↑ +82% vs LY',  up: true },
]

const chartBars = [40, 58, 44, 72, 62, 88, 68, 95, 80, 100]

const flowNodes = [
  { ico: '📥', label: 'Trigger', active: true },
  { ico: '🤖', label: 'AI Score', active: true },
  { ico: '📊', label: 'CRM',     active: false },
  { ico: '✈️', label: 'Notify',  active: false },
]

// ── Trust bar ──
const techStack = [
  { name: 'n8n',        icon: 'fa-solid fa-gears' },
  { name: 'Directus',   icon: 'fa-solid fa-database' },
  { name: 'Vue 3',      icon: 'fa-brands fa-vuejs' },
  { name: 'Nuxt',       icon: 'fa-solid fa-layer-group' },
  { name: 'Docker',     icon: 'fa-brands fa-docker' },
  { name: 'PostgreSQL', icon: 'fa-solid fa-server' },
  { name: 'Redis',      icon: 'fa-solid fa-bolt' },
  { name: 'FastAPI',    icon: 'fa-solid fa-rocket' },
  { name: 'Stripe',     icon: 'fa-brands fa-stripe' },
  { name: 'Tailwind',   icon: 'fa-solid fa-wind' },
  { name: 'GitHub',     icon: 'fa-brands fa-github' },
  { name: 'Telegram',   icon: 'fa-brands fa-telegram' },
]

// ── Segments ──
const segments = [
  {
    audience: '// Малый бизнес',
    title: 'Нужны клиенты и порядок при ограниченном бюджете',
    desc: 'Лендинг + автоматический сбор заявок + уведомления — и вы работаете как системная компания. Старт от одного модуля.',
    quote: '// "Хочу сайт и чтобы заявки сами приходили в телеграм, а не терялись в Excel"',
    svg: `<svg viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="40" x2="280" y2="40" stroke="rgba(0,212,232,.08)" stroke-width="1"/>
      <polyline points="0,62 40,57 80,38 120,46 160,22 200,31 240,16 280,20" stroke="rgba(0,212,232,.3)" stroke-width="1.5" fill="none"/>
      <circle cx="160" cy="22" r="4" fill="#00d4e8"/>
      <line x1="160" y1="22" x2="160" y2="40" stroke="rgba(0,212,232,.3)" stroke-width="1" stroke-dasharray="3 3"/>
      <text x="155" y="55" font-family="monospace" font-size="9" fill="rgba(0,212,232,.4)">peak</text>
    </svg>`,
  },
  {
    audience: '// Средний бизнес / Ops',
    title: 'Хаос в процессах, данные теряются, Excel не справляется',
    desc: 'Строим единую архитектуру данных. Одна платформа вместо десяти несвязанных инструментов. Прозрачность до каждого рубля.',
    quote: '// "У нас 5 таблиц, 3 CRM и никто не знает, где правда"',
    svg: `<svg viewBox="0 0 280 80" fill="none">
      <rect x="10" y="20" width="50" height="40" stroke="rgba(0,212,232,.25)" stroke-width="1" fill="rgba(0,212,232,.03)"/>
      <rect x="80" y="30" width="50" height="30" stroke="rgba(0,212,232,.15)" stroke-width="1" fill="rgba(0,212,232,.02)"/>
      <rect x="150" y="15" width="50" height="50" stroke="rgba(0,212,232,.2)" stroke-width="1" fill="rgba(0,212,232,.03)"/>
      <rect x="220" y="25" width="50" height="35" stroke="rgba(0,212,232,.12)" stroke-width="1"/>
      <line x1="60" y1="40" x2="80" y2="45" stroke="rgba(0,212,232,.35)" stroke-width="1"/>
      <line x1="130" y1="45" x2="150" y2="40" stroke="rgba(0,212,232,.35)" stroke-width="1"/>
      <line x1="200" y1="40" x2="220" y2="42" stroke="rgba(0,212,232,.35)" stroke-width="1"/>
      <circle cx="70" cy="40" r="2.5" fill="#00d4e8" opacity=".5"/>
      <circle cx="140" cy="45" r="2.5" fill="#00d4e8" opacity=".5"/>
      <circle cx="210" cy="40" r="2.5" fill="#00d4e8" opacity=".5"/>
    </svg>`,
  },
  {
    audience: '// Клиники / Салоны / Сервис',
    title: 'Нужен ИИ-администратор, который не болеет и работает 24/7',
    desc: 'FSM-бот реально записывает, уточняет детали, напоминает клиентам. Экономия на администраторе от 40 000 ₽/мес.',
    quote: '// "Администратор уходит — всё ломается. Хочу систему, а не человека"',
    svg: `<svg viewBox="0 0 280 80" fill="none">
      <circle cx="140" cy="40" r="28" stroke="rgba(0,212,232,.2)" stroke-width="1"/>
      <circle cx="140" cy="40" r="16" stroke="rgba(0,212,232,.3)" stroke-width="1"/>
      <circle cx="140" cy="40" r="4" fill="#00d4e8"/>
      <line x1="140" y1="12" x2="140" y2="0" stroke="rgba(0,212,232,.3)" stroke-width="1"/>
      <line x1="168" y1="40" x2="280" y2="40" stroke="rgba(0,212,232,.2)" stroke-width="1"/>
      <circle cx="230" cy="40" r="3" fill="rgba(0,212,232,.4)"/>
      <line x1="112" y1="40" x2="0" y2="40" stroke="rgba(0,212,232,.1)" stroke-width="1" stroke-dasharray="4 4"/>
      <text x="200" y="38" font-family="monospace" font-size="8" fill="rgba(0,212,232,.35)">24/7</text>
    </svg>`,
  },
]

// ── Solutions ──
const solutions = [
  {
    icon: 'fa-solid fa-desktop',
    title: 'Headless-системы Vue 3 + AI',
    tagline: '// Быстрее WordPress в 10 раз',
    desc: 'Сайт, который не станет «кирпичом» через год. API-first архитектура — сегодня лендинг, завтра личный кабинет. Lighthouse 95+.',
    tag: 'Vue 3 · Nuxt · AI · SSR',
  },
  {
    icon: 'fa-solid fa-circle-nodes',
    title: 'Directus — OS вашего бизнеса',
    tagline: '// Данные принадлежат вам',
    desc: 'Кастомная CRM, где вы сами владеете схемой данных. Не платите за каждое поле в amoCRM. Гибкие права, API для всего.',
    tag: 'Directus · PostgreSQL · API',
  },
  {
    icon: 'fa-solid fa-diagram-project',
    title: 'n8n — Нейронные связи',
    tagline: '// Всё связано, всё работает само',
    desc: 'Почта, мессенджеры, бухгалтерия в один поток. Лид из формы → CRM → уведомление менеджера → задача — за 3 секунды.',
    tag: 'n8n · Webhooks · REST API',
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'Digital-Администратор (FSM Bot)',
    tagline: '// ИИ-сотрудник, который реально записывает',
    desc: 'Не просто уведомления — полный цикл: уточняет запрос, проверяет слоты, записывает, напоминает, отрабатывает отмены.',
    tag: 'FSM · Telegram · n8n · AI',
  },
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Market Intelligence',
    tagline: '// Весь рынок Google Maps в вашей базе',
    desc: 'Парсинг Google Maps, 2GIS, LinkedIn. Поиск ЛПР и обогащение данных. Готовые списки под ваш профиль клиента.',
    tag: 'Scraping · Enrichment · B2B',
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Масштабируемая архитектура',
    tagline: '// Стартуем малым — растём до корпорации',
    desc: 'Модульная архитектура без переписывания. Лендинг → CRM → аналитика → платформа. Каждый модуль совместим.',
    tag: 'Docker · Microservices · SLA',
  },
]

// ── Comparison ──
const wpCons = [
  'Lighthouse 40–60. Теряете клиентов из-за скорости',
  'При росте нужно переделывать всё с нуля — деньги и время',
  'Нет нативного API — невозможно связать с CRM или ботами',
  'Плагин-ад: безопасность, обновления, конфликты',
  'Вы подстраиваетесь под платформу, а не наоборот',
]
const it2bPros = [
  'Lighthouse 95+. Загрузка <1с. SEO из коробки',
  'Модульная архитектура — добавляем блоки без переписывания',
  'API-first: любой сервис подключается за часы, не недели',
  'Docker + PostgreSQL — надёжность и полный контроль данных',
  'Платформа настраивается под ваш бизнес-процесс',
]
const growthPath = [
  { color: '#00d4e8', time: 'Сегодня', desc: 'лендинг + сбор заявок за 2 недели' },
  { color: '#1a56db', time: '+3 мес',  desc: 'личный кабинет клиента + CRM' },
  { color: '#8b5cf6', time: '+1 год',  desc: 'аналитическая платформа с API' },
]

// ── Bento data ──
const feChips = [
  { label: 'Vue 3',   color: '#42b883' },
  { label: 'Nuxt 3',  color: '#00dc82' },
  { label: 'Tailwind',color: '#38bdf8' },
  { label: 'Vite',    color: '#f59e0b' },
  { label: 'Pinia',   color: '#a78bfa' },
]
const opsChips = [
  { label: 'Docker', color: '#2496ed' },
  { label: 'Git CI', color: '#f05032' },
  { label: 'Nginx',  color: '#34d399' },
]
const integrations = [
  { ico: '✈️', label: 'TG' },
  { ico: '💳', label: 'Stripe' },
  { ico: '📊', label: 'Sheets' },
  { ico: '📧', label: 'SMTP' },
  { ico: '🔔', label: 'Push' },
  { ico: '🗺️', label: 'Maps' },
  { ico: '💬', label: 'Slack' },
  { ico: '🔗', label: 'REST' },
]
const perfBars = [
  { label: 'Lighthouse', val: 96 },
  { label: 'TTFB',       val: 88 },
  { label: 'CLS',        val: 100 },
]

// ── Process ──
const processSteps = [
  {
    active: false,
    icon: 'fa-solid fa-magnifying-glass',
    title: 'Аудит — бесплатно',
    desc: 'Погружаемся в процессы, находим где теряются деньги и время. Формируем ТЗ с измеримыми целями.',
    items: ['Интервью с командой', 'Карта процессов', 'Техническое задание'],
    duration: '3–5 DAYS',
  },
  {
    active: true,
    icon: 'fa-solid fa-pen-ruler',
    title: 'Быстрый прототип',
    desc: 'Кликабельный макет и архитектура до первой строчки кода. Согласовываем — не переделываем дважды.',
    items: ['UI/UX макеты', 'Схема данных', 'Согласование клиента'],
    duration: '5–7 DAYS',
  },
  {
    active: false,
    icon: 'fa-solid fa-gears',
    title: 'Развёртывание',
    desc: 'Итеративные спринты с еженедельными демо. GitHub + Notion — полная прозрачность.',
    items: ['Спринты 1–2 нед.', 'Демо каждую неделю', 'QA и деплой'],
    duration: '2–6 WEEKS',
  },
  {
    active: false,
    icon: 'fa-solid fa-shield-halved',
    title: 'Поддержка и рост',
    desc: 'Мониторинг 24/7, время реакции до 4 часов, новые фичи по SLA.',
    items: ['Мониторинг 24/7', 'Реакция < 4 часов', 'Развитие системы'],
    duration: '∞ ONGOING',
  },
]

// ── Cases slider ──
const currentSlide = ref(0)
const sliderEl = ref(null)
const slideWidth = computed(() => {
  if (!sliderEl.value) return 0
  const card = sliderEl.value.querySelector('.flex-shrink-0')
  return card ? card.offsetWidth + 2 : 0
})
const perView = computed(() => (typeof window !== 'undefined' && window.innerWidth <= 640) ? 1 : 2)
const maxSlide = computed(() => cases.length - perView.value)

function nextSlide() { currentSlide.value = Math.min(currentSlide.value + 1, maxSlide.value) }
function prevSlide() { currentSlide.value = Math.max(currentSlide.value - 1, 0) }
function goToSlide(i) { currentSlide.value = Math.max(0, Math.min(i, maxSlide.value)) }

// drag
let dragX = 0
let isDragging = false
function dragStart(e) { dragX = e.clientX; isDragging = true }
function dragEnd(e) { if (!isDragging) return; isDragging = false; const d = dragX - e.clientX; if (Math.abs(d) > 50) d > 0 ? nextSlide() : prevSlide() }
function dragCancel() { isDragging = false }
let touchX = 0
function touchStart(e) { touchX = e.touches[0].clientX }
function touchEnd(e) { const d = touchX - e.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? nextSlide() : prevSlide() }

const cases = [
  {
    url: 'app.finpulse.io/dashboard',
    tags: [{ label: 'FinTech', type: 'c' }, { label: 'Directus', type: 'b' }, { label: 'Vue 3', type: '' }],
    title: 'FinPulse — Аналитика платежей в реальном времени',
    desc: 'Excel-отчёты → живой дашборд с автообновлением. 3 платёжных шлюза через n8n. Данные каждые 30 секунд.',
    metrics: [{ val: '×3', label: 'скорость отчётов' }, { val: '-80%', label: 'ручного труда' }, { val: '2 нед', label: 'до запуска' }],
    mockup: `<div class="flex flex-col gap-2 pt-1">
      <div class="flex justify-between items-center">
        <div class="w-10 h-1.5 rounded bg-gradient-to-r from-[#00d4e8] to-[#4d9fff] opacity-80"></div>
        <span class="font-mono text-[8px] text-[#00e887] tracking-widest">● LIVE</span>
      </div>
      <div class="grid grid-cols-3 gap-1.5">
        <div class="bg-[#0d1626] border border-white/[0.07] rounded p-2"><div class="font-mono text-[11px] text-[#00d4e8]">₽2.4M</div><div class="font-mono text-[7px] text-[#3a5068] mt-0.5">REVENUE</div></div>
        <div class="bg-[#0d1626] border border-white/[0.07] rounded p-2"><div class="font-mono text-[11px] text-[#00e887]">+18%</div><div class="font-mono text-[7px] text-[#3a5068] mt-0.5">GROWTH</div></div>
        <div class="bg-[#0d1626] border border-white/[0.07] rounded p-2"><div class="font-mono text-[11px] text-[#eaf3ff]">1204</div><div class="font-mono text-[7px] text-[#3a5068] mt-0.5">ORDERS</div></div>
      </div>
      <div class="flex-1 bg-[#0d1626] border border-white/[0.07] rounded p-2 flex items-end gap-[3px]" style="height:60px">
        <div style="flex:1;height:35%;background:rgba(0,212,232,.2);border-radius:1px 1px 0 0"></div>
        <div style="flex:1;height:55%;background:rgba(0,212,232,.25);border-radius:1px 1px 0 0"></div>
        <div style="flex:1;height:42%;background:rgba(0,212,232,.2);border-radius:1px 1px 0 0"></div>
        <div style="flex:1;height:70%;background:rgba(0,212,232,.45);border-radius:1px 1px 0 0"></div>
        <div style="flex:1;height:60%;background:rgba(0,212,232,.3);border-radius:1px 1px 0 0"></div>
        <div style="flex:1;height:87%;background:rgba(0,212,232,.55);border-radius:1px 1px 0 0"></div>
        <div style="flex:1;height:65%;background:rgba(0,212,232,.3);border-radius:1px 1px 0 0"></div>
        <div style="flex:1;height:100%;background:#00d4e8;border-radius:1px 1px 0 0"></div>
      </div>
    </div>`,
  },
  {
    url: 'n8n.internal / crm-flow',
    tags: [{ label: 'Автоматизация', type: 'c' }, { label: 'n8n', type: 'b' }, { label: 'AI', type: '' }],
    title: 'CRM-автоматизация для агентства недвижимости',
    desc: 'От заявки до уведомления менеджера — 3 секунды. AI-скоринг лидов, автозапись в CRM, Telegram-алерт.',
    metrics: [{ val: '3 сек', label: 'обработка лида' }, { val: '+40%', label: 'конверсия' }, { val: '0', label: 'ручных действий' }],
    mockup: `<div class="flex flex-col gap-2 pt-1">
      <div class="flex items-center gap-1.5 overflow-hidden">
        <div class="flex-shrink-0 bg-[#0d1626] border border-[#00d4e8] rounded px-1.5 py-1 font-mono text-[7px] text-[#00d4e8] text-center">📥<br>Trigger</div>
        <span class="text-[#00d4e8]/40 text-[9px] flex-shrink-0">→</span>
        <div class="flex-shrink-0 bg-[#0d1626] border border-[#00d4e8] rounded px-1.5 py-1 font-mono text-[7px] text-[#00d4e8] text-center">🤖<br>AI Score</div>
        <span class="text-[#00d4e8]/40 text-[9px] flex-shrink-0">→</span>
        <div class="flex-shrink-0 bg-[#0d1626] border border-white/[0.07] rounded px-1.5 py-1 font-mono text-[7px] text-[#3a5068] text-center">📊<br>CRM</div>
        <span class="text-[#00d4e8]/40 text-[9px] flex-shrink-0">→</span>
        <div class="flex-shrink-0 bg-[#0d1626] border border-white/[0.07] rounded px-1.5 py-1 font-mono text-[7px] text-[#3a5068] text-center">✈️<br>TG</div>
      </div>
      <div class="flex-1 bg-black/40 border border-white/[0.07] rounded p-2 font-mono text-[9px] leading-[1.8] text-[#3a5068]">
        <span class="text-[#00e887]">✓</span> Lead#4821 · score:92/HOT<br>
        <span class="text-[#00d4e8]">→</span> CRM + TG notify · 2.1s<br>
        <span class="text-[#00e887]">✓</span> order.completed · ok<br>
        <span class="text-[#f59e0b]">⚠</span> queue: 0 · all clear
      </div>
    </div>`,
  },
  {
    url: 'shop.brandx.ru',
    tags: [{ label: 'E-Commerce', type: 'r' }, { label: 'Nuxt 3', type: '' }, { label: 'Directus', type: 'b' }],
    title: 'BrandX — Headless-магазин на замену WooCommerce',
    desc: 'SSG товаров, Stripe-оплата, синхронизация с 1С в реальном времени. Lighthouse 98, загрузка 0.8с.',
    metrics: [{ val: '0.8с', label: 'загрузка' }, { val: '+28%', label: 'продажи' }, { val: '98', label: 'lighthouse' }],
    mockup: `<div class="flex flex-col gap-2 pt-1">
      <div class="flex justify-between items-center">
        <span class="font-mono text-[10px] text-[#eaf3ff]">BrandX Store</span>
        <span class="font-mono text-[9px] text-[#00d4e8]">🛒 3</span>
      </div>
      <div class="grid grid-cols-3 gap-1.5">
        <div class="bg-[#0d1626] border border-white/[0.07] rounded p-1.5">
          <div class="h-7 rounded mb-1.5" style="background:linear-gradient(135deg,rgba(0,212,232,.2),rgba(26,86,219,.3))"></div>
          <div class="font-mono text-[7px] text-[#7a93b4]">Jacket</div>
          <div class="font-mono text-[8px] text-[#00d4e8] font-bold">₽4 900</div>
        </div>
        <div class="bg-[#0d1626] border border-[#00d4e8]/20 rounded p-1.5">
          <div class="h-7 rounded mb-1.5" style="background:linear-gradient(135deg,rgba(139,92,246,.25),rgba(236,72,153,.2))"></div>
          <div class="font-mono text-[7px] text-[#7a93b4]">Sneaker</div>
          <div class="font-mono text-[8px] text-[#00d4e8] font-bold">₽7 200</div>
        </div>
        <div class="bg-[#0d1626] border border-white/[0.07] rounded p-1.5">
          <div class="h-7 rounded mb-1.5" style="background:linear-gradient(135deg,rgba(0,232,135,.15),rgba(0,212,232,.15))"></div>
          <div class="font-mono text-[7px] text-[#7a93b4]">Cap</div>
          <div class="font-mono text-[8px] text-[#00d4e8] font-bold">₽1 800</div>
        </div>
      </div>
      <div class="bg-[#00d4e8]/[0.07] border border-[#00d4e8]/20 rounded p-1.5 font-mono text-[7px] text-[#00d4e8] tracking-widest">⚡ ДОСТАВКА СЕГОДНЯ · LIGHTHOUSE 98</div>
    </div>`,
  },
  {
    url: 'cms.mediagroup.ru',
    tags: [{ label: 'Media', type: 'g' }, { label: 'Directus', type: 'b' }, { label: 'Vue 3', type: '' }],
    title: 'MediaGroup — CMS для 12 изданий на одной платформе',
    desc: 'Единая Headless CMS. Гибкие права, мультиязычность, API для мобильных приложений.',
    metrics: [{ val: '12', label: 'изданий' }, { val: '×2', label: 'скорость публикации' }, { val: '1', label: 'платформа' }],
    mockup: `<div class="flex flex-col gap-1.5 pt-1">
      <div class="font-mono text-[8px] text-[#00d4e8] tracking-widest mb-1">CONTENT MANAGER · 12 ED.</div>
      <div class="flex gap-2 bg-[#00d4e8]/[0.05] border border-[#00d4e8]/10 rounded px-2 py-1 mb-0.5">
        <span class="flex-[2] font-mono text-[7px] text-[#00d4e8] font-bold tracking-widest">ЗАГОЛОВОК</span>
        <span class="flex-1 font-mono text-[7px] text-[#00d4e8] font-bold tracking-widest">АВТОР</span>
        <span class="flex-1 font-mono text-[7px] text-[#00d4e8] font-bold tracking-widest">СТАТУС</span>
      </div>
      <div class="flex gap-2 bg-[#0d1626] border border-white/[0.07] rounded px-2 py-1">
        <span class="flex-[2] font-mono text-[8px] text-[#eaf3ff]">Тренды 2025</span>
        <span class="flex-1 font-mono text-[8px] text-[#3a5068]">Анна К.</span>
        <span class="flex-1"><span class="bg-[#00e887]/10 border border-[#00e887]/20 px-1 py-0.5 rounded font-mono text-[6px] text-[#00e887]">PUB</span></span>
      </div>
      <div class="flex gap-2 bg-[#0d1626] border border-white/[0.07] rounded px-2 py-1">
        <span class="flex-[2] font-mono text-[8px] text-[#eaf3ff]">Обзор рынка</span>
        <span class="flex-1 font-mono text-[8px] text-[#3a5068]">Иван М.</span>
        <span class="flex-1"><span class="bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-1 py-0.5 rounded font-mono text-[6px] text-[#f59e0b]">DRF</span></span>
      </div>
      <div class="flex gap-2 bg-[#0d1626] border border-white/[0.07] rounded px-2 py-1">
        <span class="flex-[2] font-mono text-[8px] text-[#eaf3ff]">AI в бизнесе</span>
        <span class="flex-1 font-mono text-[8px] text-[#3a5068]">Денис С.</span>
        <span class="flex-1"><span class="bg-[#00e887]/10 border border-[#00e887]/20 px-1 py-0.5 rounded font-mono text-[6px] text-[#00e887]">PUB</span></span>
      </div>
    </div>`,
  },
]

// ── CTA form ──
const formSent = ref(false)
const form = ref({ name: '', telegram: '', task: '' })
function handleSubmit() {
  formSent.value = true
  form.value = { name: '', telegram: '', task: '' }
}

// ── Trust stats ──
const trustStats = [
  { val: '48H',   label: 'FIRST RESPONSE' },
  { val: '30+',   label: 'PROJECTS' },
  { val: '99.9%', label: 'UPTIME SLA' },
  { val: 'FREE',  label: 'FIRST AUDIT' },
]

// ── Footer ──
const footerLinks = [
  { icon: 'fa-brands fa-github',   href: '#', title: 'GitHub' },
  { icon: 'fa-brands fa-telegram', href: '#', title: 'Telegram' },
]
</script>

<style>
/* Font imports — add to your main.css or index.html */
/* @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@500;600;700&display=swap'); */
/* Font Awesome — add CDN link to index.html                                                                               */
/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">              */

/* Tailwind custom config additions needed in tailwind.config.js:
   fontFamily: { 'Rajdhani': ['Rajdhani', 'sans-serif'] }
   animation: {
     marquee: 'marquee 32s linear infinite',
     floatY: 'floatY 7s ease-in-out infinite',
   }
   keyframes: {
     marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
     floatY: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
   }
*/

/* hero scan animation — can't be done with Tailwind alone */
.hero-scan {
  animation: scan 6s ease-in-out infinite;
}
@keyframes scan {
  0%, 100% { top: 20%; opacity: 0; }
  50%       { top: 80%; opacity: 1; }
}
</style>