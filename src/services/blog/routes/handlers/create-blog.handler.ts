
import {Request,Response} from "express";
import {blogService} from "../../application/blog.service";
import {mapToBlogOutput} from "../mappers/map-to-driver-output.util";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";

export async function createBlogHandler(
  req: Request,
  res: Response,
) {
  try {
    const createdBlogId = await blogService.create(
      req.body,
    );

    const createdBlog = await blogService.findByIdOrFail(createdBlogId);

    const blogOutput = mapToBlogOutput(createdBlog);

    res.status(HttpStatus.Created).send(blogOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
