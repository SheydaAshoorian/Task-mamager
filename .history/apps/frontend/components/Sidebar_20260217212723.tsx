"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  CheckSquare, 
  Users, 
  LogOut,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'پیشخوان', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'مدیریت کاربران', href: '/dashboard/users', icon: <Users /> }, // این خط را اضافه کن
    { name: 'ثبت تسک جدید', icon: PlusCircle, href: '/dashboard/tasks/create' },
    { name: 'لیست تسک‌ها', icon: CheckSquare, href: '/dashboard/tasks' },
    { name: 'تیم من', icon: Users, href: '/dashboard/team' },
    { name: 'تنظیمات', icon: Settings, href: '/dashboard/settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen border-l border-gray-200 flex flex-col shadow-sm">
      {/* لوگو یا نام برنامه */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 text-center">پنل مدیریت</h1>
      </div>

      {/* منوها */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? 'bg-blue-50 text-blue-600 font-bold' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* بخش پروفایل و خروج */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <LogOut size={20} />
          <span>خروج از حساب</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;