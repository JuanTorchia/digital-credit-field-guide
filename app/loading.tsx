export default function Loading() {
  return (
    <main className="container min-h-[60vh] py-24" aria-busy="true">
      <p className="label">Loading field notes…</p>
      <div className="mt-8 h-20 max-w-3xl animate-pulse bg-[#dedbd0]" />
    </main>
  );
}
