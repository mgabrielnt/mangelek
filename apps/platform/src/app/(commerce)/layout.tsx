import Link from "next/link";
import localFont from "next/font/local";
import "@/styles/checkout.css";
const font=localFont({src:[{path:"../../../public/fonts/manrope-regular.ttf",weight:"400"},{path:"../../../public/fonts/manrope-semibold.ttf",weight:"600"}],variable:"--font-commerce",display:"swap"});
export default function CommerceLayout({children}:{children:React.ReactNode}){return <div className={`commercePage ${font.variable}`}><a className="commerceSkip" href="#checkout-main">Lewati navigasi</a><header className="commerceNav"><Link href="/" className="commerceBrand">mangelek.</Link><nav aria-label="Navigasi checkout"><Link href="/templates">Templates</Link><Link href="/subscription">Langganan saya</Link></nav></header>{children}<footer className="commerceFooter"><span>© {new Date().getFullYear()} Mangelek</span><Link href="/#contact">Butuh bantuan?</Link></footer></div>;}
