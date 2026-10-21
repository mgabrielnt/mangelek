import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, pointerWithin, useDraggable, useDroppable, useSensor, useSensors, type KeyboardCoordinateGetter } from "@dnd-kit/core";
import { money, stages, type Contact, type Deal } from "@/lib/crm/document";
import { EditorIcon } from "@/components/editor/EditorIcon";

const date = (value: string) => value ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00`)) : "Tanpa target";
const columnKeys = Object.keys(stages);
const keyboardCoordinates: KeyboardCoordinateGetter = (event, { currentCoordinates, context }) => {
  if (!["ArrowRight", "ArrowLeft"].includes(event.code)) return;
  event.preventDefault();
  const from = String(context.over?.data.current?.stage ?? context.active?.data.current?.stage ?? "");
  const available = columnKeys.filter(stage => context.droppableContainers.get(`stage:${stage}`));
  const index = available.indexOf(from) + (event.code === "ArrowRight" ? 1 : -1);
  const stage = available[index];
  if (!stage || !context.collisionRect) return currentCoordinates;
  const rect = context.droppableRects.get(`stage:${stage}`);
  if (!rect) return currentCoordinates;
  return { x: currentCoordinates.x + rect.left + rect.width / 2 - (context.collisionRect.left + context.collisionRect.width / 2), y: currentCoordinates.y };
};

function Column({ stage, children, count, amount, add, disabled }: { stage: Deal["stage"]; children: ReactNode; count: number; amount: number; add: () => void; disabled: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: `stage:${stage}`, data: { stage }, disabled });
  return <section ref={setNodeRef} className="crmBoardColumn" data-over={isOver} aria-label={stages[stage]}>
    <header><h2><span className="crmStageDot" data-stage={stage} />{stages[stage]}<span className="crmBoardCount">{count}</span></h2><p>{money(amount)}</p></header>
    <div className="crmBoardItems">{children}</div>
    {!count && <p className="crmBoardEmpty">{isOver ? "Letakkan peluang di sini" : "Belum ada peluang di tahap ini."}</p>}
    <button className="crmBoardAdd" disabled={disabled} onClick={add} aria-label={`Tambah peluang ${stages[stage]}`}><EditorIcon name="plus" />Tambah peluang</button>
  </section>;
}

function DealCard({ deal, contact, disabled, open, move, selectRef }: { deal: Deal; contact: string; disabled: boolean; open: () => void; move: (stage: Deal["stage"]) => void; selectRef: (node: HTMLSelectElement | null) => void }) {
  const { setNodeRef, setActivatorNodeRef, listeners, attributes, isDragging } = useDraggable({ id: deal.id, data: { stage: deal.stage, name: deal.name }, disabled });
  return <article ref={setNodeRef} className="crmDealCard" data-dragging={isDragging}>
    <div className="crmDealCardTop"><button className="cmsItemName" onClick={open}><strong>{deal.name}</strong><span>{contact}</span></button>
      <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="crmDragHandle" disabled={disabled} aria-label={`Pindahkan ${deal.name}`} title="Seret untuk memindahkan tahap"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{[7,12,17].flatMap(y => [9,15].map(x => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />))}</svg></button></div>
    <p className="crmDealValue">{money(deal.amount)}</p><p className="crmDealDate">{date(deal.due)}</p>
    <label><span className="editorSrOnly">Tahap {deal.name}</span><select ref={selectRef} disabled={disabled} value={deal.stage} onChange={event => move(event.target.value as Deal["stage"])}>{Object.entries(stages).map(([value,text]) => <option key={value} value={value}>{text}</option>)}</select></label>
  </article>;
}

export function CrmBoard({ deals, contacts, filter, disabled, open, add, move }: {
  deals: Deal[]; contacts: Contact[]; filter: string; disabled: boolean;
  open: (deal: Deal) => void; add: (stage: Deal["stage"]) => void; move: (deal: Deal, stage: Deal["stage"]) => void;
}) {
  const id = useId();
  const [dragging, setDragging] = useState<Deal | null>(null);
  const pendingFocus = useRef<{ id: string; stage: Deal["stage"] } | null>(null);
  const board = useRef<HTMLDivElement>(null), selectors = useRef(new Map<string, HTMLSelectElement>());
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: keyboardCoordinates, scrollBehavior: "auto" }));
  useEffect(() => {
    const pending = pendingFocus.current;
    if (pending && (!deals.some(deal => deal.id === pending.id) || deals.some(deal => deal.id === pending.id && deal.stage === pending.stage))) {
      (selectors.current.get(pending.id) ?? board.current)?.focus(); pendingFocus.current = null;
    }
  }, [deals]);
  const changeStage = (deal: Deal, stage: Deal["stage"]) => { if (disabled || stage === deal.stage) return; pendingFocus.current = { id: deal.id, stage }; move(deal, stage); };
  const columns = (Object.entries(stages) as [Deal["stage"], string][]).filter(([stage]) => !Object.hasOwn(stages, filter) || filter === stage);
  return <DndContext id={id} sensors={sensors} collisionDetection={args => args.pointerCoordinates ? pointerWithin(args) : closestCenter(args)}
    accessibility={{ screenReaderInstructions: { draggable: "Tekan Spasi atau Enter untuk mengangkat peluang. Panah kiri dan kanan memilih tahap. Tekan Spasi atau Enter untuk meletakkan, atau Escape untuk membatalkan." }, announcements: {
      onDragStart: ({ active }) => `Mengangkat ${active.data.current?.name}. Gunakan panah kiri atau kanan untuk memilih tahap.`,
      onDragOver: ({ over }) => over ? `Tujuan: ${stages[over.data.current?.stage as Deal["stage"]]}.` : "Di luar pipeline. Melepaskan akan membatalkan pemindahan.",
      onDragEnd: ({ over }) => over ? "Peluang dilepas. Periksa status penyimpanan." : "Pemindahan dibatalkan.",
      onDragCancel: () => "Pemindahan dibatalkan. Tahap tidak berubah."
    } }}
    onDragStart={({ active }) => setDragging(deals.find(deal => deal.id === active.id) ?? null)}
    onDragCancel={() => setDragging(null)}
    onDragEnd={({ active, over }) => { setDragging(null); const deal = deals.find(item => item.id === active.id); const stage = over?.data.current?.stage; if (deal && typeof stage === "string" && Object.hasOwn(stages,stage)) changeStage(deal, stage as Deal["stage"]); }}>
    <p className="crmBoardHint">Seret pegangan kartu ke tahap lain. Dengan keyboard: Spasi, panah kiri/kanan, lalu Spasi. Pilihan tahap juga tetap tersedia.</p>
    <div ref={board} className="crmBoard" data-drag-active={!!dragging} tabIndex={0} role="region" aria-label="Papan pipeline, gulir horizontal untuk melihat semua tahap">
      {columns.map(([stage]) => { const items = deals.filter(deal => deal.stage === stage); return <Column key={stage} stage={stage} count={items.length} amount={items.reduce((sum,item) => sum + Number(item.amount),0)} add={() => add(stage)} disabled={disabled}>
        {items.map(deal => <DealCard key={deal.id} deal={deal} contact={contacts.find(contact => contact.id === deal.contactId)?.name || "Tanpa kontak"} disabled={disabled} open={() => open(deal)} move={stage => changeStage(deal,stage)} selectRef={node => { if (node) selectors.current.set(deal.id,node); else selectors.current.delete(deal.id); }} />)}
      </Column>; })}
    </div>
    {typeof document !== "undefined" && createPortal(<DragOverlay dropAnimation={null}>{dragging ? <div className="crmDragPreview"><strong>{dragging.name}</strong><span>{contacts.find(contact => contact.id === dragging.contactId)?.name || "Tanpa kontak"}</span><p>{money(dragging.amount)}</p><span>Lepaskan di tahap tujuan</span></div> : null}</DragOverlay>, document.body)}
  </DndContext>;
}
