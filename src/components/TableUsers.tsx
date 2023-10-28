'use client';

import { Api } from '../services/axiosConfig';
import { useEffect, useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { fetchUsers } from '@/lib/redux/slices/fetchUsersSlice';

export interface IUsers {
  phone: string;
  name: string;
  id: number;
}

export const TableUsers = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.fetchUsers.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: IUsers['id']) => {
    console.log(id);

    Api.delete(`user/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(fetchUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id='table-users' className='overflow-x-auto'>
      <table className='min-w-full table-auto '>
        <thead>
          <tr>
            <th className='w-96 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              User
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-white/20 '>
          {user?.map((data) => (
            <tr key={data.id} className='mb-3 dark:bg-slate-800'>
              <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>{data.name}</td>
              <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>{data.phone}</td>
              <td className='text-left px-4 py-2 sm:px-6 sm:py-4'>
                <div className='flex flex-row gap-3'>
                  <Trash onClick={() => handleDelete(data.id)} size={18} className='cursor-pointer' color='#F67373' />
                  <Edit
                    onClick={() => console.log(data.id)}
                    size={18}
                    className='cursor-pointer'
                    color='rgb(59 130 246 / 1)'
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
