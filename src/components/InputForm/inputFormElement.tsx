import React, { ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder?: string;
  children?: ReactNode;
}

export const inputFormElement = ({ register, name, placeholder, children }: IProps) => {
  return (
    <div>
      <input
        {...register(name, { required: true })}
        id={`input-${name}`}
        placeholder={placeholder ?? ''}
        className=' sm:flex items-center  w-72 text-left text-base px-4 h-12 ring-1 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700'
      />
      {children}
    </div>
  );
};
