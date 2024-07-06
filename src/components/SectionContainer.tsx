

export const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-full overflow-hidden rounded-lg p-4 shadow-lg">
      {children}
    </section>
  )
}