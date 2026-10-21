"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CrmInsights } from "./CrmInsights";
import { EditorIcon } from "@/components/editor/EditorIcon";
import type { ComponentProps } from "react";

export function BusinessAnalytics(props: ComponentProps<typeof CrmInsights>) {
  return <Tabs defaultValue="crm"><TabsList aria-label="Sumber analytics"><TabsTrigger value="crm"><EditorIcon name="people" />CRM & penjualan</TabsTrigger><TabsTrigger value="website"><EditorIcon name="globe" />Website</TabsTrigger></TabsList>
    <TabsContent value="crm"><CrmInsights {...props} /></TabsContent>
    <TabsContent value="website"><section className="dashConnectionState"><EditorIcon name="chart" /><div><h2>Analytics website belum terhubung</h2><p>Pengunjung, tampilan halaman, dan konversi formulir belum dikumpulkan. Data CRM tersedia pada tab CRM & penjualan.</p><a className="editorSecondary" href={`/app/website?template=${props.template}`}>Buka website Anda<EditorIcon name="arrow" /></a></div></section></TabsContent>
  </Tabs>;
}
