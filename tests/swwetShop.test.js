
const request = require('supertest');
const app = require('../app');

describe('Sweet Shop API', () => {
  const sweet = {
    id: 'S001',
    name: 'Kaju Katli',
    category: 'Nut-Based',
    price: 50,
    quantity: 10
  };

  it('should add a sweet', async () => {
    const res = await request(app).post('/sweets').send(sweet);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Kaju Katli');
  });

  it('should view all sweets', async () => {
    const res = await request(app).get('/sweets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should purchase a sweet', async () => {
    const res = await request(app)
      .post('/sweets/S001/purchase')
      .send({ quantity: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Purchase successful');
  });

  it('should restock a sweet', async () => {
    const res = await request(app)
      .post('/sweets/S001/restock')
      .send({ quantity: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Restocked successfully');
  });
});
