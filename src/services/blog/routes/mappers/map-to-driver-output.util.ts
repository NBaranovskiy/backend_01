// src/services/blog/mappers/map-to-blog-output.util.ts

import { WithId } from 'mongodb';
import { BlogOutput } from '../output/blog.output';
import {Blog} from "../../domain/blog";

export function mapToBlogOutput(Blog: WithId<Blog>): BlogOutput {
  return {
    id: Blog._id.toString(),
    name: Blog.name,
    websiteUrl: Blog.websiteUrl,
    description: Blog.description,
    isMembership: Blog.isMembership,
    createdAt: Blog.createdAt,
  };
}
