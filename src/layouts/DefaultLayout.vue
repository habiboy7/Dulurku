<template>
  <div class="min-h-screen bg-pearl flex flex-col font-inter">
    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-50 bg-white border-b border-mist shadow-subtle h-16 flex items-center">
      <div class="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <!-- Left: Logo -->
        <router-link to="/dashboard" class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-6.5 h-6.5 text-brand-teal">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 6v11a4 4 0 0 1-4-4" />
            <circle cx="12" cy="12" r="3" class="fill-brand-teal/20" />
          </svg>
          <span class="font-dm-sans font-semibold text-xl text-midnight-ink tracking-tight">Dulurku</span>
        </router-link>

        <!-- Center: Nav Links -->
        <nav class="hidden md:flex items-center gap-6">
          <router-link 
            to="/dashboard" 
            class="text-sm font-medium text-midnight-ink hover:text-brand-teal transition-colors py-2 px-1"
            active-class="text-brand-teal border-b-2 border-brand-teal"
          >
            Dashboard
          </router-link>
          <a href="#" class="text-sm font-medium text-zinc-500 hover:text-midnight-ink transition-colors">
            Pohon Keluarga
          </a>
          <a href="#" class="text-sm font-medium text-zinc-500 hover:text-midnight-ink transition-colors">
            Cari Hubungan
          </a>
          <a href="#" class="text-sm font-medium text-zinc-500 hover:text-midnight-ink transition-colors">
            Arsip Kenangan
          </a>
        </nav>

        <!-- Right: Profile Dropdown & Logout -->
        <div class="flex items-center gap-4">
          <div class="hidden sm:flex flex-col text-right">
            <span class="text-xs font-semibold text-midnight-ink">{{ userName }}</span>
            <span class="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
              {{ userEmail }}
            </span>
          </div>

          <!-- User Avatar Placeholder -->
          <div class="w-9 h-9 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal font-semibold text-sm">
            {{ userInitials }}
          </div>

          <!-- Logout Button (Ghost Navigation Style) -->
          <button 
            @click="handleLogout" 
            class="text-sm font-medium text-zinc-500 hover:text-midnight-ink hover:bg-pearl px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"
            :disabled="loading"
          >
            {{ loading ? 'Keluar...' : 'Keluar' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 w-full max-w-[1200px] mx-auto px-6 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Simple Footer -->
    <footer class="bg-white border-t border-mist py-6 text-center text-xs text-zinc-500 mt-auto">
      <p>&copy; 2026 Dulurku. Kenali Keluargamu, Lestarikan Warisanmu.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)

const userEmail = computed(() => authStore.user?.email ?? '')
const userName = computed(() => authStore.user?.user_metadata?.full_name ?? authStore.user?.email?.split('@')[0] ?? 'User')

const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
})

const handleLogout = async () => {
  loading.value = true
  try {
    await authStore.logout()
    router.push({ name: 'login' })
  } catch (err) {
    console.error('Logout failed:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
