'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Share2, Plus, User, ExternalLink } from 'lucide-react'

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const supabase = createClient()
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editIngredients, setEditIngredients] = useState<string[]>([])
  const [editSteps, setEditSteps] = useState<string[]>([])
  const [editTags, setEditTags] = useState<{ cuisine: string; mood: string; occasion: string; time: string }>({ cuisine: '', mood: '', occasion: '', time: '' })
  const [editPrepTime, setEditPrepTime] = useState('')

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

  const enterEditMode = () => {
    setSaveError('')
    setEditTitle(recipe.title || '')
    setEditIngredients([...(Array.isArray(recipe.ingredients) ? recipe.ingredients : [])])
    setEditSteps([...(Array.isArray(recipe.steps) ? recipe.steps : [])])
    setEditTags({
      cuisine: recipe.tags?.cuisine || '',
      mood: recipe.tags?.mood || '',
      occasion: recipe.tags?.occasion || '',
      time: recipe.tags?.time || '',
    })
    setEditPrepTime(recipe.prep_time || '')
    setIsEditing(true)
  }

  const cancelEdit = () => setIsEditing(false)

  const handleSave = async () => {
    setSaving(true)
    setSaveError('')
    const updatedTags: Record<string, string> = {}
    if (editTags.cuisine.trim()) updatedTags.cuisine = editTags.cuisine.trim()
    if (editTags.mood.trim()) updatedTags.mood = editTags.mood.trim()
    if (editTags.occasion.trim()) updatedTags.occasion = editTags.occasion.trim()
    if (editTags.time.trim()) updatedTags.time = editTags.time.trim()

    const updates = {
      title: editTitle.trim(),
      ingredients: editIngredients.filter(i => i.trim()),
      steps: editSteps.filter(s => s.trim()),
      tags: updatedTags,
      prep_time: editPrepTime.trim(),
    }

    const { error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', params.id)

    if (error) {
      setSaveError('Failed to save changes. Please try again.')
    } else {
      setRecipe((prev: any) => ({ ...prev, ...updates }))
      setIsEditing(false)
    }
    setSaving(false)
  }

  if (loading || !recipe) return (
    <div className="min-h-screen bg-[#f4fbfd]">
      <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8] bg-[#f4fbfd]">
        <div className="flex items-center gap-2">
          <img src="/icon-192.png" alt="Cravi" className="w-7 h-7 rounded-md" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-[240px] bg-[#3b6370]" />
        <div className="bg-white rounded-t-3xl -mt-6 relative px-6 pt-8 pb-24 flex flex-col gap-5">
          <div className="w-10 h-1 bg-[#d4d4d4] rounded-full mx-auto" />
          <div className="h-8 bg-[#dde4e6] rounded-lg w-3/4" />
          <div className="h-4 bg-[#dde4e6] rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-7 bg-[#dde4e6] rounded-full w-24" />
            <div className="h-7 bg-[#dde4e6] rounded-full w-20" />
          </div>
          <div className="h-px bg-[#dde4e6]" />
          <div className="flex flex-col gap-3">
            <div className="h-3 bg-[#dde4e6] rounded w-24" />
            {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-[#dde4e6] rounded w-full" />)}
          </div>
          <div className="h-px bg-[#dde4e6]" />
          <div className="flex flex-col gap-4">
            <div className="h-3 bg-[#dde4e6] rounded w-16" />
            {[1,2,3].map(i => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-7 h-7 bg-[#dde4e6] rounded-xl flex-shrink-0" />
                <div className="h-4 bg-[#dde4e6] rounded flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : []
  const steps = Array.isArray(recipe.steps) ? recipe.steps : []
  const tagEntries = recipe.tags && typeof recipe.tags === 'object'
    ? Object.entries(recipe.tags).filter(([_, v]) => v) as [string, string][]
    : []

  return (
    <div className="min-h-screen bg-[#f4fbfd]">
      <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8] bg-[#f4fbfd]">
        <Link href="/home" className="flex items-center gap-2">
          <img src="/icon-192.png" alt="Cravi" className="w-7 h-7 rounded-md" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </Link>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowModal(true)} className="w-9 h-9 flex items-center justify-center">
            <Plus className="w-5 h-5 text-[#3b6370]" />
          </button>
          <Link href="/profile" className="w-9 h-9 flex items-center justify-center">
            <User className="w-5 h-5 text-[#3b6370]" />
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[240px] bg-[#3b6370] flex items-center justify-center px-10">
        {recipe.image_url && (
          <>
            <img src={recipe.image_url.replace(/&amp;/g, '&')} alt={recipe.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="absolute inset-0 bg-black/40" />
          </>
        )}
        <p className="font-playfair font-bold text-white text-2xl text-center leading-snug relative z-10">{recipe.title}</p>
        <div className="absolute top-4 right-4 flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={enterEditMode}
                className="h-11 px-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-inter font-semibold text-white text-[13px]"
              >
                Edit
              </button>
              <button
                onClick={handleShare}
                className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                {copied
                  ? <span className="text-white text-[10px] font-inter font-semibold">Copied!</span>
                  : <Share2 className="w-5 h-5 text-white" />
                }
              </button>
            </>
          ) : (
            <>
              <button onClick={cancelEdit}
                className="h-11 px-4 bg-white/20 backdrop-blur-sm rounded-full font-inter font-semibold text-white text-[13px]">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="h-11 px-4 bg-white rounded-full font-inter font-semibold text-[#3b6370] text-[13px] disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative px-6 pt-8 pb-24 flex flex-col gap-5">
        <div className="w-10 h-1 bg-[#d4d4d4] rounded-full mx-auto" />

        {/* Title */}
        <div className="flex items-center gap-4">
          {isEditing ? (
            <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
              className="font-playfair font-bold text-[#1a1a1a] text-[28px] leading-snug flex-1 bg-transparent border-b-2 border-[#3b6370] outline-none w-full" />
          ) : (
            <h1 className="font-playfair font-bold text-[#1a1a1a] text-[28px] leading-snug flex-1">{recipe.title}</h1>
          )}
          {!isEditing && recipe.source_url && (
            <a href={recipe.source_url} target="_blank" rel="noopener noreferrer" className="p-2 flex-shrink-0">
              <ExternalLink className="w-4 h-4 text-[#5c6365]" />
            </a>
          )}
        </div>

        {/* Source handle */}
        {!isEditing && recipe.source_handle && (
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#5c6365]" />
            <p className="font-inter text-[#5c6365] text-[13px]">Saved from {recipe.source_handle} on {recipe.platform === 'tiktok' ? 'TikTok' : 'Instagram'}</p>
          </div>
        )}

        {/* Prep Time (edit mode) */}
        {isEditing && (
          <div className="flex flex-col gap-2">
            <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">PREP TIME</p>
            <input value={editPrepTime} onChange={e => setEditPrepTime(e.target.value)}
              placeholder="e.g. 30 min"
              className="font-inter text-[#1a1a1a] text-[15px] bg-transparent border border-[#dce8eb] rounded-lg px-3 py-2 outline-none focus:border-[#3b6370]" />
          </div>
        )}

        {/* Tags */}
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">TAGS</p>
            {(['cuisine', 'mood', 'occasion', 'time'] as const).map(key => (
              <div key={key} className="flex items-center gap-3">
                <label className="font-inter text-[#5c6365] text-[13px] w-20 capitalize">{key}</label>
                <input value={editTags[key]} onChange={e => setEditTags(prev => ({ ...prev, [key]: e.target.value }))}
                  className="flex-1 font-inter text-[#1a1a1a] text-[14px] border border-[#dce8eb] rounded-lg px-3 py-2 outline-none focus:border-[#3b6370]" />
              </div>
            ))}
          </div>
        ) : tagEntries.length > 0 ? (
          <div className="flex flex-col gap-2">
            {recipe.tags?.cuisine && (
              <span className="bg-[#3b6370] text-white font-inter font-medium text-xs px-[14px] py-[6px] rounded-full self-start">{recipe.tags.cuisine}</span>
            )}
            {(() => {
              const secondary = [recipe.tags?.mood, recipe.tags?.occasion, recipe.tags?.time].filter(Boolean)
              return secondary.length > 0 ? (
                <p className="font-inter text-[#5c6365] text-[13px]">{secondary.join(' · ')}</p>
              ) : null
            })()}
          </div>
        ) : null}

        {saveError && <p className="font-inter text-red-500 text-sm">{saveError}</p>}

        <div className="h-px bg-[#dde4e6]" />

        {/* Ingredients */}
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">INGREDIENTS</p>
            {editIngredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={ing} onChange={e => {
                  const updated = [...editIngredients]; updated[i] = e.target.value; setEditIngredients(updated)
                }}
                  className="flex-1 font-inter text-[#1a1a1a] text-[15px] border border-[#dce8eb] rounded-lg px-3 py-2 outline-none focus:border-[#3b6370]" />
                <button onClick={() => setEditIngredients(editIngredients.filter((_, j) => j !== i))}
                  className="text-[#e05252] font-inter text-sm px-2">Remove</button>
              </div>
            ))}
            <button onClick={() => setEditIngredients([...editIngredients, ''])}
              className="font-inter text-[#3b6370] text-sm font-medium self-start">+ Add ingredient</button>
          </div>
        ) : ingredients.length > 0 ? (
          <div className="flex flex-col gap-4">
            <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">INGREDIENTS</p>
            {ingredients.map((ing: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-[2px] bg-[#1a1a1a] flex-shrink-0" />
                <p className="font-inter text-[#1a1a1a] text-[15px]">{ing}</p>
              </div>
            ))}
          </div>
        ) : null}

        {/* Steps */}
        {isEditing ? (
          <>
            <div className="h-px bg-[#e5e5e5]" />
            <div className="flex flex-col gap-3">
              <p className="font-inter font-semibold text-[#5c6365] text-[11px] tracking-widest">STEPS</p>
              {editSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#475357] rounded-xl flex items-center justify-center flex-shrink-0 mt-2">
                    <span className="font-inter font-semibold text-white text-[13px]">{i + 1}</span>
                  </div>
                  <textarea value={step} onChange={e => {
                    const updated = [...editSteps]; updated[i] = e.target.value; setEditSteps(updated)
                  }}
                    rows={2}
                    className="flex-1 font-inter text-[#1a1a1a] text-[15px] border border-[#dce8eb] rounded-lg px-3 py-2 outline-none focus:border-[#3b6370] resize-none" />
                  <button onClick={() => setEditSteps(editSteps.filter((_, j) => j !== i))}
                    className="text-[#e05252] font-inter text-sm px-2 mt-2">Remove</button>
                </div>
              ))}
              <button onClick={() => setEditSteps([...editSteps, ''])}
                className="font-inter text-[#3b6370] text-sm font-medium self-start">+ Add step</button>
            </div>
          </>
        ) : steps.length > 0 ? (
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
        ) : null}

        {/* Delete button (hidden in edit mode) */}
        {!isEditing && (
          <>
            <div className="h-px bg-[#e5e5e5]" />
            <button
              onClick={async () => {
                if (!confirm('Remove this recipe from your collection?')) return
                await supabase.from('recipes').delete().eq('id', params.id)
                router.push('/home')
              }}
              className="font-inter text-[#e05252] text-sm text-center py-2 hover:opacity-70 transition-opacity"
            >
              Remove from collection
            </button>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-6 z-50">
          <div className="bg-[#fbfeff] rounded-[20px] w-full max-w-sm px-6 py-7 flex flex-col gap-6 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair font-bold text-[#1a1a1a] text-xl">Add Recipe</h3>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 bg-[#dde4e6] rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-[#5c6365]" />
              </button>
            </div>
            <p className="font-inter text-[#5c6365] text-sm leading-relaxed">Paste a recipe URL from Instagram or TikTok to add it to your collection.</p>
            <Link href="/home" onClick={() => setShowModal(false)} className="w-full h-[52px] bg-[#3b6370] rounded-full font-inter font-semibold text-white text-[15px] flex items-center justify-center hover:opacity-90 transition-opacity">
              Go to Home to add a recipe
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
