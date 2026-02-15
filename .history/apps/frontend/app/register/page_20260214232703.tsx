'use client';

import { useState } from 'react';

// تعریف تایپ برای پاسخ استاندارد بک‌اِند (Interface)
interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    successMsg: string | null;
  }>({
    loading: false,
    error: null,
    successMsg: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, successMsg: null });

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setStatus({
          loading: false,
          error: null,
          successMsg: result.message, // از پیامی که بک‌اِند فرستاده استفاده می‌کنیم
        });
        // هدایت کاربر به صفحه لاگین بعد از ۲ ثانیه (اختیاری)
      } else {
        setStatus({
          loading: false,
          error: result.message,
          successMsg: null,
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        error: 'خطا در برقراری ارتباط با سرور',
        successMsg: null,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          ثبت‌نام در سامانه
        </h2>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="نام"
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="نام خانوادگی"
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, family: e.target.value })}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="ایمیل"
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="رمز عبور"
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status.loading ? 'در حال ارسال...' : 'تایید و ثبت‌نام'}
          </button>
        </form>

        {/* نمایش پیام‌های خطا و موفقیت بر اساس استانداردی که ساختیم */}
        {status.error && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
            {status.error}
          </div>
        )}

        {status.successMsg && (
          <div className="mt-4 rounded-md bg-green-50 p-3 text-center text-sm text-green-600">
            {status.successMsg}
          </div>
        )}
      </div>
    </div>
  );
}