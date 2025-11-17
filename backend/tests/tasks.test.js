import request from 'supertest';
import { app } from '../src/index.js';
import { createUserAndGetToken } from './setupEnv.js';

describe('Tasks API', () => {
  it('requires auth', async () => {
    await request(app).get('/api/tasks').expect(401);
  });

  it('creates, lists, updates and deletes tasks', async () => {
    const token = await createUserAndGetToken();

    // create
    const created = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'First Task' })
      .expect(201);
    expect(created.body.task.title).toBe('First Task');

    const id = created.body.task._id;

    // list
    const list = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(list.body.tasks.length).toBe(1);

    // update
    const updated = await request(app)
      .put(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true })
      .expect(200);
    expect(updated.body.task.completed).toBe(true);

    // delete
    await request(app)
      .delete(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const list2 = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(list2.body.tasks.length).toBe(0);
  });
});
