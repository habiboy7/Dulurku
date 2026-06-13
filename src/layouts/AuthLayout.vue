<template>
  <div class="min-h-screen bg-pearl flex flex-col md:flex-row">
    <!-- Left Panel: Editorial & Brand Identity (Visible on Desktop) -->
    <div class="hidden md:flex md:w-1/2 bg-cream-paper p-12 lg:p-16 flex-col justify-between relative overflow-hidden border-r border-mist">
      <!-- Top: Logo & Brand name -->
      <div class="flex items-center gap-2 z-10">
        <!-- SVG Logo Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-8 h-8 text-brand-teal">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v11a4 4 0 0 1-4-4" />
          <circle cx="12" cy="12" r="3" class="fill-brand-teal/20" />
        </svg>
        <span class="font-dm-sans font-semibold text-2xl text-midnight-ink tracking-tight">Dulurku</span>
      </div>

      <!-- Center: Large Display Headline -->
      <div class="my-auto z-10 max-w-lg">
        <h1 class="font-dm-sans text-5xl lg:text-6xl font-semibold text-midnight-ink leading-[1.05] tracking-[-1.5px] mb-6">
          Kenali <span class="text-brand-teal">Keluargamu</span>.<br />
          Lestarikan <span class="text-brand-teal">Warisanmu</span>.
        </h1>
        <p class="font-inter text-zinc-500 text-base leading-relaxed max-w-[380px]">
          Membangun, memahami, dan melestarikan hubungan kekerabatan lintas generasi untuk keluarga besar Anda.
        </p>
      </div>

      <!-- Bottom: Decorative Footer or Quote -->
      <div class="z-10 mt-auto pt-8 border-t border-mist/50 flex items-center gap-4">
        <div class="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-semibold text-sm">
          👪
        </div>
        <div>
          <p class="font-inter text-sm text-midnight-ink font-medium">Google Maps untuk hubungan keluarga.</p>
          <p class="font-inter text-xs text-zinc-500">Kalkulasi jalur kekerabatan instan.</p>
        </div>
      </div>

      <!-- Decorative Background Elements -->
      <div class="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-mint-wash/30 blur-3xl"></div>
      <div class="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-mint-glow/10 blur-3xl"></div>
    </div>

    <!-- Right Panel: Auth Pages Slot Container -->
    <div class="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16">
      <!-- Small Header for Mobile Only -->
      <div class="flex md:hidden items-center gap-2 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-8 h-8 text-brand-teal">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v11a4 4 0 0 1-4-4" />
          <circle cx="12" cy="12" r="3" class="fill-brand-teal/20" />
        </svg>
        <span class="font-dm-sans font-semibold text-2xl text-midnight-ink tracking-tight">Dulurku</span>
      </div>

      <!-- Slide Transition Container for Auth Pages -->
      <div class="w-full max-w-md bg-white border border-mist rounded-[24px] p-8 md:p-10 shadow-subtle">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
