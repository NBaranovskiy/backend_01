import { Collection, Db, MongoClient } from 'mongodb';

import { SETTINGS } from '../core/settings/settings';
import {Blog} from "../services/blog/domain/blog";
import {Post} from "../services/post/domain/post"; // Убедитесь, что этот путь верен

const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogCollection: Collection<Blog>; // Изменено на blogCollection
export let postCollection: Collection<Post>; // Изменено на postCollection

/**
 * Устанавливает соединение с MongoDB и инициализирует коллекции.
 * @param url URI для подключения к MongoDB.
 */
export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME); // Используем имя базы данных из настроек

  blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME); // Инициализация коллекции блогов
  postCollection = db.collection<Post>(POST_COLLECTION_NAME); // Инициализация коллекции постов

  try {
    await client.connect(); // Подключаемся к MongoDB
    await db.command({ ping: 1 }); // Проверяем соединение
    console.log('✅ Connected to the database');
  } catch (e) {
    console.error(`❌ Database is not connected: ${e}`);
    await client.close(); // Закрываем соединение в случае ошибки
    throw e; // Перебрасываем ошибку для дальнейшей обработки
  }
}

/**
 * Закрывает соединение с MongoDB.
 */
export async function stopDb(): Promise<void> {
  if (!client) {
    throw new Error(`❌ No active client`);
  }
  await client.close();
  console.log('✅ Disconnected from the database');
}