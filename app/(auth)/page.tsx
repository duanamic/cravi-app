'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'

export default function WelcomePage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInstagramConnect = async () => {
    setIsLoading(true)
    // Instagram OAuth will be wired up next
    console.log('Connecting with Instagram...')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f4fbfd] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col gap-10 items-center">

        {/* Logo + Welcome Copy */}
        <div className="flex flex-col gap-6 items-center text-center w-full">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <img
              src="https://www.figma.com/api/mcp/asset/878e413a-6303-46e2-b0e2-041af69b17ec"
              alt="Cravi logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="font-playfair font-bold text-[#1a1a1a] text-2xl">
              Welcome to Cravi!
            </h1>
            <p className="font-inter text-[#5c6365] text-base leading-relaxed">
              Create your profile to save recipes, share your creations, and connect with fellow food lovers.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-4 w-full">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="font-inter font-semibold text-[#1a1a1a] text-[13px]">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
                className="w-full h-[50px] bg-white border border-[#dce8eb] rounded-lg px-4 text-[15px] text-[#1a1a1a] placeholder-[#a0b4bc] font-inter outline-none focus:border-[#1e2b24] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="font-inter font-semibold text-[#1a1a1a] text-[13px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[50px] bg-white border border-[#dce8eb] rounded-lg px-4 pr-12 text-[15px] text-[#1a1a1a] placeholder-[#a0b4bc] font-inter outline-none focus:border-[#1e2b24] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0b4bc]"
                >
                  {showPassword ? '👁' : '👁‍🗨'}
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-6 items-center w-full">
            <div className="flex flex-col gap-4 items-center w-full">
              {/* Instagram Button */}
              <button
                onClick={handleInstagramConnect}
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-[26px] flex items-center justify-center gap-2 font-inter font-semibold text-white text-[15px] transition-opacity hover:opacity-90 disabled:opacity-70"
                style={{
                  background: 'linear-gradient(to bottom, #833ab4, #e1306c 50%, #f77737)'
                }}
              >
                <img
                  src="https://www.figma.com/api/mcp/asset/6179db57-d673-4070-a054-e4f4ba3a3365"
                  alt="Instagram"
                  className="w-5 h-5"
                />
                {isLoading ? 'Connecting...' : 'Connect with Instagram'}
              </button>

              <p className="font-inter font-medium text-[#1e2b24] text-[13px] cursor-pointer hover:underline">
                Forgot password?
              </p>
            </div>

            <p className="font-inter text-[#5c6365] text-[12px] text-center leading-relaxed">
              We only use your credentials to connect your account. Your password is never stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
