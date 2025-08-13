import {Router} from "express";
import {
    paginationAndSortingValidation
} from "../../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {inputValidationResultMiddleware} from "../../../core/middlewares/validation/input-validtion-result.middleware";
import {
    dataIdMatchValidation,
    idValidation
} from "../../../core/middlewares/validation/params-id.validation-middleware";
import {superAdminGuardMiddleware} from "../../../auth/middlewares/super-admin.guard-middleware";
import {BlogSortField} from "./input/blog-sort-field";
import {getBlogListHandler} from "./handlers/get-blog-list.handler";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {getBlogsPostsListHandler} from "./handlers/get-driver-ride-list.handler";
import {PostSortField} from "../../post/routes/input/post-sort-field";
import {NextFunction} from 'express';
import {descriptionValidation, nameValidation, websiteUrlValidation} from "./blog.input-dto.validation-middlewares";
import {createBlogsPostsListHandler} from "./handlers/create-postToIdBlog.handler";
import {
    contentValidation,
    shortDescriptionValidation,
    titleValidation
} from "../../post/routes/post.input-dto.validation-middlewares";


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
    superAdminGuardMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )
  .post(
    '/:id/posts',
    superAdminGuardMiddleware,
    idValidation,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    createBlogsPostsListHandler,
    )

  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .delete(
    '/:id',
    superAdminGuardMiddleware,
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
