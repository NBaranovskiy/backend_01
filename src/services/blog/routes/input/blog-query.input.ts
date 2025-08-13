
import { PaginationAndSorting } from '../../../../core/types/pagination-and-sorting';
import {BlogSortField} from "./blog-sort-field";

// Объединяем пагинацию/сортировку и поля поиска
export type BlogQueryInput = PaginationAndSorting<BlogSortField> & {
  searchBlogNameTerm?: string;
};
