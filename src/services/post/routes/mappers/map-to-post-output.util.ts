import { WithId } from 'mongodb';
import { PostOutput } from '../output/post.output';
import {ResourceType} from "../../../../core/types/resource-type";
import {Post} from "../../domain/post";

export function mapToPostOutput(Post: WithId<Post>): PostOutput {
  return {
    data: {
      type: ResourceType.Posts,
      id: Post._id.toString(),
      attributes: {
        title: Post.title,
        shortDescription: Post.shortDescription,
        content: Post.content,
        blogId: Post.blogId
      },
    },
  };
}
