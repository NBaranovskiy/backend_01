import {Router} from "express";
import {
    paginationAndSortingValidation
} from "../../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {inputValidationResultMiddleware} from "../../../core/middlewares/validation/input-validtion-result.middleware";
import {idValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";
import {superAdminGuardMiddleware} from "../../../auth/middlewares/super-admin.guard-middleware";
import {PostSortField} from "./input/post-sort-field";
import {getPostHandler} from "./handlers/get-post.handler";
import {getPostListHandler} from "./handlers/get-post-list.handler";
import {createPostHandler} from "./handlers/create-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";
import {titleValidation,shortDescriptionValidation,contentValidation} from "./post.input-dto.validation-middlewares"
export const postRoute = Router({});


postRoute
    .get(
        '',
        paginationAndSortingValidation(PostSortField),
        inputValidationResultMiddleware,
        getPostListHandler,
    )
    .get('/:id', idValidation, inputValidationResultMiddleware, getPostHandler)

  .post(
    '',
    superAdminGuardMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )

  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )

  .delete(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  );