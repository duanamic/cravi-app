export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-craviBg p-4">
      <h1 className="font-display text-2xl text-craviGreen">Recipe {params.id}</h1>
    </main>
  );
}
