const request = require("supertest");
const { app, closeServer } = require("./index");
const jwt = require("jsonwebtoken");
describe("Server is running", () => {
  const access = jwt.sign({ email: "test@gmail.com", id: 2 }, "secret");
  afterAll(() => {
    closeServer();
  });

  it("Should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  describe("GET /square with 2 as param", () => {
    it("should return 4", () => {
      return request(app).get("/square/2").expect(200, "4");
    });
  });

  const email = `test${Date.now()}@example.com`;

  describe("POST /register", () => {
    it("should return 302 Redirect when registration is successful", () => {
      return request(app)
        .post("/register")
        .send({
          lastname: "Test",
          firstname: "User",
          email: email,
          password: "test",
        })
        .expect(302);
    });
  });

  describe("POST /register", () => {
    it("should return 302 Redirect to register since email is existing", () => {
      return request(app)
        .post("/register")
        .send({
          lastname: "Test",
          firstname: "User",
          email: email,
          password: "test",
        })
        .responseType("text/html")
        .expect(400);
    });
  });

  describe("POST /login without email", () => {
    it("should return 404 user not found", () => {
      return request(app)
        .post("/login")
        .send({ password: "test" }) // replace this with a test user's credentials
        .expect(404);
    });
  });

  describe("POST /login", () => {
    it("should return 302 Redirect when login is successful", () => {
      return request(app)
        .post("/login")
        .send({ email, password: "test" }) // replace this with a test user's credentials
        .expect(302);
    });
  });

  describe("POST /login", () => {
    it("should return 400 wrong password", () => {
      return request(app)
        .post("/login")
        .send({ email, password: "toto" }) // replace this with a test user's credentials
        .expect(400);
    });
  });

  describe("POST /login", () => {
    it("should return 400 wrong password", () => {
      return request(app)
        .post("/login")
        .send({ email: "toto@gmail.com", password: "toto" }) // replace this with a test user's credentials
        .expect(404);
    });
  });

  describe("GET /login", () => {
    it("should return 200 OK", () => {
      return request(app).get("/login").expect(200);
    });
  });

  describe("GET /login with headers (not jwt)", () => {
    it("should return 200 OK", () => {
      return request(app).get("/login").set("Cookie", "jwt=12345").expect(200);
    });
  });

  describe("GET /login with headers with working jwt", () => {
    it("should return 302 Redirect", () => {
      return request(app)
        .get("/login")
        .set("Cookie", `jwt=${access}`)
        .expect(302);
    });
  });

  describe("GET /register", () => {
    it("should return 200 OK", () => {
      return request(app).get("/register").expect(200);
    });
  });

  describe("GET /register with headers (not jwt)", () => {
    it("should return 200 OK", () => {
      return request(app)
        .get("/register")
        .set("Cookie", "jwt=12345")
        .expect(200);
    });
  });

  describe("GET /register with headers with working jwt", () => {
    it("should return 302 Redirect", () => {
      return request(app)
        .get("/register")
        .set("Cookie", `jwt=${access}`)
        .expect(302);
    });
  });

  describe("GET /loggedIn", () => {
    it("should return 302 Redirect", () => {
      return request(app).get("/loggedIn").expect(302);
    });
  });

  describe("GET /loggedIn with headers (not jwt)", () => {
    it("should return 200 OK", () => {
      return request(app)
        .get("/loggedIn")
        .set("Cookie", "jwt=12345")
        .expect(302);
    });
  });
  describe("GET /loggedIn with headers (not jwt)", () => {
    it("should return 200 OK", () => {
      return request(app)
        .get("/loggedIn")
        .set("Cookie", `jwt=${access}`)
        .expect(200);
    });
  });

  describe("GET /logout", () => {
    it("should return 302 Redirect", () => {
      return request(app).get("/logout").expect(302);
    });
  });
});
