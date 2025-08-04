import {BlogAttributes} from "./dtos/blog-attributes";
import {BlogQueryInput} from "../routes/input/blog-query.input";
import { WithId } from 'mongodb'
import {blogsRepository} from "../repositories/blog.repository";


export const blogService = {
  async findMany(
    queryDto: BlogQueryInput,
  ): Promise<{ items: WithId<BlogAttributes>[]; totalCount: number }> {
    return blogsRepository.findMany(queryDto);
  },

  async findByIdOrFail(id: string): Promise<WithId<BlogAttributes>> {
    return blogsRepository.findByIdOrFail(id);
  },

  async create(dto: BlogAttributes): Promise<string> {
    const newBlog: BlogAttributes = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      createdAt: new Date(),
      isMembership: dto.isMembership,
    };

    return blogsRepository.create(newBlog);
  },

  async update(id: string, dto: BlogAttributes): Promise<void> {
    await blogsRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {

    await blogsRepository.delete(id);
    return;
  },
};