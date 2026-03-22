'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
const imgFrame = "https://www.figma.com/api/mcp/asset/7a367840-6d98-4b98-b6c5-36eb864bc41a"
const imgSparkle = "https://www.figma.com/api/mcp/asset/7f413493-7fbf-4c73-a464-7d0282bb4c11"
export default function ProcessingPage() {
  const [progress, setProgress] = useState(32)
  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => { if (p >= 47) { clearInterval(interval); setTimeout(() => router.push('/home'), 800); return 47 } return p + 1 })
    }, 120)
    return () => clearInterval(interval)
  }, [router])
  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
      <div className="flex items-center gap-2 px-5 py-[14px] border-b border-[#d6dee8]">
        <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
        <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-10 gap-6">
        <div className="w-[100px] h-[100px] bg-[#dde4e6] rounded-full flex items-center justify-center">
          <img src={imgSparkle} alt="AI" className="w-12 h-12" />
        </div>
        <div className="w-[280px] h-[6px] bg-[#dde4e6] rounded-full overflow-hidden">
          <div className="h-full bg-[#9db7c0] rounded-full transition-all duration-200" style={{ width: `${(progress/47)*100}%` }} />
        </div>
        <h2 className="font-playfair font-bold text-[#1b1b1b] text-2xl text-center">Analyzing your recipes...</h2>
        <p className="font-inter text-[#5c6365] text-sm text-center leading-relaxed max-w-[300px]">Our AI is categorizing and tagging 47 recipes from your collection.</p>
        <div className="bg-white border border-[#d6dee8] rounded-full px-6 py-4">
          <p className="font-inter font-medium text-[#1b1b1b] text-[13px]">{progress} of 47 recipes processed</p>
        </div>
      </div>
    </div>
  )
}
