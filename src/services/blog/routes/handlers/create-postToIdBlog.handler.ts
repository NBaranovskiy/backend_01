import { Request, Response } from 'express';
import {blogService} from "../../application/blog.service";
import {mapToBlogOutput} from "../mappers/map-to-driver-output.util";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {postService} from "../../../post/application/post.service";
import {mapToPostOutput} from "../../../post/routes/mappers/map-to-post-output.util";


export async function createBlogsPostsListHandler(
  req: Request<{ blogId: string }>,
  res: Response,
) {
  try {
    const id = req.params.blogId;

    const blog = await blogService.findById(id);

    if (!blog) {
      res.status(HttpStatus.NotFound).send('Blog not found');
      return
    }

    const postData = {
      ...req.body,
      blogId: id,
      blogName: blog.name
    };
    const createdPostId = await postService.create(
      postData,
    );
    const createdPost = await postService.findByIdOrFail(createdPostId);
    const createdPostOut = mapToPostOutput(createdPost);

    res.status(HttpStatus.Created).send(createdPostOut);

  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}