import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Inisialisasi Auth State (Cek session yang tersimpan)
  const init = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.getSession()
      if (err) throw err
      session.value = data.session
      user.value = data.session?.user ?? null
    } catch (err: any) {
      error.value = err.message || 'Gagal memuat sesi autentikasi'
    } finally {
      loading.value = false
    }

    // Dengarkan perubahan state auth
    supabase.auth.onAuthStateChange((_event, _session) => {
      session.value = _session
      user.value = _session?.user ?? null
    })
  }

  // Registrasi User Baru
  const register = async (email: string, password: string, name: string) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })
      if (err) throw err
      return data
    } catch (err: any) {
      error.value = err.message || 'Gagal melakukan registrasi'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Login
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      session.value = data.session
      user.value = data.user
      return data
    } catch (err: any) {
      error.value = err.message || 'Email atau password salah'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err
      session.value = null
      user.value = null
    } catch (err: any) {
      error.value = err.message || 'Gagal melakukan logout'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Reset Password (Kirim Email)
  const resetPassword = async (email: string) => {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (err) throw err
    } catch (err: any) {
      error.value = err.message || 'Gagal mengirim email reset password'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    session,
    loading,
    error,
    init,
    register,
    login,
    logout,
    resetPassword,
  }
})
