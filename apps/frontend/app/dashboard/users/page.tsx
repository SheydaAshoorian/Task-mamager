"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, ShieldCheck } from 'lucide-react';

export default function UsersManagement() {
  // مقدار اولیه را آرایه خالی بگذار
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/users');
      
      // مهم: مطمئن شویم که دیتا حتماً آرایه است
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setUsers(data);
    } catch (error) {
      console.error("خطا در دریافت کاربران:", error);
      setUsers([]); // در صورت خطا آرایه را خالی کن
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

    const handleRoleChange = async (userId: number, newRole: string) => {
    try {
        // آدرس را از /users/${userId}/role به /users/${userId} تغییر بده
        await axios.patch(`http://localhost:3000/users/${userId}`, {
        role: newRole
        });

        alert("نقش با موفقیت تغییر کرد ✅");
        fetchUsers(); 
    } catch (error) {
        console.error(error);
        alert("خطا در تغییر نقش ❌");
    }
    };

  if (loading) return <div className="text-center p-10">در حال بارگذاری کاربران...</div>;

  return (
    <div className="p-6" dir="rtl">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">مدیریت دسترسی کاربران</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold">نام و نام خانوادگی</th>
              <th className="p-4 font-semibold">ایمیل</th>
              <th className="p-4 font-semibold">نقش فعلی</th>
              <th className="p-4 font-semibold">تغییر سطح دسترسی</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* چک کردن دوباره برای جلوگیری از ارور map */}
            {users && users.length > 0 ? (
              users.map((user: any) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 text-gray-700">{user.name} {user.family}</td>
                  <td className="p-4 text-gray-500 text-sm">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2"
                    >
                      <option value="user">کارشناس (User)</option>
                      <option value="admin">مدیر (Admin)</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-10 text-gray-400">هیچ کاربری پیدا نشد.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}