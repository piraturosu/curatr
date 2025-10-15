process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

let token;

beforeAll(async () => {
  await seed(testData);
  const res = await request(app)
    .post("/api/auth/login")
    .send({ username: "testuser", password: "password123" });
  token = res.body.token;
});

afterAll(() => db.end());

describe("GET /api/exhibitions/temp", () => {
  test("200: returns array of temp exhibitions for logged-in user", async () => {
    const { body } = await request(app)
      .get("/api/exhibitions/temp")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(body.temp_exhibitions)).toBe(true);
    expect(body.temp_exhibitions.length).toBeGreaterThanOrEqual(1);
    expect(body.temp_exhibitions[0]).toMatchObject({
      user_id: 1,
      artwork: expect.any(Object),
    });
  });

  test("401: responds with error if no token provided", async () => {
    const { body } = await request(app)
      .get("/api/exhibitions/temp")
      .expect(401);
    expect(body.msg).toBe("Missing token");
  });
});

describe("POST /api/exhibitions/temp", () => {
  test("201: adds a new temp exhibition item", async () => {
    const sampleArtwork = {
      id: "pex-9999",
      title: "New Artwork",
      artist: "Test artist",
      year: "2024",
      image: "https://example.com/art.jpg",
    };

    const { body } = await request(app)
      .post("/api/exhibitions/temp")
      .set("Authorization", `Bearer ${token}`)
      .send({ artwork: sampleArtwork })
      .expect(201);

    expect(body.temp_exhibition).toMatchObject({
      user_id: 1,
      artwork: sampleArtwork,
    });
  });

  test("400: responds with error when no artwork is provided", async () => {
    const { body } = await request(app)
      .post("/api/exhibitions/temp")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(body.msg).toBe("Artwork data is required");
  });
});

describe("DELETE /api/exhibitions/temp/:temp_id", () => {
  test("204: deletes a temp exhibition entry", async () => {
    const { body } = await request(app)
      .get("/api/exhibitions/temp")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const temp_id = body.temp_exhibitions[0].temp_id;

    await request(app)
      .delete(`/api/exhibitions/temp/${temp_id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });

  test("404: rejects deleting a non-existent ID", async () => {
    const { body } = await request(app)
      .delete(`/api/exhibitions/temp/9999`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(body.msg).toBe("Item not found");
  });
});
