"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipboardList, AlertCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    highPriority: 0,
    todoTasks: 0,
    recentTasks: []
  });

  const getProfile = async () => {
  // دقت کن: هیچ هدر یا توکنی دستی نمی‌فرستیم! 
  // فایل axios.ts خودش توکن را از کوکی برمی‌دارد و می‌چسباند به این درخواست.
  const res = await api.get('/auth/profile'); 
  return res.data;
}

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('http://localhost:3000/tasks');

        const allTasks = response.data.data || [];

        setStats({
          total: allTasks.length,
          highPriority: allTasks.filter((t: any) => t.priority === 'High').length,
          todoTasks: allTasks.filter((t: any) => t.status === 'todo').length,
          recentTasks: allTasks.slice(0, 5) 
        });
      } catch (error) {
        console.error("خطا در دریافت دیتا:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">در حال اتصال به مرکز داده...</div>;

  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">داشبورد مدیریتی</h1>

      {/* بخش کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><ClipboardList size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">کل تسک‌ها</p>
            <h3 className="text-2xl font-bold">{stats.total}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-red-50 p-3 rounded-xl text-red-600"><AlertCircle size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">تسک‌های فوری</p>
            <h3 className="text-2xl font-bold text-red-600">{stats.highPriority}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><Clock size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">در انتظار</p>
            <h3 className="text-2xl font-bold text-amber-600">{stats.todoTasks}</h3>
          </div>
        </div>
      </div>

      {/* بخش لیست آخرین‌ها */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4 text-gray-700 border-b pb-4">آخرین فعالیت‌های ثبت شده</h2>
        <div className="space-y-4">
          {stats.recentTasks.map((task: any) => (
            <div key={task.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="font-medium text-gray-800"> {task.title} </span>
              <span className="text-sm text-gray-400">کارشناس: {task.assignedTo?.name || '---'}</span>
            </div>
          ))}
          {stats.recentTasks.length === 0 && <p className="text-center text-gray-400">دیتایی یافت نشد.</p>}
        </div>
      </div>
    </div>
  );
}