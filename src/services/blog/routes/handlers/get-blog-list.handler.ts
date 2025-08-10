// src/services/blog/handlers/get-blog-list.handler.ts

import { Request, Response } from 'express';

import { errorsHandler } from '../../../../core/errors/errors.handler';
import { mapToBlogListPaginatedOutput } from '../mappers/map-to-blog-list-paginated-output.util';
import {BlogQueryInput} from '../input/blog-query.input';
import {setDefaultSortAndPaginationIfNotExist} from "../../../../core/types/set-default-sort-and-pagination";
import {blogService} from "../../application/blog.service";
import {HttpStatus} from "../../../../core/types/http-statuses";

export async function getBlogListHandler(
  req: Request<{}, {}, {}, BlogQueryInput>,
  res: Response,
) {
  try {
    const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);

    const { items, totalCount } = await blogService.findMany(queryInput);

    const blogListOutput = mapToBlogListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });


    res.status(HttpStatus.Ok).send(blogListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}