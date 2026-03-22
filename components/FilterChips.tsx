"use client";

interface FilterChipsProps {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
}

export function FilterChips({ filters, selected, onSelect }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-body border transition-colors ${
            selected === filter
              ? "bg-craviGreen text-white border-craviGreen"
              : "bg-white text-craviSecondary border-craviBorder hover:border-craviGreen"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
