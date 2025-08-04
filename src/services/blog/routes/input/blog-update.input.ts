
import {BlogAttributes} from "../../application/dtos/blog-attributes";
import {ResourceType} from "../../../../core/types/resource-type";

export type BlogUpdateInput = {
  data: {
    type: ResourceType.Blogs;
    id: string;
    attributes: BlogAttributes;
  };
};
