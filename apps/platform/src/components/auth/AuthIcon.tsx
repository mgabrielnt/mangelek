export function AuthIcon({ name }: { name: "arrow" | "eye" | "eye-off" | "check" | "lock" }) {
  const paths = {
    arrow: "M7 17 17 7M7 7h10v10",
    eye: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    "eye-off": "m3 3 18 18M10.5 5.1 12 5c7 0 10 7 10 7a18 18 0 0 1-3 4M6 6a20 20 0 0 0-4 6s3 7 10 7c2 0 4-.6 5-1.5M10 10a3 3 0 0 0 4 4",
    check: "m5 12 4 4L19 6",
    lock: "M6 10h12v11H6zM8 10V6a4 4 0 0 1 8 0v4",
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function GoogleIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-1.99 3.01v2.5h3.22c1.89-1.74 2.99-4.3 2.99-7.34Z" />
    <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.43l-3.22-2.5c-.89.6-2.03.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.09v2.58A10 10 0 0 0 12 22Z" />
    <path fill="#FBBC05" d="M6.41 13.91a6 6 0 0 1 0-3.82V7.51H3.09a10 10 0 0 0 0 8.98l3.32-2.58Z" />
    <path fill="#EA4335" d="M12 5.97c1.47 0 2.79.5 3.83 1.5l2.87-2.86A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.91 5.51l3.32 2.58A5.99 5.99 0 0 1 12 5.97Z" />
  </svg>;
}
