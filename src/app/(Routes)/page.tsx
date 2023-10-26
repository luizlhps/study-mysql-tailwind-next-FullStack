import Image from 'next/image';
import { Trash } from 'lucide-react';
import { Edit } from 'lucide-react';
import { CreateUser } from '../../components/CreateUser';

export default function Home() {
  return (
    <>
      <main id='container' className='h-screen flex justify-center items-center'>
        <div id='wrapper' className='relative isolate overflow-hidden bg-gray-900 p-16 min-[800]: rounded-lg'>
          <svg
            viewBox='0 0 1024 1024'
            className='absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0'
          >
            <circle
              cx='512'
              cy='512'
              r='512'
              fill='url(#759c1415-0410-454c-8f7c-9a820de03641)'
              fillOpacity='0.7'
            ></circle>
            <defs>
              <radialGradient id='759c1415-0410-454c-8f7c-9a820de03641'>
                <stop stopColor='#7775D6'></stop>
                <stop offset='1' stopColor='#E935C1'></stop>
              </radialGradient>
            </defs>
          </svg>
          <CreateUser />

          <div id='divider' className='w-full h-px bg-white/20 mt-10 mb-10' />
          <div id='table-users' className='overflow-x-auto'>
            <table className='min-w-full table-auto '>
              <thead>
                <tr>
                  <th className='w-96 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Phone
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/20 '>
                <tr className='mb-3 dark:bg-slate-800'>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>Luiz</td>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>1298232123</td>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>
                    <div className='flex flex-row gap-3'>
                      <Trash size={18} className='cursor-pointer' color='#F67373' />
                      <Edit size={18} className='cursor-pointer' color='rgb(59 130 246 / 1)' />
                    </div>
                  </td>
                </tr>
                <tr className='mb-3 dark:bg-slate-800'>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>Luiz</td>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>1298232123</td>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>
                    <div className='flex flex-row gap-3'>
                      <Trash size={18} className='cursor-pointer' color='#F67373' />
                      <Edit size={18} className='cursor-pointer' color='rgb(59 180 246 / 1)' />
                    </div>
                  </td>
                </tr>
                <tr className='mb-3 dark:bg-slate-800'>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>Luiz</td>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>1298232123</td>
                  <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>
                    <div className='flex flex-row gap-3'>
                      <Trash size={18} className='cursor-pointer' color='#F67373' />
                      <Edit size={18} className='cursor-pointer' color='rgb(59 130 246 / 1)' />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div id='wrapper-list'></div>
        </div>
      </main>
    </>
  );
}
