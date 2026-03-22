'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
const imgFrame = "https://www.figma.com/api/mcp/asset/aeebbe46-37b1-4a3c-a82b-8798db9ebb1e"
const imgPlus = "https://www.figma.com/api/mcp/asset/148c5e63-dadf-4d16-b17d-4c82bf443727"
const imgUser = "https://www.figma.com/api/mcp/asset/8bc6031a-890d-40dd-8c68-6444e046ef8f"
const imgGc1 = "https://www.figma.com/api/mcp/asset/acf2cbae-d5f6-4673-bd4b-8f31ce3752c3"
const imgGc2 = "https://www.figma.com/api/mcp/asset/65152821-fac4-4290-930b-8aa4044a6daf"
const imgGc3 = "https://www.figma.com/api/mcp/asset/ce21c219-d8d6-4e17-b782-1db9c4141863"
const imgGc4 = "https://www.figma.com/api/mcp/asset/227f5c67-99dd-4745-9038-b9294b673d98"
const chips = ['All','Under 30 min','Italian','Mediterranean','Date night']
const recipes = [
  { id:1, title:'Cacio e Pepe', tag:'Italian', time:'25 min', img:imgGc1, tall:true },
  { id:2, title:'Lemon Risotto', tag:'Italian', time:'35 min', img:imgGc2, tall:false },
  { id:3, title:'Chicken Marsala', tag:'Comfort', time:'40 min', img:imgGc3, tall:false },
  { id:4, title:'Date Night Pasta', tag:'Date Night', time:'45 min', img:imgGc4, tall:true },
]
export default function HomePage() {
  const router = useRouter()
  const [active, setActive] = useState('Italian')
  const [showModal, setShowModal] = useState(false)
  const [hasRecipes, setHasRecipes] = useState<boolean | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkRecipes = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      const { count } = await supabase
        .from('recipes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      if ((count ?? 0) === 0) {
        router.push('/empty')
      } else {
        setHasRecipes(true)
      }
    }
    checkRecipes()
  }, [])

  if (hasRecipes === null) return null
  const col1 = recipes.filter((_,i) => i%2===0)
  const col2 = recipes.filter((_,i) => i%2===1)
  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8]">
        <Link href="/home" className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowModal(true)} className="w-9 h-9 flex items-center justify-center"><img src={imgPlus} alt="Add" className="w-5 h-5" /></button>
          <Link href="/profile" className="w-9 h-9 flex items-center justify-center"><img src={imgUser} alt="Profile" className="w-5 h-5" /></Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-5 py-6 flex-1">
        <div>
          <p className="font-playfair font-bold text-[#1b1b1b] text-[28px] leading-tight">What are you craving?</p>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5">
          {chips.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-4 py-[10px] rounded-full font-inter font-medium text-[13px] whitespace-nowrap transition-colors ${active===c ? 'bg-[#3b6370] text-white' : 'bg-[#dde4e6] text-[#1e2b24]'}`}>
              {c}
            </button>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-playfair font-bold text-[#1a1a1a] text-[13px]">Italian Collection</span>
            <span className="bg-[#3b6370] text-white text-[9px] font-inter font-semibold px-2 py-1 rounded-xl">4</span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-3">
              {col1.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {col2.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          </div>
        </div>
      </div>
      {showModal && <AddRecipeModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <img src={recipe.img} alt={recipe.title} className={`w-full object-cover ${recipe.tall ? 'h-[180px]' : 'h-[130px]'}`} />
        <div className="p-3 flex flex-col gap-2">
          <p className="font-playfair font-semibold text-[#1a1a1a] text-base">{recipe.title}</p>
          <div className="flex items-center gap-1.5">
            <span className="bg-[#f5edd8] text-[#1c3b2a] text-[10px] font-inter font-medium px-2 py-[3px] rounded-[10px]">{recipe.tag}</span>
            <span className="font-inter text-[#6b6560] text-[11px]">{recipe.time}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
function AddRecipeModal({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleAdd = async () => {
    if (!url.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/parse-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (data.success) setResult(data.recipe)
      else setError('Could not parse this URL. Please try another.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!result) return
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { return }
      await supabase.from('recipes').insert({
        user_id: user.id,
        title: result.title,
        source_url: url,
        source_handle: result.source_handle,
        platform: result.platform,
        prep_time: result.prep_time,
        difficulty: result.difficulty,
        ingredients: result.ingredients,
        steps: result.steps,
        tags: result.tags,
      })
      onClose()
    } catch (err) {
      setError('Failed to save recipe. Please try again.')
      setSaving(false)
    }
  }

  if (result) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair font-bold text-[#1a1a1a] text-xl">Recipe found!</h3>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center text-[#5c6365] text-xl font-light">×</button>
          </div>
          <h4 className="font-playfair font-bold text-[#1a1a1a] text-lg">{result.title}</h4>
          <p className="font-inter text-[#5c6365] text-sm">{result.source_handle} · {result.prep_time}</p>
          <div className="flex flex-wrap gap-2">
            {Object.values(result.tags || {}).map((tag: any, i) => (
              <span key={i} className="bg-[#dde4e6] text-[#1e2b24] font-inter font-medium text-xs px-3 py-[6px] rounded-full">{tag}</span>
            ))}
          </div>
          <div className="h-px bg-[#dde4e6]" />
          <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">INGREDIENTS</p>
          {(result.ingredients || []).map((ing: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-[2px] bg-[#1a1a1a] flex-shrink-0" />
              <p className="font-inter text-[#1a1a1a] text-sm">{ing}</p>
            </div>
          ))}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-[52px] bg-[#3b6370] rounded-full font-inter font-semibold text-white text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {saving ? 'Saving...' : 'Save to collection'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="font-playfair font-bold text-[#1a1a1a] text-xl">Add Recipe</h3>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center text-[#5c6365] text-xl font-light">×</button>
        </div>
        <p className="font-inter text-[#5c6365] text-sm leading-relaxed">Paste a recipe URL from Instagram and we will automatically import it into your collection.</p>
        <div className="flex flex-col gap-2">
          <label className="font-inter font-semibold text-[#1a1a1a] text-[13px]">Instagram Recipe URL</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/reels/..."
            className="w-full h-[47px] border border-[#dce8eb] rounded-lg px-4 font-inter text-[13px] text-[#1a1a1a] placeholder-[#a0b4bc] outline-none focus:border-[#3b6370]"
          />
          {error && <p className="font-inter text-red-500 text-xs">{error}</p>}
        </div>
        <button
          onClick={handleAdd}
          disabled={loading || !url.trim()}
          className="w-full h-[52px] bg-[#3b6370] rounded-full font-inter font-semibold text-white text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Analyzing recipe...' : '+ Add to your collection'}
        </button>
      </div>
    </div>
  )
}
