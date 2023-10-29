'use client';

import { Api } from '../services/axiosConfig';
import { use, useEffect, useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { addUser, fetchUsers, removeUser } from '@/lib/redux/slices/fetchUsersSlice';
import { Modal } from './Modal';
import { UpdateUser } from './UpdateUser';

export interface IUsers {
  phone: string;
  name: string;
  id: number;
}

export const TableUsers = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.fetchUsers.users);
  const stateChargedInFetchUsers = useAppSelector((state) => state?.fetchUsers.usersChangedTotal);

  const [openModal, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IUsers>();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  //call Api
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  //call Api after 5 charged in fetchUsers state
  useEffect(() => {
    if (stateChargedInFetchUsers === 5) {
      dispatch(fetchUsers());
    }
  }, [stateChargedInFetchUsers]);

  const handleDelete = (id: IUsers['id']) => {
    Api.delete(`user/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(removeUser(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal handleClose={handleClose} open={openModal}>
        {selectedItem && <UpdateUser selectedItem={selectedItem} handleClose={handleClose} />}
      </Modal>

      <div id='table-users' className='overflow-x-auto'>
        <table className='min-w-full table-auto '>
          <thead>
            <tr>
              <th className='w-96 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                User
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
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
                      onClick={() => {
                        setSelectedItem(data);
                        handleOpen();
                      }}
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
    </>
  );
};
