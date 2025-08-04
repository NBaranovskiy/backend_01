import { Request, Response } from 'express';
import {blogService} from "../../application/blog.service";
import {mapToBlogOutput} from "../mappers/map-to-driver-output.util";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";


export async function getBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const blog = await blogService.findByIdOrFail(id);

    const blogOutput = mapToBlogOutput(blog);

    res.status(HttpStatus.Ok).send(blogOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
