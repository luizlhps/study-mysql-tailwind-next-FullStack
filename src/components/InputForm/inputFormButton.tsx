import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

interface IProps {
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  nameButton: string;
  onSubmit: (data: any) => void;
}

export const inputFormButton = ({ nameButton, handleSubmit, onSubmit }: IProps) => {
  return (
    <button
      onClick={handleSubmit(onSubmit)}
      className='w-72 bg-white text-gray-900 ring-1 hover:bg-white/80 px-4 h-12 rounded-lg md:w-52'
    >
      {nameButton}
    </button>
  );
};
