<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h2 class="font-dm-sans text-2xl sm:text-3xl font-semibold text-midnight-ink tracking-tight mb-1.5">
        Selamat Datang
      </h2>
      <p class="font-inter text-xs sm:text-sm text-zinc-500 leading-relaxed">
        Masuk ke akun Dulurku Anda untuk mengelola silsilah keluarga.
      </p>
    </div>

    <!-- Alert Error -->
    <div v-if="errorMsg" class="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
      <span class="text-red-500 font-semibold text-sm">❌</span>
      <p class="font-inter text-xs text-red-600 font-medium leading-relaxed">
        {{ errorMsg }}
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block font-inter text-xs font-semibold text-midnight-ink mb-1.5">
          Alamat Email
        </label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required 
          placeholder="nama@email.com"
          class="w-full bg-white border border-mist rounded-xl px-4 py-2.5 sm:py-3 text-sm text-midnight-ink placeholder-fog-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label for="password" class="block font-inter text-xs font-semibold text-midnight-ink">
            Kata Sandi
          </label>
          <router-link 
            :to="{ name: 'forgot-password' }" 
            class="font-inter text-[11px] sm:text-xs font-semibold text-brand-teal hover:underline"
          >
            Lupa kata sandi?
          </router-link>
        </div>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          placeholder="••••••••"
          class="w-full bg-white border border-mist rounded-xl px-4 py-2.5 sm:py-3 text-sm text-midnight-ink placeholder-fog-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-200"
        />
      </div>

      <!-- Submit Button (Filled Teal Button) -->
      <button 
        type="submit" 
        :disabled="loading"
        class="w-full bg-brand-teal text-white font-inter text-sm font-semibold py-3 sm:py-3.5 px-4 rounded-2xl hover:brightness-105 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ loading ? 'Memproses...' : 'Masuk ke Akun' }}</span>
      </button>
    </form>

    <!-- Footer Links -->
    <div class="mt-6 pt-5 border-t border-mist/50 text-center">
      <p class="font-inter text-xs text-zinc-500">
        Belum memiliki akun? 
        <router-link 
          :to="{ name: 'register' }" 
          class="font-semibold text-brand-teal hover:underline ml-1"
        >
          Daftar Sekarang
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref<string | null>(null)

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = null
  try {
    await authStore.login(email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch (err: any) {
    // Custom error messages
    errorMsg.value = err.message || 'Gagal masuk. Mohon periksa kembali email dan kata sandi Anda.'
  } finally {
    loading.value = false
  }
}
</script>
