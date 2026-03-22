'use client'

const imgFrame = "https://www.figma.com/api/mcp/asset/36963f79-561e-4e3a-affe-c35df18411f4"
const imgPlusIcon = "https://www.figma.com/api/mcp/asset/6bb7076c-f521-4cd6-8f19-298ec3485f21"
const imgUserIcon = "https://www.figma.com/api/mcp/asset/18bb4bb3-460b-42af-a23a-2efbcb8343bf"
const imgConnAvatarIcon = "https://www.figma.com/api/mcp/asset/2c09c193-0be1-4621-ad63-7fdddb302922"
const imgConnCheck = "https://www.figma.com/api/mcp/asset/1e2616e1-73fa-4764-bf07-b66ecd1474ae"
const imgThumbnailGrid = "https://www.figma.com/api/mcp/asset/f7dfe277-7340-4ac3-a414-b6bc71e6ee32"
const imgAiIcon = "https://www.figma.com/api/mcp/asset/b28639cf-1988-410d-90a5-32fa553e9541"
const imgCardCheckIcon = "https://www.figma.com/api/mcp/asset/80987456-d99f-4820-b840-1cf32a97e7f1"
const imgPreview1 = "https://www.figma.com/api/mcp/asset/18f63352-02d8-4cb7-94b8-7dae3fff3150"
const imgPreview2 = "https://www.figma.com/api/mcp/asset/b5fb9249-5642-4e04-a162-7970cefdb0a9"
const imgPreview3 = "https://www.figma.com/api/mcp/asset/66fcb28c-8367-41e2-a4b1-e7acbed940de"
const imgPreview4 = "https://www.figma.com/api/mcp/asset/aac19f11-7516-4ebf-b532-9bc3af157c39"
const imgImportIcon = "https://www.figma.com/api/mcp/asset/b0f28860-9522-43d8-88ee-223a2ecb468e"
const imgDisclaimerIcon = "https://www.figma.com/api/mcp/asset/5e3861a4-7778-47dc-9426-06f195680299"

export default function ImportCollectionsPage() {
  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-[#d6dee8]">
        <div className="flex items-center gap-2">
          <img src={imgFrame} alt="Cravi" className="w-7 h-7" />
          <span className="font-playfair font-bold text-[#3b6370] text-[19px]">Cravi</span>
        </div>
        <div className="flex items-center gap-4">
          <img src={imgPlusIcon} alt="Add" className="w-5 h-5" />
          <img src={imgUserIcon} alt="Profile" className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 px-5 py-6 gap-6">
        <div className="flex flex-col gap-6">
          {/* Connected Account */}
          <div className="flex items-center gap-3 bg-[#dde4e6] rounded-xl px-4 py-[14px]">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(225deg, #833ab4 14.645%, #e1306c 50%, #f77737 85.355%)' }}>
              <img src={imgConnAvatarIcon} alt="IG" className="w-[18px] h-[18px]" />
            </div>
            <div className="flex-1">
              <p className="font-inter font-semibold text-[#1a1a1a] text-sm">@ighandle.id</p>
              <p className="font-inter font-medium text-[#1c3b2a] text-xs">Connected</p>
            </div>
            <img src={imgConnCheck} alt="Connected" className="w-5 h-5" />
          </div>

          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <h2 className="font-playfair font-bold text-[#1a1a1a] text-[22px]">Your Collections</h2>
            <p className="font-inter text-[#5c6365] text-sm leading-relaxed">
              Our AI detected the following collection containing recipe content. Select it to import your saved recipes into Cravi.
            </p>
          </div>

          {/* Recipe Collection Card */}
          <div className="bg-white border border-[#dce8eb] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-[14px] p-4">
              <img src={imgThumbnailGrid} alt="Recipes" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-inter font-semibold text-[#1a1a1a] text-base">Recipes</span>
                  <div className="flex items-center gap-1 bg-[#1c3b2a] px-2 py-[3px] rounded-lg">
                    <img src={imgAiIcon} alt="AI" className="w-3 h-3" />
                    <span className="font-inter font-semibold text-white text-[9px]">AI Detected</span>
                  </div>
                </div>
                <p className="font-inter text-[#6b6560] text-[13px]">47 saved items found</p>
              </div>
              <div className="w-6 h-6 bg-[#1c3b2a] rounded-xl flex items-center justify-center flex-shrink-0">
                <img src={imgCardCheckIcon} alt="Selected" className="w-[14px] h-[14px]" />
              </div>
            </div>
            <div className="h-px bg-[#e5e5e5]" />
            <div className="flex items-center gap-2 px-4 py-3">
              {[imgPreview1, imgPreview2, imgPreview3, imgPreview4].map((src, i) => (
                <img key={i} src={src} alt={`Preview ${i+1}`} className="w-[60px] h-[60px] rounded-lg object-cover flex-shrink-0" />
              ))}
              <div className="w-[60px] h-[60px] bg-[#f5edd8] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-inter font-semibold text-[#6b6560] text-sm">+43</span>
              </div>
            </div>
          </div>

          {/* Import Button */}
          <button className="w-full h-[52px] bg-[#3b6370] rounded-[26px] flex items-center justify-center gap-[10px] hover:opacity-90 transition-opacity">
            <img src={imgImportIcon} alt="Import" className="w-5 h-5" />
            <span className="font-inter font-semibold text-white text-[15px]">Import 47 Recipes</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-white border border-[#dce8eb] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src={imgDisclaimerIcon} alt="Privacy" className="w-4 h-4" />
            <span className="font-inter font-semibold text-[#1a1a1a] text-[13px]">Your Privacy Matters</span>
          </div>
          <p className="font-inter text-[#6b6560] text-xs leading-relaxed">
            Cravi only accesses your saved collections to identify recipe content. Your data is never shared with third parties, sold, or used for advertising. You can disconnect your account at any time from Settings.
          </p>
          <p className="font-inter font-medium text-[#e8842a] text-xs cursor-pointer">Read our full Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
