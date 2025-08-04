import {Request,Response} from "express";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {PostCreateInput} from "../input/post-create.input";
import {postService} from "../../application/post.service";
import {mapToPostOutput} from "../mappers/map-to-post-output.util";

export async function createPostHandler(
  req: Request<{}, {}, PostCreateInput>,
  res: Response,
) {
  try {
    const createdPostId = await postService.create(
      req.body.data.attributes,
    );

    const createdPost = await postService.findByIdOrFail(createdPostId);

    const createdPostOut = mapToPostOutput(createdPost);

    res.status(HttpStatus.Created).send(createdPostOut);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
