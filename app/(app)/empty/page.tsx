'use client'
import { useState } from 'react'
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
        <div className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowModal(true)}><img src={imgPlus} alt="Add" className="w-5 h-5" /></button>
          <img src={imgUser} alt="Profile" className="w-5 h-5" />
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
          <p className="font-inter text-[#5c6365] text-sm text-center leading-relaxed w-[280px]">Start building your collection by importing from Instagram or adding a recipe URL.</p>
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
function AddRecipeModal({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

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
      if (data.success) {
        setResult(data.recipe)
      } else {
        setError('Could not parse this URL. Please try another.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair font-bold text-[#1a1a1a] text-xl">Recipe found!</h3>
            <button onClick={onClose} className="text-[#5c6365] text-xl font-light">×</button>
          </div>
          <h4 className="font-playfair font-bold text-[#1a1a1a] text-lg">{result.title}</h4>
          <p className="font-inter text-[#5c6365] text-sm">{result.source_handle} · {result.prep_time}</p>
          <div className="flex flex-wrap gap-2">
            {Object.values(result.tags || {}).map((tag: any, i) => (
              <span key={i} className="bg-[#dde4e6] text-[#1e2b24] font-inter font-medium text-xs px-3 py-1 rounded-full">{tag}</span>
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
          <button onClick={onClose} className="w-full h-[50px] bg-[#3b6370] rounded-xl font-inter font-semibold text-white text-[15px] hover:opacity-90 transition-opacity">
            Save to collection
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
          <button onClick={onClose} className="text-[#5c6365] text-xl font-light">×</button>
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
          className="w-full h-[50px] bg-[#3b6370] rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span className="font-inter font-semibold text-white text-[15px]">
            {loading ? 'Analyzing recipe...' : '+ Add to your collection'}
          </span>
        </button>
      </div>
    </div>
  )
}
