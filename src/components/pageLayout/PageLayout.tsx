import type { ReactNode } from "react";
import { TopNav } from "../topNav/TopNav";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="h-screen w-screen bg-gray-50">
    <main className="mx-auto min-h-full max-w-2xl overflow-auto border-x-2 border-x-gray-100 px-4">
      <TopNav />
      {children}
    </main>
  </div>
);
