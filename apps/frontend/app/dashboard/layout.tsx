import Sidebar from '@/components/Sidebar'; // این کامپوننت را الان می‌سازیم

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dir-rtl">
      {/* سایدبار ثابت در سمت راست */}
      <Sidebar />

      {/* محتوای اصلی در سمت چپ */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}