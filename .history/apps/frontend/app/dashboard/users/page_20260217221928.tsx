"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, ShieldCheck } from 'lucide-react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // آدرس مستقیم برای اطمینان از برقراری ارتباط
      const res = await axios.get('http://localhost:3000/users');
      setUsers(res.data);
    } catch (error) {
      console.error("خطا در دریافت کاربران:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userId}/role`, {
        role: newRole
      });
      alert("نقش کاربر تغییر کرد ✅");
      fetchUsers();
    } catch (error) {
      alert("خطا در آپدیت نقش ❌");
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
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4 text-gray-700">{user.firstName} {user.lastName}</td>
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
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                  >
                    <option value="user">کارشناس (User)</option>
                    <option value="admin">مدیر (Admin)</option>
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