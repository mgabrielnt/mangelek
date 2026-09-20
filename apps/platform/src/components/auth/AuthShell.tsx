import Image from "next/image";
import Link from "next/link";
import { AuthIcon } from "./AuthIcon";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return <div className="authPage">
    <a className="authSkip" href="#auth-main">Lewati ke formulir</a>
    <header className="authHeader">
      <Link className="authBrand" href="/" aria-label="Mangelek — beranda">mangelek.</Link>
      <Link className="authHome" href="/">Kembali ke beranda <AuthIcon name="arrow" /></Link>
    </header>
    <main className="authLayout" id="auth-main" tabIndex={-1}>
      <aside className="authStory" aria-label="Tentang Mangelek">
        <div className="authStoryCopy"><h2>Ruang untuk<br />cerita bisnis Anda.</h2><p>Website, konten, dan pelanggan.<br />Kelola semuanya dari satu tempat.</p></div>
        <div className="authArtwork"><Image src="/images/marketing/features/website-editor.webp" alt="Ilustrasi editor website Mangelek dengan pilihan tata letak, warna, dan konten." fill sizes="(max-width: 900px) 1px, 50vw" priority /></div>
        <div className="authStoryFooter"><span>Mulai dari ide. Jadikan website.</span><span aria-hidden="true">m.</span></div>
      </aside>
      <section className="authFormSide" aria-labelledby="auth-title">{children}</section>
    </main>
    <footer className="authFooter"><span>© {new Date().getFullYear()} Mangelek</span><Link href="/#contact">Butuh bantuan?</Link></footer>
  </div>;
}
