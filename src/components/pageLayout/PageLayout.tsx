import type { ReactNode } from "react";
import { TopNav } from "../topNav/TopNav";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="min-h-screen bg-gray-50">
    <main className="mx-auto max-w-2xl border-x-2 border-x-gray-100 px-4">
      <TopNav />
      {children}
    </main>
  </div>
);
