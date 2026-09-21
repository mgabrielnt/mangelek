export const palettes = [
  { id: "forest", name: "Hutan", background: "#f4f3eb", ink: "#243d30", accent: "#dce6bc", surface: "#e7e9db" },
  { id: "sand", name: "Pasir", background: "#faf4e9", ink: "#4e3629", accent: "#eed3ad", surface: "#eee2cf" },
  { id: "ocean", name: "Samudra", background: "#f0f6f8", ink: "#163e54", accent: "#bddce5", surface: "#dce9ef" },
  { id: "rose", name: "Mawar", background: "#fbf1f1", ink: "#5a2636", accent: "#edc8d0", surface: "#efdee2" },
  { id: "mono", name: "Monokrom", background: "#ffffff", ink: "#252525", accent: "#e0e0da", surface: "#f1f1ed" },
  { id: "olive", name: "Zaitun", background: "#f6f5e9", ink: "#3d4322", accent: "#dee3a1", surface: "#e9e9d6" },
] as const;
export const fontPacks = [
  { id: "editorial", name: "Editorial", heading: "DM Serif Display", body: "Manrope", family: '"Demo Serif", Georgia, serif' },
  { id: "modern", name: "Modern", heading: "Manrope", body: "Manrope", family: '"Demo Sans", sans-serif' },
  { id: "expressive", name: "Ekspresif", heading: "Bricolage Grotesque", body: "Manrope", family: '"Demo Display", sans-serif' },
] as const;
export type DesignSelection = { template: string; palette: string; font: string };
export const demoContent: Record<string, { brand:string; title:string; intro:string; about:string; aboutTitle:string; collection:string; items: [string,string,string]; descriptions:[string,string,string]; cta:string; imageAlt:string }> = {
  restaurant: { brand:"Rasa & Ruang", title:"Rasa yang tinggal.\nWaktu yang berarti.", intro:"Hidangan musiman, bahan pilihan, dan ruang untuk percakapan yang panjang.", aboutTitle:"Meja untuk cerita Anda.", about:"Dari makan siang yang tenang hingga perayaan kecil, kami merayakan hal sederhana: makanan yang dimasak dengan hati dan waktu bersama orang terdekat.", collection:"Dari dapur kami", items:["Sajian musiman","Ruang bersama","Perayaan kecil"], descriptions:["Racikan segar yang mengikuti bahan terbaik hari ini.","Tempat untuk berbagi hidangan dan percakapan.","Susun pengalaman bersantap sesuai momen Anda."], cta:"Rencanakan kunjungan",imageAlt:"Interior restoran dengan pencahayaan hangat dan meja yang tertata" },
  service: { brand:"Ruang Studio", title:"Ide yang baik.\nDikerjakan bersama.", intro:"Studio kreatif untuk identitas dan pengalaman yang membuat bisnis Anda mudah dikenali.",aboutTitle:"Mulai dari cerita Anda.",about:"Kami mendengarkan, menemukan arah, lalu merancang setiap detail dengan tujuan yang jelas. Proses yang terbuka untuk hasil yang terasa tepat.",collection:"Yang kami kerjakan",items:["Identitas merek","Desain website","Arah kreatif"],descriptions:["Karakter visual yang konsisten di setiap pertemuan.","Ruang digital untuk mengenalkan cerita dan layanan Anda.","Gagasan yang menyatukan pesan, visual, dan pengalaman."],cta:"Ceritakan proyek Anda",imageAlt:"Ruang studio kreatif terang dengan meja kerja dan tanaman" },
};
export function resolveDesign(input: {template?:string|undefined;palette?:string|undefined;font?:string|undefined}): DesignSelection {
  return { template: input.template && Object.hasOwn(demoContent,input.template) ? input.template : "restaurant", palette: palettes.find(p=>p.id===input.palette)?.id ?? "forest", font: fontPacks.find(f=>f.id===input.font)?.id ?? "editorial" };
}
export function designQuery(design: DesignSelection) { return new URLSearchParams(design).toString(); }
