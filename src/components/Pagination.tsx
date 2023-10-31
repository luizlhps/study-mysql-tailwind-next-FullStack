import React, { useEffect, useState } from 'react';

interface IProps {
  page?: number;
  totalPage: number;
  onChange?: any;
}

export const Pagination = ({ page, totalPage, onChange }: IProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [arrayOfPages, setArrayOfPages] = useState<(string | number)[]>([]);

  //como sei se preciso de mais uma pagina ?
  // se o limite é 10 e eu tenho 11 listas
  // preciso de 2 paginas
  //logo 11/10 1.1
  //e se eu tiver 10 de limite e 23 arquivos ?
  //23/10 2.3

  const totalPages = totalPage;
  const maxVisiblePages = 5;

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }
  }, [page]);

  useEffect(() => {
    const pageNumbers = [];
    let fillArray;

    switch (true) {
      case currentPage < maxVisiblePages && totalPages >= 6:
        fillArray = new Array(maxVisiblePages).fill(undefined).map((_, index) => index + 1);
        pageNumbers.push(...fillArray, '...', totalPages);
        break;

      case currentPage > totalPages - maxVisiblePages + 1 && totalPages >= 6:
        fillArray = new Array(maxVisiblePages).fill(undefined).map((_, index) => totalPages - 4 + index);
        pageNumbers.push(1, '...', ...fillArray);
        break;

      case currentPage < maxVisiblePages:
        fillArray = new Array(totalPages).fill(undefined).map((_, index) => index + 1);
        pageNumbers.push(...fillArray)
        break;

      case currentPage > totalPages - maxVisiblePages + 1:
        fillArray = new Array(totalPages).fill(undefined).map((_, index) => index + 1);
        pageNumbers.push(...fillArray)
        break;

      default:
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    setArrayOfPages(pageNumbers);
  }, [currentPage]);

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') setCurrentPage(page);
  };

  return (
    <div className='flex justify-end mt-8'>
      {arrayOfPages.map((page: number | string, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className='self-end'>...</span>
          ) : (
            <div
              onClick={() => (onChange ? onChange(page) : handlePageChange(page))}
              className={
                currentPage === page
                  ? 'dark:bg-slate-800 w-8 h-8 bg-slate- flex justify-center items-center rounded-full cursor-pointer'
                  : ' w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'
              }
            >
              {page}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
