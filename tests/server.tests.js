// tests/register.test.js
const request = require('supertest');
const app = require('../app'); // Path to your Express application

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

    expect(response.body).toHaveProperty('message', 'User registered successfully');
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
        username: 'existingUser',
        password: 'correctPassword'
      };
      const response = await request(app)
        .post('/signin')
        .send(userCredentials)
        .expect(200);
  
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('username', 'existingUser');
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
  