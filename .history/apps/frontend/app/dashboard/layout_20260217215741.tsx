"use client";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      {/* سایدبار که در سمت راست ثابت شده است */}
      <Sidebar />
      
      {/* محتوای اصلی که pr-64 دارد تا زیر سایدبار نرود */}
      <main className="flex-1 pr-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}