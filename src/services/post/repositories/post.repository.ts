
import {postCollection} from "../../../db/mongo.db";

import { WithId } from 'mongodb'
import { ObjectId } from 'mongodb'
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found.error";
import {PostQueryInput} from "../routes/input/post-query.input";
import {Post} from "../domain/post";

export const postRepository = {
  async findMany(
    queryDto: PostQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchPostTitleTerm,
      searchPostshortDescriptionTerm,
      searchPostcontentTerm,
      searchPostBlogIdTerm,
    } = queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchPostTitleTerm) {
      filter.title = { $regex: searchPostTitleTerm, $options: 'i' };
    }

    if (searchPostshortDescriptionTerm) {
      filter.shortDescription = { $regex: searchPostshortDescriptionTerm, $options: 'i' };
    }
    if (searchPostcontentTerm) {
      filter.content = { $regex: searchPostcontentTerm, $options: 'i' };
    }
    if (searchPostBlogIdTerm) {
      filter.blogId = { $regex: searchPostBlogIdTerm, $options: 'i' };
    }

    const items = await postCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await postCollection.countDocuments(filter);

    return { items, totalCount };
  },

  async findById(id: string): Promise<WithId<Post> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) });
  },

  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    const res = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('Post not exist');
    }
    return res;
  },

  async create(newPost: Post): Promise<string> {
    const insertResult = await postCollection.insertOne(newPost);
    return insertResult.insertedId.toString();
  },

  async update(id: string, dto: Post): Promise<void> {
    const updateResult = await postCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError('Post not exist');
    }

    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError('Post not exist');
    }

    return;
  },
  async findPostsByBlog(
    queryDto: PostQueryInput,
    blogId: string,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter = { 'blog.id': blogId };
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      postCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      postCollection.countDocuments(filter),
    ]);
    return { items, totalCount };
  },
};