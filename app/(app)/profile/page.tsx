'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const imgFrame = "https://www.figma.com/api/mcp/asset/317c8a93-9083-46a3-862c-334d324937d5"
const imgPlus = "https://www.figma.com/api/mcp/asset/4d79a58b-bbc7-4a0d-94dd-ee6ba5b5f3e5"
const imgUser = "https://www.figma.com/api/mcp/asset/a0af743b-45ea-4c73-8088-d9ae91a4f892"
const imgBack = "https://www.figma.com/api/mcp/asset/2bccc7ec-e74d-4c66-942a-050d6ced06f7"
const imgVector = "https://www.figma.com/api/mcp/asset/cf669a8d-2330-438c-ae1f-33b60440cabc"
const imgSignOut = "https://www.figma.com/api/mcp/asset/f292426f-69d5-4c35-bc79-26fda71e3e0c"

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { count: total } = await supabase
        .from('recipes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      setCount(total || 0)
    }
    fetchCount()
    const handleFocus = () => fetchCount()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
      <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8] bg-[#f4fbfd]">
        <Link href="/home" className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </Link>
        <div className="flex items-center gap-4">
          <img src={imgPlus} alt="Add" className="w-5 h-5" />
          <img src={imgUser} alt="Profile" className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 px-11 pb-8">
        <div className="flex flex-col gap-8">
          <div className="py-4">
            <Link href="/home">
              <img src={imgBack} alt="Back" className="w-[22px] h-[22px]" />
            </Link>
          </div>
          <div className="bg-white border border-[#d6dee8] rounded-2xl p-6 w-full shadow-lg flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center gap-2">
                <img src={imgVector} alt="Collection" className="w-[18px] h-[22px]" />
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
            <img src={imgSignOut} alt="Sign out" className="w-4 h-4" />
            <span className="font-inter font-medium text-[#3b6370] text-[14px]">Sign Out</span>
          </button>
          <p className="font-inter text-[#5c6365] text-[11px]">Cravi v1.0</p>
        </div>
      </div>
    </div>
  )
}
