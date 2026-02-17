
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios'; // حتماً اکسپورت اکسایوس رو چک کن

export default function TasksListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        
        // دقت کن: 
        // response.data کل خروجی بک‌اِند است
        // response.data.data همان آرایه تسک‌های توست (طبق اسکرین‌شات ۵:۲۴)
        
        if (response.data && response.data.data) {
          setTasks(response.data.data);
        }
      } catch (error) {
        console.error("خطا در دریافت تسک‌ها:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div dir="rtl" className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">لیست کل تسک‌ها</h1>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-right border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-sm font-semibold">عنوان تسک</th>
              <th className="p-4 text-sm font-semibold">ارجاع به</th> {/* ستون جدید */}
              <th className="p-4 text-sm font-semibold">اولویت</th>
              <th className="p-4 text-sm font-semibold">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task: any) => (
              <tr key={task.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 text-gray-700 font-medium">{task.title}</td>
                <td className="p-4 text-gray-600">
                  {/* نمایش نام کارمند که در اسکرین‌شات ۵:۲۴ دیدیم */}
                  {task.assignedTo?.name} {task.assignedTo?.family}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.priority === 'low' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {task.priority === 'low' ? 'معمولی' : 'فوری'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}