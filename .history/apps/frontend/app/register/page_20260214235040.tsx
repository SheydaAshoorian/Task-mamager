'use client';

import React, { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', family: '', email: '', password: '' });
  const [status, setStatus] = useState({ message: '', isError: false, loading: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'در حال پردازش اطلاعات...', isError: false, loading: true });

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ message: result.message, isError: false, loading: false });
      } else {
        setStatus({ message: result.message || 'خطایی در ثبت‌نام رخ داد', isError: true, loading: false });
      }
    } catch (error) {
      setStatus({ message: 'عدم توانایی در اتصال به سرور مرکزی', isError: true, loading: false });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6 font-sans">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row">
        
        {/* بخش کناری - خوش‌آمدگویی */}
        <div className="bg-blue-600 p-10 text-white md:w-1/3 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold mb-4">ERP System</h2>
          <p className="text-blue-100 text-sm">به سامانه مدیریت منابع سازمانی خوش آمدید</p>
          <div className="mt-8 w-16 h-1 bg-blue-400 rounded-full"></div>
        </div>

        {/* بخش فرم */}
        <div className="p-10 md:w-2/3 bg-white">
          <h3 className="text-xl font-bold text-slate-700 mb-8 border-b pb-2">ایجاد حساب کاربری</h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 mr-1">نام</label>
                <input
                  type="text"
                  placeholder="مثلا: علی"
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-700"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 mr-1">نام خانوادگی</label>
                <input
                  type="text"
                  placeholder="مثلا: علوی"
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-700"
                  onChange={(e) => setFormData({ ...formData, family: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 mr-1">پست الکترونیک</label>
              <input
                type="email"
                placeholder="email@company.com"
                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-700"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 mr-1">رمز عبور</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-700"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="mt-4 w-full rounded-lg bg-blue-600 p-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98] disabled:bg-slate-300"
            >
              {status.loading ? 'در حال پردازش...' : 'تایید و عضویت در سامانه'}
            </button>
          </form>

          {status.message && (
            <div className={`mt-6 rounded-lg p-4 text-center text-xs font-bold transition-all animate-in fade-in slide-in-from-bottom-2 ${
              status.isError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'
            }`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}