
import {BlogAttributes} from "../../../src/services/blog/application/dtos/blog-attributes";

export function getBlogDto(): BlogAttributes {
  return {
    name: 'Feod',
    description: 'description',
    websiteUrl: 'url',
    createdAt: new Date(),
    isMembership: false
  };
}
