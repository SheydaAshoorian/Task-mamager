// "use client";
// import { useEffect, useState } from 'react';

// export default function TasksListPage() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/tasks')
//       .then(res => res.json())
//       .then(data => setTasks(data));
//   }, []);

//   return (
//     <div dir="rtl" className="p-4">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">لیست کل تسک‌ها</h1>
//       <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
//         <table className="w-full text-right border-collapse">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="p-4 text-sm font-semibold">عنوان تسک</th>
//               <th className="p-4 text-sm font-semibold">اولویت</th>
//               <th className="p-4 text-sm font-semibold">وضعیت</th>
//               <th className="p-4 text-sm font-semibold">تاریخ ایجاد</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {tasks.map((task: any) => (
//               <tr key={task.id} className="hover:bg-blue-50/50 transition-colors">
//                 <td className="p-4 text-gray-700 font-medium">{task.title}</td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                   }`}>
//                     {task.priority === 'High' ? 'بالا' : 'معمولی'}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{task.status}</span>
//                 </td>
//                 <td className="p-4 text-sm text-gray-400 font-mono">
//                   {new Date(task.createdAt).toLocaleDateString('fa-IR')}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {tasks.length === 0 && (
//           <div className="p-10 text-center text-gray-400">هیچ تسکی پیدا نشد!</div>
//         )}
//       </div>
//     </div>
//   );
// }