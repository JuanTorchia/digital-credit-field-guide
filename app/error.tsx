'use client';
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container min-h-[60vh] py-24">
      <p className="label text-[#b84f2c]">Evidence view unavailable</p>
      <h1 className="display mt-5 max-w-3xl text-6xl">
        The interface failed. The sources did not vanish.
      </h1>
      <p className="mt-6 max-w-xl text-[#596159]">
        Try this view again. The source ledger is also available as static
        project data.
      </p>
      <button
        onClick={reset}
        className="mt-8 border border-[#172019] bg-[#d9ff63] px-5 py-3 font-medium"
      >
        Retry
      </button>
    </main>
  );
}
