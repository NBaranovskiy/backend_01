// core/utils/pagination-utils.ts
import { paginationAndSortingDefault } from '../types/pagination-and-sorting';
import { PaginationAndSorting } from '../types/pagination-and-sorting';

export function setDefaultSortAndPaginationIfNotExist<P extends string>(
  query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<P> {
  const sortBy = (query.sortBy ?? paginationAndSortingDefault.sortBy) as P;

  return {
    ...paginationAndSortingDefault,
    ...query,
    sortBy,
  };
}