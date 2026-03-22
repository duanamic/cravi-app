'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const imgFrame = "https://www.figma.com/api/mcp/asset/a8591f12-e859-4d44-99d0-65021b3bb317"
const imgPlus = "https://www.figma.com/api/mcp/asset/16457eaf-fa07-4b3e-acb9-0f2b16af7a02"
const imgUser = "https://www.figma.com/api/mcp/asset/64ee6b85-b995-4fc6-a296-159390fd3e35"
const imgBack = "https://www.figma.com/api/mcp/asset/7be56e1f-99f2-4446-b913-c599eb9177b4"
const imgVector = "https://www.figma.com/api/mcp/asset/2b5f6d43-79d0-420d-bb9a-a11325ad5416"
const imgSignOut = "https://www.figma.com/api/mcp/asset/0bbe1965-5268-4dfb-b388-a8ade2fec1f3"

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8]">
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
              <p className="font-playfair font-bold text-[#3b6370] text-[40px] leading-none">0</p>
              <p className="font-inter text-[#5c6365] text-[12px]">Recipes imported</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleSignOut}
            className="w-full h-12 border border-[#3b6370] rounded-xl flex items-center justify-center gap-2 hover:bg-[#3b6370]/5 transition-colors"
          >
            <img src={imgSignOut} alt="Sign out" className="w-4 h-4" />
            <span className="font-inter font-medium text-[#1e2b24] text-[14px]">Sign Out</span>
          </button>
          <p className="font-inter text-[#5c6365] text-[11px]">Cravi v1.0</p>
        </div>
      </div>
    </div>
  )
}
