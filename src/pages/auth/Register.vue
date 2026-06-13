<template>
  <div>
    <!-- Success State -->
    <div v-if="success" class="text-center py-4">
      <div class="w-16 h-16 bg-mint-wash/30 text-brand-teal rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
        ✉️
      </div>
      <h2 class="font-dm-sans text-2xl font-semibold text-midnight-ink mb-3">
        Periksa Email Anda
      </h2>
      <p class="font-inter text-sm text-zinc-500 mb-6 leading-relaxed">
        Kami telah mengirimkan tautan verifikasi ke <strong class="text-midnight-ink">{{ email }}</strong>. Silakan konfirmasi email Anda untuk melanjutkan.
      </p>
      <router-link 
        :to="{ name: 'login' }" 
        class="inline-block bg-brand-teal text-white font-inter text-sm font-semibold py-3 px-6 rounded-2xl hover:brightness-105 transition-all duration-200"
      >
        Kembali ke Login
      </router-link>
    </div>

    <!-- Register Form State -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <h2 class="font-dm-sans text-3xl font-semibold text-midnight-ink tracking-tight mb-2">
          Buat Akun Baru
        </h2>
        <p class="font-inter text-sm text-zinc-500">
          Mulai lestarikan silsilah keluarga Anda secara digital hari ini.
        </p>
      </div>

      <!-- Alert Error -->
      <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
        <span class="text-red-500 font-semibold text-sm">❌</span>
        <p class="font-inter text-xs text-red-600 font-medium leading-relaxed">
          {{ errorMsg }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label for="name" class="block font-inter text-xs font-semibold text-midnight-ink mb-2">
            Nama Lengkap
          </label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            required 
            placeholder="Ketik nama lengkap Anda"
            class="w-full bg-white border border-mist rounded-xl px-4 py-3 text-sm text-midnight-ink placeholder-fog-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label for="email" class="block font-inter text-xs font-semibold text-midnight-ink mb-2">
            Alamat Email
          </label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="nama@email.com"
            class="w-full bg-white border border-mist rounded-xl px-4 py-3 text-sm text-midnight-ink placeholder-fog-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label for="password" class="block font-inter text-xs font-semibold text-midnight-ink mb-2">
            Kata Sandi
          </label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Minimal 6 karakter"
            class="w-full bg-white border border-mist rounded-xl px-4 py-3 text-sm text-midnight-ink placeholder-fog-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-200"
          />
        </div>

        <!-- Submit Button (Filled Teal Button) -->
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-brand-teal text-white font-inter text-sm font-semibold py-3.5 px-4 rounded-2xl hover:brightness-105 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ loading ? 'Mendaftar...' : 'Daftar Akun Baru' }}</span>
        </button>
      </form>

      <!-- Footer Links -->
      <div class="mt-8 pt-6 border-t border-mist/50 text-center">
        <p class="font-inter text-xs text-zinc-500">
          Sudah memiliki akun? 
          <router-link 
            :to="{ name: 'login' }" 
            class="font-semibold text-brand-teal hover:underline ml-1"
          >
            Masuk
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const success = ref(false)
const errorMsg = ref<string | null>(null)

const handleRegister = async () => {
  loading.value = true
  errorMsg.value = null
  try {
    await authStore.register(email.value, password.value, name.value)
    success.value = true
  } catch (err: any) {
    errorMsg.value = err.message || 'Gagal mendaftarkan akun. Silakan coba kembali.'
  } finally {
    loading.value = false
  }
}
</script>
