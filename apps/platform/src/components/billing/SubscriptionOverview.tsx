import Link from "next/link";
import { BlogIcon } from "@/components/blogs/BlogIcon";
import { formatRupiah } from "@/data/pricing/plan";
import { templateCategories } from "@/data/templates";

export type SubscriptionOrder = {
  id: string; template: string; period: string; amount: number; status: string;
  business: string; expires_at: string | null; created_at: string;
};
type Props = { email: string | null; orders: SubscriptionOrder[]; unavailable: boolean; now: number };
const date = (value: string) => new Intl.DateTimeFormat("id-ID", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta",
}).format(new Date(value));
function status(order: SubscriptionOrder, now: number) {
  if (order.status === "paid") return order.expires_at && Date.parse(order.expires_at) > now ? "Aktif" : "Masa akses berakhir";
  if (order.status === "pending") return "Menunggu pembayaran";
  if (order.status === "refunded") return "Dikembalikan";
  return "Pembayaran berakhir";
}

export function SubscriptionOverview({ email, orders, unavailable, now }: Props) {
  const active = orders.find(order => status(order, now) === "Aktif");
  const pending = orders.find(order => order.status === "pending");
  const current = active ?? pending;
  return <main id="checkout-main" className="subscriptionWorkspace" tabIndex={-1}>
    <header className="subscriptionHeading"><div><h1>Langganan saya.</h1><p>Ruang untuk mengelola langkah berikutnya.</p></div><Link href="/templates" className="subscriptionTextLink">Jelajahi template <BlogIcon name="arrow"/></Link></header>
    <div className="subscriptionLayout">
      <nav className="subscriptionSidebar" aria-label="Navigasi langganan">
        <a href="#subscription-overview">Ringkasan</a><a href="#subscription-history">Riwayat pembayaran</a><Link href={`/editor?template=${current?.template === "service" ? "service" : "restaurant"}`}>Website Editor</Link><Link href={`/app?template=${current?.template === "service" ? "service" : "restaurant"}`}>Dashboard</Link><a href="#subscription-help">Bantuan</a>
        {email && <p className="subscriptionIdentity">Akun Anda<strong>{email}</strong></p>}
      </nav>
      <div className="subscriptionContent">
        <section id="subscription-overview" className="subscriptionOverview" aria-labelledby="subscription-overview-title">
          <div className="subscriptionStatusCopy">
            {current && <span className="subscriptionState" data-active={Boolean(active)}>{status(current, now)}</span>}
            <h2 id="subscription-overview-title">{!email ? "Website Anda, dalam satu tempat." : unavailable ? "Data langganan belum tersedia." : current ? current.business : "Mulai ruang baru untuk bisnis Anda."}</h2>
            <p>{!email ? "Masuk untuk melihat paket, masa akses, dan riwayat pembayaran milik Anda." : unavailable ? "Kami belum dapat memuat rincian akun Anda. Coba kembali beberapa saat lagi atau hubungi tim Mangelek." : active ? "Periode langganan Anda sudah tercatat. Tinjau masa akses dan detail pembayarannya di sini." : pending ? "Pesanan Anda sudah tercatat. Selesaikan pembayaran untuk memulai periode langganan." : "Belum ada langganan aktif. Coba dua live demo, temukan warna dan font Anda, lalu pilih periode akses."}</p>
            <div className="subscriptionActions">
              <a className="subscriptionPrimary" href={!email ? "/login?next=%2Fsubscription" : unavailable ? "/subscription" : current ? `/checkout/status?order=${current.id}` : "/templates"}>{!email ? "Masuk ke akun" : unavailable ? "Coba muat kembali" : pending && !active ? "Periksa pembayaran" : active ? "Rincian langganan" : "Pilih template"}<BlogIcon name="arrow"/></a>
              {!email && <Link href="/signup?next=%2Fsubscription" className="subscriptionTextLink">Buat akun</Link>}
            </div>
          </div>
          <dl className="subscriptionPlan">
            <div><dt>{current ? "Paket Anda" : "Paket yang tersedia"}</dt><dd>Website + CMS</dd></div>
            <div><dt>{current ? "Periode pembayaran" : "Harga bulanan"}</dt><dd>{formatRupiah(current?.amount ?? 200000)}<small>{current ? `untuk ${current.period === "yearly" ? "12" : "1"} bulan` : "per bulan"}</small></dd></div>
            {active?.expires_at ? <div><dt>Akhir masa akses</dt><dd className="subscriptionDate">{date(active.expires_at)}</dd></div> : current ? <div><dt>Template</dt><dd className="subscriptionDate">{templateCategories.find(t => t.id === current.template)?.title ?? current.template}</dd></div> : <div><dt>Periode tahunan</dt><dd className="subscriptionDate">Rp2.400.000 / 12 bulan</dd></div>}
            <div><dt>Perpanjangan</dt><dd className="subscriptionDate">Tidak otomatis</dd></div>
          </dl>
        </section>
        <section id="subscription-history" className="subscriptionHistory" aria-labelledby="subscription-history-title">
          <div className="subscriptionSectionHeading"><h2 id="subscription-history-title">Riwayat pembayaran</h2><span>{orders.length ? `${orders.length} pesanan terbaru` : "Belum ada data"}</span></div>
          {orders.length ? <ul className="subscriptionOrders">{orders.map(order => <li key={order.id}>
            <div><h3>{order.business}</h3><p>{date(order.created_at)} · {order.period === "yearly" ? "12 bulan" : "1 bulan"}</p></div>
            <div><strong>{formatRupiah(order.amount)}</strong><span className="subscriptionOrderState">{status(order, now)}</span></div>
            <Link href={`/checkout/status?order=${order.id}`} aria-label={`Lihat pembayaran ${order.business}, ${date(order.created_at)}`}><span>Lihat rincian</span><BlogIcon name="arrow"/></Link>
          </li>)}</ul> : <div className="subscriptionHistoryEmpty"><BlogIcon name="clock"/><div><h3>{!email ? "Riwayat Anda tersimpan bersama akun." : unavailable ? "Riwayat belum dapat dimuat." : "Belum ada pembayaran."}</h3><p>{!email ? "Setelah masuk, pembayaran dari akun yang sama akan muncul di sini." : unavailable ? "Data belum dapat diperiksa. Ini tidak mengubah status pembayaran Anda." : "Pesanan pertama Anda akan muncul setelah memulai checkout."}</p></div></div>}
        </section>
        <section id="subscription-help" className="subscriptionHelp"><div><h2>Butuh bantuan untuk langkah berikutnya?</h2><p>Tim Mangelek membantu aktivasi website dan perpanjangan. Pembelian serta perpanjangan domain dikelola terpisah.</p></div><Link href="/#contact" className="subscriptionTextLink">Hubungi kami <BlogIcon name="external"/></Link></section>
      </div>
    </div>
  </main>;
}
