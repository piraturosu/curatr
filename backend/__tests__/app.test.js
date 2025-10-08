const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const endpointsJson = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("POST /api/auth/register", () => {
  test("201: creates a new user and returns token + user", async () => {
    const newUser = { username: "testNewUser", password: "password123" };

    const { body } = await request(app)
      .post("/api/auth/register")
      .send(newUser)
      .expect(201);

    expect(body.user).toMatchObject({
      username: "testNewUser",
      user_id: expect.any(Number),
    });
    expect(body.token).toBeDefined();
  });

  test("400: responds with error when missing fields", async () => {
    const { body } = await request(app)
      .post("/api/auth/register")
      .send({ username: "missingPassword" })
      .expect(400);
    expect(body.msg).toBe("Username and password required");
  });

  test("409: rejects if username already exists", async () => {
    const { body } = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "anything" })
      .expect(409);
    expect(body.msg).toBe("Username already exists");
  });
});

describe("POST /api/auth/login", () => {
  test("200: returns token + user on successful login", async () => {
    const user = { username: "testuser", password: "password123" };
    const { body } = await request(app)
      .post("/api/auth/login")
      .send(user)
      .expect(200);

    expect(body.user).toMatchObject({
      username: "testuser",
      user_id: expect.any(Number),
    });
    expect(body.token).toBeDefined();
  });

  test("401: rejects invalid credentials", async () => {
    const { body } = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "wrongpassword" })
      .expect(401);
    expect(body.msg).toBe("Invalid credentials");
  });

  test("400: rejects missing fields", async () => {
    const { body } = await request(app)
      .post("/api/auth/login")
      .send({})
      .expect(400);
    expect(body.msg).toBe("Username and password required");
  });
});
