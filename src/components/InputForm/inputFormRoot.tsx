import React, { ReactNode } from 'react';

export const inputFormRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div id='wrapper-inputs' className='flex gap-2 justify-center  mt-6 flex-wrap	'>
      {children}
    </div>
  );
};
