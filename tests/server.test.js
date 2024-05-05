const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');

afterAll(async () => {
    await new Promise(resolve => server.close(resolve)); // Ensure server is closed
    await mongoose.connection.close(); // Close mongoose connection
});


// tests/register.test.js
describe('POST /register', () => {
  it('should register a new user and return 201 status', async () => {
    const newUser = {
      username: 'testUser',
      password: 'password123',
      email: 'test@example.com',
      waive: 'no',
      semester: 'Fall 2021'
    };
    const response = await request(app)
      .post('/register')
      .send(newUser)
      .expect(201);

    expect(response.status).toBe(201);
    expect(response.text).toBe('User registered successfully'); // Checking the response text directly
  });
});

// tests/signin.test.js
describe('POST /signin', () => {
    it('should fail to sign in with incorrect credentials and return 401 status', async () => {
      const userCredentials = {
        username: 'nonexistent',
        password: 'wrongpassword'
      };
      await request(app)
        .post('/signin')
        .send(userCredentials)
        .expect(401);
    });
  
    it('should sign in successfully with correct credentials', async () => {
      const userCredentials = {
        username: 'testUser',
        password: 'password123'
      };
      const response = await request(app)
        .post('/signin')
        .send(userCredentials)
        .expect(200);
  
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('username', 'testUser');
    });
  });

  // tests/announcement.test.js
describe('POST /announcement', () => {
    it('should create an announcement', async () => {
      const announcementData = { message: 'New Announcement' };
      const response = await request(app)
        .post('/announcement')
        .send(announcementData)
        .expect(201);
  
      expect(response.body).toHaveProperty('message', 'New Announcement');
    });
  });
  