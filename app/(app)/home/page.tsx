'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const imgFrame = "https://www.figma.com/api/mcp/asset/aeebbe46-37b1-4a3c-a82b-8798db9ebb1e"
const imgPlus = "https://www.figma.com/api/mcp/asset/148c5e63-dadf-4d16-b17d-4c82bf443727"
const imgUser = "https://www.figma.com/api/mcp/asset/8bc6031a-890d-40dd-8c68-6444e046ef8f"
const imgCloseIcon = "https://www.figma.com/api/mcp/asset/36af6e40-bd8d-4432-9848-eddac4bd87da"

export default function HomePage() {
  const router = useRouter()
  const supabase = createClient()
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeChip, setActiveChip] = useState('All')
  const [chips, setChips] = useState<string[]>(['All'])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const loadRecipes = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      const { data } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (!data || data.length === 0) {
        router.push('/empty')
        return
      }
      setRecipes(data)
      const allTags = new Set<string>()
      data.forEach(r => {
        if (r.tags && typeof r.tags === 'object') {
          Object.values(r.tags).forEach((t: any) => allTags.add(t))
        }
      })
      setChips(['All', ...Array.from(allTags)])
      setLoading(false)
    }
    loadRecipes()
  }, [])

  const filteredRecipes = activeChip === 'All'
    ? recipes
    : recipes.filter(r => r.tags && Object.values(r.tags).includes(activeChip))

  const col1 = filteredRecipes.filter((_, i) => i % 2 === 0)
  const col2 = filteredRecipes.filter((_, i) => i % 2 === 1)

  if (loading) return null

  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8]">
        <Link href="/home" className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </Link>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowModal(true)} className="w-9 h-9 flex items-center justify-center">
            <img src={imgPlus} alt="Add" className="w-5 h-5" />
          </button>
          <Link href="/profile" className="w-9 h-9 flex items-center justify-center">
            <img src={imgUser} alt="Profile" className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-5 py-6 flex-1">
        <p className="font-playfair font-bold text-[#1b1b1b] text-[28px] leading-tight">What are you craving?</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5">
          {chips.map(c => (
            <button key={c} onClick={() => setActiveChip(c)}
              className={`px-4 py-[10px] rounded-full font-inter font-medium text-[13px] whitespace-nowrap transition-colors flex-shrink-0 ${activeChip === c ? 'bg-[#3b6370] text-white' : 'bg-[#dde4e6] text-[#1e2b24]'}`}>
              {c}
            </button>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-playfair font-bold text-[#1a1a1a] text-[13px]">Your Collection</span>
            <span className="bg-[#3b6370] text-white text-[9px] font-inter font-semibold px-2 py-1 rounded-xl">{filteredRecipes.length}</span>
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
      {showModal && <AddRecipeModal onClose={() => setShowModal(false)} onSaved={() => { setShowModal(false); window.location.reload() }} />}
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: any }) {
  const firstTag = recipe.tags ? Object.values(recipe.tags)[0] as string : ''
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="w-full h-[150px] bg-[#dde4e6] flex items-center justify-center p-3">
          <span className="font-inter text-[#5c6365] text-xs text-center leading-relaxed">{recipe.title}</span>
        </div>
        <div className="p-3 flex flex-col gap-2">
          <p className="font-playfair font-semibold text-[#1a1a1a] text-base leading-tight">{recipe.title}</p>
          <div className="flex items-center gap-1.5">
            {firstTag && <span className="bg-[#f5edd8] text-[#1c3b2a] text-[10px] font-inter font-medium px-2 py-[3px] rounded-[10px]">{firstTag}</span>}
            {recipe.prep_time && <span className="font-inter text-[#6b6560] text-[11px]">{recipe.prep_time}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

function AddRecipeModal({ onClose, onSaved }: { onClose: () => void, onSaved: () => void }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const router = useRouter()
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
      if (!user) { router.push('/'); return }
      const { error: insertError } = await supabase.from('recipes').insert({
        user_id: user.id,
        title: result.title,
        source_url: url,
        source_handle: result.source_handle || '',
        platform: result.platform || 'instagram',
        prep_time: result.prep_time || '',
        difficulty: result.difficulty || '',
        ingredients: result.ingredients || [],
        steps: result.steps || [],
        tags: result.tags || {},
      })
      if (insertError) throw insertError
      onSaved()
    } catch (err: any) {
      setError('Failed to save: ' + (err?.message || 'Unknown error'))
      setSaving(false)
    }
  }

  if (result) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-6 z-50">
        <div className="bg-[#fbfeff] rounded-[20px] w-full max-w-sm px-6 py-7 flex flex-col gap-6 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between">
            <p className="font-inter font-semibold text-[#5c6365] text-[14px] uppercase tracking-wide">Recipe found</p>
            <button onClick={onClose} className="w-8 h-8 bg-[#dde4e6] rounded-full flex items-center justify-center flex-shrink-0">
              <img src={imgCloseIcon} alt="Close" className="w-4 h-4" />
            </button>
          </div>
          <p className="font-playfair font-bold text-[#1a1a1a] text-[20px] leading-snug">{result.title}</p>
          <div className="h-[260px] overflow-y-auto flex flex-col gap-5 pr-1">
            <p className="font-inter text-[#5c6365] text-[12px]">{result.source_handle} • {result.prep_time}</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(result.tags || {}).map((tag: any, i) => (
                <span key={i} className="bg-[#dde4e6] text-[#1e2b24] font-inter font-medium text-[10px] px-[14px] py-[6px] rounded-full">{tag}</span>
              ))}
            </div>
            <div className="h-px bg-[#dde4e6] w-full flex-shrink-0" />
            <div className="flex flex-col gap-[14px]">
              <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-[1.5px]">INGREDIENTS</p>
              {(result.ingredients || []).map((ing: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-[2px] bg-[#1a1a1a] flex-shrink-0" />
                  <p className="font-inter text-[#1a1a1a] text-[13px]">{ing}</p>
                </div>
              ))}
            </div>
          </div>
          {error && <p className="font-inter text-red-500 text-xs -mt-2">{error}</p>}
          <button onClick={handleSave} disabled={saving}
            className="w-full h-[52px] bg-[#3b6370] rounded-full font-inter font-semibold text-white text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50">
            {saving ? 'Saving...' : 'Save to collection'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-6 z-50">
      <div className="bg-[#fbfeff] rounded-[20px] w-full max-w-sm px-6 py-7 flex flex-col gap-6 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between">
          <h3 className="font-playfair font-bold text-[#1a1a1a] text-xl">Add Recipe</h3>
          <button onClick={onClose} className="w-9 h-9 bg-[#dde4e6] rounded-full flex items-center justify-center">
            <img src={imgCloseIcon} alt="Close" className="w-4 h-4" />
          </button>
        </div>
        <p className="font-inter text-[#5c6365] text-sm leading-relaxed">Paste a recipe URL from Instagram and we will automatically import it into your collection.</p>
        <div className="flex flex-col gap-2">
          <label className="font-inter font-semibold text-[#1a1a1a] text-[13px]">Instagram Recipe URL</label>
          <input value={url} onChange={e => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/reels/..."
            className="w-full h-[47px] border border-[#dce8eb] rounded-lg px-4 font-inter text-[13px] text-[#1a1a1a] placeholder-[#a0b4bc] outline-none focus:border-[#3b6370]" />
          {error && <p className="font-inter text-red-500 text-xs">{error}</p>}
        </div>
        <button onClick={handleAdd} disabled={loading || !url.trim()}
          className="w-full h-[52px] bg-[#3b6370] rounded-full font-inter font-semibold text-white text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? 'Analyzing recipe...' : '+ Add to your collection'}
        </button>
      </div>
    </div>
  )
}
