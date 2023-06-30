const request = require("supertest");
const { app, closeServer } = require("./index");

describe("Server is running", () => {
  afterAll(() => {
    closeServer();
  });

  it("Should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});
