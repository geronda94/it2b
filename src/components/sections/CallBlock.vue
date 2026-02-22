<script setup>
import { ref, inject } from "vue";
import { useLangStore } from "@/stores/configs/lang";

const t = inject("t");
const langStore = useLangStore();
const emit = defineEmits(["submit"]);

// Хелпер для Proxy-стора
const getT = (key, fallback) => {
  const keys = key.split(".");
  let val = t.value;
  for (const k of keys) {
    if (!val) break;
    val = val[k];
  }
  return val === key ? fallback : val;
};

// Состояние формы (telegram переименовали в contact для логичности)
const formData = ref({
  name: "",
  contact: "",
  serviceType: "",
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const isError = ref(false);

const handleSubmit = async () => {
  if (
    !formData.value.name ||
    !formData.value.contact ||
    !formData.value.serviceType
  )
    return;

  isSubmitting.value = true;
  isError.value = false;

  // Подготавливаем тело запроса (теперь значения понятные)
  const payload = {
    name: formData.value.name,
    contact: formData.value.contact,
    type_of_services: formData.value.serviceType,
    lang: langStore.lang,
    ip: "0.0.0.0",
  };

  try {
    const response = await fetch(
      "https://n8n.iliev.click/webhook/receive-contanct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) throw new Error("Network response was not ok");

    // Успешная отправка
    isSubmitting.value = false;
    isSuccess.value = true;
    emit("submit", payload);

    // Очистка формы
    setTimeout(() => {
      formData.value.name = "";
      formData.value.contact = "";
      formData.value.serviceType = "";
      isSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error("Ошибка при отправке формы:", error);
    isSubmitting.value = false;
    isError.value = true;

    setTimeout(() => {
      isError.value = false;
    }, 3000);
  }
};
</script>
<template>
  <section id="contact" class="py-16 md:py-24 lg:py-32 relative z-10 overflow-hidden">
    <div class="container mx-auto px-4 md:px-6 lg:px-12 relative">
      <div class="relative max-w-6xl mx-auto rounded-3xl md:rounded-[2.5rem] p-1">
        <div
          class="absolute inset-0 bg-gradient-to-r from-[var(--brand-secondary)] via-purple-600 to-[var(--brand-primary)] rounded-3xl md:rounded-[2.5rem] opacity-30 blur-2xl animate-pulse-slow"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-primary)] rounded-3xl md:rounded-[2.5rem] opacity-50"
        ></div>

        <div
          class="relative bg-[#050b14]/90 backdrop-blur-3xl rounded-[1.4rem] md:rounded-[2.4rem] p-5 sm:p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20 overflow-hidden z-10"
        >
          <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"
          ></div>

          <div class="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
            <div
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] text-xs font-bold mb-5 md:mb-6 uppercase tracking-[0.2em]"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-primary)]"
                ></span>
              </span>
              {{ getT("cta.badge", "Бесплатный аудит") }}
            </div>

            <h2
              class="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-wide mb-4 md:mb-6 leading-tight"
            >
              {{ getT("cta.title", "Готовы автоматизировать бизнес?") }}
            </h2>

            <p
              class="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-6 md:mb-8"
            >
              {{
                getT("cta.desc", "Оставьте заявку, и мы обсудим вашу задачу...")
              }}
            </p>

            <div
              class="flex flex-col sm:flex-row items-center lg:items-start gap-4 md:gap-6 text-sm font-bold text-[var(--text-secondary)]"
            >
              <div class="flex items-center gap-2">
                <font-awesome-icon
                  :icon="['fas', 'check-circle']"
                  class="text-[var(--brand-primary)] text-lg"
                />
                <span>{{ getT("cta.check_1", "Ответ за 15 минут") }}</span>
              </div>
              <div class="flex items-center gap-2">
                <font-awesome-icon
                  :icon="['fas', 'check-circle']"
                  class="text-[var(--brand-primary)] text-lg"
                />
                <span>{{ getT("cta.check_2", "NDA с первого дня") }}</span>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-5/12 relative z-10">
            <div
              class="bg-white/[0.03] border border-white/10 rounded-[1.2rem] md:rounded-3xl p-5 md:p-8 shadow-2xl"
            >
              <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 md:gap-5">
                <div class="relative group">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--brand-primary)] transition-colors"
                  >
                    <font-awesome-icon :icon="['fas', 'user']" />
                  </div>
                  <input
                    type="text"
                    v-model="formData.name"
                    required
                    :placeholder="getT('cta.name_placeholder', 'Ваше Имя')"
                    class="w-full bg-[#050b14]/50 border border-white/10 rounded-xl py-3 md:py-4 pl-11 md:pl-12 pr-4 text-white placeholder-[var(--text-secondary)] outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all duration-300"
                  />
                </div>

                <div class="relative group">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--brand-primary)] transition-colors"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'address-book']"
                      class="text-lg"
                    />
                  </div>
                  <input
                    type="text"
                    v-model="formData.contact"
                    required
                    :placeholder="
                      getT('cta.contact_placeholder', 'Ваш телефон или Email')
                    "
                    class="w-full bg-[#050b14]/50 border border-white/10 rounded-xl py-3 md:py-4 pl-11 md:pl-12 pr-4 text-white placeholder-[var(--text-secondary)] outline-none focus:border-[var(--brand-secondary)] focus:ring-1 focus:ring-[var(--brand-secondary)] transition-all duration-300"
                  />
                </div>

                <div class="relative group">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--brand-primary)] transition-colors"
                  >
                    <font-awesome-icon :icon="['fas', 'briefcase']" />
                  </div>
                  <select
                    v-model="formData.serviceType"
                    required
                    class="w-full bg-[#050b14]/50 border border-white/10 rounded-xl py-3 md:py-4 pl-11 md:pl-12 pr-10 text-white outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all duration-300 appearance-none cursor-pointer"
                    :class="{
                      'text-[var(--text-secondary)]': !formData.serviceType,
                    }"
                  >
                    <option value="" disabled selected hidden>
                      {{
                        getT(
                          "cta.service_placeholder",
                          "Какая услуга вас интересует?",
                        )
                      }}
                    </option>

                    <option
                      value="build_website"
                      class="bg-[#050b14] text-white py-1"
                    >
                      {{ getT("cta.service_1", "Создать сайт") }}
                    </option>
                    <option
                      value="modify_website"
                      class="bg-[#050b14] text-white py-1"
                    >
                      {{ getT("cta.service_2", "Доработать сайт") }}
                    </option>
                    <option
                      value="automate_processes"
                      class="bg-[#050b14] text-white py-1"
                    >
                      {{
                        getT("cta.service_3", "Автоматизация бизнес-процессов")
                      }}
                    </option>
                    <option
                      value="full_business_automation"
                      class="bg-[#050b14] text-white py-1"
                    >
                      {{
                        getT(
                          "cta.service_4",
                          "Комплексная автоматизация бизнеса",
                        )
                      }}
                    </option>
                    <option
                      value="data_scraping"
                      class="bg-[#050b14] text-white py-1"
                    >
                      {{ getT("cta.service_5", "Сбор данных (Парсинг)") }}
                    </option>
                    <option
                      value="sales_automation"
                      class="bg-[#050b14] text-white py-1"
                    >
                      {{ getT("cta.service_6", "Автоматизация отдела продаж") }}
                    </option>
                    <option
                      value="multiple_or_other"
                      class="bg-[#050b14] text-white py-1"
                    >
                      {{ getT("cta.service_7", "Несколько услуг / Другое") }}
                    </option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-focus-within:text-[var(--brand-primary)] transition-colors"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'chevron-down']"
                      class="text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting || isSuccess"
                  class="relative w-full h-12 md:h-14 mt-1 md:mt-2 flex items-center justify-center gap-3 rounded-xl text-sm md:text-base font-black text-white uppercase tracking-wider overflow-hidden group transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                >
                  <div
                    class="absolute inset-0 transition-all duration-500"
                    :class="[
                      isError
                        ? 'bg-red-600'
                        : 'bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-primary)]',
                      'group-hover:scale-110',
                    ]"
                  ></div>

                  <div class="relative z-10 flex items-center gap-2">
                    <span v-if="!isSubmitting && !isSuccess && !isError">{{
                      getT("cta.btn", "Start Project")
                    }}</span>
                    <span v-else-if="isSubmitting">{{
                      getT("cta.btn_submitting", "Отправка...")
                    }}</span>
                    <span v-else-if="isError">{{
                      getT("cta.btn_error", "Ошибка сети")
                    }}</span>
                    <span v-else>{{
                      getT("cta.btn_success", "Заявка принята!")
                    }}</span>

                    <font-awesome-icon
                      v-if="!isSubmitting && !isSuccess && !isError"
                      :icon="['fas', 'arrow-right']"
                      class="transition-transform duration-300 group-hover:translate-x-1"
                    />
                    <font-awesome-icon
                      v-if="isSubmitting"
                      :icon="['fas', 'circle-notch']"
                      class="animate-spin"
                    />
                    <font-awesome-icon
                      v-if="isSuccess"
                      :icon="['fas', 'check']"
                    />
                    <font-awesome-icon
                      v-if="isError"
                      :icon="['fas', 'exclamation-triangle']"
                    />
                  </div>
                </button>

                <p
                  class="text-[10px] text-center text-[var(--text-secondary)] mt-1 md:mt-2 leading-tight"
                >
                  {{
                    getT(
                      "cta.privacy_text",
                      "Нажимая на кнопку, вы соглашаетесь с",
                    )
                  }}
                  <a
                    href="#"
                    class="underline hover:text-white transition-colors"
                    >{{
                      getT("cta.privacy_link", "политикой конфиденциальности")
                    }}</a
                  >.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse-bg 6s ease-in-out infinite;
}

@keyframes pulse-bg {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

/* Убираем стандартный крестик в IE/Edge на всякий случай */
select::-ms-expand {
  display: none;
}
</style>
