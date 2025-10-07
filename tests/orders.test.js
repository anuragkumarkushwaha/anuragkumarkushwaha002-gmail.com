
const request = require('supertest');
const app = require('../src/ordersService');
const axios = require('axios');


jest.mock('axios');

describe('GET /orders/:id/details', () => {
    it('should return full order details with user information', async () => {
      
        const mockUser = { id: 1, name: 'Sonu', email: 'Sonu123@gmail.com' };
        const orderId = 101;

       
        axios.get.mockResolvedValue({ data: mockUser });

       
        const response = await request(app).get(`/orders/${orderId}/details`);

      
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            orderId: 101,
            product: 'Laptop',
            amount: 1200,
            user: mockUser
        });
        
       
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/users/1`);
    });
});