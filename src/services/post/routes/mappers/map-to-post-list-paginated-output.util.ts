// map-to-post-list-paginated-output.util.ts
import { WithId } from 'mongodb';
import { Post } from "../../domain/post";
import { PostOutput } from "../output/post.output";
import { mapToPostOutput } from './map-to-post-output.util';

// Тип PostListPaginatedOutput теперь должен быть плоским
export type PostListPaginatedOutput = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutput[];
};

export function mapToPostListPaginatedOutput(
  posts: WithId<Post>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): PostListPaginatedOutput {
  const pagesCount = Math.ceil(meta.totalCount / meta.pageSize);
  return {
    pagesCount,
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: posts.map(mapToPostOutput), // Используем обновлённый маппер
  };
}