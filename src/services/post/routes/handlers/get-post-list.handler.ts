import { Request, Response } from 'express';

import { errorsHandler } from '../../../../core/errors/errors.handler';

import {setDefaultSortAndPaginationIfNotExist} from "../../../../core/types/set-default-sort-and-pagination";
import {PostQueryInput} from "../input/post-query.input";
import {postService} from "../../application/post.service";
import {mapToPostListPaginatedOutput} from "../mappers/map-to-post-list-paginated-output.util";



export async function getPostListHandler(
  req: Request<{}, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);

    const { items, totalCount } = await postService.findMany(queryInput);

    const postListOutput = mapToPostListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.send(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
