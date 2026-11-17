import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-linen px-4 text-center text-charcoal">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">404</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">This table isn&apos;t set.</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          The page you are looking for has moved or does not exist.
        </p>
        <Link
          href="/en"
          className="mt-6 rounded-full bg-olive px-6 py-2.5 text-sm font-medium text-linen hover:bg-olive-dark"
        >
          Back to home
        </Link>
      </body>
    </html>
  );
}
