import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import userRoutes from '../Backend/src/routes/admin.js';
// Mock the middleware
jest.mock('../Backend/src/middleware/auth.js', () => ({
  authenticateToken: jest.fn((req, res, next) => {
    req.user = { id: 'mockAdminId', role: 'admin' };
    next();
  }),
  authorizeRole: jest.fn((roles) => (req, res, next) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  })
}));

describe('User Management Routes', () => {
  let app;
  let testUser;

  beforeAll(async () => {
    // Setup express app
    app = express();
    app.use(express.json());
    app.use('/api', userRoutes);
  });

  beforeEach(async () => {
    // Create a test user
    testUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: 'testuser@example.com',
      password: 'hashedpassword',
      role: 'student',
      status: 'active'
    });
    await testUser.save();
  });

  afterEach(async () => {
    // Clear the database
    await User.deleteMany({});
  });

  describe('GET /api/users', () => {
    it('should retrieve all users for admin', async () => {
      const response = await request(app).get('/api/users');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].password).toBeUndefined();
    });
  });

  describe('PATCH /api/users/:id/status', () => {
    it('should update user status', async () => {
      const response = await request(app)
        .patch(`/api/users/${testUser._id}/status`)
        .send({ status: 'suspended' });

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('suspended');
    });

    it('should return 400 for invalid status', async () => {
      const response = await request(app)
        .patch(`/api/users/${testUser._id}/status`)
        .send({ status: 'invalid-status' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Invalid status');
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .patch(`/api/users/${fakeId}/status`)
        .send({ status: 'suspended' });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PATCH /api/users/:id/role', () => {
    it('should update user role', async () => {
      const response = await request(app)
        .patch(`/api/users/${testUser._id}/role`)
        .send({ role: 'coach' });

      expect(response.statusCode).toBe(200);
      expect(response.body.role).toBe('coach');
    });

    it('should return 400 for invalid role', async () => {
      const response = await request(app)
        .patch(`/api/users/${testUser._id}/role`)
        .send({ role: 'invalid-role' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Invalid role');
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .patch(`/api/users/${fakeId}/role`)
        .send({ role: 'coach' });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app).delete(`/api/users/${testUser._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('User deleted successfully');

      // Verify user was actually deleted
      const deletedUser = await User.findById(testUser._id);
      expect(deletedUser).toBeNull();
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).delete(`/api/users/${fakeId}`);

      expect(response.statusCode).toBe(404);
    });
  });

  describe('Authorization Middleware', () => {
    it('should prevent non-admin access', async () => {
      // Override the authenticateToken mock to simulate a non-admin user
      authenticateToken.mockImplementationOnce((req, res, next) => {
        req.user = { id: 'mockUserId', role: 'student' };
        next();
      });

      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(403);
    });
  });
});