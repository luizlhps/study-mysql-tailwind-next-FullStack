import React, { ReactNode, useEffect } from 'react';
interface IProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}

export const Modal = ({ children, open, handleClose }: IProps) => {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'modal-background') {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          onClick={handleCloseModal}
          id='modal-background'
          className='w-full h-full bg-black/75 fixed left-0 top-0 right-0 bottom-0 overflow-hidden flex justify-center items-center'
        >
          <div className='bg-gray-900 p-16 rounded-lg'>{children}</div>
        </div>
      )}
    </>
  );
};
