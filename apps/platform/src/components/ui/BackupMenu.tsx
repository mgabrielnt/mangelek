"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { EditorIcon } from "@/components/editor/EditorIcon";

export function BackupMenu({ download, restore, downloadDisabled, restoreDisabled }: { download: () => void; restore: () => void; downloadDisabled: boolean; restoreDisabled: boolean }) {
  return <Menu.Root><Menu.Trigger className="workspaceMenuTrigger">Cadangan<EditorIcon name="down" /></Menu.Trigger><Menu.Portal><Menu.Content className="workspaceMenuContent" align="end" sideOffset={8} collisionPadding={16}>
    <Menu.Label className="workspaceMenuLabel">Data CRM di perangkat ini</Menu.Label>
    <Menu.Item className="workspaceMenuItem" disabled={downloadDisabled} onSelect={download}><EditorIcon name="download" />Unduh cadangan CRM</Menu.Item>
    <Menu.Item className="workspaceMenuItem" disabled={restoreDisabled} onSelect={restore}><EditorIcon name="upload" />Pulihkan cadangan CRM</Menu.Item>
  </Menu.Content></Menu.Portal></Menu.Root>;
}
