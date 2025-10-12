import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-[1920px] flex mx-auto min-h-screen">
            {/* Sticky Sidebar */}
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0f001a]/80 text-white">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
