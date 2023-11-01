'use client';

import { useForm } from 'react-hook-form';
import { Api } from '../services/axiosConfig';
import { useRouter } from 'next/navigation';
import fetchUsersSlice, { addUser, fetchUsers } from '@/lib/redux/slices/fetchUsersSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { useEffect } from 'react';
import { IUsers } from './TableUsers';
import { InputForm } from './InputForm';

export const CreateUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUsers>();
  const dispatch = useAppDispatch();
  const stateChargedInFetchUsers = useAppSelector((state) => state?.fetchUsers.usersChangedTotal);
  const limitFetchUsers = useAppSelector((state) => state?.fetchUsers.limit);
  const pageFetchUsers = useAppSelector((state) => state?.fetchUsers.page);


  //call Api after 5 charged in fetchUsers state
  useEffect(() => {
    if (stateChargedInFetchUsers === 5) {
      dispatch(fetchUsers({limit: limitFetchUsers, skip:pageFetchUsers}));
    }
  }, [stateChargedInFetchUsers]);

  const onSubmit = (data: IUsers) => {
    Api.post('user', data)
      .then((res) => {
        console.log(res.data);
        dispatch(fetchUsers({limit: limitFetchUsers, skip:pageFetchUsers}));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id='wrapper-create' className='text-center '>
      <h1 className='font-bold text-3xl'>Create Users</h1>
      <p className='mt-6 text-lg leading-8 text-gray-300'>Complete form for create new user</p>
      <InputForm.Root>
        <InputForm.Input name='name' register={register} placeholder='Name'>
          <InputForm.Error errors={errors} name='name' />
        </InputForm.Input>

        <InputForm.Input name='phone' register={register} placeholder='Phone'>
          <InputForm.Error errors={errors} name='phone' />
        </InputForm.Input>

        <InputForm.Button handleSubmit={handleSubmit} nameButton='New' onSubmit={onSubmit}></InputForm.Button>
      </InputForm.Root>
    </div>
  );
};
