import { Request, Response } from 'express';
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {PostQueryInput} from "../../../post/routes/input/post-query.input";
import {postService} from "../../../post/application/post.service";
import {mapToPostListPaginatedOutput} from "../../../post/routes/mappers/map-to-post-list-paginated-output.util";


export async function getBlogsPostsListHandler(
  req: Request<{ blogId: string }, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const blogId = req.params.blogId;
    const queryInput = req.query;

    const { items, totalCount } = await postService.findPostByBlog(
      queryInput,
      blogId,
    );

    const PostListOutput = mapToPostListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });
    res.send(PostListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
