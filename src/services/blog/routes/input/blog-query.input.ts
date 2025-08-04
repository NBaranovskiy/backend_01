
import {BlogSortField} from './blog-sort-field';
import {PaginationAndSorting} from "../../../../core/types/pagination-and-sorting";

export type BlogQueryInput = PaginationAndSorting<BlogSortField> &
  Partial<{
    searchBlogNameTerm: string;
    searchBlogdescriptionTerm: string;
    searchWebsiteUrlTerm: string;
  }>;
