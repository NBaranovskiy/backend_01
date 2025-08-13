import { Request, Response } from 'express';

import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {postService} from "../../application/post.service";
import {mapToPostOutput} from "../mappers/map-to-post-output.util";


export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const post = await postService.findById(id);

    // 1. Check if the post exists
    if (!post) {
      // 2. If it doesn't, send a 404 response and RETURN
      res.status(HttpStatus.NotFound).send('Post not found.');
      return
    }

    // 3. This code is only reached if 'post' is NOT null
    //    The TypeScript error is now resolved.
    const postOutput = mapToPostOutput(post);

    res.status(HttpStatus.Ok).send(postOutput);

  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}