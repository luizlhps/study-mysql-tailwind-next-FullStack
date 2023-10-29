import React, { ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface IProps {
  errors: FieldErrors<any>;
  name: string;
}

export const inputFormError = ({ errors, name }: IProps) => {
  return (
    <>
      {errors?.name?.type === 'required' && (
        <p className='text-red-600 text-left text-sm ml-2 mt-2'>Please write your name</p>
      )}
    </>
  );
};
