"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ClipboardList, 
  PlusCircle, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'پیشخوان', href: '/dashboard', icon: LayoutDashboard },
    { name: 'لیست تسک‌ها', href: '/dashboard/tasks', icon: ClipboardList },
    { name: 'ثبت تسک جدید', href: '/dashboard/tasks/create', icon: PlusCircle },
    { name: 'مدیریت کاربران', href: '/dashboard/users', icon: Users },
    { name: 'تنظیمات', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside 
      className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed right-0 top-0 border-l border-gray-800 z-50" 
      dir="rtl"
    >
      {/* هدر سایدبار */}
      <div className