import {Router} from "express";
import {
    paginationAndSortingValidation
} from "../../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {inputValidationResultMiddleware} from "../../../core/middlewares/validation/input-validtion-result.middleware";
import {idValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";
import {superAdminGuardMiddleware} from "../../../auth/middlewares/super-admin.guard-middleware";
import {BlogSortField} from "./input/blog-sort-field";
import {getBlogListHandler} from "./handlers/get-blog-list.handler";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {getBlogsPostsListHandler} from "./handlers/get-driver-ride-list.handler";
import {blogCreateInputValidation, blogUpdateInputValidation} from "./blog.input-dto.validation-middlewares";
import {PostSortField} from "../../post/routes/input/post-sort-field";
import {NextFunction} from 'express';


export const blogRoute = Router({});

blogRoute
    .get(
        '',
        paginationAndSortingValidation(BlogSortField),
        inputValidationResultMiddleware,
        getBlogListHandler,
    )
    .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)

  .post(
    '',
    blogCreateInputValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )

  .put(
    '/:id',
    idValidation,
    blogUpdateInputValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .delete(
    '/:id',
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  )

  .get(
    '/:id/posts',
    idValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    getBlogsPostsListHandler,
  );
