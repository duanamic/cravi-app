interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function MobileHeader({ title, showBack, onBack }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-craviBg border-b border-craviBorder px-4 py-3 flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} className="text-craviText">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      )}
      <h1 className="font-display text-lg text-craviText font-semibold">{title}</h1>
    </header>
  );
}
