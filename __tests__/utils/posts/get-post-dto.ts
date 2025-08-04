import {Post} from "../../../src/services/post/domain/post";


export function getPostDto(postId: string): {
  postId: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string
} {
  return {
    postId,
    title: 'Post one',
    shortDescription: 'The desciption',
    content: 'some content',
    blogId: 'some blogId'
  };
}