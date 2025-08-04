import {BlogAttributes} from "../../application/dtos/blog-attributes";
import {ResourceType} from "../../../../core/types/resource-type";


export type BlogCreateInput = {
  data: {
    type: ResourceType.Blogs;
    attributes: BlogAttributes;
  };
};
