export type EditorIconName = "back" | "undo" | "redo" | "desktop" | "phone" | "eye" | "plus" | "up" | "down" | "copy" | "trash" | "check" | "layers" | "image" | "type" | "style" | "download" | "upload" | "close";
const paths: Record<EditorIconName, string> = {
  back: "m14 6-6 6 6 6", undo: "M9 5 4 10l5 5M4 10h10a6 6 0 0 1 0 12", redo: "m15 5 5 5-5 5M20 10H10a6 6 0 0 0 0 12",
  desktop: "M3 4h18v13H3zM8 21h8M12 17v4", phone: "M7 2h10v20H7zM11 18h2", eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12m7 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0",
  plus: "M12 5v14M5 12h14", up: "m6 14 6-6 6 6", down: "m6 10 6 6 6-6", copy: "M8 8h12v13H8zM16 8V3H3v13h5", trash: "M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7", check: "m5 12 4 4L19 6", layers: "m3 7 9-5 9 5-9 5-9-5m0 5 9 5 9-5M3 17l9 5 9-5", image: "M3 3h18v18H3zM3 17l6-6 4 4 3-3 5 5M16 7h.01", type: "M4 5h16M12 5v15M8 20h8", style: "M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 0-4 2 2 0 0 1 0-4h4a4 4 0 0 0 4-4c0-3-4-6-9-6M7 8h.01M11 6h.01M16 7h.01M5 13h.01", download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5", upload: "M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5", close: "m6 6 12 12M6 18 18 6",
};
export function EditorIcon({ name }: { name: EditorIconName }) { return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>; }
