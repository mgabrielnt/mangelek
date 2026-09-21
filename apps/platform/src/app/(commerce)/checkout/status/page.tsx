import { BlogIcon } from "@/components/blogs/BlogIcon";
import Link from "next/link";
import { getVerifiedUser } from "@/lib/auth/server";
import { billingConfig,billingDb,syncOrder } from "@/lib/billing/server";
import { formatRupiah } from "@/data/pricing/plan";
export const metadata={title:"Status pembayaran — Mangelek",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function PaymentStatus({searchParams}:{searchParams:Promise<{order?:string}>}){
  const {order:id}=await searchParams;const user=await getVerifiedUser();let order=null;let unavailable=false;
  if(user&&billingConfig()&&id&&/^mgl-[a-f0-9]{32}$/.test(id)){
    const {data,error}=await billingDb().from("billing_orders").select("*").eq("id",id).eq("user_id",user.id).maybeSingle();
    unavailable=Boolean(error);if(data){try{order=await syncOrder(id);}catch{order=data;unavailable=true;}}
  }
  const paid=order?.status==="paid",failed=order?.status==="failed",refunded=order?.status==="refunded";
  return <main id="checkout-main" className="checkoutMain paymentStatus" tabIndex={-1}><div className="paymentStatusSymbol" aria-hidden="true"><BlogIcon name={paid?"check":failed||refunded?"alert":"clock"}/></div><h1>{paid?"Pembayaran terverifikasi.":failed?"Pembayaran belum berhasil.":refunded?"Pembayaran dikembalikan.":order?"Menunggu pembayaran.":"Periksa pembayaran Anda."}</h1><p>{paid?"Periode langganan Anda telah tercatat. Lihat rincian dan masa akses di halaman langganan.":failed?"Pesanan berakhir atau pembayaran ditolak. Anda dapat meninjau kembali pilihan sebelum membuat pesanan baru.":refunded?"Pesanan ini tidak memberikan akses langganan aktif.":order?"Langganan belum aktif. Status akan diperiksa kembali saat Anda menyegarkan halaman ini.":!user?"Masuk dengan akun yang digunakan saat checkout untuk melihat status pembayaran.":"Pesanan belum ditemukan atau layanan pembayaran belum tersedia."}</p>{unavailable&&<p role="status">Status terbaru belum dapat diperiksa. Coba periksa kembali beberapa saat lagi.</p>}{order&&<dl><div><dt>Nomor pesanan</dt><dd>{order.id}</dd></div><div><dt>Total</dt><dd>{formatRupiah(order.amount)}</dd></div></dl>}<div className="paymentStatusActions">{!user?<Link className="checkoutPay" href={`/login?next=${encodeURIComponent(`/checkout/status${id?`?order=${id}`:""}`)}`}>Masuk ke akun</Link>:<Link className="checkoutPay" href="/subscription">Lihat langganan</Link>}{order?.status==="pending"&&order.payment_url&&<a className="checkoutSecondary" href={order.payment_url}>Lanjutkan pembayaran</a>}{order&&<a className="checkoutSecondary" href={`/checkout/status?order=${id}`}>Periksa status kembali</a>}<Link className="checkoutSecondary" href="/templates">Kembali ke template</Link></div></main>;
}
