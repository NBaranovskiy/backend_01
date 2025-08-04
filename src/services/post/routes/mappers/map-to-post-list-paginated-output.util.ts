import { WithId } from 'mongodb';
import {PostDataOutput} from '../output/post-data.output';
import {ResourceType} from "../../../../core/types/resource-type";
import {Post} from "../../domain/post";
import {PostListPaginatedOutput} from "../output/blog-list-paginated.output";

export function mapToPostListPaginatedOutput(
  posts: WithId<Post>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): PostListPaginatedOutput {
  return {
    meta: {
      page: meta.pageNumber,
      pageSize: meta.pageSize,
      pageCount: Math.ceil(meta.totalCount / meta.pageSize),
      totalCount: meta.totalCount,
    },
    data: posts.map(
      (post): PostDataOutput => ({
        type: ResourceType.Posts,
        id: post._id.toString(),
        attributes: {
          title: post.title,
          shortDescription: post.shortDescription,
          content: post.content,
          blogId: post.blogId

        },
      }),
    ),
  };
}
