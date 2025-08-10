// src/services/post/mappers/map-to-post-output.util.ts
import { WithId } from 'mongodb';
import { Post } from "../../domain/post";
import { PostOutput } from "../output/post.output";

export function mapToPostOutput(post: WithId<Post>): PostOutput {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogId,
    createdAt: post.createdAt,
  };
}