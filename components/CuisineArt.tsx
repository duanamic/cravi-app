const svgProps = { viewBox: '0 0 80 80', className: 'w-16 h-16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' } as const

// Italian — pasta fork twirl
function Italian() {
  return (
    <svg {...svgProps}>
      <path d="M40 15v30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M33 15v18c0 8 14 8 14 0V15" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M30 48c0 0 4 12 10 12s10-12 10-12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 50c3-2 8 4 15 4s12-6 15-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="28" cy="52" r="2" fill="rgba(255,255,255,0.4)"/>
      <circle cx="52" cy="50" r="1.5" fill="rgba(255,255,255,0.4)"/>
      <path d="M22 55c5-1 10 3 18 3s13-4 18-3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Mexican — taco
function Mexican() {
  return (
    <svg {...svgProps}>
      <path d="M15 50c0 0 12-30 25-30s25 30 25 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="rgba(255,255,255,0.1)"/>
      <path d="M22 42c2-4 6-8 10-6s4 6 8 5 4-5 8-4 6 6 8 4" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 47c3-2 5 2 9 1s3-4 7-3 4 3 8 2 5-3 8-1" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="30" cy="35" r="2" fill="rgba(255,255,255,0.5)"/>
      <circle cx="42" cy="33" r="1.5" fill="rgba(255,255,255,0.4)"/>
      <circle cx="50" cy="38" r="2" fill="rgba(255,255,255,0.5)"/>
    </svg>
  )
}

// Mediterranean — olive branch
function Mediterranean() {
  return (
    <svg {...svgProps}>
      <path d="M20 60c15-10 20-25 40-40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="35" cy="38" rx="5" ry="7" transform="rotate(-30 35 38)" fill="rgba(255,255,255,0.5)" stroke="white" strokeWidth="1.5"/>
      <ellipse cx="46" cy="28" rx="4.5" ry="6.5" transform="rotate(-40 46 28)" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="1.5"/>
      <ellipse cx="27" cy="46" rx="4" ry="6" transform="rotate(-20 27 46)" fill="rgba(255,255,255,0.35)" stroke="white" strokeWidth="1.5"/>
      <path d="M32 42l-4 6M42 32l-4 6M52 22l-3 5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="35" cy="39" r="1.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="46" cy="29" r="1.5" fill="rgba(255,255,255,0.6)"/>
    </svg>
  )
}

// Indian — steaming curry bowl
function Indian() {
  return (
    <svg {...svgProps}>
      <path d="M18 45c0 12 10 18 22 18s22-6 22-18" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="rgba(255,255,255,0.1)"/>
      <path d="M18 45h44" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M28 38c0-4 3-6 3-10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M40 36c0-4 2-7 2-11" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M52 38c0-4-3-6-3-10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="33" cy="50" r="3" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      <circle cx="47" cy="49" r="2.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
    </svg>
  )
}

// Indonesian — noodle bowl with chopsticks
function Indonesian() {
  return (
    <svg {...svgProps}>
      <ellipse cx="40" cy="48" rx="22" ry="12" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2.5"/>
      <path d="M25 44c4 2 8-2 12 0s6 3 10 1 6-2 8 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 48c3 1 6-1 9 0s5 2 8 1 5-2 7 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="45" y2="42" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="35" y1="18" x2="48" y2="40" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// American — burger stack
function American() {
  return (
    <svg {...svgProps}>
      <path d="M18 40h44c0-14-10-20-22-20S18 26 18 40z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2"/>
      <path d="M16 43h48" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M18 47c4-1 8 2 12 1s6-2 10-1 6 2 10 1 6-2 8-1" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <rect x="17" y="50" width="46" height="5" rx="1" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
      <path d="M20 57h40c0 5-8 8-20 8s-20-3-20-8z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2"/>
      <circle cx="30" cy="35" r="1" fill="rgba(255,255,255,0.6)"/>
      <circle cx="40" cy="32" r="1" fill="rgba(255,255,255,0.6)"/>
      <circle cx="50" cy="35" r="1" fill="rgba(255,255,255,0.6)"/>
    </svg>
  )
}

// Moroccan — tagine
function Moroccan() {
  return (
    <svg {...svgProps}>
      <path d="M40 12c-15 8-22 22-22 35h44c0-13-7-27-22-35z" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2"/>
      <circle cx="40" cy="12" r="3" fill="rgba(255,255,255,0.5)" stroke="white" strokeWidth="1.5"/>
      <path d="M18 50h44" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="15" y="50" width="50" height="8" rx="3" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
      <path d="M32 30c2-3 5-3 7 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 28c2-3 5-3 7 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Middle Eastern — falafel/pita
function MiddleEastern() {
  return (
    <svg {...svgProps}>
      <path d="M15 50c0 0 5 10 25 10s25-10 25-10L55 30c-5-8-10-12-15-12S25 22 25 30z" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2"/>
      <circle cx="34" cy="38" r="5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5"/>
      <circle cx="46" cy="38" r="5" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.5"/>
      <circle cx="40" cy="48" r="4" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
      <path d="M30 32l2-4M40 30l1-5M50 33l-2-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Chinese — takeout box with steam
function Chinese() {
  return (
    <svg {...svgProps}>
      <path d="M24 30l-4 28h40l-4-28z" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2"/>
      <path d="M22 35h36" stroke="white" strokeWidth="2"/>
      <path d="M26 30l14-10 14 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M33 22c0-4 2-6 2-9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 20c0-4 2-6 2-9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M47 22c0-4-2-6-2-9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Japanese — sushi roll
function Japanese() {
  return (
    <svg {...svgProps}>
      <ellipse cx="30" cy="45" rx="12" ry="14" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2"/>
      <ellipse cx="30" cy="45" rx="6" ry="7" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
      <ellipse cx="52" cy="42" rx="10" ry="12" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2"/>
      <ellipse cx="52" cy="42" rx="5" ry="6" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <line x1="55" y1="20" x2="50" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="58" y1="18" x2="54" y2="28" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// British — teacup
function British() {
  return (
    <svg {...svgProps}>
      <path d="M18 35h34v20c0 5-7 10-17 10s-17-5-17-10z" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2"/>
      <path d="M52 40c6 0 10 3 10 7s-4 7-10 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 35h52" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M30 28c0-4 2-5 2-8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M38 26c0-4 2-6 2-9" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M46 28c0-4-2-5-2-8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// Korean — bibimbap bowl
function Korean() {
  return (
    <svg {...svgProps}>
      <path d="M15 42c0 14 11 20 25 20s25-6 25-20" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="rgba(255,255,255,0.1)"/>
      <path d="M15 42h50" stroke="white" strokeWidth="2.5"/>
      <circle cx="40" cy="36" r="4" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="1.5"/>
      <path d="M24 38c3-4 6 0 9-3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M47 38c3-4 6 0 8-3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M30 34c2-2 4 0 6-2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 34c2-2 4 0 6-2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// French — croissant
function French() {
  return (
    <svg {...svgProps}>
      <path d="M15 48c5-20 15-28 25-28s20 8 25 28" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.12)"/>
      <path d="M20 46c5-15 12-22 20-22s15 7 20 22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M25 44c4-10 9-16 15-16s11 6 15 16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 50c8 6 18 8 30 8s22-2 30-8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

// Thai — soup bowl with lemongrass
function Thai() {
  return (
    <svg {...svgProps}>
      <path d="M16 44c0 12 11 18 24 18s24-6 24-18" stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.1)"/>
      <path d="M16 44h48" stroke="white" strokeWidth="2.5"/>
      <path d="M25 40c3 2 6-1 9 1s5 2 8 0 5-2 8 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M55 38c4-8 6-16 4-22" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M58 18c-2-1-5 1-6 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="35" cy="50" r="2" fill="rgba(255,255,255,0.3)"/>
      <circle cx="45" cy="52" r="1.5" fill="rgba(255,255,255,0.25)"/>
    </svg>
  )
}

// Cajun — shrimp/crawfish
function Cajun() {
  return (
    <svg {...svgProps}>
      <path d="M45 25c8 0 14 5 14 12s-4 14-14 18" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.12)"/>
      <path d="M45 25c-5 3-10 10-12 18s0 14 5 16" stroke="white" strokeWidth="2"/>
      <path d="M45 25c-2-4-1-8 2-10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M45 25c2-4 5-7 8-7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="48" cy="30" r="1.5" fill="rgba(255,255,255,0.7)"/>
      <path d="M35 50c-3 2-6 1-8 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 55c-2 2-5 2-7 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Fusion — crossed utensils (fork + chopstick)
function Fusion() {
  return (
    <svg {...svgProps}>
      <line x1="25" y1="18" x2="55" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="55" y1="18" x2="25" y2="62" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M25 18c-1-3 0-6 2-6s3 3 2 6" stroke="white" strokeWidth="1.5"/>
      <circle cx="40" cy="40" r="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    </svg>
  )
}

// International — globe plate
function International() {
  return (
    <svg {...svgProps}>
      <circle cx="40" cy="40" r="20" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2"/>
      <ellipse cx="40" cy="40" rx="10" ry="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      <path d="M20 40h40" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      <path d="M22 30h36" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <path d="M22 50h36" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    </svg>
  )
}

// Default — plate with fork and knife
function Default() {
  return (
    <svg {...svgProps}>
      <circle cx="40" cy="42" r="18" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2"/>
      <circle cx="40" cy="42" r="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <line x1="18" y1="20" x2="18" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M15 20v12c0 3 3 5 6 3V20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="62" y1="20" x2="62" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M59 20c0 8 6 12 6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const CUISINE_ART: Record<string, () => JSX.Element> = {
  'Italian': Italian,
  'Mexican': Mexican,
  'Mediterranean': Mediterranean,
  'Indian': Indian,
  'North Indian': Indian,
  'Punjabi': Indian,
  'Indonesian': Indonesian,
  'American': American,
  'Moroccan': Moroccan,
  'Middle Eastern': MiddleEastern,
  'Middle Eastern fusion': MiddleEastern,
  'Chinese': Chinese,
  'Japanese': Japanese,
  'British': British,
  'Korean': Korean,
  'French': French,
  'Thai': Thai,
  'Cajun': Cajun,
  'Fusion': Fusion,
  'International': International,
}

export function CuisineIllustration({ cuisine }: { cuisine: string }) {
  const Art = CUISINE_ART[cuisine] || Default
  return <Art />
}

export const CUISINE_GRADIENTS: Record<string, string> = {
  'Italian': 'from-[#c0392b] to-[#e74c3c]',
  'Mexican': 'from-[#e67e22] to-[#f39c12]',
  'Mediterranean': 'from-[#2980b9] to-[#3498db]',
  'Indonesian': 'from-[#8e44ad] to-[#9b59b6]',
  'Moroccan': 'from-[#d35400] to-[#e67e22]',
  'Middle Eastern': 'from-[#c0392b] to-[#e67e22]',
  'Middle Eastern fusion': 'from-[#c0392b] to-[#e67e22]',
  'Japanese': 'from-[#2c3e50] to-[#34495e]',
  'Indian': 'from-[#f39c12] to-[#e74c3c]',
  'North Indian': 'from-[#f39c12] to-[#e74c3c]',
  'Punjabi': 'from-[#f39c12] to-[#e74c3c]',
  'Thai': 'from-[#27ae60] to-[#2ecc71]',
  'Chinese': 'from-[#c0392b] to-[#f39c12]',
  'Korean': 'from-[#e74c3c] to-[#2c3e50]',
  'French': 'from-[#2c3e50] to-[#2980b9]',
  'American': 'from-[#e74c3c] to-[#3498db]',
  'British': 'from-[#2c3e50] to-[#7f8c8d]',
  'Cajun': 'from-[#e74c3c] to-[#d35400]',
  'Fusion': 'from-[#8e44ad] to-[#2980b9]',
  'International': 'from-[#3b6370] to-[#5a8a8a]',
}
export const DEFAULT_GRADIENT = 'from-[#3b6370] to-[#5a8a8a]'
