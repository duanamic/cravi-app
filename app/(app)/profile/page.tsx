'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Plus, User, ArrowLeft, BookOpen, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [count, setCount] = useState(0)
  const [displayName, setDisplayName] = useState('')
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [savingName, setSavingName] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { count: total } = await supabase
        .from('recipes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      setCount(total || 0)
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single()
      if (profile?.display_name) setDisplayName(profile.display_name)
    }
    fetchData()
    const handleFocus = () => fetchData()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleSaveName = async () => {
    setSavingName(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: nameInput.trim() || null })
      .eq('id', user.id)
    if (!error) {
      setDisplayName(nameInput.trim())
      setEditingName(false)
    }
    setSavingName(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
      <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8] bg-[#f4fbfd]">
        <Link href="/home" className="flex items-center gap-2">
          <img src="/icon-192.png" alt="Cravi" className="w-7 h-7 rounded-md" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </Link>
        <div className="flex items-center gap-4">
          <Plus className="w-5 h-5 text-[#3b6370]" />
          <User className="w-5 h-5 text-[#3b6370]" />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 px-11 pb-8">
        <div className="flex flex-col gap-8">
          <div className="py-4">
            <Link href="/home">
              <ArrowLeft className="w-[22px] h-[22px] text-[#1a1a1a]" />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 mb-2">
            {editingName ? (
              <div className="flex items-center gap-2 w-full">
                <input value={nameInput} onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                  placeholder="Your name"
                  className="flex-1 h-[44px] border border-[#dce8eb] rounded-lg px-4 font-inter text-[16px] text-[#1a1a1a] placeholder-[#a0b4bc] outline-none focus:border-[#3b6370]"
                  autoFocus />
                <button onClick={handleSaveName} disabled={savingName}
                  className="h-[44px] px-5 bg-[#3b6370] rounded-lg font-inter font-semibold text-white text-[14px] disabled:opacity-50">
                  {savingName ? '...' : 'Save'}
                </button>
                <button onClick={() => setEditingName(false)}
                  className="h-[44px] px-3 font-inter text-[#5c6365] text-[14px]">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => { setNameInput(displayName); setEditingName(true) }}
                className="font-playfair font-bold text-[#1a1a1a] text-[22px]">
                {displayName || 'Tap to add your name'}
              </button>
            )}
          </div>
          <div className="bg-white border border-[#d6dee8] rounded-2xl p-6 w-full shadow-lg flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="w-[18px] h-[22px] text-[#1b1b1b]" />
                <span className="font-inter font-semibold text-[#1b1b1b] text-[14px]">Your Collection</span>
              </div>
              <div className="h-px bg-[#d6dee8] w-full" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="font-playfair font-bold text-[#3b6370] text-[40px] leading-none">{count}</p>
              <p className="font-inter text-[#5c6365] text-[12px]">Recipes</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleSignOut}
            className="w-full h-12 border border-[#3b6370] rounded-xl flex items-center justify-center gap-2 hover:bg-[#3b6370]/5 transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#3b6370]" />
            <span className="font-inter font-medium text-[#3b6370] text-[14px]">Sign Out</span>
          </button>
          <p className="font-inter text-[#5c6365] text-[11px]">Cravi v1.0</p>
        </div>
      </div>
    </div>
  )
}
