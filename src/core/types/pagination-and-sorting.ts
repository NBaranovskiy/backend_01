// core/types/pagination-and-sorting.ts
import { SortDirection } from './sort-direction';

export type PaginationAndSorting<T> = {
  pageNumber: number;
  pageSize: number;
  sortBy: T;
  sortDirection: SortDirection;
};

// A universal default object for pagination and sorting
export const paginationAndSortingDefault = {
  pageNumber: 1,
  pageSize: 10,
  sortBy: 'createdAt',
  sortDirection: SortDirection.Desc,
};