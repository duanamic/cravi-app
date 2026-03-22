'use client'
import Link from 'next/link'
const imgHero = "https://www.figma.com/api/mcp/asset/9df14b0a-ef7e-45af-934c-5c7e1dd09d5e"
const imgBack = "https://www.figma.com/api/mcp/asset/ed541214-a25b-4326-be58-bfabd11cad6e"
const imgShare = "https://www.figma.com/api/mcp/asset/2e6072c7-5798-4baa-b5ad-1f5aa279739c"
const imgSource = "https://www.figma.com/api/mcp/asset/dd32631d-3942-4ebb-9d86-901f9867e36f"
const imgFrame = "https://www.figma.com/api/mcp/asset/9c798a3a-59e0-433f-b570-663bce9e7812"
const imgPlus = "https://www.figma.com/api/mcp/asset/10967774-ad84-40dc-9eb5-8a8972c209d9"
const imgUser = "https://www.figma.com/api/mcp/asset/ff62e3c2-4b3e-474c-a5a7-dde74034b100"
const tags = ['Italian','Comfort food','Date night','~35 min','Easy']
const ingredients = ['500g penne pasta','4 chicken thighs, boneless','200ml heavy cream','100g sun-dried tomatoes','2 cups fresh spinach','3 cloves garlic, minced']
const steps = [
  'Season the chicken thighs with salt, pepper, and Italian herbs. Sear in a hot pan until golden on both sides, about 4 minutes per side.',
  'Cook the pasta in salted boiling water until al dente. Reserve 1 cup pasta water before draining.',
  'In the same pan, sauté garlic and sun-dried tomatoes for 2 minutes. Add cream and spinach, stir until wilted.',
]
export default function RecipeDetailPage() {
  return (
    <div className="min-h-screen bg-[#f4fbfd]">
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8] bg-[#f4fbfd]">
        <div className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </div>
        <div className="flex items-center gap-4">
          <img src={imgPlus} alt="Add" className="w-5 h-5" />
          <img src={imgUser} alt="Profile" className="w-5 h-5" />
        </div>
      </div>
      <div className="relative">
        <img src={imgHero} alt="Recipe" className="w-full h-[300px] object-cover" />
        <Link href="/home" className="absolute top-4 left-4 w-11 h-11 bg-[rgba(221,228,230,0.8)] rounded-full flex items-center justify-center">
          <img src={imgBack} alt="Back" className="w-5 h-5" />
        </Link>
        <button className="absolute top-4 right-4 w-11 h-11 bg-[rgba(221,228,230,0.8)] rounded-full flex items-center justify-center">
          <img src={imgShare} alt="Share" className="w-5 h-5" />
        </button>
      </div>
      <div className="bg-white rounded-t-3xl -mt-6 relative px-6 pt-8 pb-24 flex flex-col gap-5">
        <div className="w-10 h-1 bg-[#d4d4d4] rounded-full mx-auto" />
        <h1 className="font-playfair font-bold text-[#1a1a1a] text-[28px] leading-snug">Creamy Tuscan Chicken Pasta</h1>
        <div className="flex items-center gap-2">
          <img src={imgSource} alt="Instagram" className="w-4 h-4" />
          <p className="font-inter text-[#5c6365] text-[13px]">Saved from @halfbakedharvest on Instagram</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => <span key={t} className="bg-[#dde4e6] text-[#1e2b24] font-inter font-medium text-xs px-[14px] py-[6px] rounded-full">{t}</span>)}
        </div>
        <div className="h-px bg-[#dde4e6]" />
        <div className="flex flex-col gap-4">
          <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">INGREDIENTS</p>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-[2px] bg-[#1a1a1a] flex-shrink-0" />
              <p className="font-inter text-[#1a1a1a] text-[15px]">{ing}</p>
            </div>
          ))}
        </div>
        <div className="h-px bg-[#e5e5e5]" />
        <div className="flex flex-col gap-5">
          <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">STEPS</p>
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-7 h-7 bg-[#475357] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-inter font-semibold text-white text-[13px]">{i+1}</span>
              </div>
              <p className="font-inter text-[#1a1a1a] text-[15px] leading-relaxed flex-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
