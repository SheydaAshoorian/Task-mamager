// یک مثال کوچک از کارت‌های آمار در پیشخوان
<div className="grid grid-cols-3 gap-4 mb-8">
  <div className="bg-blue-100 p-4 rounded-lg text-center">
    <p>کل تسک‌ها</p>
    <span className="text-2xl font-bold">{tasks.length}</span>
  </div>
  {/* کارت‌های دیگر برای تسک‌های انجام شده و... */}
</div>

// نمایش فقط ۵ تسک آخر
<h2 className="text-lg font-bold mb-3">آخرین فعالیت‌ها</h2>
{tasks.slice(0, 5).map(task => (
   <div key={task.id} className="p-3 border-b">{task.title}</div>
))}