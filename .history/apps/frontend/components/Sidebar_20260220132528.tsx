"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, PlusCircle, Users, Settings, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'پیشخوان', href: '/dashboard', icon: LayoutDashboard },
    { name: 'لیست تسک‌ها', href: '/dashboard/tasks', icon: ClipboardList },
    { name: 'ثبت تسک جدید', href: '/dashboard/tasks/create', icon: PlusCircle },
    { name: 'مدیریت کاربران', href: '/dashboard/users', icon: Users },
    { name: 'تنظیمات', href: '/dashboard/settings', icon: Settings },
  ];

import { useRouter } from 'next/navigation';

const handleLogout = () => {
  console.log("--- فرآیند خروج از حساب ---");

  // ۱. پاک کردن توکن از کوکی‌ها
  Cookies.remove('token');
  console.log("توکن از کوکی پاک شد ✅");

  // ۲. پاک کردن اطلاعات احتمالی از LocalStorage
  localStorage.removeItem('user'); 
  
  // ۳. هدایت کاربر به صفحه لاگین
  toast.success('با موفقیت خارج شدید');
  window.location.href = '/login'; 
};

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed right-0 top-0 border-l border-gray-800 z-50" dir="rtl">
      <div className="p-6 border-b border-gray-800 text-xl font-bold text-blue-400">پنل مدیریت</div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              pathname === item.href ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <item.icon size={22} />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800 text-red-400 flex items-center gap-2 cursor-pointer p-3">
        <LogOut size={20} /> <span className="text-sm">خروج</span>
      </div>
    </aside>
  );
}