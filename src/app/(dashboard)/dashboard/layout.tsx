"use client"
import { LoginDialog } from "@/components/modules/auth/LoginDialog";
import LoginForm from "@/components/modules/auth/LoginForm";
import Sidebar from "@/components/shared/Sidebar";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const router = useRouter()
  console.log(session);
  if (!session.data) {
    return router.push("/")
  }
  return (
    <div className="max-w-[1920px] flex mx-auto min-h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto max-md:mt-14 z-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

