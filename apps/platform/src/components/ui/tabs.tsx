"use client";

import * as Primitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";

// shadcn-style composition, styled with the existing Mangelek tokens.
export const Tabs = Primitive.Root;
export function TabsList({ className = "", ...props }: ComponentProps<typeof Primitive.List>) { return <Primitive.List className={`workspaceTabs ${className}`} {...props} />; }
export function TabsTrigger({ className = "", ...props }: ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Trigger className={`workspaceTab ${className}`} {...props} />; }
export function TabsContent({ className = "", ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Content className={`workspaceTabContent ${className}`} {...props} />; }
