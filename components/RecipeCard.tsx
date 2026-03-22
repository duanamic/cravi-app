import { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="rounded-xl border border-craviBorder bg-white overflow-hidden shadow-sm">
      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-3">
        <h3 className="font-display text-craviText font-semibold line-clamp-2">{recipe.title}</h3>
        {recipe.prep_time && (
          <p className="font-body text-sm text-craviSecondary mt-1">{recipe.prep_time}</p>
        )}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-craviBg text-craviSecondary px-2 py-0.5 rounded-full border border-craviBorder">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
