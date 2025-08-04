import { WithId } from 'mongodb';
import { BlogOutput } from '../output/blog.output';
import {Blog} from "../../domain/blog";
import {ResourceType} from "../../../../core/types/resource-type";

export function mapToBlogOutput(Blog: WithId<Blog>): BlogOutput {
  return {
    data: {
      type: ResourceType.Blogs,
      id: Blog._id.toString(),
      attributes: {
        name: Blog.name,
        websiteUrl: Blog.websiteUrl,
        description: Blog.description,
        isMembership: Blog.isMembership,
        createdAt: Blog.createdAt,
      },
    },
  };
}
