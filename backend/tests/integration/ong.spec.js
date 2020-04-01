const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(() => {
        connection.destroy();
    });

    it('should be able to create an ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "new ONG",
            email: "contato@contato.com",
            whatsapp: "11000000000",
            city: "Rio do Sul",
            uf: "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

     it('should be able to list all ONGs', async () => {
         const response = await request(app).get('/ongs');
         expect(200);
     });

});