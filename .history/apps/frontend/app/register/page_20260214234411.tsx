'use client';

import React, { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('در حال ارسال...');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
        setIsError(false);
      } else {
        setMessage(result.message || 'خطایی رخ داد');
        setIsError(true);
      }
    } catch (error) {
      setMessage('ارتباط با سرور برقرار نشد');
      setIsError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ثبت‌نام</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="نام"
            className="w-full p-3 border rounded-md text-black"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="نام خانوادگی"
            className="w-full p-3 border rounded-md text-black"
            onChange={(e) => setFormData({ ...formData, family: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="ایمیل"
            className="w-full p-3 border rounded-md text-black"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="w-full p-3 border rounded-md text-black"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            تایید و ثبت‌نام
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}