"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, ShieldCheck, RefreshCw } from 'lucide-react';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


    const fetchUsers = async () => {
    try {
        console.log("در حال ارسال درخواست به بک‌اِند..."); // برای تست در کنسول
        const res = await axios.get('http://localhost:3000/users'); 
        console.log("دیتا دریافت شد:", res.data);
        setUsers(res.data);
    } catch (error) {
        console.error("خطا در ارتباط با سرور:", error);
    }
    };

  useEffect(() => { fetchUsers(); }, []);

  // ۲. تابع تغییر رول کاربر
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.patch(`${'http://localhost:3000//users/'${userId}`, {
        role: newRole
      });
      alert("نقش کاربر با موفقیت آپدیت شد");
      fetchUsers(); // رفرش کردن لیست
    } catch (error) {
      alert("خطا در تغییر نقش");
    }
  };

  if (loading) return <div className="p-10 text-center">در حال بارگذاری کاربران...</div>;

  return (
    <div dir="rtl" className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">مدیریت دسترسی کاربران</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="p-4">نام و نام خانوادگی</th>
              <th className="p-4">ایمیل</th>
              <th className="p-4">نقش فعلی</th>
              <th className="p-4">تغییر سطح دسترسی</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium">{user.name} {user.family}</td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {user.role === 'admin' ? 'مدیر سیستم' : 'کاربر عادی'}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    className="bg-gray-50 border border-gray-200 rounded-lg p-1 text-sm outline-none focus:border-blue-500"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">کاربر عادی (User)</option>
                    <option value="admin">مدیر (Admin)</option>
                    <option value="editor">ویرایشگر (Editor)</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}