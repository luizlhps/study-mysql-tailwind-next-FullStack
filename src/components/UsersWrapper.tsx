'use client';

import React, { useEffect, useState } from 'react';
import { CreateUser } from './CreateUser';
import { TableUsers } from './TableUsers';
import { useDispatch } from 'react-redux';
import fetchUsersSlice, { fetchUsers } from '@/lib/redux/slices/fetchUsersSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { Modal } from './Modal';

export const UsersWrapper = () => {
  return (
    <>
      <main id='container' className='min-h-screen sm:m-6 flex justify-center items-center'>
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
                <stop offset='1' stopColor='#2433c2'></stop>
              </radialGradient>
            </defs>
          </svg>
          <CreateUser />

          <div id='divider' className='w-full h-px bg-white/20 mt-10 mb-10' />
          <TableUsers />
          <div id='wrapper-list'></div>
        </div>
      </main>
    </>
  );
};
