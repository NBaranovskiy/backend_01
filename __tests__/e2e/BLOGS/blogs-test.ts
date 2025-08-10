import request from 'supertest';
import {HttpStatus} from "../../../src/core/types/http-statuses";
import app from "../../../src";

describe('Blogs API', () => {
    // Очистка базы данных перед каждым тестом
    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data');
    });

    it('GET /blogs should return an empty array if no blogs exist', async () => {
        await request(app)
            .get('/api/blogs')
            .expect(HttpStatus.Ok)
            .expect({ pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] });
    });

    it('POST /blogs should create a new blog and return it', async () => {
        const newBlog = {
            name: 'Test Blog',
            description: 'This is a test blog',
            websiteUrl: 'https://test.com'
        };

        const res = await request(app)
            .post('/api/blogs')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5') // Базовый заголовок авторизации для 'admin:qwerty'
            .send(newBlog)
            .expect(HttpStatus.Created);

        expect(res.body).toEqual({
            id: expect.any(String),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl
        });
    });
    
    it('GET /blogs/:id should return a blog by id', async () => {
        // Создаем блог для тестирования
        const newBlog = { name: 'Get Blog', description: 'Test get', websiteUrl: 'https://get.com' };
        const createRes = await request(app)
            .post('/api/blogs')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send(newBlog);

        const blogId = createRes.body.id;

        // Получаем созданный блог
        const getRes = await request(app)
            .get(`/api/blogs/${blogId}`)
            .expect(HttpStatus.Ok);

        expect(getRes.body.id).toBe(blogId);
        expect(getRes.body.name).toBe(newBlog.name);
    });

    it('PUT /blogs/:id should update a blog and return 204', async () => {
        const newBlog = { name: 'Old Blog', description: 'Old desc', websiteUrl: 'https://old.com' };
        const createRes = await request(app)
            .post('/api/blogs')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send(newBlog);

        const blogId = createRes.body.id;

        const updatedBlog = { name: 'Updated Blog', description: 'Updated desc', websiteUrl: 'https://updated.com' };

        await request(app)
            .put(`/api/blogs/${blogId}`)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send(updatedBlog)
            .expect(HttpStatus.NoContent);

        // Проверяем, что блог действительно обновился
        const getRes = await request(app)
            .get(`/api/blogs/${blogId}`)
            .expect(HttpStatus.Ok);
        
        expect(getRes.body.name).toBe(updatedBlog.name);
    });
    
    it('DELETE /blogs/:id should delete a blog and return 204', async () => {
        const newBlog = { name: 'To be deleted', description: '...', websiteUrl: 'https://delete.com' };
        const createRes = await request(app)
            .post('/api/blogs')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send(newBlog);

        const blogId = createRes.body.id;

        await request(app)
            .delete(`/api/blogs/${blogId}`)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(HttpStatus.NoContent);

        // Проверяем, что блог больше не существует
        await request(app)
            .get(`/api/blogs/${blogId}`)
            .expect(HttpStatus.NotFound);
    });
});