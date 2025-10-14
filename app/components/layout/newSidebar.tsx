// 'use client';

// import { useState } from 'react';
// import { CreateServerModal } from '@/app/components/layout/CreateServerModal';

// export default function Sidebar({ user }: { user: any }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <div className="w-16 bg-[#1e1f22] p-3 flex flex-col items-center space-y-4">
//         {/* Your other server icons will eventually be mapped here */}
        
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="w-12 h-12 bg-[#2b2d31] hover:bg-green-600 rounded-full flex items-center justify-center text-2xl text-green-500 hover:text-white transition-all"
//           title="Add a Server"
//         >
//           +
//         </button>
//       </div>

//       {isModalOpen && <CreateServerModal onClose={() => setIsModalOpen(false)} />}
//     </>
//   );
// }