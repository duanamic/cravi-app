'use client'
const imgFrame = "https://www.figma.com/api/mcp/asset/035da1f1-f030-4445-8fc5-3176070de726"
const imgPlus = "https://www.figma.com/api/mcp/asset/37304909-2782-449a-b38e-c632055b5e2e"
const imgUser = "https://www.figma.com/api/mcp/asset/3ea09a15-a519-4472-93a2-13f04bc50bcf"
const imgChef = "https://www.figma.com/api/mcp/asset/3e0ad46a-1372-443c-86ff-491c3445dfb3"
const imgIg = "https://www.figma.com/api/mcp/asset/6469b73f-8b61-47a7-a1fa-34b654a116b7"
const imgUrl = "https://www.figma.com/api/mcp/asset/b047dabe-c9c9-4e9f-8876-7216ca1abada"
export default function EmptyStatePage() {
  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
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
      <div className="px-5 py-6">
        <p className="font-playfair font-bold text-[#1b1b1b] text-[28px] leading-tight">Good evening, Wike.</p>
        <p className="font-playfair font-bold text-[#6c8992] text-[28px] leading-tight">What are you craving?</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[120px] h-[120px] bg-[#dde4e6] rounded-[60px] flex items-center justify-center">
            <img src={imgChef} alt="Chef" className="w-12 h-12" />
          </div>
          <p className="font-playfair font-bold text-[#1b1b1b] text-[22px]">No recipes yet</p>
          <p className="font-inter text-[#5c6365] text-sm text-center leading-relaxed max-w-[280px]">Start building your collection by importing from Instagram or adding a recipe URL.</p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button className="w-full h-[50px] rounded-full flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(to bottom, #833ab4, #e1306c 50%, #f77737)' }}>
            <img src={imgIg} alt="Instagram" className="w-[18px] h-[18px]" />
            <span className="font-inter font-semibold text-white text-[15px]">Import from Instagram</span>
          </button>
          <button className="w-full h-[50px] bg-[#3b6370] rounded-full flex items-center justify-center gap-2">
            <img src={imgUrl} alt="URL" className="w-[18px] h-[18px]" />
            <span className="font-inter font-semibold text-white text-[15px]">Add Recipe URL</span>
          </button>
        </div>
      </div>
    </div>
  )
}
