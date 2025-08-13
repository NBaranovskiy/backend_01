import {Blog} from "../domain/blog";
import {blogCollection} from "../../../db/mongo.db";
import {BlogQueryInput} from "../routes/input/blog-query.input";
import { WithId } from 'mongodb'
import { ObjectId } from 'mongodb'
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found.error";

export const blogsRepository = {
  async findMany(
    queryDto: BlogQueryInput,
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchBlogNameTerm,
      searchBlogdescriptionTerm,
      searchWebsiteUrlTerm,
    } = queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchBlogNameTerm) {
      filter.name = { $regex: searchBlogNameTerm, $options: 'i' };
    }

    if (searchBlogdescriptionTerm) {
      filter.description = { $regex: searchBlogdescriptionTerm, $options: 'i' };
    }
    if (searchWebsiteUrlTerm) {
      filter.websiteUrl = { $regex: searchWebsiteUrlTerm, $options: 'i' };
    }

    const items = await blogCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await blogCollection.countDocuments(filter);

    return { items, totalCount };
  },

  async findById(id: string): Promise<WithId<Blog> | null> {
    return blogCollection.findOne({ _id: new ObjectId(id) });
  },

  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    const res = await blogCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('Driver not exist');
    }
    return res;
  },

  async create(newDriver: Blog): Promise<string> {
    const insertResult = await blogCollection.insertOne(newDriver);

    return insertResult.insertedId.toString();
  },

  async update(id: string, dto: Blog): Promise<void> {
    const updateFields: Partial<Blog> = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
    };

  // Проверяем, было ли поле isMembership передано в DTO
  // Используем hasOwnProperty, чтобы избежать ошибок с undefined
  if (dto.hasOwnProperty('isMembership')) {
    updateFields.isMembership = dto.isMembership;
  }

  const updateResult = await blogCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: updateFields,
    },
  );

    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError('Blog not exist');
    }

    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError('Blog not exist');
    }

    return;
  },
};