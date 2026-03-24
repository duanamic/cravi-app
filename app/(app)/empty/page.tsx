'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
const imgFrame = "https://www.figma.com/api/mcp/asset/dd15a95d-7314-460a-a34d-cd7d43ed81ef"
const imgPlus = "https://www.figma.com/api/mcp/asset/2bce3ddc-268f-4002-aef3-fd70a582ffd3"
const imgUser = "https://www.figma.com/api/mcp/asset/a466d05c-608f-4a27-91c9-97eb9a8d87e6"
const imgChef = "https://www.figma.com/api/mcp/asset/0cc26f53-b75f-4af5-82ef-c491a11de242"
const imgUrl = "https://www.figma.com/api/mcp/asset/a26c8e98-b4b5-4437-9aaf-517398be9359"
export default function EmptyStatePage() {
  const [showModal, setShowModal] = useState(false)
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
      <div className="px-5 py-6">
        <p className="font-playfair font-bold text-[#1b1b1b] text-[28px] leading-tight">What are you craving?</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-11 gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[120px] h-[120px] bg-[#dde4e6] rounded-[60px] flex items-center justify-center">
            <img src={imgChef} alt="Chef" className="w-12 h-12" />
          </div>
          <p className="font-playfair font-bold text-[#1b1b1b] text-[22px]">No recipes yet</p>
          <p className="font-inter text-[#5c6365] text-sm text-center leading-relaxed w-[280px]">Start building your collection by adding a recipe URL from Instagram or TikTok.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="w-full h-[50px] bg-[#3b6370] rounded-full flex items-center justify-center gap-2">
          <img src={imgUrl} alt="URL" className="w-[18px] h-[18px]" />
          <span className="font-inter font-semibold text-white text-[15px]">Add Recipe URL</span>
        </button>
      </div>
      {showModal && <AddRecipeModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
const imgCloseIcon = "https://www.figma.com/api/mcp/asset/36af6e40-bd8d-4432-9848-eddac4bd87da"

function AddRecipeModal({ onClose }: { onClose: () => void }) {
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
      router.push('/home')
    } catch (err: any) {
      console.error('Save error:', err)
      setError('Failed to save: ' + (err?.message || 'Unknown error'))
      setSaving(false)
    }
  }

  if (result) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-6 z-50">
        <div className="bg-[#fbfeff] rounded-[20px] w-full max-w-sm px-6 py-7 flex flex-col gap-6 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.2)]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="font-inter font-semibold text-[#5c6365] text-[14px] uppercase tracking-wide">Recipe found</p>
            <button onClick={onClose} className="w-8 h-8 bg-[#dde4e6] rounded-full flex items-center justify-center flex-shrink-0">
              <img src={imgCloseIcon} alt="Close" className="w-4 h-4" />
            </button>
          </div>

          {/* Recipe title */}
          <p className="font-playfair font-bold text-[#1a1a1a] text-[20px] leading-snug">{result.title}</p>

          {/* Scrollable content area — fixed height */}
          <div className="h-[260px] overflow-y-auto flex flex-col gap-5 pr-1">
            {/* Source + time */}
            <p className="font-inter text-[#5c6365] text-[12px]">
              {result.source_handle} • {result.prep_time}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {Object.values(result.tags || {}).map((tag: any, i) => (
                <span key={i} className="bg-[#dde4e6] text-[#1e2b24] font-inter font-medium text-[10px] px-[14px] py-[6px] rounded-full">{tag}</span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#dde4e6] w-full flex-shrink-0" />

            {/* Ingredients */}
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

          {/* Save button — always visible */}
          {error && <p className="font-inter text-red-500 text-xs -mt-2">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-[52px] bg-[#3b6370] rounded-full font-inter font-semibold text-white text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 flex-shrink-0"
          >
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
        <p className="font-inter text-[#5c6365] text-sm leading-relaxed">Paste a recipe URL from Instagram or TikTok and we'll automatically import it into your collection.</p>
        <div className="flex flex-col gap-2">
          <label className="font-inter font-semibold text-[#1a1a1a] text-[13px]">Recipe URL</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Paste an Instagram or TikTok link..."
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
