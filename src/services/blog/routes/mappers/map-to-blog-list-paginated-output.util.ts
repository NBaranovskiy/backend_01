import { WithId } from 'mongodb';
import {Blog} from "../../domain/blog";
import {BlogListPaginatedOutput} from "../output/blog-list-paginated.output";
import {ResourceType} from "../../../../core/types/resource-type";
import {mapToBlogOutput} from "./map-to-driver-output.util";

export function mapToBlogListPaginatedOutput(
  blogs: WithId<Blog>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): BlogListPaginatedOutput {
  const pagesCount = Math.ceil(meta.totalCount / meta.pageSize);

  return {
    pagesCount,
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    // Используем mapToBlogOutput, чтобы преобразовать каждый блог в плоский объект
    items: blogs.map(mapToBlogOutput),
  };
}
