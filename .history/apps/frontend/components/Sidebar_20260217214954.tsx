"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ClipboardList, 
  Users, 
  Settings, 
  PlusCircle, 
  LayoutDashboard 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // آرایه آیتم‌های منو - دقت کن که آیکون‌ها بدون تگ < > هستند
  const menuItems = [
    { name: 'پیشخوان', href: '/dashboard', icon: LayoutDashboard },
    { name: 'لیست تسک‌ها', href: '/dashboard/tasks', icon: ClipboardList },
    { name: 'ثبت تسک جدید', href: '/dashboard/tasks/create', icon: PlusCircle },
    { name: 'مدیریت کاربران', href: '/dashboard/users', icon: Users },
    { name: 'تنظیمات', href: '/dashboard/settings', icon: Settings },
  ];

  return (
<div className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed right-0 top-0 border-l border-gray-800 z-50">
  
        <div className="p-6 text-2xl font-bold border-b border-gray-800 text-blue-400 flex items-center gap-2">
        <LayoutDashboard size={28} />
        <span>پنل مدیریت</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {/* اینجا آیکون به درستی به عنوان کامپوننت رندر می‌شود */}
              <item.icon size={22} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 p-3 w-full text-red-400 hover:bg-red-900/20 rounded-xl transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span className="font-medium">خروج از حساب</span>
        </button>
      </div>
    </div>
  );
}