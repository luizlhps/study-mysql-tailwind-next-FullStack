import React, { ReactNode, useEffect, useRef } from 'react';
interface IProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}

export const Modal = ({ children, open, handleClose }: IProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'modal-background') {
      handleClose();
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      const modalNode = modalRef.current;
      modalNode.style.display = open ? 'flex' : 'none';
    }
    if (open) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [open]);

  return (
    <>
      <div
        ref={modalRef}
        onClick={handleCloseModal}
        id='modal-background'
        className='hidden w-full h-full bg-black/75 fixed left-0 top-0 right-0 bottom-0 overflow-hidden transition-all justify-center items-center  duration-300 ease-in-out delay-150'
      >
        <div className='bg-gray-900 p-16 rounded-lg'>{children}</div>
      </div>
    </>
  );
};
