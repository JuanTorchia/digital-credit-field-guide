import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="container min-h-[60vh] py-24">
      <p className="label">404 / no evidence here</p>
      <h1 className="display mt-5 text-6xl">This path does not exist.</h1>
      <Link href="/" className="mt-8 inline-block">
        Return to the guide →
      </Link>
    </main>
  );
}
