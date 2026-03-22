'use client'
import Link from 'next/link'

const imgFrame = "https://www.figma.com/api/mcp/asset/fb15ce32-554d-47a4-b430-ef8b1230f2d6"
const imgPlus = "https://www.figma.com/api/mcp/asset/321e0f9a-1785-4667-abd1-d767a014ea25"
const imgUser = "https://www.figma.com/api/mcp/asset/fb6c9e22-d370-4c2e-8388-446e36ae0a62"
const imgBack = "https://www.figma.com/api/mcp/asset/a1141513-c8a0-4df8-a17a-6d207077fe55"
const imgIg = "https://www.figma.com/api/mcp/asset/dbeba963-1674-47af-b5d1-b543bc4cb646"
const imgVector = "https://www.figma.com/api/mcp/asset/4aba7871-ba29-43f1-9541-3d12f48f2363"
const imgSignOut = "https://www.figma.com/api/mcp/asset/bb998e67-45fe-495e-85c5-041a0283aee9"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8]">
        <div className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </div>
        <div className="flex items-center gap-4">
          <img src={imgPlus} alt="Add" className="w-5 h-5" />
          <img src={imgUser} alt="Profile" className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 px-5 pb-8">

        {/* Top section */}
        <div className="flex flex-col items-center gap-8">

          {/* Back nav */}
          <div className="w-full py-4">
            <Link href="/home">
              <img src={imgBack} alt="Back" className="w-[22px] h-[22px]" />
            </Link>
          </div>

          {/* Profile header — name + IG handle */}
          <div className="flex flex-col items-center gap-1.5">
            <p className="font-playfair font-bold text-[#1b1b1b] text-2xl">Wike</p>
            <div className="flex items-center gap-1.5">
              <img src={imgIg} alt="Instagram" className="w-[14px] h-[14px]" />
              <p className="font-inter text-[#467482] text-[13px]">@ighandle.id</p>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white border border-[#d6dee8] rounded-2xl p-6 w-[259px] shadow-lg flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center gap-2">
                <img src={imgVector} alt="Collection" className="w-[18px] h-[22px]" />
                <span className="font-inter font-semibold text-[#1b1b1b] text-[14px]">Your Collection</span>
              </div>
              <div className="h-px bg-[#d6dee8] w-full" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="font-playfair font-bold text-[#3b6370] text-[40px] leading-none">47</p>
              <p className="font-inter text-[#5c6365] text-[12px]">Recipes imported</p>
            </div>
          </div>
        </div>

        {/* Bottom section — sign out + version */}
        <div className="flex flex-col items-center gap-6">
          <button className="w-full h-12 border border-[#3b6370] rounded-xl flex items-center justify-center gap-2 hover:bg-[#3b6370]/5 transition-colors">
            <img src={imgSignOut} alt="Sign out" className="w-4 h-4" />
            <span className="font-inter font-medium text-[#1e2b24] text-[14px]">Sign Out</span>
          </button>
          <p className="font-inter text-[#5c6365] text-[11px]">Cravi v1.0</p>
        </div>

      </div>
    </div>
  )
}
