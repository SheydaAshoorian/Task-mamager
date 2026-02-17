"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipboardList, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    highPriority: 0,
    todoTasks: 0,
    recentTasks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        const allTasks = response.data.data || [];

        // محاسبه آمار از روی لیستی که گرفتیم
        const high = allTasks.filter((t: any) => t.priority === 'High' || t.priority === 'high').length;
        const todo = allTasks.filter((t: any) => t.status === 'todo').length;

        setStats({
          total: allTasks.length,
          highPriority: high,
          todoTasks: todo,
          recentTasks: allTasks.slice(0, 5) // فقط ۵ تا از آخرین‌ها
        });
      } catch (error) {
        console.error("خطا در بارگذاری آمار:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-10 text-center">در حال بارگذاری آمار...</div>;

  return (
    <div dir="rtl" className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">خلاصه وضعیت پیشخوان</h1>

      {/* بخش کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <ClipboardList size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">کل تسک‌ها</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-xl text-red-600">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">تسک‌های فوری (High)</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.highPriority}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-xl text-