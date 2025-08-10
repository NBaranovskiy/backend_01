
import { WithId } from 'mongodb'
import {postRepository} from "../repositories/post.repository";
import {PostQueryInput} from "../routes/input/post-query.input";
import {PostAttributes} from "./dtos/post-attributes";



export const postService = {
  async findMany(
    queryDto: PostQueryInput,
  ): Promise<{ items: WithId<PostAttributes>[]; totalCount: number }> {
    return postRepository.findMany(queryDto);
  },

  async findByIdOrFail(id: string): Promise<WithId<PostAttributes>> {
    return postRepository.findByIdOrFail(id);
  },

  async create(dto: PostAttributes): Promise<string> {
    const newPost: PostAttributes = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: dto.blogName,
      createdAt: dto.createdAt
    };

    return postRepository.create(newPost);
  },

  async update(id: string, dto: PostAttributes): Promise<void> {
    await postRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {

    await postRepository.delete(id);
    return;
  },

  async findPostByBlog(
    queryDto: PostQueryInput,
    blogId: string,
  ): Promise<{ items: WithId<PostAttributes>[]; totalCount: number }> {
    await postRepository.findByIdOrFail(blogId);
    return postRepository.findPostsByBlog(queryDto, blogId);
  }
};