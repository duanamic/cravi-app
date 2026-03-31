'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const supabase = createClient()

  // Session check handled by middleware — no client-side redirect needed

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        router.push('/home')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/home')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col items-center justify-center px-11">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Logo + headline */}
        <div className="flex flex-col items-center gap-6 text-center">
          <img src="/icon-192.png" alt="Cravi" className="w-[120px] h-[120px] rounded-2xl" />
          <div className="flex flex-col gap-4">
            <p className="font-playfair font-bold text-[#1a1a1a] text-2xl">Welcome to Cravi!</p>
            <p className="font-inter text-[#5c6365] text-base leading-relaxed">
              Create your profile to save recipes, share your creations, and connect with fellow food lovers.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[#484e50] text-[13px]">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="yourname@example.com"
                className={`w-full h-[50px] bg-white border rounded-lg px-4 font-inter text-[15px] text-[#1a1a1a] placeholder-[#848a8c] outline-none focus:border-[#3b6370] ${error ? 'border-[#e05252] border-[1.5px]' : 'border-[#dce8eb]'}`}
              />
            </div>
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[#484e50] text-[13px]">Password</label>
              <div className={`flex items-center w-full h-[50px] bg-white border rounded-lg px-4 ${error ? 'border-[#e05252] border-[1.5px]' : 'border-[#dce8eb]'}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••••••••"
                  className="flex-1 font-inter text-[15px] text-[#1a1a1a] placeholder-[#848a8c] outline-none bg-transparent"
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword
                    ? <EyeOff className="w-5 h-5 text-[#848a8c]" />
                    : <Eye className="w-5 h-5 text-[#848a8c]" />
                  }
                </button>
              </div>
              {error && <p className="font-inter text-[#dc2626] text-[11px] leading-relaxed">{error}</p>}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-6 items-center">
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="w-full h-[52px] bg-[#3b6370] rounded-full font-inter font-semibold text-white text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Please wait...' : mode === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
            <p className="font-inter text-[#1a1a1a] text-base">
              {mode === 'signup' ? (
                <>Have an account? <button onClick={() => { setMode('signin'); setError('') }} className="text-[#3b6370] underline">Sign in</button></>
              ) : (
                <>Don't have an account? <button onClick={() => { setMode('signup'); setError('') }} className="text-[#3b6370] underline">Sign up</button></>
              )}
            </p>
          </div>
        </div>

        <p className="font-inter text-[#5c6365] text-xs text-center leading-relaxed">
          We only use your credentials to connect your account. Your password is never stored.
        </p>
      </div>
    </div>
  )
}
