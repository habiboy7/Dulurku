<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Welcome Announcement Card (Cream Paper Accent Style) -->
    <div class="bg-cream-paper border border-mist rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-subtle relative overflow-hidden">
      <div class="flex-1 space-y-4 z-10">
        <span class="inline-block bg-brand-teal text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
          Tahap 1 Selesai
        </span>
        <h1 class="font-dm-sans text-3xl md:text-4xl font-semibold text-midnight-ink leading-tight tracking-tight">
          Selamat Datang, {{ userName }}!
        </h1>
        <p class="font-inter text-sm text-zinc-500 max-w-xl leading-relaxed">
          Akun Anda telah terintegrasi dengan Supabase Auth secara sukses. Sekarang Anda siap mengelola silsilah keluarga besar Anda di platform digital Dulurku.
        </p>
      </div>

      <!-- Mascot Placeholder / Illustration -->
      <div class="w-32 h-32 md:w-40 md:h-40 bg-brand-teal/10 rounded-full flex items-center justify-center text-5xl z-10 select-none">
        🌳
      </div>

      <!-- Decorative blur -->
      <div class="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-mint-glow/20 blur-2xl"></div>
    </div>

    <!-- Quick Stats & Info (Grid 3 Column) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white border border-mist rounded-[24px] p-6 shadow-subtle flex flex-col justify-between min-h-[140px]">
        <div>
          <span class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Keluarga</span>
          <p class="text-3xl font-dm-sans font-semibold text-midnight-ink mt-2">0</p>
        </div>
        <p class="text-xs text-zinc-500 mt-4">Belum ada keluarga yang dibuat.</p>
      </div>

      <div class="bg-white border border-mist rounded-[24px] p-6 shadow-subtle flex flex-col justify-between min-h-[140px]">
        <div>
          <span class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Anggota</span>
          <p class="text-3xl font-dm-sans font-semibold text-midnight-ink mt-2">0</p>
        </div>
        <p class="text-xs text-zinc-500 mt-4">Anggota keluarga dalam silsilah.</p>
      </div>

      <div class="bg-white border border-mist rounded-[24px] p-6 shadow-subtle flex flex-col justify-between min-h-[140px]">
        <div>
          <span class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Arsip Kenangan</span>
          <p class="text-3xl font-dm-sans font-semibold text-midnight-ink mt-2">0</p>
        </div>
        <p class="text-xs text-zinc-500 mt-4">Media/dokumen yang diunggah.</p>
      </div>
    </div>

    <!-- Next Steps (2-Column Split) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Create Family Call to Action -->
      <div class="bg-white border border-mist rounded-[24px] p-8 shadow-subtle space-y-6">
        <div class="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal text-xl">
          ➕
        </div>
        <div class="space-y-2">
          <h3 class="font-dm-sans text-xl font-semibold text-midnight-ink">Buat Keluarga Baru</h3>
          <p class="font-inter text-sm text-zinc-500 leading-relaxed">
            Mulailah dengan membuat grup keluarga besar Anda (misal: "Keluarga Marga Siregar" atau "Paguyuban Trah Sumowidjojo").
          </p>
        </div>
        <button class="bg-brand-teal text-white font-inter text-xs font-semibold py-3 px-5 rounded-xl hover:brightness-105 transition-all duration-200 cursor-pointer">
          Mulai Buat Keluarga
        </button>
      </div>

      <!-- Profile Settings / Info -->
      <div class="bg-white border border-mist rounded-[24px] p-8 shadow-subtle space-y-6">
        <div class="w-12 h-12 rounded-xl bg-zinc-900/5 flex items-center justify-center text-zinc-600 text-xl">
          ⚙️
        </div>
        <div class="space-y-2">
          <h3 class="font-dm-sans text-xl font-semibold text-midnight-ink">Status Autentikasi</h3>
          <p class="font-inter text-sm text-zinc-500 leading-relaxed">
            Anda login menggunakan akun dengan email <strong>{{ userEmail }}</strong>. Sesi masuk Anda akan tetap aktif selama 7 hari sesuai dengan spesifikasi PRD.
          </p>
        </div>
        <div class="flex gap-3">
          <span class="inline-flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Terhubung (Supabase)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const userEmail = computed(() => authStore.user?.email ?? '')
const userName = computed(() => authStore.user?.user_metadata?.full_name ?? authStore.user?.email?.split('@')[0] ?? 'User')
</script>
