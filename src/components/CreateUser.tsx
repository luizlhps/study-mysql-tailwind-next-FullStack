'use client';

import { useForm } from 'react-hook-form';
import { Api } from '../services/axiosConfig';
import { useRouter } from 'next/navigation';
import fetchUsersSlice, { addUser, fetchUsers } from '@/lib/redux/slices/fetchUsersSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { useEffect } from 'react';
import { IUsers } from './TableUsers';

export const CreateUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUsers>();
  const dispatch = useAppDispatch();
  const stateChargedInFetchUsers = useAppSelector((state) => state?.fetchUsers.usersChangedTotal);

  //call Api
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  //call Api after 5 charged in fetchUsers state
  useEffect(() => {
    if (stateChargedInFetchUsers === 5) {
      dispatch(fetchUsers());
      console.log('exec');
    }
    console.log(stateChargedInFetchUsers);
  }, [stateChargedInFetchUsers]);

  const onSubmit = (data: IUsers) => {
    Api.post('user', data)
      .then((res) => {
        console.log(res.data);
        dispatch(addUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id='wrapper-create' className='text-center '>
      <h1 className='font-bold text-3xl'>Create Users</h1>
      <p className='mt-6 text-lg leading-8 text-gray-300'>Complete form for create new user</p>
      <div id='wrapper-inputs' className='flex gap-2 justify-center  mt-6 flex-wrap	'>
        <div>
          <input
            {...register('name', { required: true })}
            id='inputs-name'
            placeholder='Name'
            className=' sm:flex items-center  w-72 text-left text-base px-4 h-12 ring-1 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700'
          />
          {errors?.name?.type === 'required' && (
            <p className='text-red-600 text-left text-sm ml-2 mt-2'>Please write your name</p>
          )}
        </div>
        <div>
          <input
            {...register('phone', { required: true })}
            id='inputs-numero'
            placeholder='Phone'
            className=' sm:flex items-center w-72 text-left text-base px-4 h-12 ring-1 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700'
          />
          {errors?.phone?.type === 'required' && (
            <p className='text-red-600 text-left text-sm ml-2 mt-2'>Please write your name</p>
          )}
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className='w-72 bg-white text-gray-900 ring-1 hover:bg-white/80 px-4 h-12 rounded-lg md:w-52'
        >
          New
        </button>
      </div>
    </div>
  );
};
