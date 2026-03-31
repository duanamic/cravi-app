// Auth check handled by middleware — no redundant server check needed
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
