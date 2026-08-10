export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="border border-[#c9c7bd] p-5 text-[#596159]">
      {children}
    </p>
  );
}
