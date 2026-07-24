import type { ReactNode } from "react";
import { PersistentSidebar } from "@/components/PersistentSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <PersistentSidebar />
      {children}
    </div>
  );
}
