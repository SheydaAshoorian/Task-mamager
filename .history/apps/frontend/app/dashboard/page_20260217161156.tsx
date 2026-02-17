export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-right">خلاصه وضعیت</h1>
      
      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">تسک‌های فعال</p>
          <h3 className="text-3xl font-bold text-blue-600">۱۲</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">انجام شده</p>
          <h3 className="text-3xl font-bold text-green-600">۴۵</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">تیم من</p>
          <h3 className="text-3xl font-bold text-purple-600">۸ نفر</h3>
        </div>
      </div>
    </div>
  );
}