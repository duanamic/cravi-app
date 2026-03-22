'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const imgBack = "https://www.figma.com/api/mcp/asset/ed541214-a25b-4326-be58-bfabd11cad6e"
const imgShare = "https://www.figma.com/api/mcp/asset/2e6072c7-5798-4baa-b5ad-1f5aa279739c"
const imgFrame = "https://www.figma.com/api/mcp/asset/9c798a3a-59e0-433f-b570-663bce9e7812"
const imgPlus = "https://www.figma.com/api/mcp/asset/10967774-ad84-40dc-9eb5-8a8972c209d9"
const imgUser = "https://www.figma.com/api/mcp/asset/ff62e3c2-4b3e-474c-a5a7-dde74034b100"
const imgSource = "https://www.figma.com/api/mcp/asset/dd32631d-3942-4ebb-9d86-901f9867e36f"

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const supabase = createClient()
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single()
      if (error || !data) { router.push('/home'); return }
      setRecipe(data)
      setLoading(false)
    }
    fetchRecipe()
  }, [params.id])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: recipe?.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading || !recipe) return null

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : []
  const steps = Array.isArray(recipe.steps) ? recipe.steps : []
  const tags = recipe.tags && typeof recipe.tags === 'object' ? Object.values(recipe.tags) : []

  return (
    <div className="min-h-screen bg-[#f4fbfd]">
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8] bg-[#f4fbfd]">
        <Link href="/home" className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/home" className="w-9 h-9 flex items-center justify-center">
            <img src={imgPlus} alt="Add" className="w-5 h-5" />
          </Link>
          <Link href="/profile" className="w-9 h-9 flex items-center justify-center">
            <img src={imgUser} alt="Profile" className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[240px] bg-[#3b6370] flex items-center justify-center px-10">
        <p className="font-playfair font-bold text-white text-2xl text-center leading-snug">{recipe.title}</p>
        <Link href="/home" className="absolute top-4 left-4 w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">
          <img src={imgBack} alt="Back" className="w-5 h-5" />
        </Link>
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 w-11 h-11 bg-white/20 rounded-full flex items-center justify-center"
        >
          {copied
            ? <span className="text-white text-[10px] font-inter font-semibold">Copied!</span>
            : <img src={imgShare} alt="Share" className="w-5 h-5" />
          }
        </button>
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative px-6 pt-8 pb-24 flex flex-col gap-5">
        <div className="w-10 h-1 bg-[#d4d4d4] rounded-full mx-auto" />
        <h1 className="font-playfair font-bold text-[#1a1a1a] text-[28px] leading-snug">{recipe.title}</h1>

        {recipe.source_handle && (
          <div className="flex items-center gap-2">
            <img src={imgSource} alt="Source" className="w-4 h-4" />
            <p className="font-inter text-[#5c6365] text-[13px]">Saved from {recipe.source_handle} on Instagram</p>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: any, i) => (
              <span key={i} className="bg-[#dde4e6] text-[#1e2b24] font-inter font-medium text-xs px-[14px] py-[6px] rounded-full">{tag}</span>
            ))}
          </div>
        )}

        <div className="h-px bg-[#dde4e6]" />

        {ingredients.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">INGREDIENTS</p>
            {ingredients.map((ing: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-[2px] bg-[#1a1a1a] flex-shrink-0" />
                <p className="font-inter text-[#1a1a1a] text-[15px]">{ing}</p>
              </div>
            ))}
          </div>
        )}

        {steps.length > 0 && (
          <>
            <div className="h-px bg-[#e5e5e5]" />
            <div className="flex flex-col gap-5">
              <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">STEPS</p>
              {steps.map((step: string, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 bg-[#475357] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-inter font-semibold text-white text-[13px]">{i + 1}</span>
                  </div>
                  <p className="font-inter text-[#1a1a1a] text-[15px] leading-relaxed flex-1">{step}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
